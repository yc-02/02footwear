import FetchOrder from "./FetchOrder"


export default function page({params}:{params:{id:string}}) {

  return (
    <div>
    <FetchOrder orderId={params.id}/>
    </div>
  )
}
