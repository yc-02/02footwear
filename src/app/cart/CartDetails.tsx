"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartItems from "./CartItems";
import useCart from "@/app/components/hooks/useCart";




export default function CartDetails() {
  const router=useRouter()
  const {items_count,sub_total,shipping_fee,total_price}=useCart()
  const [disable,setDisable]=useState(false)
  useEffect(()=>{
    if(sub_total===0){
      setDisable(true)
    }else{
      setDisable(false)
    }
  },[sub_total])

  return (
    <div className="md:grid grid-cols-3 p-10">
      <div className="col-span-2">
      <h1 className="text-2xl">Cart</h1>
      {items_count>0?(
          <CartItems/>
      ):(
        <div className="py-10">
          <p>There are no items in your cart.</p>
        </div>
      )}
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <h1 className="text-2xl">Summary</h1>
    
        <h1 className="flex justify-between">Subtotal: <span>${sub_total}</span></h1>
        <p className="flex justify-between">Shipping & Handlings: <span>${shipping_fee}</span></p>
        <p className="flex justify-between border-t-2">Total <span>${total_price}</span></p>
        <button className="bg-slate-800 text-slate-50 p-2 rounded-2xl hover:bg-slate-600" 
        onClick={()=>router.push('/checkout')} 
        disabled={disable}>
          Check out
        </button>
      </div>
    </div>
  )
}
