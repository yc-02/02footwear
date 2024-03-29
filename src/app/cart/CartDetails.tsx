"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartItems from "./CartItems";
import useCart from "@/app/components/hooks/useCart";
import { ItemStock } from "@/types";



export default function CartDetails({data}:{data:ItemStock[]|null}) {
  const router=useRouter()
  const {items_count,sub_total,shipping_fee,total_price,items}=useCart()
  const [disable,setDisable]=useState(false)
  const overStock = data?.filter(i=>items.some(item=>item.id === i.item_id && item.size === i.item_size && item.qty>i.item_size_inventory))
  console.log(overStock)


  useEffect(()=>{
    if(sub_total===0){
      setDisable(true)
    }if(overStock?.length!=0){
      setDisable(true)
    }
    else{
      setDisable(false)
    }
  },[overStock?.length, sub_total])

  return (
    <div className="md:grid grid-cols-3 p-10">
      <div className="col-span-2">
      <h1 className="text-2xl">Cart</h1>
      {items_count>0?(
          <CartItems data={data}/>
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
        <p className="text-sm text-slate-500">Free shipping over $200</p>
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
