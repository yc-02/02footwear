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
   const heroRatio = hero.height/hero.width 

  return (
    <Suspense fallback={<p>loading ...</p>}>
    <div className="flex flex-col">
    <div className="bg-blue-500 flex justify-center md:h-80">
      <Image src={'http:'+ heroUrl} width={1000} height={1000*heroRatio} alt="image" className="object-cover" />
    </div>
    <p className="text-2xl p-10">Trending</p>
    <div className="px-10 flex justify-center gap-5">
        <div className="relative w-1/2">
        <Image src={'http:'+trendingUrl[0]} width={trending[0].width} height={trending[0].height} alt="image" className="w-full rounded"/>
        <Link className=" absolute bottom-5 left-5 bg-white p-2 rounded-3xl" href="/product">Shop</Link>
        </div>
        <div className="relative w-1/2">
        <Image src={'http:'+trendingUrl[1]} width={trending[1].width} height={trending[1].height} alt="image" className="w-full rounded"/>
        <Link className=" absolute bottom-5 left-5 bg-white p-2 rounded-3xl" href="/product">Shop</Link>
        </div>
    </div>
    </div>
    </Suspense>
  )
}
