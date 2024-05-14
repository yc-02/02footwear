import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { Metadata } from "next"
import FetchOrder from "./FetchOrder"
import { Order } from "@/types"
import { Suspense } from "react"
import Loading from "@/app/loading"


export const metadata:Metadata={
    title:"Order Details"
  }

export default async function page({params}:{params:{id:string}}) {
    const cookieStore =cookies()
    const supabase = createClient(cookieStore)
    const {data:{user}}=await supabase.auth.getUser()
    const {data} = await supabase.from("footwear_order_details").select().eq('id',params.id)
    const order = data as Order[]

  
    return(
        <Suspense fallback={<Loading/>}>
        <FetchOrder data={order} user={user}/>
        </Suspense>
    )
   
}
