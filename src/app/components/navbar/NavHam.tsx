"use client"
import Link from "next/link"
import { useState} from "react"
import SignoutButton from "../buttons/SignoutButton"
import { User } from "@supabase/supabase-js"
import { Bars3Icon,XMarkIcon } from "@heroicons/react/24/outline"


export default function NavHamAuth({user}:{user:User|null}) {
    const [open,setOpen]=useState(false)

    const toggle =()=>{
        setOpen(!open)
    }
  

  
  return (
    <>
    <Bars3Icon onClick={toggle} className="w-6 h-6 md:hidden"/>
    <div className="md:hidden">
              {/* small screen hamburger menu items */}
      <div className={`navbarSmall ${open?"grid":"hidden"}`}>
        <div className="navbarSmallContent">
          <div onClick={toggle} className="w-full flex justify-end cursor-pointer">
          <XMarkIcon className="w-6 h-6 m-6"/>
          </div>
            <div className="flex flex-col items-start gap-5">
            <Link href="/product/women" className="cursor-pointer hover:text-slate-500" onClick={toggle}>Women</Link>
            <Link href="/product/men" className="cursor-pointer hover:text-slate-500" onClick={toggle}>Men</Link>
            <Link href="#" className="cursor-pointer hover:text-slate-500" onClick={toggle}>Sales</Link>
            </div>
            <br />
            <div className="flex flex-col items-start gap-2">
            <Link href="/order" onClick={toggle} className="text-sm hover:bg-slate-100 p-1 rounded">Order status</Link>
            {user ? <div onClick={toggle}><SignoutButton/></div> :(
              <>
            <Link href="/signin" onClick={toggle} className="text-sm hover:bg-slate-100 p-1 rounded">Sign in</Link>
            <Link href="/signup" onClick={toggle} className="text-sm hover:bg-slate-100 p-1 rounded">Sign up</Link>
              </>
            )}
            </div>
          </div>
        </div>
    </div>
    </>
  )
}