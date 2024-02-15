"use client"

import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useState } from "react"



export default function ProfileForm({user}:{user:User}) {
    const router = useRouter()
    const supabase = createClient()
    
//update user
    async function updateEmail(){
        const { data: user, error } = await supabase.auth.updateUser(
               {email:email})
          if (error){
            throw new Error(error.message)
          }else{
            router.push('/verify')
          }
    }
    async function updatePassword(){
        const { data: user, error } = await supabase.auth.updateUser(
               {password:password}
          )
          if (error){
            throw new Error(error.message)
          }else{
            location.reload()
          }
    }
    async function updateFirstName(){
        const { data: user, error } = await supabase.auth.updateUser(
               {data:{
                first_name:firstName
               }}
          )
          if (error){
            throw new Error(error.message)
          }else{
            location.reload()
          }
    }
    async function updateLastName(){
        const { data: user, error } = await supabase.auth.updateUser(
               {data:{
                last_name:lastName
               }}
          )
          if (error){
            throw new Error(error.message)
          }else{
            location.reload()
          }
    }
 
    const [editEmail,setEditEmail]=useState(false)
    const [editFirstName,setEditFirstName]=useState(false)
    const [editLastName,setEditLastName]=useState(false)
    const [editPassword,setEditPassword]=useState(false)
    const [email,setEmail]=useState(`${user?.email}`)
    const [firstName,setFirstName]=useState(`${user?.user_metadata.first_name}`)
    const [lastName,setLastName]=useState(`${user?.user_metadata.last_name}`)
    const [password,setPassword]=useState("")


  return (
    <div className="flex flex-col gap-5 p-10">
        {editEmail?
         (
        <div className="flex justify-between">
        <form action={updateEmail} className="flex gap-2">
            <label>
                Email:
            <input type="text" 
            className="border p-1 border-slate-800 rounded-lg"
            defaultValue={user?.email} name="email" 
            onChange={(e) => setEmail(e.target.value)}/>
        </label>
            <button type="submit"  className='bg-slate-600 rounded-xl text-slate-50  text-sm text-center w-14 mt-1'>Save</button>
        </form>
            <button onClick={()=>setEditEmail(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </button>
        </div>):
        (
        <div className="flex justify-between">
            <p>Email: {user?.email}</p>
            <button onClick={()=>setEditEmail(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </button>
        </div>)}
        {editFirstName?
         (
        <div className="flex justify-between">
        <form action={updateFirstName} className="flex gap-2">
        <label >
            First Name:
            <input type="text" 
            className="border p-1 border-slate-800 rounded-lg"
            defaultValue={user?.user_metadata.first_name} name="first_name" 
            onChange={(e) => setFirstName(e.target.value)}/>
        </label>
            <button type="submit" className='bg-slate-600 rounded-xl text-slate-50  text-sm text-center w-14 mt-1'>Save</button>
        </form>
            <button onClick={()=>setEditFirstName(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </button>
        </div>):
        (
        <div className="flex justify-between">
            <p>First Name: {user?.user_metadata.first_name}</p>
            <button onClick={()=>setEditFirstName(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </button>
        </div>)}
        {editLastName?
         (
        <div className="flex justify-between">
        <form action={updateLastName} className="flex gap-2">
        <label>
            Last Name:
            <input type="text" 
            className="border p-1 border-slate-800 rounded-lg"
            defaultValue={user?.user_metadata.last_name} name="last_name" 
            onChange={(e) => setLastName(e.target.value)}/>
        </label>
            <button type="submit" className='bg-slate-600 rounded-xl text-slate-50  text-sm text-center w-14 mt-1'>Save</button>
        </form>
            <button onClick={()=>setEditLastName(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </button>
        </div>):
        (
        <div className="flex justify-between">
            <p>Last Name: {user?.user_metadata.last_name}</p>
            <button onClick={()=>setEditLastName(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </button>
        </div>)}
        {editPassword?
         (
        <div className="flex justify-between">
        <form action={updatePassword} className="flex gap-2">
        <label>
            Password:
            <input type="text" 
            className="border p-1 border-slate-800 rounded-lg"
            defaultValue='' name="password" 
            onChange={(e) => setPassword(e.target.value)}/>
        </label>
            <button type="submit"  className='bg-slate-600 rounded-xl text-slate-50  text-sm text-center w-14 mt-1'>Save</button>
        </form>
            <button onClick={()=>setEditPassword(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </button>
        </div>):
        (
        <div className="flex justify-between">
            <p>Password: ****** </p>
            <button onClick={()=>setEditPassword(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </button>
        </div>)}

    </div>
  )
}