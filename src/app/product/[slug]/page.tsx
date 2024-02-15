import { createClient } from "@/utils/supabase/server"
import { Products } from "../../../types"
import ProductDetails from "@/app/product/[slug]/ProductDetails"
import { cookies } from "next/headers"
interface Entries{
  items:Products[]
}

export default async function Detailpage({params}:{params:{slug:string}}) {
  //contentful
  const contentful = require('contentful')
  const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken:process.env.CONTENTFUL_ACCESS_KEY
  })
  const entries:Entries = await client.getEntries({
    content_type:'product',
    'fields.slug':params.slug
  })

  const product=entries.items[0]
  //supabase get product likes count
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const{data:{user}}= await supabase.auth.getUser()
  const {data} = await supabase.from('footwear_wish_list').select()
  const userLiked = data?.find((like)=>like.user_id===user?.id && like.product_id === product.sys.id)
  const LikesCount =data?.filter((like)=>like.product_id === product.sys.id).length

  return (
<div>
  <ProductDetails product={product} userLiked={userLiked} likesCount={LikesCount}/>
</div>
  )
}
