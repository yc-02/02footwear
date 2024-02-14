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
            router.push('/')
            router.refresh()
        }
    }

  return (
    <button onClick={handleSignOut} className=" hover:text-slate-500 text-sm" >Sign out</button>
  )
}