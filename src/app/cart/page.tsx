
import { Metadata } from 'next'
import CartDetails from './CartDetails'

export const metadata:Metadata={
    title:"Cart"
}

export default function CartPage() {
  return (
    <CartDetails/>
  )
}
