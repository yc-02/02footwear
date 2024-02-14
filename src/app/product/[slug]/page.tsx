import { Products } from "../../../types"
import ProductDetails from "@/app/product/[slug]/ProductDetails"
interface Entries{
  items:Products[]
}

export default async function Detailpage({params}:{params:{slug:string}}) {
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

  

  return (
<div>
  <ProductDetails product={product}/>
</div>
  )
}
