"use client"
import { createClient } from "@/utils/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useState } from "react"

export default function UpdatePasswordpage() {
  const supabase = createClient()
  const router=useRouter()
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")

  const searchParams=useSearchParams()
  const redirect = searchParams.get('redirect')

  const handleSubmit=async(e:FormEvent)=>{
    e.preventDefault()
    const { error } = await supabase.auth.updateUser(
           {password:password}
      )
      if (error){
        setError(error.message)
      }else{
        router.replace('/account/update-password?redirect=redirect')
      }
}
if(redirect && redirect ==="redirect"){
  return (
    <div className='flex flex-col p-10 gap-5'>
    <p>Your password has been reset successfully.</p>
    </div>
  )
}

  return (
    <div className='flex flex-col gap-5 p-10'>
    <p className='font-bold'>Set a new password</p>
    <p>Enter your new password </p>
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-1/2'>
    <input
    onChange={(e)=>setPassword(e.target.value)} 
    type="password" placeholder='Password' required
    className='p-1 border border-slate-500 w-72 rounded'/>
    <button className='p-1 bg-slate-800 text-white rounded text-center w-48 text-nowrap'>Reset Password</button>
    </form>
    {error&& <p className='text-pink-800'>{error}</p>}
   </div>
  )
}