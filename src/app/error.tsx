"use client"
import { Metadata } from "next"

export const metadata:Metadata={
  title:"Error"
}

export default function Error({ error, reset }:{error:{message:string},reset:()=>void}) {
  return (
    <main className="pt-10 text-center">
      <h2 className="text-4xl">Oh No!</h2>
      <p>{error.message}</p>
      <button
        onClick={reset}
        className="mx-auto my-4"
      >
        Maybe try again?
      </button>
    </main>
  )
}