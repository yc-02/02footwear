"use client"

import { Order } from '@/types'
import Link from 'next/link'


export default function Purchased({data}:{data:Order[]|null}) {



 
  return (
    <div className='flex flex-col gap-3'>
    
        {data?.map((o)=>(
            <div key={o.id} className='flex flex-col md:flex-row justify-between md:w-3/4 bg-slate-50 p-10'>
              <div>
              <p>Status: {o.is_delivered}</p>
              <p>Total Items: {o.items_count}</p>
              <p>Order {o.id}</p>
                <p>Date {new Date(o.created_at).toLocaleDateString()}</p>
              </div>
              <div className='flex items-center'>
              <Link href={`/order/${o.id}`} className='bg-slate-800 text-slate-50 rounded-lg p-1 text-center'>
                  Purchase Detials
                </Link>
              </div>
            </div>
        ))}
      
    </div>
  )
}
