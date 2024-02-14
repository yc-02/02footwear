"use client"
import useCart from '@/app/components/hooks/useCart'
import { AuthAddress } from '@/types'
import { User } from '@supabase/supabase-js'



export default function UserShippingAddress({user,data}:{user:User,data:AuthAddress[]}) {

  const {saveShippingAddress,shippingDetails}=useCart()


  const handleRadioChange=(item:AuthAddress)=>{
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




console.log(shippingDetails)
    
  
  return (
    <div className='p-5'>
      <p className='font-bold pb-10'>Shipping addresses</p>
      <div className='bg-slate-50 p-5'>
      {data?.map((a)=>(
        <div key={a.id}>
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
              <hr />
          </div>
      ))}
      </div>

    </div>
  )
}
