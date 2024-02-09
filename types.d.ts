import { url } from "inspector"

interface Products{
    cartItemId:string
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

