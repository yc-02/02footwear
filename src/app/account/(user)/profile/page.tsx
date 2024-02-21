import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect} from "next/navigation"
import ProfileForm from "./ProfileForm"
import { Metadata } from 'next'

export const metadata:Metadata={
  title:"Profile"
}

export default async function DashboardPage() {

  const cookieStore=cookies()
  const supabase = createClient(cookieStore)
  const {data:{user}}=await supabase.auth.getUser()
  if(!user){
    redirect('/')
  }

  return (
    <div className="">
      <ProfileForm user={user}/>
    </div>
  )
}
