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


export type CartItem={
  name:string
  id:string
  slug:string
  qty:number
  image:string
  price:number
  size:string|undefined 
}

export type Shipping={
  firstName:string|undefined
  lastName:string|undefined
  address:string|undefined
  city:string|undefined
  state:string|undefined
  zipCode:number|undefined
  email:string|undefined
  phone:string|undefined
  userId:string|undefined
}

export type Order={
  createdAt:Date,
  shippingDetails: {
    address:string,
    city:string,
    email:string,
    firstName:string,
    lastName:string,
    phone:string,
    state:string,
    zipCode:string,}
    isDelivered:boolean,
    isPaid:boolean,
    items:{
      id:string, 
      name:string,
      image:string, 
      slug:string,
      price:number
      qty:number,
      size:string,
      _id:string,
    }[]
    paymentMethod:string,
    shippingFee:number,
    subTotal:number,
    totalPrice:number,
    _id:string,
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

export type AuthAddress = {
  address:string
  city:string
  first_name: string
  id:number
  last_name:string
  phone:string
  state:string
  user_id:string
  zip_code:number
  }
  