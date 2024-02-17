import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { NextRequest} from "next/server"

export async function GET(request:NextRequest,{params}:{params:{id:string}}) {
    const cookieStore =cookies()
    const supabase = createClient(cookieStore)
    const {data:{user}}=await supabase.auth.getUser()
    const {data} = await supabase.from("footwear_order_details").select().eq('id',params.id)
    if(user){
        return Response.json(data)
        
    }else{
        const searchParams = request.nextUrl.searchParams
        const email = searchParams.get("email")
        const filteredOrder = data?.filter(order => order.shipping_details && order.shipping_details.email === email);
        return Response.json(filteredOrder)
    } 
   
}

