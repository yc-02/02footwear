"use client"
import useCart from '@/app/components/hooks/useCart'
import {UserShippingOption } from '@/types'
import { User } from '@supabase/supabase-js'



export default function UserShippingAddress({user,data}:{user:User,data:UserShippingOption[]|null}) {

  const {saveShippingAddress,shipping_details}=useCart()


  const handleRadioChange=(item:UserShippingOption)=>{
    saveShippingAddress({
      firstName:item.first_name,
      lastName:item.last_name,
      address:item.address,
      city:item.city,
      state:item.state,
      zipCode:item.zip_code,
      email:user?.email,
      phone:item.phone,
      userId:user?.id
    })
  }

  
  return (

      
      <div className='flex flex-col gap-3 md:items-center'>
      {data?.map((a)=>(
        <div key={a.id} className='bg-slate-50 md:w-3/4 p-10'>
              <div className='flex gap-5'>
                <input
                className='cursor-pointer'
                type="radio" 
                id={a.id.toString()} 
                value={a.id}
                name='address'
                onChange={()=>handleRadioChange(a)}
                />
                <label htmlFor={a.id.toString()} className='flex flex-col'>
                <span>{a.first_name} {a.last_name}</span>
                <span>{a.address}</span> 
                <span>{a.city} {a.state} {a.zip_code}</span>
                <span>{a.phone}</span>
                </label>
              </div>
          </div>
      ))}
      </div>


  )
}
