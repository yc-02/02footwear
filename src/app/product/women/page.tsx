import { Products } from "@/types";
import ProductsPage from "../ProductsPage";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/app/loading";

export const metadata:Metadata={
  title:"Women's product"
}



const ProductData =async():Promise<Products[]>=>{
    const contentful = require('contentful')
    const client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken:process.env.CONTENTFUL_ACCESS_KEY
    })
    const entries = await client.getEntries({content_type:'product','fields.gender': 'Women'})
    return entries.items

}

export default async function WomenProductspage() {

const data = await ProductData()

return(
  <div>
    <Suspense fallback={<Loading/>}>
    <ProductsPage data={data}/>
    </Suspense>
  </div>
)
}
     