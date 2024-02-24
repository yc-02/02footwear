"use client"
import { ItemStock, Products } from "@/types";
import ProductCard from "./ProductCard"
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Sort from "./Sort";
import { Suspense, useEffect, useState} from "react";
import Filter from "./Filter";
import useFilter from "../components/hooks/useFilter";
import FilterRemoveButtons from "./FilterRemoveButtons";
import FilterSortSm from "./FilterSortSm";
import { createClient } from "@/utils/supabase/client";



export default function ProductsPage({data}:{
  data:Products[]
}) {
   const searchParams = useSearchParams()
   const search = searchParams.get('search')?.toLowerCase()
   const sort = searchParams.get('sort')
  //  const pathname = usePathname()
   const {selectedsize,selectedBrand,reset} =useFilter()
   const [itemsStock,setItemsStock]=useState<ItemStock[]|null>()
   const supabase = createClient()
   const getItemsStock = async()=>{
    const {data,error} = await supabase.from('footwear_items_stock').select()
    setItemsStock(data)
    if (error){
      throw new Error(error.message)
    }
   }
   useEffect(()=>{
    getItemsStock()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
 


   let filteredProduct = data
//search from all products
   if(search){
    filteredProduct = filteredProduct.filter(product => product.fields.tags.some(tag=>tag.toLowerCase().includes(search)))
  }
     
//filter options
   const sizes = filteredProduct.map(p=>p.fields.size)  
//filter by size
//get outofstockitems by size
   const outOfStockItems= itemsStock?.filter(item=>item.item_size_inventory===0)
   const outOfStockProducts = outOfStockItems?.filter(item=>selectedsize.some(size=>item.item_size.includes(size)))

  
   if(selectedsize.length!==0){
     filteredProduct = filteredProduct.filter(product=>selectedsize.some(size=>product.fields.size.includes(size)))
     if(outOfStockProducts?.length!==0){
      filteredProduct = filteredProduct.filter(product=>outOfStockProducts?.some(item=>product.sys.id !== item.item_id))
     }
   }

//filter options
const brands = filteredProduct.map(p=>p.fields.brand)

//filter by brand
  
   if(selectedBrand.length!==0){
    filteredProduct = filteredProduct.filter(product=>selectedBrand.some(brand=>product.fields.brand.includes(brand)))
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


// useEffect(()=>{
//   reset()
// // eslint-disable-next-line react-hooks/exhaustive-deps
// },[pathname])

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
  </div>
    );
}
