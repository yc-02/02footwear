
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

  
  return (
    <CartDetails/>
  )
}
