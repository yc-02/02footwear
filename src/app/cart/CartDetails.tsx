"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartItems from "./CartItems";
import useCart from "@/app/components/hooks/useCart";




export default function CartDetails() {
  const router=useRouter()
  const {itemCount,subTotal,shippingFee,totalPrice}=useCart()
  const [disable,setDisable]=useState(false)
  useEffect(()=>{
    if(subTotal===0){
      setDisable(true)
    }else{
      setDisable(false)
    }
  },[subTotal])
 console.log(subTotal)

 

  return (
    <div className="md:grid grid-cols-3 p-10">
      <div className="col-span-2">
      <h1 className="text-2xl">Cart</h1>
      {itemCount>0?(
          <CartItems/>
      ):(
        <div className="py-10">
          <p>There are no items in your cart.</p>
        </div>
      )}
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <h1 className="text-2xl">Summary</h1>
    
        <h1 className="flex justify-between">Subtotal: <span>${subTotal}</span></h1>
        <p className="flex justify-between">Shipping & Handlings: <span>${shippingFee}</span></p>
        <p className="flex justify-between border-t-2">Total <span>${totalPrice}</span></p>
        <button className="bg-slate-800 text-slate-50 p-2 rounded-2xl hover:bg-slate-600" 
        onClick={()=>router.push('/checkout')} 
        disabled={disable}>
          Check out
        </button>
      </div>
    </div>
  )
}
