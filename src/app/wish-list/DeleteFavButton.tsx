"use client"

import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { HeartIcon } from "@heroicons/react/24/outline"


export default function DeleteFavButton({userId,productId}:{userId:string,productId:string}) {

    const router = useRouter()

    const supabase = createClient()
    const handleDelete = async()=>{
        await supabase.from('footwear_wish_list').delete().match({user_id:userId,product_id:productId})
        router.refresh()
        }


  return (
    <div className="absolute t-0 right-0 p-2">
      <HeartIcon 
      onClick={handleDelete}
      className="w-6 h-6 fill-pink-800 stroke-pink-800 hover:fill-pink-500 hover:stroke-pink-500 cursor-pointer"/>
  </div>
  )
}
