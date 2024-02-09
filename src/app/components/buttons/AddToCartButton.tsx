"use client"
import { useEffect, useState } from "react";
import { CartItem } from "../../../../types"
import useCart from "../hooks/useCart";


export default function AddToCartButton({item}:{item:CartItem}){
   const {increase}=useCart()
   const [message,setMessage]=useState(false)
 
   const addToCartHandler=()=>{
    if(item.size===undefined){
      setMessage(true)
    }else{
      increase(item)
    }}

    useEffect(()=>{
      if(item.size!==undefined){
        setMessage(false)
      }
    },[item])

  return (
  <div className="w-1/2">
  <button onClick={addToCartHandler} disabled={message} className="bg-slate-800 text-slate-50 p-2 rounded-2xl hover:bg-slate-600 w-full" >
    Add to Cart
  </button>
  {message && <p>please select size</p>}
  </div>
  )

}

