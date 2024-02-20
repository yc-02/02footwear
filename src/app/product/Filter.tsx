"use client"

import { useState } from "react"
import useFilter from "../components/hooks/useFilter"
import {PlusIcon,MinusIcon} from "@heroicons/react/24/outline"


export default function Filter({size,brand}:{
    size:string[][]
    brand:string[]
    }) {

    const totalSize=size.flat()
    const uniqueSize = totalSize.reduce((acc :string[],curr :string)=>acc.includes(curr)?acc:[...acc,curr],[]).sort((a,b)=>parseInt(a)-parseInt(b))
    const uniqueBrand = brand.reduce((acc:string[],curr:string)=>acc.includes(curr)?acc:[...acc,curr],[]).sort()
    const {setSize,removeSize,selectedsize,selectedBrand,setBrand,removeBrand}=useFilter()


    const handleSizeClick =(size:string)=>{
        if(selectedsize.includes(size)){
            removeSize(size)
        }else{
            setSize(size)
        }
    }

    const handleBrandClick =(brand:string)=>{
        if(selectedBrand.includes(brand)){
            removeBrand(brand)
        }else{
            setBrand(brand)
        }
    }

    const [showSize, setShowSize]=useState<boolean>(false)
    const [showBrand, setShowBrand]=useState<boolean>(false)


  return (
    <div className="p-2">
        <div className="flex justify-between">
        <h1 className="font-bold"> Size </h1>
        {showSize === false && <PlusIcon className="w-6 h-6 cursor-pointer" onClick={()=>setShowSize(!showSize)}/>}
        {showSize === true && <MinusIcon className="w-6 h-6 cursor-pointer" onClick={()=>setShowSize(!showSize)}/>}
        </div>

        <div className={`${showSize?"flex":"hidden"} flex-wrap gap-3 py-2`}>
        {uniqueSize.map((s)=>(
            <div key={s}>
                <button
                className={`${selectedsize.includes(s)?"bg-slate-800 text-white":""} border border-slate-400 p-2 rounded shadow cursor-pointer` }
                onClick={()=>handleSizeClick(s)}
                >
                {s}
                </button>
            </div>
        )
        )}
        </div>
        <div className="flex justify-between mt-5">
        <h1 className="font-bold"> Brand </h1>
        {showBrand === false && <PlusIcon className="w-6 h-6 cursor-pointer" onClick={()=>setShowBrand(!showBrand)}/>}
        {showBrand === true && <MinusIcon className="w-6 h-6 cursor-pointer" onClick={()=>setShowBrand(!showBrand)}/>}
        </div>
        <div className={`${showBrand?"flex":"hidden"} flex-wrap gap-3 py-2`}>
        {uniqueBrand.map((b)=>(
            <div key={b}>
                <button
                className={`${selectedBrand.includes(b)?"bg-slate-800 text-white":""} border border-slate-400 p-2 rounded shadow cursor-pointer` }
                onClick={()=>handleBrandClick(b)}
                >
                {b}
                </button>
            </div>
        )
        )}
        </div>
    </div>
  )
}
