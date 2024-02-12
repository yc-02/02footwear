"use client"
import { useRouter } from "next/navigation"
import useCart from "../../components/hooks/useCart"
import { SubmitHandler, ValidationRule, useForm } from "react-hook-form"
import { Shipping } from "../../../../types"
import { useEffect } from "react"


const ShippingForm = ()=>{
    const router = useRouter()
    const {saveShippingAddress,guestShipping}=useCart()
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
        setValue('firstName',guestShipping.firstName)
        setValue('lastName',guestShipping.lastName)
        setValue('address',guestShipping.address)
        setValue('city',guestShipping.city)
        setValue('state',guestShipping.state)
        setValue('zipCode',guestShipping.zipCode)
        setValue('email',guestShipping.email)
        setValue('phone',guestShipping.phone)


    },[setValue,guestShipping])

    const onSubmit:SubmitHandler<Shipping>=async(form)=>{
        saveShippingAddress(form)
        router.push('/checkout/payment')
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
            <div  className="md:grid grid-cols-2 gap-2 text-start">
        
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
export default ShippingForm