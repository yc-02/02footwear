"use client"
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { FormEvent,useState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'

export default function SigninForm() {
  const supabase = createClient()
  const router = useRouter()
  const { pending } = useFormStatus()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")


const handleSubmit = async(e:FormEvent)=> {
  e.preventDefault()
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  if (error) {
    setError(error.message)
  }else{
    router.push('/')
    router.refresh()
  }
  
}



  return (
    <div className='flex flex-col items-center gap-5 p-7 bg-slate-50'>
    <form className='flex flex-col items-start gap-2' onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input 
      className="border border-slate-500 p-1 rounded"
      id="email" 
      name="email" 
      type="email" 
      onChange={(e)=>setEmail(e.target.value)}
      required />
      <label htmlFor="password">Password:</label>
      <input
      onChange={(e)=>setPassword(e.target.value)} 
      className="border border-slate-500 p-1 rounded" 
      id="password" name="password" type="password" 
      required />
      <button className="bg-slate-800 text-slate-50 p-1 rounded cursor-pointer" type="submit" disabled={pending}>
      {pending && <span>...</span>}
      {!pending && <span>Sign in</span>}
  </button>
  {error && <p className='text-pink-800'>{error}</p>}
    </form>
    <div className='hover:underline text-slate-700'>
      <Link href='/account/forgot-password'>
      <p>Forgot password?</p>
      </Link>
    </div>
    </div>
  )
}
