import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '../../../../types'




type CartState = {
    items:CartItem[];
    subTotal:number;
    itemCount:number;
  };
  

  const initialState:CartState={
      items: [],
      subTotal:0,
      itemCount:0,
  }


  export const CartStore = create<CartState>()(persist(() => (initialState),{
    name:'cart-stoer'
  }));

  export default function useCart(){
    const {items,subTotal,itemCount}=CartStore()
    return{
        items,
        subTotal,
        itemCount,
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
                    CartStore.setState({items:updatedItems,subTotal:calcPrice(updatedItems).subTotal, itemCount:calcPrice(updatedItems).itemCount})
        
                } else {
                    // If the quantity is greater than 1, decrement the quantity
                    exist.qty--
                    CartStore.setState({items,subTotal:calcPrice(items).subTotal, itemCount:calcPrice(items).itemCount})
                }
        },
        deleteItem:(item:CartItem)=>{
            const exist=items.find((e)=>e.slug === item.slug && e.size ===item.size)
            if(exist){
                const updatedItems=items.filter((e) => !(e.slug === item.slug && e.size === item.size));
                CartStore.setState({items:updatedItems,subTotal:calcPrice(updatedItems).subTotal, itemCount:calcPrice(updatedItems).itemCount})
            }
        },
    }
}
  
const calcPrice=(items:CartItem[])=>{
    const subTotal = items.reduce((total,i)=>total+i.price*i.qty,0)
    const itemCount = items.reduce((total,i)=>total+i.qty,0)
    return {
        subTotal, itemCount}
}