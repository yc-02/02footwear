"use client"
import { useRouter } from "next/navigation"
import useCart from "../../components/hooks/useCart"
import { SubmitHandler,useForm } from "react-hook-form"
import { Shipping } from "../../../types"
import { useEffect } from "react"


const GuestShippingForm = ()=>{
    const router = useRouter()
    const {saveShippingAddress,shipping_details}=useCart()
    const {register,handleSubmit,setValue,formState:{errors,isSubmitting}}=useForm<Shipping>({
        defaultValues:{
            firstName:"",
            lastName:"",
            address:"",
            city:"",
            state:"",
            zipCode:"",
            email:"",
            phone:"",
        },
    })

    useEffect(()=>{
        setValue('firstName',shipping_details.firstName)
        setValue('lastName',shipping_details.lastName)
        setValue('address',shipping_details.address)
        setValue('city',shipping_details.city)
        setValue('state',shipping_details.state)
        setValue('zipCode',shipping_details.zipCode)
        setValue('email',shipping_details.email)
        setValue('phone',shipping_details.phone)


    },[setValue,shipping_details])

    const onSubmit:SubmitHandler<Shipping>=async(form)=>{
        saveShippingAddress(form)
        router.push('/checkout/place-order')
    }


    const Input = ({ name, label, register, errors, required }: { name: string, label:string, register: any, errors: any, required?: boolean }) => (
        <div>
            <label>
                {label}
                <input type="text" {...register(name, { required: required && `${label} is required` })} 
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2.5" />
            </label>
            {errors && errors[name] && <p className="text-sm text-pink-800">{errors[name].message}</p>}
        </div>
    );
    
return(
    <div>
        <form onSubmit={handleSubmit(onSubmit)} >
            <div  className="grid grid-cols-2 gap-2 text-start">
        
            <Input name="firstName" label="First Name" register={register} errors={errors} required />
            <Input name="lastName" label="Last Name" register={register} errors={errors} required />
            <div className="col-span-2">
            <Input name="address" label="Address" register={register} errors={errors} required />
            </div>
            <div className="col-span-2">
            <Input name="city" label="City" register={register} errors={errors} required />
            </div>
            <Input name="state" label="State" register={register} errors={errors} required />
            <Input name="zipCode" label="ZIP Code" register={register} errors={errors} required />
            <div className="col-span-2">
            <label htmlFor="">
                Email
            <input
            id="email"
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            type="email"
            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2.5"
            />
            </label>
            {errors.email && <p className="text-sm text-pink-800">{errors.email.message}</p>}
            </div>
            <div className="col-span-2">
            <Input name="phone" label="Phone Number" register={register} errors={errors} required />
            </div>
            </div>
            <div className="text-center">
                <button type="submit" disabled={isSubmitting} className="bg-slate-800 text-slate-50 rounded-xl hover:bg-slate-600 p-1 my-5">
                {isSubmitting && (<span>...</span>)}
                 Continue</button>
            </div>
            </form>
    </div>
)

}
export default GuestShippingForm