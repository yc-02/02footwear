"use client"
import useCart from "@/app/components/hooks/useCart"
import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"



export const PlaceOrderForm =()=>{
    const router = useRouter()
    const {clear,items,subTotal,shippingFee,totalPrice,shippingDetails}=useCart()
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
    const [disable,setDisable]=useState(false)
    useEffect(()=>{
        if(selectedPaymentMethod){
            setDisable(false)
        }else {
            setDisable(true)
        }
    },[selectedPaymentMethod])

    const handleSubmit = async(e:FormEvent)=>{
        e.preventDefault()
        const res = await fetch(`${location.origin}/api/orders`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                items,
                shippingDetails,
                paymentMethod:selectedPaymentMethod,
                subTotal,
                shippingFee,
                totalPrice,
            })
        })
        const data = await res.json()
        if(res.ok){
            router.push(`/order/${data.orderId}`)
            clear()
        }else{
            console.log(res.status)
        }
    }

    return( 
        <div className="flex flex-col gap-5 md:items-center ">
            <div className="flex flex-col gap-5">
            <p>Email: {shippingDetails.email}</p>
            <hr />
            <p>Shipping: {shippingDetails.firstName} {shippingDetails.lastName}</p>
            <p>{shippingDetails.address}</p>
            <p>{shippingDetails.city},{shippingDetails.state} {shippingDetails.zipCode}</p>
            <hr />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="flex gap-2">
            <input 
            type="radio" 
            value="card" 
            checked={selectedPaymentMethod === "card"}
            onChange={()=>setSelectedPaymentMethod("card")}/>
            Pay with Card
            </label>
            <label className="flex gap-2">
            <input 
            type="radio"
            value="card" 
            checked={selectedPaymentMethod === "applePay"}
            onChange={()=>setSelectedPaymentMethod("applePay")}
             />
             Apple Pay
            </label>
            <button className="bg-slate-800 text-slate-50 rounded-xl hover:bg-slate-600 p-1 my-5" disabled={disable}>Place Your Order</button>
            </form>
        </div>
    )

}