interface Products{
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

  export type HomeImages={
    hero: {
      sys: {   
        id:string,
      },
      fields: { 
        title: string,
        file:{
          url:string,
          details:{
            image:{
              width:number,
              height:number,
            }
          }
        }
       }
    },
    trending:{
      sys: {   
        id:string,
      },
      fields: { 
        title: string,
        file:{
          url:string,
          details:{
            image:{
              width:number,
              height:number,
            }
          }
        }
       }
    }[],
  }
  export type ImageProps ={
    image: {
      url: string;
      details: {
          image: {
              width: number;
              height: number;
          };
      };
  }[]
  }

export type CartItem={
  id:string
  image:string
  name:string
  price:number
  qty:number
  size:string|undefined
  slug:string
}

export type Shipping={
  firstName:string|undefined
  lastName:string|undefined
  address:string|undefined
  city:string|undefined
  state:string|undefined
  zipCode:string|undefined
  email:string|undefined
  phone:string|undefined
  userId:string|undefined
}

export type Order={
  id:string
  created_at:Date
  delivered_at:boolean|null
  email:string|null
  user_id:number|null
  phone:string|null
  is_delivered:boolean
  items:CartItem[]
  shipping_details:Shipping
  items_count:number
  payment_method:string
  shipping_fee:number
  sub_total:number
  total_price:number


}

export type UserShippingOption ={
  address:string
  city:string
  created_at:Date
  first_name:string
  id:string
  last_name:string
  phone:string
  state: string
  user_id:string
  zip_code:string
}
