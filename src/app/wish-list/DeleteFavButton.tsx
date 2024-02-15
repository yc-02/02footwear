"use client"

import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"


export default function DeleteFavButton({userId,productId}:{userId:string,productId:string}) {

    const router = useRouter()

    const supabase = createClient()
    const handleDelete = async()=>{
        await supabase.from('footwear_wish_list').delete().match({user_id:userId,product_id:productId})
        router.refresh()
        }


  return (
    <div className=" absolute t-0 right-0 p-2">
    <svg xmlns="http://www.w3.org/2000/svg" 
    onClick={handleDelete}
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="w-6 h-6 fill-pink-700 stroke-pink-700 hover:stroke-red-800 cursor-pointer" 
    >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  </div>
  )
}
