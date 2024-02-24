"use client"
import Link from "next/link"
import Image from "next/image"
import useCart from "@/app/components/hooks/useCart"
import { TrashIcon } from "@heroicons/react/24/outline"
import { ItemStock } from "@/types"


export default function CartItems({itemStock}:{itemStock:ItemStock[]}) {
  const {items,increase,decrease,deleteItem}=useCart()
  

  
  return (
    <div>
        {items.map((item)=>
            <div key={item.id} className="flex gap-10 py-10">
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
                disabled={itemStock.some(i=>i.item_size_inventory<=item.qty)}  
                className="bg-slate-800 text-slate-50 rounded-xl hover:bg-slate-600 w-10 text-sm" >
                  +
                </button>
                </div>
                <button onClick={()=>deleteItem(item)}>
                <TrashIcon className="w-6 h-6"/>
                </button>
                </div>
                <div className="text-pink-800 text-sm">
                {itemStock.some(i=>i.item_size_inventory<=item.qty) && itemStock.map(i=>(
                  <div key={i.item_size}>
                    <p>* Only {i.item_size_inventory} left</p>
                  </div>
                ))}
                </div>
            </div>

          )}
    </div>
  )
}
