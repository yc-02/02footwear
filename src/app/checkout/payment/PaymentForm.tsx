"use client"
import CheckoutSteps from "@/app/components/CheckoutSteps"
import useCart from "@/app/components/hooks/useCart"
import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"


export const PaymentForm =()=>{
    const router = useRouter()
    const {guestShipping,savePaymentMethod,paymentMethod}=useCart()
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
    const [disable,setDisable]=useState(false)


    const handleSubmit=(e:FormEvent)=>{
        e.preventDefault()
        savePaymentMethod(selectedPaymentMethod)
        router.push('/checkout/placeorder')
    }


    
    return( 
        <div className="flex flex-col gap-5 md:items-center ">
            <div className="flex flex-col gap-5">
            <p>Email: {guestShipping.email}</p>
            <hr />
            <p>Shipping: {guestShipping.firstName} {guestShipping.lastName}</p>
            <p>{guestShipping.address}</p>
            <p>{guestShipping.city},{guestShipping.state} {guestShipping.zipCode}</p>
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
            <button className="bg-slate-800 text-slate-50 rounded-xl hover:bg-slate-600 p-1 my-5">Place Your Order</button>
            </form>
        </div>
    )

}