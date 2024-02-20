"use client"

import { useState } from "react"
import useFilter from "../components/hooks/useFilter"
import { ChevronDownIcon,ChevronUpIcon  } from "@heroicons/react/24/outline"


export default function Filter({size}:{
    size:string[][]
    }) {
    
    const totalSize=size.flat()
    let uniqueSize = totalSize.reduce((acc :string[],curr :string)=>acc.includes(curr)?acc:[...acc,curr],[]).sort((a,b)=>parseInt(a)-parseInt(b))
    
    const {setSize,removeSize,selectedsize}=useFilter()


    const handleClick =(size:string)=>{
        if(selectedsize.includes(size)){
            removeSize(size)
        }else{
            setSize(size)
        }
    }

    const [display, setDisplay]=useState<boolean>(true)


  return (
    <div className="p-2">
        <div className="flex justify-between">
        <h1 className="font-bold"> Size </h1>
        {display === false && <ChevronDownIcon className="w-6 h-6 cursor-pointer" onClick={()=>setDisplay(!display)}/>}
        {display === true && <ChevronUpIcon className="w-6 h-6 cursor-pointer" onClick={()=>setDisplay(!display)}/>}
        </div>

        <div className={`${display?"flex":"hidden"} flex-wrap gap-3 py-2`}>
        {uniqueSize.map((s)=>(
            <div key={s}>
                <button
                className={`${selectedsize.includes(s)?"bg-slate-800 text-white":""} border border-slate-400 p-2 rounded shadow cursor-pointer` }
                onClick={()=>handleClick(s)}
                >
                {s}
                </button>
            </div>
        )
        )}
        </div>
    </div>
  )
}
