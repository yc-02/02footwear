import { Products } from "@/types";
import ProductsPage from "../ProductsPage";


const ProductData =async():Promise<Products[]>=>{
    const contentful = require('contentful')
    const client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken:process.env.CONTENTFUL_ACCESS_KEY
    })
    const entries = await client.getEntries({content_type:'product','fields.gender': 'Men'})
    return entries.items

}

export default async function page() {

const data = await ProductData()

return(
  <div>
    <ProductsPage data={data}/>
  </div>
)
}
    