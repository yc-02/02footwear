import WishList from '@/app/wish-list/WishList'
import { createClient } from '@/utils/supabase/server'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata:Metadata={
  title:"Wish List"
}

export default async function AccountWishListPage() {
  const cookieStore =cookies()
  const supabase = createClient(cookieStore)
  const {data:{user}} = await supabase.auth.getUser()
    if(!user){
      redirect('/')
    }

  return (
    <div>
        <WishList/>
    </div>
  )
}
