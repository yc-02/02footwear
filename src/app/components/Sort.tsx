"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function Sort() {
    const router = useRouter()
    const [sort,setSort]=useState("")

    const handleSortChange = (e:any) => {
        const newSort= e.target.value
        setSort(newSort)
        router.push(`/product?sort=${newSort}`)
      }
   

    console.log(handleSortChange)
  return (
    <div>
        <select name="" id="" value={sort} onChange={handleSortChange}>
            <option value="">Featured</option>
            <option value="lowtohigh" >Price: Low to High</option>
            <option value="hightolow">Price: High to Low</option>
            <option value="newest">New Arrivals</option>
        </select>

    </div>
  )
}
