"use client"
import { useRouter} from 'next/navigation'
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import useFilter from './hooks/useFilter';

export default function SearchBar() {
    const router = useRouter()
    const [search,setSearch]=useState("")
    const {reset} = useFilter()

    function handleSubmit(e:any) {
        e.preventDefault()
        reset()
        router.push(`/product?search=${search}`)
      }

  return (
    <form onSubmit={handleSubmit}>
        <label className='flex gap-1'>
        <input 
        className='shadow border border-slate-200 p-1 rounded'
        type='text'
        value={search}
        placeholder={search}
        onChange={(e)=>setSearch(e.target.value)}/>
        <button className='flex items-center'>   
        <MagnifyingGlassIcon className='w-6 h-6'/>
        </button>    
        </label>
    </form>
    )
}

