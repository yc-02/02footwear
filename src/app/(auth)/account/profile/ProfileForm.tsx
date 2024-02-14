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
    <div className="flex flex-col gap-5 ">
        {editEmail?
         (
        <div className="flex justify-between">
        <form action={updateEmail}>
            <label>
                Email:
            <input type="text" 
            className="border p-1 border-slate-800 rounded-lg"
            defaultValue={user?.email} name="email" 
            onChange={(e) => setEmail(e.target.value)}/>
        </label>
            <button type="submit" className="underline ml-2">Save</button>
        </form>
            <button onClick={()=>setEditEmail(false)} className="underline">cancel</button>
        </div>):
        (
        <div className="flex justify-between">
            <p>Email: {user?.email}</p>
            <button onClick={()=>setEditEmail(true)} className="underline">edit</button>
        </div>)}
        {editFirstName?
         (
        <div className="flex justify-between">
        <form action={updateFirstName}>
        <label >
            First Name:
            <input type="text" 
            className="border p-1 border-slate-800 rounded-lg"
            defaultValue={user?.user_metadata.first_name} name="first_name" 
            onChange={(e) => setFirstName(e.target.value)}/>
        </label>
            <button type="submit" className="underline ml-2">Save</button>
        </form>
            <button onClick={()=>setEditFirstName(false)} className="underline">cancel</button>
        </div>):
        (
        <div className="flex justify-between">
            <p>First Name: {user?.user_metadata.first_name}</p>
            <button onClick={()=>setEditFirstName(true)} className="underline">edit</button>
        </div>)}
        {editLastName?
         (
        <div className="flex justify-between">
        <form action={updateLastName}>
        <label>
            Last Name:
            <input type="text" 
            className="border p-1 border-slate-800 rounded-lg"
            defaultValue={user?.user_metadata.last_name} name="last_name" 
            onChange={(e) => setLastName(e.target.value)}/>
        </label>
            <button type="submit" className="underline ml-2">Save</button>
        </form>
            <button onClick={()=>setEditLastName(false)} className="underline">cancel</button>
        </div>):
        (
        <div className="flex justify-between">
            <p>Last Name: {user?.user_metadata.last_name}</p>
            <button onClick={()=>setEditLastName(true)} className="underline">edit</button>
        </div>)}
        {editPassword?
         (
        <div className="flex justify-between">
        <form action={updatePassword}>
        <label>
            Password:
            <input type="text" 
            className="border p-1 border-slate-800 rounded-lg"
            defaultValue='' name="password" 
            onChange={(e) => setPassword(e.target.value)}/>
        </label>
            <button type="submit" className="underline ml-2">Save</button>
        </form>
            <button onClick={()=>setEditPassword(false)} className="underline">cancel</button>
        </div>):
        (
        <div className="flex justify-between">
            <p>Password: ****** </p>
            <button onClick={()=>setEditPassword(true)} className="underline">edit</button>
        </div>)}

    </div>
  )
}