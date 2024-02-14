
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect} from "next/navigation"
import ProfileForm from "./ProfileForm"

export default async function DashboardPage() {

  const cookieStore=cookies()
  const supabase = createClient(cookieStore)
  const {data:{user}}=await supabase.auth.getUser()
  if(!user){
    redirect('/')
  }

  return (
    <div className="p-10 flex flex-col gap-5 w-3/4 bg-slate-50">
      <h1 className='text-xl font-bold'>Profile</h1>
      <ProfileForm user={user}/>
    </div>
  )
}
