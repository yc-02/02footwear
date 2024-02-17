import { Metadata } from "next"
import FetchOrder from "./FetchOrder"

export const metadata:Metadata={
  title:"Order"
}

export default function page({params}:{params:{id:string}}) {

  return (
    <div>
    <FetchOrder orderId={params.id}/>
    </div>
  )
}
