import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Accordion } from 'native-base'
import { View, Text, Image } from 'react-native'
import * as moment from 'moment'

const OrderCard = ({ order, less }) => {
   const whatColor = status => {
      switch (status) {
         case 'PENDING':
            return '#F6AD55'
         case 'UNDER_PROCESSING':
            return '#F6AD55'
         case 'READY_TO_DISPATCH':
            return '#3C91E6'
         case 'OUT_FOR_DELIVERY':
            return '#1EA896'
         case 'DELIVERED':
            return '#48BB78'
         default:
            return '#aaa'
      }
   }

   const whatTitle = (status, type) => {
      switch (status) {
         case 'PENDING':
            return 'PENDING'
         case 'UNDER_PROCESSING':
            return 'BEING PREPARED'
         case 'READY_TO_DISPATCH':
            return 'READY'
         case 'OUT_FOR_DELIVERY':
            if (type.includes('DELIVERY')) {
               return 'ON THE WAY'
            } else {
               return 'AWAITING PICKUP'
            }
         case 'DELIVERED':
            if (type.includes('DELIVERY')) {
               return 'DELIVERED'
            } else {
               return 'PICKED UP'
            }
         default:
            return 'CALL US'
      }
   }

   return (
      <>
         {!less && (
            <>
               <View style={styles.head}>
                  <Text style={styles.title}>Order ID: {order?.id}</Text>
                  <Text
                     style={[
                        styles.status,
                        {
                           backgroundColor: whatColor(order.orderStatus),
                        },
                     ]}
                  >
                     {whatTitle(order.orderStatus, order.fulfillmentType)}
                  </Text>
               </View>
               <Text style={[styles.muted, styles.bold]}>
                  Ordered on:{' '}
                  <Text style={styles.lite}>
                     {moment(order?.created_at).format('LLLL')}
                  </Text>
               </Text>
               {order.deliveryInfo.dropoff.dropoffInfo && (
                  <Text style={styles.muted}>
                     {order?.deliveryInfo?.dropoff?.dropoffInfo?.customerAddress
                        ?.line1 +
                        ', ' +
                        order?.deliveryInfo?.dropoff?.dropoffInfo
                           ?.customerAddress?.line2 +
                        ', ' +
                        order?.deliveryInfo?.dropoff?.dropoffInfo
                           ?.customerAddress?.city +
                        ', ' +
                        order?.deliveryInfo?.dropoff?.dropoffInfo
                           ?.customerAddress?.state +
                        ', ' +
                        order?.deliveryInfo?.dropoff?.dropoffInfo
                           ?.customerAddress?.country}{' '}
                     -{' '}
                     {
                        order?.deliveryInfo.dropoff?.dropoffInfo
                           ?.customerAddress?.zipcode
                     }
                  </Text>
               )}
            </>
         )}
         <Accordion
            headerStyle={styles.header}
            expanded={less ? 0 : null}
            dataArray={[
               {
                  title: `${
                     order.orderInventoryProducts.length +
                     order.orderMealKitProducts.length +
                     order.orderReadyToEatProducts.length
                  }  Item${
                     order.orderInventoryProducts.length +
                        order.orderMealKitProducts.length +
                        order.orderReadyToEatProducts.length >
                     1
                        ? 's'
                        : ''
                  }`,
                  content: (
                     <View style={{ width: '100%' }}>
                        {order.orderInventoryProducts.map(product => (
                           <View style={styles.product}>
                              <View
                                 style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                 }}
                              >
                                 <Image
                                    source={{
                                       uri:
                                          product.inventoryProduct?.assets
                                             ?.images[0],
                                    }}
                                    style={{
                                       height: 60,
                                       width: 60,
                                       resizeMode: 'cover',
                                       marginRight: 8,
                                       borderRadius: 4,
                                    }}
                                 />
                                 <View style={styles.productInfo}>
                                    <Text>{product.inventoryProduct.name}</Text>
                                    <Text style={styles.productOption}>
                                       {product.inventoryProductOption.label}
                                    </Text>
                                 </View>
                              </View>
                              <Text style={styles.productPrice}>
                                 ${' '}
                                 {product.inventoryProductOption.price[0].value}
                              </Text>
                           </View>
                        ))}
                        {order.orderMealKitProducts.map(product => (
                           <View style={styles.product}>
                              <View
                                 style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                 }}
                              >
                                 <Image
                                    source={{
                                       uri:
                                          product.simpleRecipeProduct?.assets
                                             ?.images[0],
                                    }}
                                    style={{
                                       height: 60,
                                       width: 60,
                                       resizeMode: 'cover',
                                       marginRight: 8,
                                       borderRadius: 4,
                                    }}
                                 />
                                 <View style={styles.productInfo}>
                                    <Text>
                                       {product.simpleRecipeProduct.name}
                                    </Text>
                                    <Text style={styles.productOption}>
                                       Meal Kit Serving:{' '}
                                       {
                                          product.simpleRecipeProductOption
                                             .simpleRecipeYield.yield.serving
                                       }
                                    </Text>
                                 </View>
                              </View>
                              <Text style={styles.productPrice}>
                                 ${' '}
                                 {
                                    product.simpleRecipeProductOption.price[0]
                                       .value
                                 }
                              </Text>
                           </View>
                        ))}
                        {order.orderReadyToEatProducts.map(product => (
                           <View style={styles.product}>
                              <View
                                 style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                 }}
                              >
                                 <Image
                                    source={{
                                       uri:
                                          product.simpleRecipeProduct?.assets
                                             ?.images[0],
                                    }}
                                    style={{
                                       height: 60,
                                       width: 60,
                                       resizeMode: 'cover',
                                       marginRight: 8,
                                       borderRadius: 4,
                                    }}
                                 />
                                 <View style={styles.productInfo}>
                                    <Text>
                                       {product.simpleRecipeProduct.name}
                                    </Text>
                                    <Text style={styles.productOption}>
                                       Ready to Eat Serving:{' '}
                                       {
                                          product.simpleRecipeProductOption
                                             .simpleRecipeYield.yield.serving
                                       }
                                    </Text>
                                 </View>
                                 <Text style={styles.productPrice}>
                                    ${' '}
                                    {
                                       product.simpleRecipeProductOption
                                          .price[0].value
                                    }
                                 </Text>
                              </View>
                           </View>
                        ))}
                     </View>
                  ),
               },
               {
                  title: 'Bill Details',
                  content: (
                     <View style={styles.rowContainer}>
                        <View style={styles.row}>
                           <Text>Txn ID</Text>
                           <Text>{order.transactionId}</Text>
                        </View>
                        <View style={styles.row}>
                           <Text>Delivery Price</Text>
                           <Text>$ {order.deliveryPrice}</Text>
                        </View>
                        {order.tip && (
                           <View style={styles.row}>
                              <Text>Tip</Text>
                              <Text>$ {order.tip}</Text>
                           </View>
                        )}
                        <View style={styles.row}>
                           <Text>Tax</Text>
                           <Text>$ {order.tax}</Text>
                        </View>
                        <View style={styles.row}>
                           <Text>Total Price</Text>
                           <Text>$ {order.itemTotal}</Text>
                        </View>
                     </View>
                  ),
               },
            ]}
         />
         <View style={styles.flexContainer}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>$ {order?.amountPaid}</Text>
         </View>
      </>
   )
}

export default OrderCard

const styles = EStyleSheet.create({
   head: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
   },
   status: {
      backgroundColor: '#aaa',
      color: '#fff',
      borderRadius: 2,
      padding: 5,
   },
   title: {
      fontWeight: 'bold',
      fontSize: '$m',
   },
   muted: {
      color: 'gray',
      fontSize: '$s',
      marginBottom: 10,
   },
   bold: {
      fontWeight: 'bold',
   },
   lite: {
      fontWeight: 'normal',
   },
   flexContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
   },
   total: {
      fontWeight: 'bold',
      fontSize: '$m',
      marginTop: 10,
   },
   header: {
      backgroundColor: '#fff',
   },
   rowContainer: {
      flex: 1,
      width: '100%',
   },
   row: {
      marginBottom: 5,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   product: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginBottom: 10,
      width: '100%',
   },
   productInfo: {
      fontSize: '$m',
      flex: 1,
   },
   productOption: {
      fontSize: '$s',
      color: '#666',
   },
   productPrice: {
      fontSize: '$m',
   },
})