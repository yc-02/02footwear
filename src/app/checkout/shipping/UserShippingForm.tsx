"use client"
import UserShippingAddress from "@/app/(auth)/account/shipping-addresses/UserShippingAddresses";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";



export default function UserShippingForm() {
  const router = useRouter()


  const SubmitHandler=(e:FormEvent)=>{
    e.preventDefault()
    router.push('/checkout/place-order')
  }


  return (
    <div>
        <form className="flex flex-col">
          <UserShippingAddress/>
        <button
        onClick={SubmitHandler} 
        type="submit" 
        className="bg-slate-800 text-slate-50 rounded-xl hover:bg-slate-600 p-1 my-5 w-20 m-auto">
        Continue</button>
        </form>
    </div>
  )
}
