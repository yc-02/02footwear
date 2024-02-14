"use client"
import { useEffect, useState } from "react";
import { Order } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function OrderDetails({orderId}:{orderId:string}) {

  const [order, setOrder] = useState<Order>();

  useEffect(()=>{
    const fetchOrder = async()=>{
      try{
        const res = await fetch(`/api/orders/${orderId}`)
        if(res.ok){
          const data = await res.json()
          setOrder(data)
        }else{
          console.log(res.status)
        }
      }catch(error){
        console.error(error)
      }

    }
    fetchOrder()
  },[orderId])

const orderdDate= new Date(`${order?.createdAt}`)
const dateString= orderdDate.toLocaleDateString()


  return (
    <div className="flex flex-col gap-2 justify-start p-10">
      <div>
      <p><span className="font-bold">Purchased </span>{dateString}</p>
      <h1><span className="font-bold">Order Number </span>{order?._id}</h1>
      </div>
      <hr />
      <div>
        {order?.isDelivered===true?(
        <>
        Delivered
        </>):
        (<>
        Order Placed
        </>)}

      </div>
      {order?.items.map((item)=>
            <div key={item.id} className="flex gap-10 py-5">
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
      <p>{order?.shippingDetails.firstName} {order?.shippingDetails.lastName}</p>
      <p>{order?.shippingDetails.address}</p>
      <p>{order?.shippingDetails.city} {order?.shippingDetails.state} {order?.shippingDetails.zipCode}</p>
      <p>{order?.shippingDetails.email}</p>
      <p>{order?.shippingDetails.phone}</p>
      </div>
      </div>
      <hr />
      <div className="flex justify-between">
        <h1 className="font-bold">Payment Method</h1>
      <p>{order?.paymentMethod}</p>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
      <h1 className="font-bold">Summary</h1>
      <p className="flex justify-between"><span>Subtotal</span> ${order?.subTotal}</p>
      <p className="flex justify-between"><span>Shipping</span>${order?.shippingFee}</p>
      <p className="flex justify-between"><span>Total price</span>${order?.totalPrice}</p>
      </div>
     

    </div>
  )
}
