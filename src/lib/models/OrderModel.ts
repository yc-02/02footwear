import mongoose,{Schema} from "mongoose";

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise=global.Promise

const orderSchema = new Schema({
    items:[{
        name:{type:String,required:true},
        id:{type:String,required:true},
        qty:{type:Number,required:true},
        size:{type:String,required:true},
        image:{type:String,required:true},
        slug:{type:String,required:true},
        price:{type:Number,required:true},
    }],
    shippingDetails:{
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
        userId:{type:String,required:true},
        address:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        zipCode:{type:String,required:true},
        email:{type:String,required:true},
        phone:{type:String,required:true},
    },
    paymentMethod: { type: String, required: true },
    paymentResult: { id: String, status: String, email_address: String },
    subTotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    isShipped:{ type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
},
{
    timestamps:true,
}
)

const OrderModel=mongoose.models.Order|| mongoose.model("Order",orderSchema)
export default OrderModel