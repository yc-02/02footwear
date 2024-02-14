import Link from "next/link"
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import SignoutButton from "./buttons/SignoutButton"

export default async function NavbarTop(){
    const cookieStore=cookies()
    const supabase = createClient(cookieStore)
    const {data:{user}}=await supabase.auth.getUser()

    return(
        <div className="hidden md:block">
        <div className="flex justify-between mx-auto text-sm py-1 px-2 bg-slate-50">
            <Link href="/">02 Footwear</Link>
            <div className="hidden md:flex gap-5 items-center">
                {user?
                (<>
                <p className="">Hello,{user.user_metadata.first_name}</p>
                |
                <SignoutButton/>
                </>)
                :
                (<>
            <Link className="cursor-pointer hover:text-slate-500" href="/signup" >Sign up</Link>
            <Link className="cursor-pointer hover:text-slate-500" href="/signin">Sign in</Link>
                </>)
                    }
            </div>
        </div>
        </div>
    )
}