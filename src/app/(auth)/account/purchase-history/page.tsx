import React from 'react'
import Purchased from './Purchased'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function PurchasedPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {data:{user}}= await supabase.auth.getUser()
  const {data,error}=await supabase.from('delivery_details').select().eq('user_id',user?.id)

  if(!user){
    redirect('/')
  }
  if(error){
    throw new Error(error.message)
  }

  return (
    <div>
      <Purchased data={data}/>
    </div>
  )
}
