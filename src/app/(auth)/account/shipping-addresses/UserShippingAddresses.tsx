"use client"
import useCart from '@/app/components/hooks/useCart'
import {UserShippingOption } from '@/types'
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation';




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

console.log(shipping_details)



  return (

      
      <div className='flex flex-col gap-3 md:items-center'>
      {data?.map((a)=>(
        <>
        <div key={a.id} className='md:w-3/4 p-10 flex justify-between'>
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              </button>
              </div>
          </div>
          <hr className='border border-slate-500 w-3/4 m-auto'/>
          </>
      ))}
      </div>


  )
}
