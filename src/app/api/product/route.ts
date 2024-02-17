
import { Products } from "@/types";
import { NextRequest } from "next/server";

const ProductData =async():Promise<Products[]>=>{
    const contentful = require('contentful')
    const client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken:process.env.CONTENTFUL_ACCESS_KEY
    })
    const entries = await client.getEntries({content_type:'product'})
    return entries.items

}
export async function GET(request:NextRequest) {

const data = await ProductData()
const searchParams = request.nextUrl.searchParams
const search = searchParams.get("search")

const filtedProduct = search? data.filter(product => product.fields.tags.some(tag=>tag.includes(search))):data

return Response.json(filtedProduct)

}
      

      
      
        
