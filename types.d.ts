import { url } from "inspector"

interface Products{
    sys:{
      id:string
    }
    fields:{
      title:string,
      price:string,
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

