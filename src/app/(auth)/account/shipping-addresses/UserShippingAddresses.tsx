"use client"
import useCart from '@/app/components/hooks/useCart'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { useRouter} from "next/navigation"
import { useEffect, useState } from 'react'

type AuthAddress = {
address:string
city:string
first_name: string
id:number
last_name:string
phone:string
state:string
user_id:string
zip_code:number
}



export default function UserShippingAddress() {
  const router= useRouter()
  const {saveShippingAddress,shippingDetails}=useCart()
  const supabase = createClient()

  const getData=async()=>{    
    const {data:{user}}=await supabase.auth.getUser()
    const {data,error}=await supabase.from("delivery_address").select()
    if(!user){
      router.push('/')
    }
    if(error){
      throw new Error(error?.message)}
    if(user){
        setData(data)
        setUser(user)
    }
  }
  useEffect(()=>{
    getData()
},[])

  const [user,setUser]=useState<User>()
  const [data,setData]=useState<AuthAddress[]>()
  const [seletctedItem,setSelectedItem]=useState<AuthAddress>()

  const handleRadioChange=(item:AuthAddress)=>{
    setSelectedItem(item)
  }

 useEffect(()=>{
  saveShippingAddress(shippingAddress)
 },[])
 


 const shippingAddress = {
    firstName:seletctedItem?.first_name,
    lastName:seletctedItem?.last_name,
    address:seletctedItem?.address,
    city:seletctedItem?.city,
    state:seletctedItem?.state,
    zipCode:seletctedItem?.zip_code,
    email:user?.email,
    phone:seletctedItem?.phone,
    userId:user?.id
  }

console.log(shippingDetails)
    
  
  return (
    <div className='p-10'>
      <div className='bg-slate-50 p-5'>
      <p className='font-bold pb-10'>Shipping addresses</p>
      {data?.map((a)=>(
              <div className='flex gap-5' key={a.id}>
                <input
                className='cursor-pointer'
                type="radio" 
                id={a.id.toString()} 
                value={a.id}
                checked={seletctedItem===a}
                onChange={()=>handleRadioChange(a)}
                />
                <label htmlFor={a.id.toString()} className='flex flex-col'>
                <span>{a.first_name} {a.last_name}</span>
                <span>{a.address}</span> 
                <span>{a.city} {a.state} {a.zip_code}</span>
                <span>{a.phone}</span>
                </label>
              </div>
      ))}
      <hr />
      </div>

    </div>
  )
}
