"use client"

import { usePathname, useRouter} from "next/navigation"
export default function Sort({search}:{search:string|undefined}) {
    const router = useRouter()
    const pathname = usePathname()
    
    const handleSortChange = (term:string) => {
      if(search){
        router.replace(`${pathname}?search=${search}&sort=${term.toString()}`)
      }else{
        router.replace(`${pathname}?sort=${term.toString()}`)
      }
      }


  return (
    <div>
        <select 
        className=""
         onChange={(e)=>handleSortChange(e.target.value)}>
            <option value="" >Featured</option>
            <option value="lowtohigh" >Price: Low to High</option>
            <option value="hightolow">Price: High to Low</option>
            <option value="newest">New Arrivals</option>
        </select>

    </div>
  )
}
