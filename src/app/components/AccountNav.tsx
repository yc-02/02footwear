import Link from "next/link"
export default function AccountNav() {
  return (
    <div>
    <div className="accountNav">
        <Link href="/account/profile" className="hover:underline">Profile</Link>
        <Link href="/account/shipping-addresses" className="hover:underline">Shipping Addresses</Link>
        <Link href="/account/purchase-history" className="hover:underline">Purchase History</Link>
        <Link href="/account/wishlist" className="hover:underline">Wish List</Link>
    </div>
    </div>
  )
}
