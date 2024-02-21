'use server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/actions'




const cookieStore = cookies()
const supabase = createClient(cookieStore)



export async function AddUserAdress(formData:FormData) {
  const address =Object.fromEntries(formData)
  const {data:{user}}= await supabase.auth.getUser()
  const {error}= await supabase.from('footwear_delivery_address').insert({
    address:address.address,
    city:address.city,
    first_name:address.first_name,
    last_name:address.last_name,
    phone:address.phone,
    state: address.state,
    user_id:user?.id,
    zip_code:address.zip_code,
  })
  if (error){
    throw new Error(error.message)
  }else{
    revalidatePath('/')
  }
  
}