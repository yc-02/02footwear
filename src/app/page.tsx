import Link from "next/link"
import Image from "next/image"
type trendingUrl={
  fields:{
    file:{
      url:string
    }
  }
}
type trending={
  fields:{
    file:{
      details:{
        image:{
          width:number,
          height:number
        }
      }
    }
  }
}


const contentful = require('contentful')
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken:process.env.CONTENTFUL_ACCESS_KEY
})

export default async function HomePage() {

  const entries = await client.getEntries({content_type:'homeHero'})
  const hero=entries.items[0].fields.hero.fields.file.details.image
  const heroUrl = entries.items[0].fields.hero.fields.file.url
  const trendingUrl=entries.items[0].fields.trending.map((image:trendingUrl)=>image.fields.file.url)
  const trending=entries.items[0].fields.trending.map((image:trending)=>image.fields.file.details.image)

  return (
    <div className="flex flex-col">
    <div className="w-full bg-blue-500 h-96 flex justify-center">
      <Image src={'http:'+ heroUrl} width={hero.width} height={hero.height} alt="image" className="object-cover"/>
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
  )
}
