'use server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/actions'




const cookieStore = cookies()
const supabase = createClient(cookieStore)


export async function signin(formData: FormData) {

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    throw new Error(error.message)
  }
  revalidatePath('/')
}

// signup with email
export async function signup(formData: FormData) {
const cookieStore = cookies()
const supabase = createClient(cookieStore)

  const Formdata = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options:{
      data:{
      phone:formData.get('phone') as string,
      first_name:formData.get('first_name') as string,
      last_name:formData.get('last_name') as string,
      }
    }
  }
  
  const { data,error } = await supabase.auth.signUp(Formdata)
   if (error) {
     throw new Error(error.message)
    }
    else{
      revalidatePath('/', 'layout')
      redirect('/verify')
    } 
}


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