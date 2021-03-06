import { useMutation, useSubscription } from '@apollo/react-hooks'
import React, { useState } from 'react'
import {
   ONDEMAND_DELIVERY,
   ONDEMAND_PICKUP,
   PREORDER_DELIVERY,
   PREORDER_PICKUP,
   UPDATE_CART,
} from '../graphql'
import {
   generateDeliverySlots,
   generateMiniSlots,
   generatePickUpSlots,
   generateTimeStamp,
   getDistance,
   isDeliveryAvailable,
   isPickUpAvailable,
} from '../utils/fulfillment'
import { useAppContext } from './app'
import { useDrawerContext } from './drawer'

const CartContext = React.createContext()

export const CartContextProvider = ({ children }) => {
   const { availability } = useAppContext()

   const { saved } = useDrawerContext()

   React.useEffect(() => {
      if (saved && cart) {
         if (saved.type.includes('card')) {
            updateCart({
               variables: {
                  id: cart.id,
                  set: {
                     stripeCustomerId: customerDetails?.stripeCustomerId,
                     paymentMethodId: saved.data.paymentMethodId,
                  },
               },
            })
         } else if (saved.type.includes('address')) {
            updateCart({
               variables: {
                  id: cart.id,
                  set: {
                     address: saved.data.address,
                  },
               },
            })
         } else if (saved.type.includes('profile')) {
            updateCart({
               variables: {
                  id: cart.id,
                  set: {
                     customerInfo: {
                        customerFirstName: saved.data.customerInfo.firstName,
                        customerLastName: saved.data.customerInfo.lastName,
                        customerPhone: saved.data.customerInfo.phoneNumber,
                        customerEmail: saved.data.customerInfo.email,
                     },
                  },
               },
            })
         } else {
            console.log('Unkown update!')
         }
      }
   }, [saved])

   // From Hasura
   const [customer, setCustomer] = useState(undefined)
   const [cart, setCart] = useState(undefined)
   // From platform
   const [customerDetails, setCustomerDetails] = useState(undefined)

   // local
   const [distance, setDistance] = useState(0)

   // Subscriptions
   const { data: { preOrderPickup = [] } = {} } = useSubscription(
      PREORDER_PICKUP
   )

   const { data: { onDemandPickup = [] } = {} } = useSubscription(
      ONDEMAND_PICKUP
   )

   const { data: { preOrderDelivery = [] } = {} } = useSubscription(
      PREORDER_DELIVERY,
      {
         variables: {
            distance,
         },
      }
   )

   const { data: { onDemandDelivery = [] } = {} } = useSubscription(
      ONDEMAND_DELIVERY,
      {
         variables: {
            distance,
         },
      }
   )

   // Mutation
   const [updateCart] = useMutation(UPDATE_CART, {
      onCompleted: () => {
         console.log('Cart updated!')
      },
      onError: error => {
         console.log(error)
      },
   })

   // Effects
   React.useEffect(() => {
      if (customer?.orderCarts?.length) {
         setCart(customer.orderCarts[0])
      } else {
         setCart(undefined)
      }
   }, [customer])

   React.useEffect(() => {
      if (
         customerDetails?.defaultCustomerAddress?.lat &&
         customerDetails?.defaultCustomerAddress?.lng &&
         availability?.location?.lat &&
         availability?.location?.lng
      ) {
         const distance = getDistance(
            customerDetails.defaultCustomerAddress.lat,
            customerDetails.defaultCustomerAddress.lng,
            +availability.location.lat,
            +availability.location.lng
         )
         setDistance(distance)
      }
   }, [customerDetails])

   const generateDefaultFulfillment = () => {
      try {
         // set fulfillment
         if (distance) {
            // check for pre-order delivery
            if (preOrderDelivery[0].recurrences.length) {
               const result = generateDeliverySlots(
                  preOrderDelivery[0].recurrences
               )
               if (result.status) {
                  const miniSlots = generateMiniSlots(result.data, 15)
                  if (miniSlots.length) {
                     const fulfillmentInfo = {
                        slot: {
                           mileRangeId: miniSlots[0].slots[0].mileRangeId,
                           ...generateTimeStamp(
                              miniSlots[0].slots[0].time,
                              miniSlots[0].date
                           ),
                        },
                        type: 'PREORDER_DELIVERY',
                     }
                     console.log('Default fulfillment: ', fulfillmentInfo)
                     return updateCart({
                        variables: {
                           id: cart.id,
                           set: {
                              fulfillmentInfo,
                           },
                        },
                     })
                  }
               }
            }
            // check for on-demand delivery
            if (onDemandDelivery[0].recurrences.length) {
               const result = isDeliveryAvailable(
                  onDemandDelivery[0].recurrences
               )
               if (result.status) {
                  const date = new Date()
                  const time = date.getHours() + ':' + date.getMinutes()
                  const fulfillmentInfo = {
                     slot: {
                        mileRangeId: result.mileRangeId,
                        ...generateTimeStamp(time, date.toDateString()),
                     },
                     type: 'ONDEMAND_DELIVERY',
                  }
                  console.log('Default fulfillment: ', fulfillmentInfo)
                  return updateCart({
                     variables: {
                        id: cart.id,
                        set: {
                           fulfillmentInfo,
                        },
                     },
                  })
               }
            }
         }
         // delivery not possible, then look for pickup options
         if (preOrderPickup[0].recurrences.length) {
            const result = generatePickUpSlots(preOrderPickup[0].recurrences)
            if (result.status) {
               const miniSlots = generateMiniSlots(result.data, 15)
               if (miniSlots.length) {
                  const fulfillmentInfo = {
                     slot: generateTimeStamp(
                        miniSlots[0].slots[0].time,
                        miniSlots[0].date
                     ),
                     type: 'PREORDER_PICKUP',
                  }
                  console.log('Default fulfillment: ', fulfillmentInfo)
                  return updateCart({
                     variables: {
                        id: cart.id,
                        set: {
                           fulfillmentInfo,
                        },
                     },
                  })
               }
            }
         }
         if (onDemandPickup[0].recurrences.length) {
            const result = isPickUpAvailable(onDemandPickup[0].recurrences)
            if (result.status) {
               const date = new Date()
               const time = date.getHours() + ':' + date.getMinutes()
               const fulfillmentInfo = {
                  slot: generateTimeStamp(time, date.toDateString()),
                  type: 'ONDEMAND_PICKUP',
               }
               console.log('Default fulfillment: ', fulfillmentInfo)
               return updateCart({
                  variables: {
                     id: cart.id,
                     set: {
                        fulfillmentInfo,
                     },
                  },
               })
            }
         }
      } catch (error) {
         console.log(error)
      }
   }

   React.useEffect(() => {
      try {
         if (cart && !cart.fulfillmentInfo) {
            generateDefaultFulfillment()
         }
      } catch (e) {
         console.log(e)
      }
   }, [cart])

   React.useEffect(() => {
      try {
         if (cart?.address) {
            generateDefaultFulfillment()
         }
      } catch (e) {
         console.log(e)
      }
   }, [cart?.address?.id])

   return (
      <CartContext.Provider
         value={{
            customer,
            setCustomer,
            cart,
            setCart,
            customerDetails,
            setCustomerDetails,
         }}
      >
         {children}
      </CartContext.Provider>
   )
}

export const useCartContext = () => React.useContext(CartContext)
