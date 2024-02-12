import { Metadata } from "next"
import Link from "next/link"
import { CheckoutItems } from "./CheckoutItems"

export const metadata:Metadata={
  title:"Checkout"
}

export default function CheckoutPage() {
  return (
    <div className="md:grid grid-cols-2">
      <div className="flex flex-col items-center text-center gap-5 py-10">
          <p className="text-xl">Have an account?</p>
          <div className="flex gap-2">
          <Link href="/login" className="underline">Login</Link>|
          <Link href="/signup" className="underline">Sign Up</Link>
          </div>
          <Link href="/checkout/shipping" className="underline">Check out as a guest</Link>
      </div>
      <div className="flex flex-col items-center text-center gap-5 pt-10 w-full">
        <p className="text-xl">Your Bag</p>
      <CheckoutItems/>
      </div>
    </div>

  )
}
