"use client"
import { Products } from "@/types";
import ProductCard from "./ProductCard"
import { useSearchParams } from "next/navigation";



export default function ProductsPage({data}:{data:Products[]}) {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')?.toLowerCase()
  const sort = searchParams.get('sort')
  const filtedProduct = 
  search? 
  data.filter(product => product.fields.tags.some(tag=>tag.toLowerCase().includes(search)))
  :data
  sort === "lowtohigh"? data.sort((a, b) => a.fields.price - b.fields.price) : data
  sort === "hightolow"? data.sort((a, b) => b.fields.price - a.fields.price) : data
  sort === "newest" ?data.sort((a,b)=> new Date(b.sys.createdAt).getTime() - new Date(a.sys.createdAt).getTime()) : data

  if(filtedProduct.length === 0){
    return (
      <div className="pt-10 text-center">
      <h2 className="text-4xl">Oh No!</h2>
      <p>Nothing Found.</p>
      <p className="mx-auto my-4">Maybe try again?</p>
    </div>

    )
 
  }


  return (
  <div className="md:grid grid-cols-3 gap-4 bg-slate-50 p-5">
    {filtedProduct.map((p)=>(
      <ProductCard key={p.sys.id} product={p}/>
    ))}
  </div>
    );
}
