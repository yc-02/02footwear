"use client"
import Link from "next/link"
import { useState} from "react"




export default function NavHamGuest() {
    const [open,setOpen]=useState(false)

    const toggle =()=>{
        setOpen(!open)
    }
  

  
  return (
    <>
    <svg onClick={toggle} className="w-6 h-6 md:hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
    <div className="md:hidden">
              {/* small screen hamburger menu items */}
      <div className={`navbarSmall ${open?"grid":"hidden"}`}>
        <div className="navbarSmallContent">
          <div onClick={toggle} className="w-full flex justify-end cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          </div>
          <div className="flex flex-col items-start gap-5">
          <Link href="/product" className="cursor-pointer hover:text-slate-500" onClick={toggle}>Women</Link>
          <Link href="/product" className="cursor-pointer hover:text-slate-500" onClick={toggle}>Men</Link>
          <Link href="/product" className="cursor-pointer hover:text-slate-500" onClick={toggle}>Sales</Link>
          <div className="flex gap-2">
          <Link href="/signin" onClick={toggle} className="text-sm">Sign in</Link>
          <Link href="/signup" onClick={toggle} className="text-sm">Sign up</Link>
          </div>
          </div>
          </div>
        </div>
    </div>
    </>
  )
}
