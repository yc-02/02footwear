import React from 'react'
import Purchased from './Purchased'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata:Metadata={
  title:"Purchase History"
}

export default async function PurchasedPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {data:{user}}= await supabase.auth.getUser()
  const {data,error}=await supabase.from('footwear_order_details').select().eq('user_id',user?.id).order('created_at', { ascending: false })

  if(!user){
    redirect('/')
  }
  if(error){
    throw new Error(error.message)
  }

  if(data.length===0){
    return(
      <div>
        <p className='text-center'>No Purchases</p>
      </div>
    )
  }
  return (
    <div>
      <h1 className="text-center font-bold text-xl">Purchase History</h1>
      <Purchased data={data}/>
    </div>
  )
}
