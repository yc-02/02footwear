"use client"
import { useState } from "react"
import Image from "next/image"

type ImageSliderProps ={
    imageUrls:string[]
}
export default function ImageSlider({imageUrls}:ImageSliderProps) {

    const [imageIndex,setImageindex]=useState(0)
    function showPrevImage(){
        setImageindex(index=>{
            if(index === 0){
                return imageUrls.length-1
            }else{
                return index-1
            }
        })}
    function showNextImage(){
        setImageindex(index=>{
            if (index === imageUrls.length-1){
                return 0
            }else{
                return index+1
            }
        })
    }

        
  return (
    <div className="flex flex-col md:flex-row gap-2">
        <div className="hidden md:flex flex-col gap-2">
        {imageUrls.map((image,index)=>
        <Image className="w-16 h-16 rounded-md cursor-pointer" src={'http:'+image} width={500} height={500} alt="" key={index} onClick={()=>setImageindex(index)}/>
        )}
        </div>
        <div className="relative w-screen md:w-full">
        <Image className="object-cover rounded-md w-96 h-96" src={'http:'+imageUrls[imageIndex]} width={500} height={500} alt=""/>
            <div className="absolute bottom-0 right-1">
            <button className="p-2" onClick={showPrevImage}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-slate-50 rounded-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            </button>
            <button className="p-2" onClick={showNextImage}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-slate-50 rounded-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            </button>
            </div>
        </div>
    </div>
    
  )
}
