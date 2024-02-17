"use client"
import { Products } from "@/types";
import ProductCard from "./ProductCard"
import { useSearchParams } from "next/navigation";
import useSWR from "swr";



export default function ProductPage() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };
  const { data, error, isLoading } = 
  useSWR (search?`/api/product?search=${search}`:"/api/product", fetcher)
 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  if(data.length === 0){
    return (
      <div className="pt-10 text-center">
      <h2 className="text-4xl">Oh No!</h2>
      <p>Nothing Found.</p>
      <p className="mx-auto my-4">Maybe try again?</p>
    </div>

    )
 
  }

  const products = data as Products[]

  return (
  <div className="md:grid grid-cols-3 gap-4 bg-slate-50 p-5">
    {products.map((p)=>(
      <ProductCard key={p.sys.id} product={p}/>
    ))}
  </div>
    );
}
