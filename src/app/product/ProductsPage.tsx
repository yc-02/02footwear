"use client"
import { Products } from "@/types";
import ProductCard from "./ProductCard"
import {useSearchParams} from "next/navigation";
import Sort from "./Sort";
import { Suspense} from "react";
import Filter from "./Filter";
import useFilter from "../components/hooks/useFilter";
import FilterRemoveButtons from "./FilterRemoveButtons";
import FilterSortSm from "./FilterSortSm";



export default function ProductsPage({data}:{data:Products[]}) {
   const searchParams = useSearchParams()
   const search = searchParams.get('search')?.toLowerCase()
   const sort = searchParams.get('sort')

   const {selectedsize,selectedBrand} =useFilter()



  
   let filteredProduct = data
//search from all products
   if(search){
    filteredProduct = data.filter(product => product.fields.tags.some(tag=>tag.toLowerCase().includes(search)))
  }

//filter by size
   const sizes = filteredProduct.map(p=>p.fields.size)
   if(selectedsize.length!==0){
     filteredProduct = data.filter(product=>selectedsize.some(size=>product.fields.size.includes(size)))
   }
//filter by brand
    const brands = filteredProduct.map(p=>p.fields.brand)
   if(selectedBrand.length!==0){
    filteredProduct = data.filter(product=>selectedBrand.some(brand=>product.fields.brand.includes(brand)))
   }
//search and filter
   if(selectedsize.length!=0 && search){
    const searchedProducts = data.filter(product => product.fields.tags.some(tag=>tag.toLowerCase().includes(search)))
    filteredProduct = searchedProducts.filter(product=>selectedsize.some(size=>product.fields.size.includes(size)))
   }


//sort products
    let displayProduct = filteredProduct

  if(sort){
    if(sort === "lowtohigh"){
      displayProduct = filteredProduct.sort((a, b) => a.fields.price - b.fields.price)
    } else if(sort === "hightolow"){
      displayProduct = filteredProduct.sort((a, b) => b.fields.price - a.fields.price)
    } else if(sort === "newest"){
      displayProduct = filteredProduct.sort((a,b)=> new Date(b.sys.createdAt).getTime() - new Date(a.sys.createdAt).getTime())
    }
  }



 

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
    <div className="mt-5">
    <div className="flex justify-between md:justify-end py-5 px-1">
    <FilterSortSm size={sizes} brand={brands}/>
      <Sort search={search}/>
    </div>
    <div className="grid grid-cols-5">
      <div className="hidden md:grid col-span-1">
        <Filter size={sizes} brand={brands}/>
      </div>
      <div className="col-span-5 md:col-span-4">
        <div className="hidden md:block">
        <FilterRemoveButtons/>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50 p-5">
        {displayProduct.map((p)=>(
          <ProductCard key={p.sys.id} product={p}/>
        ))}
        </div>
        </Suspense>
      </div>
  </div>
  </div>
    );
}
