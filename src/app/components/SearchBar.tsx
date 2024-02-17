"use client"
import { useRouter} from 'next/navigation'
import { useState } from 'react';


export default function SearchBar() {
    const router = useRouter()
    const [search,setSearch]=useState("")

    function handleSubmit(e:any) {
        e.preventDefault()
        router.push(`/product?search=${search}`)
      
      }


  return (
    <form onSubmit={handleSubmit}>
        <label className='flex gap-1'>
        <input 
        className='shadow border border-slate-200 p-1 rounded w-36 md:w-auto'
        type='text'
        onChange={(e)=>setSearch(e.target.value)}/>
        <button className='flex items-center'>   
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        </button>    
        </label>
    </form>
    )
}

