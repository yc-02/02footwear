import ImageSlider from "@/app/ components/ImageSlider"
import { Products } from "../../../../types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

type ParamsProps={
  slug:string
}

interface Entries{
  items:Products[]
}



export default async function Detailpage({params}:{params:ParamsProps}) {
  const contentful = require('contentful')
  const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken:process.env.CONTENTFUL_ACCESS_KEY
  })
  const entries:Entries = await client.getEntries({
    content_type:'product',
    'fields.slug':params.slug
  })
  const image=entries.items[0].fields.image.map((image)=>image.fields.file)


  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:grid grid-cols-2 gap-5">
        <div className="w-96 h-96 md:h-full md:w-full">
          <ImageSlider image={image}/>
        </div>
        <div className="flex flex-col items-start gap-5">
          <p>{entries.items[0].fields.title}</p>
          <p>{entries.items[0].fields.price}</p>
          <p>Select Size</p>
          <div className="grid grid-cols-2">
            {entries.items[0].fields.size.map((size)=>
            <button className="border border-slate-800 rounded-2xl p-2 m-2" key={size}>{size}</button>
            )}
          </div>
          <button className="bg-slate-800 text-slate-50 p-2 rounded-2xl hover:bg-slate-600 w-1/2">Add to Bag</button>
          <button className="flex border-slate-800 border-2 p-1 rounded-2xl w-1/2 justify-center">Favorite 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
        </div>
    </div>
    <div className="m-auto w-1/2 p-5 my-10">
          {documentToReactComponents(entries.items[0].fields.description)}
        </div>
    </div>
  )
}
