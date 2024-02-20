import { createClient } from "@/utils/supabase/server"
import { Products } from "../../../types"
import ProductDetails from "@/app/product/[slug]/ProductDetails"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
interface Entries{
  items:Products[]
}

const contentful = require('contentful')
const client = contentful.createClient({
space: process.env.CONTENTFUL_SPACE_ID,
accessToken:process.env.CONTENTFUL_ACCESS_KEY
})

export async function generateMetadata({params}:{params:{slug:string}}) {
  const entries:Entries = await client.getEntries({
    content_type:'product',
    'fields.slug':params.slug
  })
  if(entries.items[0] === undefined){
    redirect('/')
  }
  return {
    title: `${entries.items[0].fields.slug || 'Product not Found'}`
  }
}

export default async function Detailpage({params}:{params:{slug:string}}) {
  //contentful
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
<div className="bg-slate-50 p-5">
  <ProductDetails product={product} userLiked={userLiked} likesCount={LikesCount}/>
</div>
  )
}
