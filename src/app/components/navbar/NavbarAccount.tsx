"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function NavbarAccount() {
  const pathname = usePathname()
  const isActive = (href:string)=>pathname===href
  return (

      <div className="NavbarAccount">
        <Link href="/account/profile" className={`${isActive('/account/profile')?"bg-slate-800 text-white p-1 rounded":""}`}>Profile</Link>
        <Link href="/account/shipping-addresses" className={`${isActive('/account/shipping-addresses')?"bg-slate-800 text-white p-1 rounded":""}`}>Shipping Addresses</Link>
        <Link href="/account/purchase-history" className={`${isActive('/account/purchase-history')?"bg-slate-800 text-white p-1 rounded":""}`}>Purchase History</Link>
        <Link href="/account/wish-list" className={`${isActive('/account/wish-list')?"bg-slate-800 text-white p-1 rounded":""}`}>Wish List</Link>
    </div>


  )
}
