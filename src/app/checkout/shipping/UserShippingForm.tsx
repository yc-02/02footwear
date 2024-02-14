"use client"
import UserShippingAddress from "@/app/(auth)/account/shipping-addresses/UserShippingAddresses";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { User } from '@supabase/supabase-js'
import {UserShippingOption } from "@/types";
import useCart from "@/app/components/hooks/useCart";



export default function UserShippingForm({user,data}:{user:User,data:UserShippingOption[]|null}) {
  const router = useRouter()
  const {shipping_details}=useCart()
  const [disable,setDisable]=useState(false)


  const SubmitHandler=(e:FormEvent)=>{
    e.preventDefault()
    router.push('/checkout/place-order')
  }

  useEffect(()=>{
    if(!shipping_details.address){
      setDisable(true)
     }else{
       setDisable(false)
     }
   
  },[shipping_details])

  return (
    <div>
        <form className="flex flex-col">
          <UserShippingAddress user={user} data={data}/>
        <button
        onClick={SubmitHandler} 
        disabled={disable}
        type="submit" 
        className="bg-slate-800 text-slate-50 rounded-xl hover:bg-slate-600 p-1 my-5 w-20 m-auto">
        Continue</button>
        </form>
    </div>
  )
}
