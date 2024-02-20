"use client"
import Image from "next/image"
import useCart from "@/app/components/hooks/useCart"
import Link from "next/link"


export const CheckoutItems = () => {
    const {items,sub_total,shipping_fee,total_price}=useCart()
  return (
    <div>
        {items.map((item)=>
            <div key={item.size} className="flex gap-10 py-10">
                <Link href={'/product/'+item.slug}>
                <Image src={'http:'+item.image} 
                width={100}
                height={100}
                alt={item.name}/>
                </Link>
                <div className="flex flex-col justify-between text-left">
                <p className="font-bold">{item.name}</p>
                <p>Size: {item.size}</p>
                <div className="flex gap-3">
                <p>QTY: {item.qty}</p>
                <p>${item.price*item.qty}</p>
                </div>
                </div>
            </div>
          )}
            <div className="flex flex-col gap-2">
              <hr />
            <h1 className="flex justify-between">Subtotal: <span>${sub_total}</span></h1>
            <p className="flex justify-between">Shipping & Handlings: <span>${shipping_fee}</span></p>
            <hr />
            <p className="flex justify-between">Order Total <span>${total_price}</span></p>
            </div>
    </div>
  )
}

