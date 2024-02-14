"use client"
import { useEffect, useState } from "react";
import { Order } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function OrderDetails({orderId}:{orderId:string}) {

  const [order, setOrder] = useState<Order>();

  useEffect(()=>{
    const getData = async()=>{
      const supabase = createClient()
      const {data,error}=await supabase.from("delivery_details").select().eq('id',orderId).single()
      if(!data){
        throw new Error(error?.message)
      }else{
        setOrder(data)
      }
    }
   getData()
    },[orderId])
 

const orderdDate= new Date(`${order?.created_at}`)
const dateString= orderdDate.toLocaleDateString()


  return (
    <div className="flex flex-col gap-2 justify-start p-10">
      <div>
      <p><span className="font-bold">Purchased </span>{dateString}</p>
      <h1><span className="font-bold">Order Number </span>{order?.id}</h1>
      </div>
      <hr />
      <div>
        {order?.is_delivered===true?(
        <>
        Delivered
        </>):
        (<>
        Order Placed
        </>)}

      </div>
      {order?.items.map((item)=>
            <div key={item.size} className="flex gap-10 py-5">
                <Link href={'/product/'+item.slug}>
                <Image src={'http:'+item.image} 
                width={100}
                height={100}
                alt={item.name}/>
                </Link>
                <div className="flex flex-col justify-between text-left">
                <p className="font-bold">{item.name}</p>
                <p>{item.size}</p>
                <p>QTY: {item.qty}</p>
                <p>${item.price}</p>
                </div>
            </div>
          )}
       <hr />
      <div className="flex justify-between"> 
      <h1 className="font-bold">Shipping</h1>
      <div>
      <p>{order?.shipping_details.firstName} {order?.shipping_details.lastName}</p>
      <p>{order?.shipping_details.address}</p>
      <p>{order?.shipping_details.city} {order?.shipping_details.state} {order?.shipping_details.zipCode}</p>
      <p>{order?.shipping_details.email}</p>
      <p>{order?.shipping_details.phone}</p>
      </div>
      </div>
      <hr />
      <div className="flex justify-between">
        <h1 className="font-bold">Payment Method</h1>
      <p>{order?.payment_method}</p>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
      <h1 className="font-bold">Summary</h1>
      <p className="flex justify-between"><span>Subtotal</span> ${order?.sub_total}</p>
      <p className="flex justify-between"><span>Shipping</span>${order?.shipping_fee}</p>
      <p className="flex justify-between"><span>Total price</span>${order?.total_price}</p>
      </div>
     

    </div>
  )
}