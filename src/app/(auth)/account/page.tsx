
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect} from "next/navigation"
export default async function DashboardPage() {

  const cookieStore=cookies()
  const supabase = createClient(cookieStore)
  const {data:{user}}=await supabase.auth.getUser()
  if(!user){
    redirect('/')
  }

  return (
    <div className="p-10">
      <p>Hello,{user.user_metadata.first_name}</p>
    </div>
  )
}
