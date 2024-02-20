"use client"
import { useRouter} from 'next/navigation'
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
    const router = useRouter()
    const [search,setSearch]=useState("")

    function handleSubmit(e:any) {
        e.preventDefault()
        router.push(`/product?search=${search}`)
      
      }

console.log(search)
  return (
    <form onSubmit={handleSubmit}>
        <label className='flex gap-1'>
        <input 
        className='shadow border border-slate-200 p-1 rounded w-36 md:w-auto'
        type='text'
        onChange={(e)=>setSearch(e.target.value)}/>
        <button className='flex items-center'>   
        <MagnifyingGlassIcon className='w-6 h-6'/>
        </button>    
        </label>
    </form>
    )
}

