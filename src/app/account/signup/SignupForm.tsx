"use client"

import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
type FormValues = {
  email:string
  password:string
  phone:string
  firstName:string
  lastName:string
}
export default function SignupForm() {
    const router = useRouter()
    const supabase = createClient()
    const [error,setError]=useState("")
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<FormValues>()

    const onSubmit:SubmitHandler<FormValues>=async(formData)=>{
      const { data,error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options:{
          data:{
          phone:formData.phone,
          first_name:formData.firstName,
          last_name:formData.lastName
          }
        }
      })
      if (error) {
        setError(error.message)
       }else{
        router.replace('/verify')
      } 

    }
  const Input = ({ name, label, register, errors, required }: {
       name: string, label:string, register: any, errors: any, required?: boolean }) => (
      <div>
          <label className="flex justify-between gap-3">
              {label}
              <input type="text" {...register(name, { required: required && `${label} is required` })} 
              className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg block p-1.5" />
          </label>
          {errors && errors[name] && <p className="text-sm text-pink-800 text-center">{errors[name].message}</p>}
      </div>
  );

 
  return (
    <div className="flex flex-col bg-slate-50 items-center gap-5 p-7">
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <label className="flex justify-between gap-3">
        <span>Email</span>
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
            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg block p-1.5"
            />
      </label>
      {errors.email && <p className="text-sm text-pink-800 text-center">{errors.email.message}</p>}
      <Input name="password" label="Password" register={register} errors={errors} required />
      <Input name="firstName" label="First Name" register={register} errors={errors} required />
      <Input name="lastName" label="Last Name" register={register} errors={errors} required />
      <Input name="phone" label="Phone" register={register} errors={errors} required />
      <div className="flex justify-center">
      <button type="submit" disabled={isSubmitting} className="bg-slate-800 text-slate-50 rounded hover:bg-slate-600 p-1">
                {isSubmitting && (<span>...</span>)}
        Sign up
      </button>
      </div>
    </form>
    {error&&<p className="text-sm text-pink-800">{error}</p>}
    <div className="flex flex-col border-t-2 border-neutral-200 pt-2 w-full items-center">
      <p>Have an account? </p>
      <Link href="/account/signin" className="font-bold hover:underline">Sign in</Link>
    </div>
    </div>
  )
}
