import OrderDetails from "./OrderDetails"


export default function page({params}:{params:{id:string}}) {
  return (
    <OrderDetails orderId={params.id}/>
  )
}
