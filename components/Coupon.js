import React from 'react'
import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { useDrawerContext } from '../context/drawer'
import { useAppContext } from '../context/app'

const Coupon = ({ cart }) => {
   const { open } = useDrawerContext()
   const { visual } = useAppContext()

   return (
      <>
         {cart.couponCode ? (
            <Wrapper color={visual.color}>
               <TextContainer>
                  <CouponCode>{cart.couponCode}</CouponCode>
                  <SubText>Coupon Applied</SubText>
               </TextContainer>
               <RemoveButton>
                  <Feather name="x" size={20} />
               </RemoveButton>
            </Wrapper>
         ) : (
            <CTA onPress={() => open('CouponList')} color={visual.color}>
               <CTAText>Apply Coupon</CTAText>
            </CTA>
         )}
      </>
   )
}

export default Coupon

const Wrapper = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 0.75rem;
   padding: 0.25rem;
   border: 1px dashed ${props => props.color || '#686b78'};
`

const TextContainer = styled.View``

const RemoveButton = styled.TouchableOpacity``

const CouponCode = styled.Text`
   text-transform: uppercase;
   font-weight: bold;
   color: #686b78;
`

const SubText = styled.Text`
   font-size: 10px;
   color: #686b78;
`

const CTA = styled.TouchableOpacity`
   padding: 0.5rem;
   border: 1px dashed ${props => props.color || '#aaa'};
   border-radius: 0.25rem;
   margin-bottom: 0.75rem;
`

const CTAText = styled.Text`
   color: #686b78;
   font-weight: bold;
   text-align: center;
`
