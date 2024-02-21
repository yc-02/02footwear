"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavbarAccount() {
  const pathname = usePathname()
  const isActive = (href:string)=>pathname===href
  return (
    <>

      <div className="flex gap-5 justify-center py-2 text-nowrap w-full font-semibold">
        <Link href="/account/dashboard" className={`${isActive('/account/dashboard')?"underline":"hover:text-slate-500"}`}>Dashboard</Link>
        <Link href="/account/profile" className={`${isActive('/account/profile')?"underline":"hover:text-slate-500"}`}>Profile</Link>
        <Link href="/account/shipping-addresses" className={`${isActive('/account/shipping-addresses')?"underline":"hover:text-slate-500"}`}>Shipping</Link>
        <Link href="/account/orders" className={`${isActive('/account/orders')?"underline":"hover:text-slate-500"}`}>Orders</Link>
      </div>

      </>
  )
}
