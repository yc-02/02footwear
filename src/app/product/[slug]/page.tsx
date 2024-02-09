import { Products } from "../../../../types"
import ProductDetails from "@/app/components/ProductDetails"

type ParamsProps={
  slug:string
}

interface Entries{
  items:Products[]
}



export default async function Detailpage({params}:{params:ParamsProps}) {
  const contentful = require('contentful')
  const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken:process.env.CONTENTFUL_ACCESS_KEY
  })
  const entries:Entries = await client.getEntries({
    content_type:'product',
    'fields.slug':params.slug
  })
  const image=entries.items[0].fields.image.map((image)=>image.fields.file)
  const product=entries.items[0]


  

  return (
<div>
  <ProductDetails image={image} product={product}/>
</div>
  )
}
