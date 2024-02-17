import { Metadata } from 'next'
import CheckOrderForm from './CheckOrderForm'

export const metadata:Metadata={
  title:"Order"
}


export default function OrderPage() {
  return (
    <div>
        <CheckOrderForm/>
    </div>
  )
}
