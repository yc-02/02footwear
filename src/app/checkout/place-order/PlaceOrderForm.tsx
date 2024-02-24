"use client"
import useCart, { CartStore } from "@/app/components/hooks/useCart"
import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"



export const PlaceOrderForm =()=>{
    const router = useRouter()
    const supabase= createClient()
    const {items,sub_total,items_count,shipping_fee,total_price,shipping_details,clear}=useCart()
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
    const [disable,setDisable]=useState(false)
    useEffect(()=>{
        if(selectedPaymentMethod){
            setDisable(false)
        }
        else {
            setDisable(true)
        }
    },[selectedPaymentMethod])

console.log(items)






    const handleSubmit = async(e:FormEvent)=>{
        e.preventDefault()
        const{data:{user}}=await supabase.auth.getUser()
        const {data,error}=await supabase.from('footwear_order_details').insert(
            {
                items:Array.from(items),
                shipping_details:shipping_details,
                items_count:items_count,
                shipping_fee:shipping_fee,
                payment_method:selectedPaymentMethod,
                sub_total:sub_total,
                total_price:total_price,
                user_id:user?.id,
                email:user?.email,
                

            }).select()

            
            if(data&&data.length>0){
                items.map(async(item)=>{
                    const {error} = await supabase.from('footwear_ordered_items').insert({
                        order_id:data[0].id,
                        item_id:item.id,
                        item_brand:item.brand,
                        item_price:item.price,
                        item_gender:item.gender,
                        item_size:item.size,
                        item_size_qty:item.qty,
                        item_slug:item.slug

                    })
                if(error){
                    throw new Error(error.message)
                }
                })

            }

            if (data && data.length>0){
                const id = data[0].id
                if(user){
                    clear()
                    router.replace(`/order/${id}`)
                }else{
                    clear()
                    router.replace(`/order/${id}?email=${shipping_details.email}`)
                }
            }else{
                throw new Error(error?.message)
            }

    }

    return( 
        <div className="flex flex-col gap-5 md:items-center">
            <div className="flex flex-col gap-5 p-5">
            <p>Email: {shipping_details.email}</p>
            <hr />
            <p>Shipping: {shipping_details.firstName} {shipping_details.lastName}</p>
            <p>{shipping_details.address}</p>
            <p>{shipping_details.city},{shipping_details.state} {shipping_details.zipCode}</p>
            <hr />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">
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
            <div>
            <button className="bg-slate-800 text-slate-50 rounded-xl hover:bg-slate-600 p-1 my-5" disabled={disable}>Place Your Order</button>
            </div>
            </form>
            <div>
    </div>
        </div>
    )

}