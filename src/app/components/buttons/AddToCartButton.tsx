"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CartItem } from "@/types"
import useCart from "../hooks/useCart";
import toast, { Toaster } from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";


export default function AddToCartButton({item}:{item:CartItem}){
   const {increase,items_count}=useCart()
   const [message,setMessage]=useState(false)


   const notify=()=>toast((t) => (
    <div className="flex flex-col">
      <button
      onClick={() => toast.dismiss(t.id)}
      className='flex justify-end'
      >
        <XMarkIcon className="w-6 h-6"/>
      </button>
    <div className="grid grid-cols-2 gap-2">
      <Link href={'/product/'+item.slug}>
      <Image src={'http:'+item.image} 
      width={100}
      height={100}
      alt={item.name}/>
      </Link>

      <div className="flex flex-col justify-between text-left gap-2">
      <p className="font-bold">{item.name}</p>
      <p className="text-sm">{item.gender}</p>
      <p>Size: {item.size}</p>
      <p>${item.price}</p>
      <div className="flex gap-2 items-center">
      <Link href="/cart"
      onClick={() => toast.dismiss(t.id)}
      className="border-slate-800 border p-1 rounded-2xl text-xs text-nowrap"
      >Your Bag ({items_count+1})
      </Link>
      <Link href="/checkout"
       onClick={() => toast.dismiss(t.id)} 
      className="bg-slate-800 text-slate-50 p-1 rounded-2xl hover:bg-slate-600 text-xs"
      >Checkout</Link>
      </div>
      </div>
    </div>
    </div>
  ))
 
   const addToCartHandler=()=>{
    if(item.size===undefined){
      setMessage(true)
    }else{
      increase(item)
      notify()
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
  {message && <p className="text-sm text-pink-800 text-center pt-2">Please select a size.</p>}
  <Toaster position="top-right"/>
  </div>
  )

}

