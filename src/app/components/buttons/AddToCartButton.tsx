"use client"
import { useEffect, useState, useTransition } from "react"
import { useCart } from "../hooks/useCart"
import { Products } from "../../../../types"
import { v4 as uuidv4 } from 'uuid';


export default function AddToCartButton({product}:{product:Products}) {
    const [isSuccess,setIsSuccess]=useState<boolean>(false)
    const [disabled,setDisabled]=useState<boolean>(false)
    const {addItem}=useCart()
    useEffect(()=>{
      const timeout= setTimeout(()=>{
        setIsSuccess(false)
      },2000)
      return ()=>clearTimeout(timeout)
    },[isSuccess])
   
  
   const cartItemId = uuidv4()

   const productWithId = {
    ...product, 
    cartItemId, 
 
  };
  
    useEffect(()=>{
      setDisabled(product.selectedSize===undefined)
    },[product.selectedSize])
    

    const handleAddToCart = () => {
       addItem(productWithId)
       setIsSuccess(true)
    };

    console.log(product)
    console.log(disabled)
    console.log(product.selectedSize)

  return (
    <div className="w-1/2">
    <button className="bg-slate-800 text-slate-50 p-2 rounded-2xl hover:bg-slate-600 w-full" 
    onClick={handleAddToCart}
    disabled={disabled}>
    {isSuccess?"Added":"Add to Cart"}
    </button>
        {disabled &&
        <p className="text-pink-800 mt-2">Please select a size before adding to cart</p>}
    </div>
  )
}
