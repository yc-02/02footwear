import { Metadata } from "next";
import ShippingForm from "./ShippingForm";
import CheckoutSteps from "@/app/components/CheckoutSteps";
import { CheckoutItems } from "../CheckoutItems";

export const metadata:Metadata={
  title:"Shipping"
}

export default async function ShippingPage() {
  return (
    <div>
        <div className="md:grid grid-cols-2">
        <div className="flex flex-col items-center text-center gap-5 py-10">
        <CheckoutSteps current={1}/>
        <ShippingForm/>
        </div>
        <div className="flex flex-col items-center text-center gap-5 pt-10 w-full">
          <p className="text-xl">Your Bag</p>
        <CheckoutItems/>
        </div>
      </div>
    </div>
  )
}
