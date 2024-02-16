import Link from "next/link"
import Image from "next/image"
import icon from "@/app/components/images/icon.png"
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
//Navbar
import { NavCartIcon } from "./NavCartIcon"
import NavHam from "./NavHam"





export default async function NavbarSub() {

  const cookieStore=cookies()
  const supabase = createClient(cookieStore)
  const {data:{user}}=await supabase.auth.getUser()

  return (
    <div className="py-5">
      <div className="flex justify-between px-2">
        <div className="flex gap-10">
      <Link href="/" className="hidden md:flex"><Image src={icon} width={30} height={30} alt="icon"/></Link>
          <Link href="/product" className="cursor-pointer group-hover:border-b-2 border-slate-900 hidden md:flex">Women</Link>
          <Link href="/product" className="cursor-pointer group-hover:border-b-2 border-slate-900 hidden md:flex" >Men</Link>
          <Link href="/product" className="cursor-pointer group-hover:border-b-2 border-slate-900 hidden md:flex">Sales</Link>
        <Link href="/" className="md:hidden">02 Footwear</Link>
        </div>
        <div className="flex cursor-pointer gap-5" id="burger">
        {/* usericon */}
        {user && 
        <Link href="/account">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        </Link>
        }
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        {/* likeicon */}
        <Link href='/wish-list'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        </Link>
        <NavCartIcon/>
        <NavHam user={user}/>
        </div>
      </div>
    </div>
  )
}
