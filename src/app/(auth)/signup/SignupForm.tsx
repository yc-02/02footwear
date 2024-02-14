"use client"

import Link from "next/link"
import { useFormStatus } from 'react-dom'
import { signup } from "../actions"

export default function SignupForm() {
    const { pending } = useFormStatus()
 
  return (
    <div className="flex flex-col bg-slate-50 items-center gap-5 p-7">
    <form className="flex flex-col gap-5">
      <label className="flex flex-col justify-between items-baseline">
        <span>Email:</span>
        <input
          className="border border-slate-500 p-1 rounded"
          type="email"
          name="email"
        />
      </label>
      <label  className="flex flex-col justify-between items-baseline">
        <span>Password:</span>
        <input
          type="password"
          name="password"
          required
          className="border border-slate-500 p-1 rounded"
        />
      </label>
      <label  className="flex flex-col justify-between items-baseline">
        <span>First Name:</span>
        <input
          type="text"
          name="first_name"
          required
          className="border border-slate-500 p-1 rounded"
        />
      </label>
      <label  className="flex flex-col justify-between items-baseline">
        <span>Last Name:</span>
        <input
          type="text"
          name="last_name"
          required
          className="border border-slate-500 p-1 rounded"
        />
      </label>
      <label  className="flex flex-col justify-between items-baseline">
      <span>Phone:</span>
        <input 
        type="text" 
        name="phone" 
        required
        className="border border-slate-500 p-1 rounded"
        />
      </label>
      <div className="flex justify-center">
      <button className="bg-slate-800 text-slate-50 p-1 rounded cursor-pointer w-1/2" type="submit" disabled={pending} formAction={signup} >
      {pending && <span>...</span>}
      {!pending && <span>Sign up</span>}
      </button>
      </div>
    </form>
    <div className="flex flex-col mt-4 border-t-2 border-neutral-200 pt-2 w-full items-center">
      <p>Have an account? </p>
      <Link href="/signin" className="font-bold">Sign in</Link>
    </div>
    </div>
  )
}
