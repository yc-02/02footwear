"use client"


import { useCart } from "../components/hooks/useCart";
import CartItems from "../components/CartItems";


export default function CartPage() {

const {items}=useCart()
const itemCount=items.length
const cartTotal=items.reduce((total,{product})=>total+product.fields.price,0)
  return (
    <div className="grid grid-cols-3 p-10">
      <div className="col-span-2">
      <h1 className="text-2xl">Cart</h1>
      {itemCount>0?(
          <CartItems/>
      ):(
        <div className="">
          <p>There are no items in your cart.</p>
        </div>
      )}
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <h1 className="text-2xl">Summary</h1>
    
        <h1 className="flex justify-between">Subtotal: <span>${cartTotal}</span></h1>
        <p className="flex justify-between">Shipping & Handlings: <span>$7</span></p>
        <p className="flex justify-between border-t-2">Total <span>${cartTotal+7}</span></p>
        <button className="bg-slate-800 text-slate-50 p-2 rounded-2xl hover:bg-slate-600">Check out</button>
      </div>
    </div>
  )
}
