"use client"
import { useState } from "react"
import Image from "next/image"
import { ImageProps} from "@/types"
import { ChevronLeftIcon,ChevronRightIcon } from "@heroicons/react/24/outline"


export default function ImageSlider({image}:ImageProps) {

    const [imageIndex,setImageindex]=useState(0)
    function showPrevImage(){
        setImageindex(index=>{
            if(index === 0){
                return image.length-1
            }else{
                return index-1
            }
        })}
    function showNextImage(){
        setImageindex(index=>{
            if (index === image.length-1){
                return 0
            }else{
                return index+1
            }
        })
    }

        
  return (
    <div className="flex flex-col md:flex-row gap-2">
        <div className="hidden md:flex flex-col gap-2 w-full h-full">
        {image.map((item,index)=>
        <Image className="rounded-md cursor-pointer object-cover" src={'http:'+item.url} width={item.details.image.width} height={item.details.image.height} alt="" key={index} onClick={()=>setImageindex(index)}/>
        )}
        </div>
        <div className="relative">
        <Image className="rounded-md" src={'http:'+image[imageIndex].url} width={image[imageIndex].details.image.width} height={image[imageIndex].details.image.height} alt=""/>
            <div className="absolute bottom-0 right-1">
            <button className="p-2" onClick={showPrevImage}>
            <ChevronLeftIcon className="w-6 h-6 bg-slate-50 rounded-full"/>
            </button>
            <button className="p-2" onClick={showNextImage}>
            <ChevronRightIcon className="w-6 h-6 bg-slate-50 rounded-full"/>
            </button>
            </div>
        </div>
    </div>
    
  )
}
