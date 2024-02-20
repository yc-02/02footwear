import { Products } from "@/types";
import ProductPage from "./ProductsPage";
import { Metadata } from "next";

export const metadata:Metadata={
  title:"Products"
}



const ProductData =async():Promise<Products[]>=>{
    const contentful = require('contentful')
    const client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken:process.env.CONTENTFUL_ACCESS_KEY
    })
    const entries = await client.getEntries({content_type:'product'})
    return entries.items

}

export default async function page() {

const data = await ProductData()

return(
  <div>
    <ProductPage data={data}/>
  </div>
)
}
      