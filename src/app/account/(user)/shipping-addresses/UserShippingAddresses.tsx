"use client"
import useCart from '@/app/components/hooks/useCart'
import {UserShippingOption } from '@/types'
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation';
import { TrashIcon } from '@heroicons/react/24/outline';



export default function UserShippingAddress({user,data}:{user:User,data:UserShippingOption[]|null}) {

  const {saveShippingAddress,shipping_details}=useCart()
  const router= useRouter()

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
  
  const handleDelete = async(id:string,e:any)=>{
    e.preventDefault()
    const supabase= createClient()
    const {error}= await supabase.from('footwear_delivery_address').delete().eq('id',id)
    if(error){
      throw new Error(error.message)
    }else{
      router.refresh()
    }
  }




  return (      
      <div className='flex flex-col gap-3 justify-between'>
      {data?.map((a)=>(
        <div key={a.id} className='p-10 flex gap-10 shadow'>
              <div className='flex gap-5'>
                <input
                className='cursor-pointer'
                type="radio" 
                id={a.id.toString()} 
                value={a.id}
                name='radio'
                checked={shipping_details.address===a.address && shipping_details.firstName ===a.first_name}
                onChange={()=>handleRadioChange(a)}
                />
                <label htmlFor={a.id.toString()} className='flex flex-col'>
                <span>{a.first_name} {a.last_name}</span>
                <span>{a.address}</span> 
                <span>{a.city} {a.state} {a.zip_code}</span>
                <span>{a.phone}</span>
                {shipping_details.address===a.address && shipping_details.firstName ===a.first_name && 
                <p 
                className='bg-slate-600 rounded-xl text-slate-50  text-sm text-center w-14 mt-1'>
                Default</p>}
                </label>
              </div>
              <div className='flex items-center'>
              {/* <button className='underline'>Edit</button> */}
              <button onClick={(e)=>handleDelete(a.id,e)}>
                  <TrashIcon className='h-6 w-6'/>
              </button>
              </div>
          </div>
      ))}
      </div>


  )
}
