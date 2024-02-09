import { url } from "inspector"

interface Products{
    selectedSize: undefined|{size:string}
    sys:{
      id:string
    }
    fields:{
      title:string,
      price:number,
      description:any,
      slug:string,
      image:{
        fields:{
          file:{
            url:string,
            details:{
              image:{
                width:number,
                height:number
              }
            }
          }
        }
      }[],
      size:string[]
    }
  }[]

export type CartItem={
  name:string
  slug:string
  qty:number
  image:string
  price:number
  size:string|undefined
  uuid:string
}