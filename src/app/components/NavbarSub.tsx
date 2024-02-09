"use client"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import icon from "@/app/components/images/apple-touch-icon.png"
import useCart from "./hooks/useCart"


export default function NavbarSub() {
  const {itemCount}=useCart()

    const [open,setOpen]=useState(false)
    const toggle =()=>{
        setOpen(!open)
    }
    const [drop,setDrop]=useState(false)
    const openDrop=()=>{
      setDrop(!drop)
    }
    const [dropMen,setDropMen]=useState(false)
    const openDropMen=()=>{
      setDropMen(!dropMen)
    }
    const [dropSale,setDropSale]=useState(false)
    const openSale=()=>{
      setDropSale(!dropSale)
    }
  return (
    <div className="py-5">
      <div className="flex justify-between px-2">
      <Link href="/" className="hidden md:flex"><Image src={icon} width={30} height={30} alt="icon"/></Link>
        <div className="hidden md:flex gap-7">
          <div onMouseLeave={openDrop} className="group">
          <Link href="/product" className="cursor-pointer group-hover:border-b-2 border-slate-900" onMouseEnter={openDrop}>Women</Link>
          <div className={`dropdownContent ${drop?"grid":"hidden"}`}>
            <Link href="/product" className="cursor-pointer hover:text-slate-500">Running</Link>
            <Link href="/product" className="cursor-pointer hover:text-slate-500">Lifestyle</Link>
            <Link href="/product" className="cursor-pointer hover:text-slate-500">Training</Link>
          </div>
          </div>
          <div onMouseLeave={openDropMen} className="group">
          <Link href="/product" className="cursor-pointer group-hover:border-b-2 border-slate-900" onMouseEnter={openDropMen}>Men</Link>
          <div className={`dropdownContent ${dropMen?"grid":"hidden"}`}>
            <Link href="/product" className="cursor-pointer hover:text-slate-500">Running</Link>
            <Link href="/product" className="cursor-pointer hover:text-slate-500">Lifestyle</Link>
            <Link href="/product" className="cursor-pointer hover:text-slate-500">Training</Link>
          </div>
          </div>
          <div onMouseLeave={openSale} className="group">
          <Link href="/product" className="cursor-pointer group-hover:border-b-2 border-slate-900" onMouseEnter={openSale}>Sales</Link>
          <div className={`dropdownContent ${dropSale?"grid":"hidden"}`}>
            <Link href="/product" className="cursor-pointer hover:text-slate-500">Women</Link>
            <Link href="/product" className="cursor-pointer hover:text-slate-500">Men</Link>
            <Link href="/product" className="cursor-pointer hover:text-slate-500">Up to 40% off</Link>
          </div>
          </div>
        </div>
        <Link href="/" className="md:hidden">02 Footwear</Link>
        <div className="flex cursor-pointer gap-5" id="burger">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        {/* cart icon */}
        <Link href="/cart" className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            <text x="12" y="18" fontSize="10" textAnchor="middle" fill="currentColor">{itemCount}</text>
        </svg>

        </Link>
        <svg onClick={toggle} className="w-6 h-6 md:hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        </div>
      </div>
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
          </div>
          <div className="flex gap-3 text-xl">
          <Link className="bg-slate-800 text-slate-50 p-1 rounded-2xl hover:bg-slate-600" href="/" onClick={toggle}>Sign up</Link>
          <Link className="border-2 bg-slate-50 border-slate-800 p-1 rounded-2xl" href="/" onClick={toggle}>Sign in</Link>
          </div>
          </div>
        </div>
    </div>
  )
}
