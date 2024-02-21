
import { createClient } from '@/utils/supabase/server'
import SigninForm from './SigninForm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata:Metadata={
  title:"Sign in"
}

export default async function SigninPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {data:{user}}=await supabase.auth.getUser()
  if(user){
    redirect('/')
  }
  

  return (
<div>
  <SigninForm/>
</div>
  )
}