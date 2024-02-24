import { Metadata } from "next";
import { PlaceOrderForm } from "./PlaceOrderForm";

export const metadata:Metadata={
  title:"Place Order"
}

export default function PlaceOrderPage() {
  return (
    <div>
      <PlaceOrderForm/>
    </div>

  )
}
