import { Metadata } from "next";
import { PlaceOrderForm } from "./PlaceOrderForm";
import { CheckoutItems } from "../CheckoutItems";
import CheckoutSteps from "@/app/components/CheckoutSteps";

export const metadata:Metadata={
  title:"Payment"
}

export default async function ShippingPage() {
  return (
    <div>
        <div className="md:grid grid-cols-2">
        <div className="flex flex-col justify-center gap-5 py-10">
        <CheckoutSteps current={2}/>
        <PlaceOrderForm/>
        </div>
        <div className="flex flex-col items-center text-center gap-5 pt-10 w-full">
          <p className="text-xl">Your Bag</p>
        <CheckoutItems/>
        </div>
      </div>
    </div>
  )
}
