import OrderModel from "@/lib/models/OrderModel"


export async function GET(req:any,{params}:{params:{id:string}}) {
    try{
        const order = await OrderModel.findById(params.id);
        return Response.json(order)

    }catch(error){
        console.error(error)
    }
}