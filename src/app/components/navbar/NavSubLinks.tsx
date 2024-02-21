"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavSubLinks() {
    const pathname = usePathname()
    const isActive = (href:string)=>pathname===href
  return (
    <div className="hidden md:flex gap-5 items-center">
        <Link href="/product/women" 
        className={`${isActive('/product/women')?"underline":"hover:bg-slate-100 p-1 rounded"}`}>Women</Link>
        <Link href="/product/men" 
        className={`${isActive('/product/men')?"underline":"hover:bg-slate-100 p-1 rounded"}`} >Men</Link>
        <Link href="#" 
        className={`${isActive('#')?"underline":"hover:bg-slate-100 p-1 ruonded"}`}>Sales</Link>
    </div>
  )
}
