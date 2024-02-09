import { create } from 'zustand'
import { createJSONStorage,persist } from 'zustand/middleware'
import { Products } from '../../../../types'


type CartItem = {
    product:Products;
  };
  

  type CartState = {
    items: CartItem[];
    addItem:(product:Products)=>void;
    removeItem:(id:string)=>void;
    clearCart:()=>void;

  };

export const useCart = create<CartState>()(
    persist(
        (set)=>({
            items:[],
            addItem:(product)=>set((state)=>{
                return {items:[...state.items,{product}]}
            }),
            removeItem: (id) => {
                console.log("Removing item with cartItemId:", id);
                set((state) => ({
            
                items:state.items.filter((item)=>item.product.cartItemId !== id)
            }))},
            clearCart: () => set({ items: [] })
        }),{
            name:"cart-storage",
            storage:createJSONStorage(()=>localStorage),
        }
    )
)
