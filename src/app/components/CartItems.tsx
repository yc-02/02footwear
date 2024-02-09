import Link from "next/link"
import Image from "next/image"
import { useCart } from "./hooks/useCart";



export default function CartItems() {
    const{items}=useCart()
    const {removeItem}=useCart()


const products = items.map(
  (p)=>({id: p.product.sys.id,
    size: p.product.selectedSize?.size}
  ))

console.log(products)

// const countDuplicates = products.reduce((acc, item) => {
//   const key = `${item.id}-${item.size}`;
//   acc[key] = (acc[key] || 0) + 1;
//   return acc;
// }, {});

// console.log(countDuplicates);




  return (
    <div>
        {items.map((item)=>
            <div key={item.product.cartItemId} className="flex gap-10 py-10">
                <Link href={'/product/'+item.product.fields.slug}>
                <Image src={'http:'+item.product.fields.image[0].fields.file.url} 
                width={150}
                height={150}
                alt={item.product.fields.title}/>
                </Link>
                <div className="flex flex-col justify-between">
                <p className="font-bold">{item.product.fields.title}</p>
                <p>{item.product.selectedSize?.size}</p>
                <p>${item.product.fields.price}</p>
                <button onClick={()=>removeItem(item.product.cartItemId)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                </button>
                </div>
            </div>

          )}
    </div>
  )
}
