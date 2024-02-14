import UserShippingAddress from "./UserShippingAddresses";
import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers";
import { redirect} from "next/navigation"



export default async function ShippingAddressesPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

    const {data:{user}}=await supabase.auth.getUser()
    const {data,error}=await supabase.from("delivery_address").select().eq('user_id',user?.id)
    if(!user){
      redirect('/')
    }
    if(error){
      throw new Error(error?.message)}

  return (
    <div>
      <UserShippingAddress user={user} data={data}/>
    </div>
  )
}

