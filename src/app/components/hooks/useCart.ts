import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Shipping } from '@/types'




type CartState = {
    items:CartItem[];
    sub_total:number;
    shipping_fee:number;
    items_count:number;
    shipping_details:Shipping;
    total_price:number
  };
  

  const initialState:CartState={
      items: [],
      sub_total:0,
      shipping_fee:0,
      items_count:0,
      shipping_details:{
        firstName:"",
        lastName:"",
        address:"",
        city:"",
        state:"",
        zipCode:"",
        email:"",
        phone:"",
        userId:"",
      },
      total_price:0,
  }


  export const CartStore = create<CartState>()(persist(() => (initialState),{
    name:'cart-store'
  }));

  export default function useCart(){
    const {items,sub_total,shipping_fee,items_count,total_price,shipping_details}=CartStore()
    return{
        items,
        sub_total,
        shipping_fee,
        items_count,
        total_price,
        shipping_details,
        increase: (item:CartItem)=>{
            const exist = items.find((e)=>e.slug === item.slug && e.size ===item.size)
            if (exist) {
                exist.qty++; // Increment the qty property of the existing item
            } else {
                items.push({ ...item, qty: 1 }); // Add a new item with qty property set to 1
            }
            CartStore.setState({
                items,
                sub_total:calcPrice(items).subTotal, 
                shipping_fee:calcPrice(items).shippingFee,
                items_count:calcPrice(items).itemCount,
                total_price:calcPrice(items).totalPrice

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
                        sub_total:calcPrice(updatedItems).subTotal, 
                        items_count:calcPrice(updatedItems).itemCount,
                        shipping_fee:calcPrice(updatedItems).shippingFee,
                        total_price:calcPrice(updatedItems).totalPrice
                    })
        
                } else {
                    // If the quantity is greater than 1, decrement the quantity
                    exist.qty--
                    CartStore.setState({
                        items,
                        sub_total:calcPrice(items).subTotal, 
                        items_count:calcPrice(items).itemCount,
                        shipping_fee:calcPrice(items).shippingFee,
                        total_price:calcPrice(items).totalPrice
                    })
                }
        },
        deleteItem:(item:CartItem)=>{
            const exist=items.find((e)=>e.slug === item.slug && e.size ===item.size)
            if(exist){
                const updatedItems=items.filter((e) => !(e.slug === item.slug && e.size === item.size));
                CartStore.setState({
                    items:updatedItems,
                    sub_total:calcPrice(updatedItems).subTotal, 
                    items_count:calcPrice(updatedItems).itemCount,
                    shipping_fee:calcPrice(updatedItems).shippingFee,
                    total_price:calcPrice(updatedItems).totalPrice,
                })
            }
        },
        saveShippingAddress:(shipping_details:Shipping)=>{
            CartStore.setState({shipping_details})
        },
        clear:()=>{
            CartStore.setState(initialState)
        },
    }
}
  
const calcPrice=(items:CartItem[])=>{
    const subTotal = items.reduce((total,i)=>total+i.price*i.qty,0)
    const itemCount = items.reduce((total,i)=>total+i.qty,0)
    const shippingFee = subTotal>=200?0:7
    const totalPrice = subTotal+shippingFee
    return {
        subTotal, itemCount,shippingFee,totalPrice}
}