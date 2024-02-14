"use client"
import { login } from '@/app/(auth)/actions'
import { useFormStatus } from 'react-dom'

export default function SigninForm() {
   const { pending } = useFormStatus()
 
  return (
    <div className='flex justify-center p-7 bg-slate-50'>
    <form className='flex flex-col items-start gap-2'>
      <label htmlFor="email">Email:</label>
      <input className="border border-slate-500 p-1 rounded"id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input className="border border-slate-500 p-1 rounded" id="password" name="password" type="password" required />
      <button className="bg-slate-800 text-slate-50 p-1 rounded cursor-pointer" type="submit" disabled={pending} formAction={login}>
      {pending && <span>...</span>}
      {!pending && <span>Sign in</span>}
  </button>
    </form>
    </div>
  )
}
