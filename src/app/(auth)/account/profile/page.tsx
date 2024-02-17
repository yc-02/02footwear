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
      <h1 className="text-center font-bold text-xl">Profile</h1>
      <ProfileForm user={user}/>
    </div>
  )
}
