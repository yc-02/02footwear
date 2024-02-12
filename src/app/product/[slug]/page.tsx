import { Products } from "../../../../types"
import ProductDetails from "@/app/product/ProductDetails"

type ParamsProps={
  slug:string
}

interface Entries{
  items:Products[]
}

const contentful = require('contentful')
const client = contentful.createClient({
space: process.env.CONTENTFUL_SPACE_ID,
accessToken:process.env.CONTENTFUL_ACCESS_KEY
})

export async function generateMetadata({params}:{params:ParamsProps}) {
 
  const entries:Entries = await client.getEntries({
    content_type:'product',
    'fields.slug':params.slug
  })
  return {
    title: `${entries.items[0]?.fields.title || 'Shoes not Found'}`
  }
}



export default async function Detailpage({params}:{params:ParamsProps}) {
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
