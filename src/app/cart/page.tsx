
import { Metadata } from 'next'
import CartDetails from './CartDetails'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'


export const metadata:Metadata={
    title:"Cart"
}

export default async function CartPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {data,error}= await supabase.from('footwear_items_stock').select()
  if(error){
    throw new Error(error.message)
  }
  
  return (
    <CartDetails data={data}/>
  )
}
