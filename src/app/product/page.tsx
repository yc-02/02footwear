import ProductCard from "../ components/ProductCard"
import { Products } from "../../../types"


export async function getData():Promise<Products[]> {
  const contentful = require('contentful')
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken:process.env.CONTENTFUL_ACCESS_KEY
  })
  const entries = await client.getEntries({content_type:'product'})
  return entries.items

}



export default async function Product() {
  const data = await getData()
  return (
<div className="md:grid grid-cols-3 gap-4">
  {data.map((p)=>(
    <ProductCard key={p.sys.id} product={p}/>
  ))}
</div>
  );
}
