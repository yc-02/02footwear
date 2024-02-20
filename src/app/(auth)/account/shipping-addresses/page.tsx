import UserShippingAddress from "./UserShippingAddresses";
import UserShippingAddButton from"./UserShippingAddButton"
import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers";
import { redirect} from "next/navigation"
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata:Metadata={
  title:"Shipping Addresses"
}

export default async function ShippingAddressesPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

    const {data:{user}}=await supabase.auth.getUser()
    const {data,error}= await supabase.from("footwear_delivery_address").select().order('created_at', { ascending: false }).eq('user_id',user?.id)
    if(!user){
      redirect('/')
    }
    if(error){
      throw new Error(error?.message)}



  return (
    <div>
      <p className="text-center font-bold text-xl">Shipping Addresses</p>
      <Suspense fallback={<p>Loading...</p>}>
      <UserShippingAddress user={user} data={data}/>
      </Suspense>
      <UserShippingAddButton/>
    </div>
  )
}

