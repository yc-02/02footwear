"use client"
import useFilter from "../components/hooks/useFilter"
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function FilterRemoveButtons() {
    const {removeSize,selectedsize,selectedBrand,removeBrand}=useFilter()

  return (
    <div className="flex gap-3 mb-2">
        {selectedsize.map((s:string)=>(
            <div key={s} className="">
                <button 
                onClick={()=>removeSize(s)}
                className="border border-slate-400 p-1 rounded flex items-center"
                >{s}<XMarkIcon className="h-4 w-4"/>
                </button>
            </div>
        ))}
        {selectedBrand.map((s:string)=>(
            <div key={s} className="">
                <button 
                onClick={()=>removeBrand(s)}
                className="border border-slate-400 p-1 rounded flex items-center"
                >{s}<XMarkIcon className="h-4 w-4"/>
                </button>
            </div>
        ))}
    </div>
  )
}
