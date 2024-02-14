'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/actions'


const cookieStore = cookies()
const supabase = createClient(cookieStore)


export async function login(formData: FormData) {

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    throw new Error(error.message)
  }
  revalidatePath('/', 'layout')
  redirect('/')
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
  console.log(data)
   if (error) {
     console.log(error.message)
    }
    else{
      revalidatePath('/', 'layout')
      redirect('/verify')
    } 
}
