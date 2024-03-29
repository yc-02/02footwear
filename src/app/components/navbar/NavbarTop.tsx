import Link from "next/link"
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import SignoutButton from "../buttons/SignoutButton"
import NavTopHelpIcon from "./NavTopHelpIcon"

export default async function NavbarTop(){
    const cookieStore=cookies()
    const supabase = createClient(cookieStore)
    const {data:{user}}=await supabase.auth.getUser()

    return(
        <div className="hidden md:block">
        <div className="flex justify-between mx-auto text-sm py-1 px-2 bg-slate-50">
            <Link href="/">02 Footwear</Link>
            <div className="hidden md:flex gap-5 items-center">
                <NavTopHelpIcon/>
                {user?
                (<>
                <p className="">Hello,{user.user_metadata.first_name}</p>
                |
                <SignoutButton/>
                </>)
                :
                (<>
            <Link className="cursor-pointer hover:text-slate-500" href="/account/signup" >Sign up</Link>
            <Link className="cursor-pointer hover:text-slate-500" href="/account/signin">Sign in</Link>
                </>)
                    }
            </div>
        </div>
        </div>
    )
}