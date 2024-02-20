"use client"
import { Products } from "@/types";
import ProductCard from "./ProductCard"
import { useSearchParams} from "next/navigation";
import Sort from "./Sort";
import { Suspense } from "react";
import Filter from "./Filter";
import useFilter from "../components/hooks/useFilter";
import FilterRemoveButtons from "./FilterRemoveButtons";



export default function ProductsPage({data}:{data:Products[]}) {
   const searchParams = useSearchParams()
   const search = searchParams.get('search')?.toLowerCase()
   const sort = searchParams.get('sort')
   const {selectedsize} =useFilter()

  
   let filteredProduct = data

  //filter by size
   const sizes = filteredProduct.map(p=>p.fields.size)
   if(selectedsize.length!==0){
     filteredProduct = data.filter(product=>selectedsize.some(size=>product.fields.size.includes(size)))
   }

  //search from all products
   if(search){
    filteredProduct = data.filter(product => product.fields.tags.some(tag=>tag.toLowerCase().includes(search)))
  }



  //sort products
  let displayProduct = filteredProduct
  sort === "lowtohigh"? displayProduct = filteredProduct.sort((a, b) => a.fields.price - b.fields.price) : filteredProduct
  sort === "hightolow" ? displayProduct = filteredProduct.sort((a, b) => b.fields.price - a.fields.price) : filteredProduct
  sort === "newest" ? displayProduct = filteredProduct.sort((a,b)=> new Date(b.sys.createdAt).getTime() - new Date(a.sys.createdAt).getTime()) : filteredProduct


  if(displayProduct.length === 0){
    return (
      <div className="pt-10 text-center">
      <h2 className="text-4xl">Oh No!</h2>
      <p>Nothing Found.</p>
      <p className="mx-auto my-4">Maybe try again?</p>
    </div>

    )
 
  }



  return (
    <>
    <div className="flex justify-end">
      <Sort/>
    </div>
    <div className="grid grid-cols-5">
      <div className="hidden md:grid col-span-1">
        <Filter size={sizes}/>
      </div>
      <div className="col-span-4">
       <FilterRemoveButtons/>
        <Suspense fallback={<p>Loading...</p>}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50 p-5">
        {displayProduct.map((p)=>(
          <ProductCard key={p.sys.id} product={p}/>
        ))}
        </div>
        </Suspense>
      </div>
  </div>
  </>
    );
}
