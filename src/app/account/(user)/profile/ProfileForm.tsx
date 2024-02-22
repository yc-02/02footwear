"use client"

import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { useEffect, useRef, useState } from "react"
import { PencilSquareIcon,XMarkIcon} from "@heroicons/react/24/outline"



export default function ProfileForm({user}:{user:User}) {
    const supabase = createClient()
    
//update user

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
                first_name:firstName,
                last_name:lastName
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
 
    const [editFirstName,setEditFirstName]=useState(false)
    const [editLastName,setEditLastName]=useState(false)
    const [editPassword,setEditPassword]=useState(false)
    const [firstName,setFirstName]=useState(`${user?.user_metadata.first_name}`)
    const [lastName,setLastName]=useState(`${user?.user_metadata.last_name}`)
    const [password,setPassword]=useState("")

    const popoverRef = useRef<HTMLDivElement>(null)

useEffect(()=>{
  const handleClickOutside = (event:MouseEvent)=>{
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setEditFirstName(false)
      setEditLastName(false)
      setEditPassword(false)
    }
  }

document.addEventListener('mousedown', handleClickOutside);

return () => {
  document.removeEventListener('mousedown', handleClickOutside);
};
}, [])

  return (
    <div className="flex flex-col gap-5 p-10 w-screen md:w-auto">
        <div>
            <p>Email: {user?.email}</p>
        </div>

        <div
        ref={popoverRef} 
        className={`${editFirstName?" absolute insect-0 bg-slate-50 rouded shadow p-10 flex flex-col justify-center":"hidden"}`}>
        <button onClick={()=>setEditFirstName(false)} className="flex justify-end">
            <XMarkIcon className="w-6 h-6"/>
        </button>
        <form action={updateFirstName} className="flex flex-col gap-3 items-center">
        <label className="flex gap-2 items-baseline">
            First Name: 
            <input type="text" 
            className="border p-1 border-slate-800 rounded-lg"
            defaultValue={user?.user_metadata.first_name} name="first_name" 
            onChange={(e) => setFirstName(e.target.value)}/>
        </label>
            <button type="submit" className='bg-slate-800 rounded-xl text-slate-50 p-1 w-1/2'>Save</button>
        </form>
        </div>
        <div className="flex justify-between">
            <p>First Name: {user?.user_metadata.first_name}</p>
            <button onClick={()=>setEditFirstName(true)}>
            <PencilSquareIcon className="w-6 h-6"/>
            </button>
        </div>

        <div 
        ref={popoverRef} 
        className={`${editLastName?" absolute insect-0 bg-slate-50 rouded shadow p-10 flex flex-col justify-center":"hidden"}`}>
        <button onClick={()=>setEditLastName(false)}  className="flex justify-end">
            <XMarkIcon className="w-6 h-6"/>
        </button>
        <form action={updateLastName} className="flex flex-col gap-3 items-center">
        <label className="flex gap-2 items-baseline">
            Last Name:
            <input type="text" 
            className="border p-1 border-slate-800 rounded-lg"
            defaultValue={user?.user_metadata.last_name} name="last_name" 
            onChange={(e) => setLastName(e.target.value)}/>
        </label>
            <button type="submit" className='bg-slate-800 rounded-xl text-slate-50 p-1 w-1/2'>Save</button>
        </form>
        </div>

        <div className="flex justify-between">
            <p>Last Name: {user?.user_metadata.last_name}</p>
            <button onClick={()=>setEditLastName(true)}>
            <PencilSquareIcon className="w-6 h-6"/>
            </button>
        </div>

        <div
        ref={popoverRef}  
        className={`${editPassword?" absolute insect-0 bg-slate-50 rouded shadow p-10 flex flex-col justify-center":"hidden"}`}>
        <button onClick={()=>setEditPassword(false)} className="flex justify-end">
            <XMarkIcon className="w-6 h-6"/>
            </button>
        <form action={updatePassword}  className="flex flex-col gap-3 items-center">
        <label className="flex gap-2 items-baseline">
            Password:
            <input type="text" 
            className="border p-1 border-slate-800 rounded-lg"
            defaultValue='' name="password" 
            onChange={(e) => setPassword(e.target.value)}/>
        </label>
            <button type="submit"  className='bg-slate-800 rounded-xl text-slate-50 p-1 w-1/2'>Save</button>
        </form>
        </div>
        <div className="flex justify-between">
            <p>Password: ****** </p>
            <button onClick={()=>setEditPassword(true)}>
            <PencilSquareIcon className="w-6 h-6"/>
            </button>
        </div>

    </div>
  )
}