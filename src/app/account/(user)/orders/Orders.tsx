"use client"
import { Order } from '@/types'
import Image from 'next/image'
import Link from 'next/link'


export default function Orders({data}:{data:Order[]|null}) {
 
  return (
    <div className='flex flex-col gap-3'>   
        {data?.map((o)=>(
            <div key={o.id} className='flex flex-col md:grid grid-cols-3 gap-5 p-10 items-center'>
              <Image src={"http:"+o.items[0].image} height={200} width={200} alt={o.items[0].name}/>
              <div className='flex flex-col justify-between'>
              <p>Status: {o.is_delivered}</p>
              <p>Total Items: {o.items_count}</p>
                <p>Date {new Date(o.created_at).toLocaleDateString()}</p>
              </div>
              <div className='flex items-center'>
              <Link href={`/order/${o.id}`} className='bg-slate-800 text-slate-50 rounded-lg p-1 text-center'>
                  Purchase Details
                </Link>
              </div>
            </div>
        ))}
      
    </div>
  )
}
