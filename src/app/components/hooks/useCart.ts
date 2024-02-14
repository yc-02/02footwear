import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Shipping } from '@/types'




type CartState = {
    items:CartItem[];
    subTotal:number;
    shippingFee:number;
    itemCount:number;
    shippingDetails:Shipping;
    totalPrice:number
  };
  

  const initialState:CartState={
      items: [],
      subTotal:0,
      shippingFee:0,
      itemCount:0,
      shippingDetails:{
        firstName:"",
        lastName:"",
        address:"",
        city:"",
        state:"",
        zipCode:0,
        email:"",
        phone:"",
        userId:"",
      },
      totalPrice:0,
  }


  export const CartStore = create<CartState>()(persist(() => (initialState),{
    name:'cart-store'
  }));

  export default function useCart(){
    const {items,subTotal,shippingFee,itemCount,totalPrice,shippingDetails}=CartStore()
    return{
        items,
        subTotal,
        shippingFee,
        itemCount,
        totalPrice,
        shippingDetails,
        increase: (item:CartItem)=>{
            const exist = items.find((e)=>e.slug === item.slug && e.size ===item.size)
            if (exist) {
                exist.qty++; // Increment the qty property of the existing item
            } else {
                items.push({ ...item, qty: 1 }); // Add a new item with qty property set to 1
            }
            CartStore.setState({
                items,
                subTotal:calcPrice(items).subTotal, 
                shippingFee:calcPrice(items).shippingFee,
                itemCount:calcPrice(items).itemCount,
                totalPrice:calcPrice(items).totalPrice

            })
        },
        decrease:(item:CartItem)=>{
            const exist=items.find((e)=>e.slug === item.slug && e.size ===item.size)
            if (!exist) return
                if (exist.qty === 1) {
                    // If the quantity is 1, remove the item from the cart
                    const updatedItems=items.filter((e) => !(e.slug === item.slug && e.size === item.size));
                    CartStore.setState({
                        items:updatedItems,
                        subTotal:calcPrice(updatedItems).subTotal, 
                        itemCount:calcPrice(updatedItems).itemCount,
                        shippingFee:calcPrice(updatedItems).shippingFee,
                        totalPrice:calcPrice(updatedItems).totalPrice
                    })
        
                } else {
                    // If the quantity is greater than 1, decrement the quantity
                    exist.qty--
                    CartStore.setState({
                        items,
                        subTotal:calcPrice(items).subTotal, 
                        itemCount:calcPrice(items).itemCount,
                        shippingFee:calcPrice(items).shippingFee,
                        totalPrice:calcPrice(items).totalPrice
                    })
                }
        },
        deleteItem:(item:CartItem)=>{
            const exist=items.find((e)=>e.slug === item.slug && e.size ===item.size)
            if(exist){
                const updatedItems=items.filter((e) => !(e.slug === item.slug && e.size === item.size));
                CartStore.setState({
                    items:updatedItems,
                    subTotal:calcPrice(updatedItems).subTotal, 
                    itemCount:calcPrice(updatedItems).itemCount,
                    shippingFee:calcPrice(updatedItems).shippingFee,
                    totalPrice:calcPrice(updatedItems).totalPrice,
                })
            }
        },
        saveShippingAddress:(shippingDetails:Shipping)=>{
            CartStore.setState({shippingDetails})
        },
        clear:()=>{
            CartStore.setState({
                items: [],
                subTotal:0,
                shippingFee:0,
                itemCount:0,
                totalPrice:0,
            })
        }
    }
}
  
const calcPrice=(items:CartItem[])=>{
    const subTotal = items.reduce((total,i)=>total+i.price*i.qty,0)
    const itemCount = items.reduce((total,i)=>total+i.qty,0)
    const shippingFee = subTotal>200?0:7
    const totalPrice = subTotal+shippingFee
    return {
        subTotal, itemCount,shippingFee,totalPrice}
}