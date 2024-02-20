import Link from "next/link"
import Image from "next/image"
import icon from "@/app/components/images/icon.png"
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
//Navbar
import { NavCartIcon } from "./NavCartIcon"
import NavHam from "./NavHam"
import SearchBar from "../SearchBar"
//icons
import { UserCircleIcon,HeartIcon } from "@heroicons/react/24/outline"




export default async function NavbarSub() {

  const cookieStore=cookies()
  const supabase = createClient(cookieStore)
  const {data:{user}}=await supabase.auth.getUser()

  return (
    <div className="py-5">
      <div className="flex justify-between px-2 items-baseline">
        <div className="flex gap-10">
      <Link href="/" className="hidden md:flex"><Image src={icon} width={30} height={30} alt="icon"/></Link>
          <Link href="/product/women" className="cursor-pointer group-hover:border-b-2 border-slate-900 hidden md:flex">Women</Link>
          <Link href="/product/men" className="cursor-pointer group-hover:border-b-2 border-slate-900 hidden md:flex" >Men</Link>
          <Link href="#" className="cursor-pointer group-hover:border-b-2 border-slate-900 hidden md:flex">Sales</Link>
        <Link href="/" className="md:hidden">02 Footwear</Link>
        </div>
        <div className="flex cursor-pointer gap-5 items-center">
        {/* searchbar */}
        <div className="hidden md:block">
        <SearchBar/>
        </div>
        {/* usericon */}
        {user && 
        <Link href="/account">
        <UserCircleIcon className="w-6 h-6"/>
        </Link>
        }
        {/* likeicon */}
        <Link href='/wish-list'>
        <HeartIcon className="w-6 h-6"/>
        </Link>
        <NavCartIcon/>
        <NavHam user={user}/>
        </div>
      </div>
      <div className="md:hidden flex justify-end px-2">
      <SearchBar/>
      </div>
    </div>
  )
}
