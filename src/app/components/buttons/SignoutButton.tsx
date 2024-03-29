"use client"
import { useRouter} from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function SignoutButton() {

    const router=useRouter()
    const supabase=createClient()
    const handleSignOut=async()=>{
        const{error} = await supabase.auth.signOut()
        if (error){
          throw new Error(error.message)
        }else{
            router.refresh()
            
        }
    }

  return (
    <button onClick={handleSignOut} className="text-sm p-1 hover:bg-slate-100 rounded" >Sign out</button>
  )
}