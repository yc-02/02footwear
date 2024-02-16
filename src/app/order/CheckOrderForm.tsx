"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";


 export default function CheckOrderForm() {
  const router = useRouter()
  const [orderId,setOrderId]=useState("")
  const [email,setEmail]=useState("")

      function handleSubmit(e:any) {
        e.preventDefault()
        router.push(`/order/${orderId}?email=${email}`)
      
      }


  return (
    <div  className='flex justify-center p-7 bg-slate-50'>
        <form onSubmit={handleSubmit} className="flex flex-col items-start gap-2">
          <label htmlFor="orderId"> Order Number</label>
          <input
          className="border border-slate-500 p-1 rounded"
          type="text"
          id="orderId"
          value={orderId}
          required
          onChange={(e)=>setOrderId(e.target.value)}
        />
          <label htmlFor="email">Email</label>
          <input
          className="border border-slate-500 p-1 rounded"
          type="email"
          id="email"
          value={email}
          required
          onChange={(e)=>setEmail(e.target.value)}
        />
        <button type="submit" className="bg-slate-800 text-slate-50 p-1 rounded cursor-pointer">Check</button>
        </form>
    </div>
  )
}
