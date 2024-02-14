import { Metadata } from "next";
import GuestShippingForm from "./GuestShippingForm";
import CheckoutSteps from "@/app/components/CheckoutSteps";
import { CheckoutItems } from "../CheckoutItems";
import ShippingAddress from "@/app/(auth)/account/shipping-addresses/UserShippingAddresses";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import UserShippingForm from "./UserShippingForm";

export const metadata:Metadata={
  title:"Shipping"
}

export default async function ShippingPage() {
  const cookieStore=cookies()
  const supabase= createClient(cookieStore)
  const {data:{user},error}=await supabase.auth.getUser()
  if(error){
    throw new Error(error.message)
  }

  return (
    <div>
        <div className="md:grid grid-cols-2">

        {user?(
        <div className="flex flex-col gap-5 py-10">
        <CheckoutSteps current={1}/>
        <UserShippingForm/>
        </div>
        ):(
          <div className="flex flex-col items-center text-center gap-5 py-10">
          <CheckoutSteps current={1}/>
          <GuestShippingForm/>
          </div>
        )}
        <div className="flex flex-col items-center text-center gap-5 pt-10 w-full">
          <p className="text-xl">Your Bag</p>
        <CheckoutItems/>
        </div>
      </div>
    </div>
  )
}
