"use client"
import {Products, UserLiked } from "@/types"
import ImageSlider from "@/app/product/ImageSlider"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import AddToCartButton from "@/app/components/buttons/AddToCartButton";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import Link from "next/link";



type Size={
    size:string
  }


const ProductDetails=({product,userLiked,likesCount}:{product:Products,userLiked:UserLiked|undefined,likesCount:number|undefined})=>{

//select size
const [selectedSize,setSelectedSize]=useState<Size>()


const productToCart = {
  name:product.fields.title,
  slug:product.fields.slug,
  qty:0,
  image:product.fields.image[0].fields.file.url,
  price:product.fields.price,
  size:selectedSize?.size,
  id:product.sys.id,
};

const image=product.fields.image.map((image)=>image.fields.file)
const router=useRouter()

//add/delete favorite
const supabase = createClient()
const handleFavorite=async()=>{
  const{data:{user}}= await supabase.auth.getUser()

  if(user){
    if(userLiked){
      await supabase.from('footwear_wish_list').delete().match({user_id:user.id,product_id:product.sys.id})
     }else{
       const {error}=await supabase.from('footwear_wish_list').insert({
         user_id:user.id,
         product_id:product.sys.id,
         product_title:product.fields.title,
         product_slug:product.fields.slug,
         product_url:product.fields.image[0].fields.file.url,
         product_price:product.fields.price,
         product_size:product.fields.size

       })

       if(error){
         throw new Error(error.message)
       }
       notify()
     }
    }
     router.refresh()
  }

//toast notify favorite
const notify=()=>toast((t) => (
  <div className="flex flex-col">
      <button
        onClick={() => toast.dismiss(t.id)}
        className='flex justify-end'
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex flex-col gap-5">
      <p>Check out your wish list <span>&#128571;</span></p>
      <Link href="/wish-list" className="bg-slate-800 text-white rounded-lg p-1 text-center">View list</Link>
    </div>
  </div>
))

  return (
    <div className="flex flex-col">
    <div className="flex flex-col md:grid grid-cols-2 gap-5">
      <div className="w-96 h-96 md:h-full md:w-full">
        <ImageSlider image={image}/>
      </div>
      <div className="flex flex-col items-start gap-5">
        <p>{product.fields.title}</p>
        <p>${product.fields.price}</p>
        <p>Select Size</p>
        <div className="grid grid-cols-2">
          {product.fields.size.map((size)=>
          <button className={`border border-slate-800 rounded-2xl p-2 m-2 ${selectedSize?.size===size?'bg-slate-800 text-slate-50':""}`} 
          onClick={()=>setSelectedSize((prevSize) => (prevSize?.size === size ? undefined : {size}))} key={size}>{size}
          </button>
          )}
        </div>
        <AddToCartButton item={productToCart}/>
        {/* favorite icon */}
        <button 
        onClick={handleFavorite}
        className="flex border-slate-800 border-2 p-1 rounded-2xl w-1/2 justify-center">
          Favorite
          <svg xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className={`w-6 h-6 ${userLiked?"fill-pink-700 stroke-pink-700" :"fill-none"}`}
          >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          {likesCount}
        </button>
      </div>
  </div>
  <div className="m-auto w-full p-5 my-10 border-t-2">
        {documentToReactComponents(product.fields.description)}
      </div>
  </div>
  )
}
export default ProductDetails;