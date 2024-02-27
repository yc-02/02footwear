"use client"
import Link from "next/link"
import Image from "next/image"
import useCart from "@/app/components/hooks/useCart"
import { TrashIcon } from "@heroicons/react/24/outline"
import { ItemStock } from "@/types"



export default function CartItems({data}:{data:ItemStock[]|null}) {
  const {items,increase,decrease,deleteItem}=useCart()

 const inventory = data?.filter(i=>items.some(item=>item.id === i.item_id && item.size === i.item_size))

  return (
    <div>
        {items.map((item)=>
        <>
            <div key={item.id+item.size} className="flex gap-10 py-10">
                <Link href={'/product/'+item.slug}>
                <Image src={'http:'+item.image} 
                width={150}
                height={150}
                alt={item.name}/>
                </Link>
                <div className="flex flex-col justify-between">
                <p className="font-bold">{item.name}</p>
                <p>{item.gender}</p>
                <p>Size: {item.size}</p>
                <p>${item.price*item.qty}</p>
                <div>
                <button onClick={()=>decrease(item)} className="bg-slate-800 text-slate-50 rounded-xl hover:bg-slate-600 w-10 text-sm" >
                  -
                </button>
                <span className="p-2">{item.qty}</span>
                <button onClick={()=>increase(item)}
                className="bg-slate-800 text-slate-50 rounded-xl hover:bg-slate-600 w-10 text-sm" >
                  +
                </button>
                </div>
                <button onClick={()=>deleteItem(item)}>
                <TrashIcon className="w-6 h-6"/>
                </button>
                </div>
            </div>
            {inventory?.map(i=>(i.item_id ===item.id && i.item_size ===item.size && i.item_size_inventory<item.qty&&
              (<div key={i.id}>
              <p className="text-sm text-pink-800 py-2">There are not enough products in stock, only {i.item_size_inventory} left.</p>
              </div>)))}
              </>
          )}
    </div>
  )
}
