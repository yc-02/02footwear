
import Link from "next/link"



export default function NavbarTop(){

    return(
        <div className="hidden md:block">
        <div className="flex justify-between mx-auto text-sm py-1 px-2 bg-slate-50">
            <Link href="/">02 Footwear</Link>
            <div className="hidden md:flex gap-5">
            <Link className="cursor-pointer hover:text-slate-500" href="/" >Sign up</Link>
            <Link className="cursor-pointer hover:text-slate-500" href="/">Sign in</Link>
            </div>
        </div>
        </div>
    )
}