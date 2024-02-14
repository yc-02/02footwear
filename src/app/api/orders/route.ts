import OrderModel from "@/lib/models/OrderModel";



export async function POST(req:any) {
    try{
        const body = await req.json()
        const savedOrder = await OrderModel.create(body);

        return Response.json({message:"order placed",orderId:savedOrder._id},{status:201})

    }catch(error){
        return Response.json({message:"Error",error},{status:500})
    }
}

