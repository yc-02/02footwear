import { UserLiked } from "@/types"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import DeleteFavButton from "./DeleteFavButton"

export default async function WishList() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const {data:{user}}=await supabase.auth.getUser()

    const getData= async()=>{
      if(user){
      const {data}= await supabase.from('footwear_wish_list').select().eq('user_id',user.id)
      return data
    }
  }
  const data = await getData()
  const wishList = data as UserLiked[]
  if(wishList?.length===0){
    return (
      <div>
        <p className="text-center">No Favorites</p>
      </div>
    )
  }


  return (
    <div>
      <p className="text-center font-bold text-xl">My Favorites</p>
      {user?(
      <div className="flex flex-wrap gap-10 py-10 items-baseline justify-center md:flex-row">
      {wishList.map((wish)=>(
          <div key={wish.id} className="flex flex-col relative">
            <Link href={'/product/'+wish.product_slug}>
            <Image src={'http:'+wish.product_url} 
            className="w-full"
            width={200}
            height={200}
            alt={wish.product_title}/>
            </Link>
            <div className="flex">
            <p className="font-bold">{wish.product_title}</p>
            <p>${wish.product_price}</p>
            </div>
            <DeleteFavButton userId={wish.user_id} productId={wish.product_id}/>
        </div>
      ))}
      </div>):(
      <div className="flex flex-col items-center p-10">
        <p>Please Sign in to see your wish list!</p>
        <Link href='/account/signin' className="underline">Sign in</Link>
      </div>
      )}
    </div>
  )
}
