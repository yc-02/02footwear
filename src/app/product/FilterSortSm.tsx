import { AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import Filter from "./Filter"
import FilterRemoveButtons from "./FilterRemoveButtons"


AdjustmentsHorizontalIcon

export default function FilterSortSm({size,brand}:{
  size:string[][]
  brand:string[]
}) {
const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <div className="md:hidden">
          {isPopoverOpen&&
          <div className="bg-white h-screen w-screen p-10 flex flex-col md:hidden">
          <button
            onClick={()=>setIsPopoverOpen(!isPopoverOpen)}
            className='flex justify-end py-5 px-3'
            >
           <XMarkIcon className='w-6 h-6 hover:bg-slate-200 rounded-full'/>
          </button>
          <FilterRemoveButtons/>
          <hr />
          <Filter size={size} brand={brand}/>
          <hr />
          <div className="flex justify-center mt-20">
          <button className="bg-slate-800 text-white p-2 rounded" onClick={()=>setIsPopoverOpen(false)}>SHOW RESULTS</button>
          </div>
        </div>}

      <button 
      onClick={() => setIsPopoverOpen(!isPopoverOpen)} 
      className="flex gap-3 justify-center">
          <AdjustmentsHorizontalIcon className="w-6 h-6"/> Filter & Sort
      </button>
      </div>
  )
}
