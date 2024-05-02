import Link from "next/link"
import Image from "next/image"
import { HomeImages } from "@/types"
import { Suspense } from "react"

export default async function HomePage(){

  async function getData():Promise<HomeImages> {
    const contentful = require('contentful')
    const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken:process.env.CONTENTFUL_ACCESS_KEY
    })
    const entries = await client.getEntries({content_type:'homeHero'})

    return entries.items[0].fields
  }
  const data = await getData()

   const hero=data.hero.fields.file.details.image
   const heroUrl = data.hero.fields.file.url
   const trendingUrl=data.trending.map((image)=>image.fields.file.url)
   const trending=data.trending.map((image)=>image.fields.file.details.image)

  return (
    <Suspense fallback={<p>loading ...</p>}>
    <div className="flex flex-col">
    <div className="w-screen overflow-hidden flex justify-center items-center max-h-96 bg-blue-500">
      <Image src={'http:'+ heroUrl} width={500} height={500} alt="image" className="object-cover" />
    </div>
    <p className="text-xl px-6 py-6">Trending Now</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
      { trendingUrl.map(a=>(
        <div className="relative overflow-hidden" key={a}>
        <Image src={'http:'+ a} width={500} height={500} alt="image" className="w-full rounded object-cover"/>
        <Link className=" absolute bottom-5 left-5 bg-white p-2 rounded-3xl" href="/product">Shop</Link>
        </div>
        )
      )}
    </div>
    </div>
    </Suspense>
  )
}
