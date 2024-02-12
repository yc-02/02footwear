import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Shipping } from '../../../../types'




type CartState = {
    items:CartItem[];
    subTotal:number;
    shippingFee:number;
    itemCount:number;
    paymentMethod:string;
    guestShipping:Shipping
  };
  

  const initialState:CartState={
      items: [],
      subTotal:0,
      shippingFee:0,
      itemCount:0,
      paymentMethod:"",
      guestShipping:{
        firstName:"",
        lastName:"",
        address:"",
        city:"",
        state:"",
        zipCode:"",
        email:"",
        phone:"",
      },
  }


  export const CartStore = create<CartState>()(persist(() => (initialState),{
    name:'cart-store'
  }));

  export default function useCart(){
    const {items,subTotal,shippingFee,itemCount,guestShipping,paymentMethod}=CartStore()
    return{
        items,
        subTotal,
        shippingFee,
        itemCount,
        guestShipping,
        paymentMethod,
        increase: (item:CartItem)=>{
            const exist = items.find((e)=>e.slug === item.slug && e.size ===item.size)
            if (exist) {
                exist.qty++; // Increment the qty property of the existing item
            } else {
                items.push({ ...item, qty: 1 }); // Add a new item with qty property set to 1
            }
            CartStore.setState({items,subTotal:calcPrice(items).subTotal, itemCount:calcPrice(items).itemCount})
        },
        decrease:(item:CartItem)=>{
            const exist=items.find((e)=>e.slug === item.slug && e.size ===item.size)
            if (!exist) return
                if (exist.qty === 1) {
                    // If the quantity is 1, remove the item from the cart
                    const updatedItems=items.filter((e) => !(e.slug === item.slug && e.size === item.size));
                    CartStore.setState({items:updatedItems,subTotal:calcPrice(updatedItems).subTotal, itemCount:calcPrice(updatedItems).itemCount,shippingFee:calcPrice(updatedItems).shippingFee})
        
                } else {
                    // If the quantity is greater than 1, decrement the quantity
                    exist.qty--
                    CartStore.setState({items,subTotal:calcPrice(items).subTotal, itemCount:calcPrice(items).itemCount,shippingFee:calcPrice(items).shippingFee})
                }
        },
        deleteItem:(item:CartItem)=>{
            const exist=items.find((e)=>e.slug === item.slug && e.size ===item.size)
            if(exist){
                const updatedItems=items.filter((e) => !(e.slug === item.slug && e.size === item.size));
                CartStore.setState({items:updatedItems,subTotal:calcPrice(updatedItems).subTotal, itemCount:calcPrice(updatedItems).itemCount,shippingFee:calcPrice(updatedItems).shippingFee})
            }
        },
        saveShippingAddress:(guestShipping:Shipping)=>{
            CartStore.setState({guestShipping})
        },
        savePaymentMethod:(paymentMethod:string)=>{
            CartStore.setState({paymentMethod})
        }
    }
}
  
const calcPrice=(items:CartItem[])=>{
    const subTotal = items.reduce((total,i)=>total+i.price*i.qty,0)
    const itemCount = items.reduce((total,i)=>total+i.qty,0)
    const shippingFee = subTotal>200?0:7
    return {
        subTotal, itemCount,shippingFee}
}