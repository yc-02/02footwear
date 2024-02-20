"use client"
import { Popover } from 'react-tiny-popover'
import { AddUserAdress } from '../../actions';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';



export default function UserShippingAddButton() {
const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
  <div>
    <Popover
      isOpen={isPopoverOpen}
      onClickOutside={() => setIsPopoverOpen(false)}
      transform={{top:10}}
      transformMode='relative'
      content={
    <div>
      <div className="flex flex-col gap-5 bg-slate-50 rounded text-start py-5 px-10">
        <button
          onClick={()=>setIsPopoverOpen(!isPopoverOpen)}
          className='flex justify-end'
          >
         <XMarkIcon className='w-6 h-6'/>
        </button>

        <form action="" className='grid grid-cols-2 gap-5' onSubmit={()=>setIsPopoverOpen(!isPopoverOpen)} >

        <label htmlFor="" className='flex flex-col'>
          First Name
          <input type="text" name='first_name' className='border border-slate-200 p-1 rounded '/>
        </label>
        <label htmlFor="" className='flex flex-col'>
          Last Name
          <input type="text" name='last_name' className='border border-slate-200 p-1 rounded '/>
        </label>
 
        <label htmlFor="" className='flex flex-col col-span-2'>
          Address
          <input type="text" name='address' className='border border-slate-200 p-1 rounded '/>
        </label>
        <label htmlFor="" className='flex flex-col'>
          City
          <input type="text" name='city' className='border border-slate-200 p-1 rounded '/>
        </label>
        <label htmlFor="" className='flex flex-col'>
          State
          <input type="text" name='state' className='border border-slate-200 p-1 rounded '/>
        </label>
        <label htmlFor="" className='flex flex-col'>
          ZIP code
          <input type="text" name='zip_code' className='border border-slate-200 p-1 rounded '/>
        </label>
        <label htmlFor="" className='flex flex-col'>
          Phone
          <input type="text" name='phone' className='border border-slate-200 p-1 rounded '/>
        </label>
        <div className='flex justify-center col-span-2'>
        <button formAction={AddUserAdress} className='bg-slate-800 text-white w-1/2 rounded-xl p-1 col-span-2'>save</button>
        </div>
        </form>
      </div>
    </div>}
    >
      <div className='flex justify-center'>
      <button onClick={() => setIsPopoverOpen(!isPopoverOpen)} className='underline hover:text-slate-500'>
        Add a shipping Address
      </button>
      </div>
    </Popover>

  </div>

  )
}
