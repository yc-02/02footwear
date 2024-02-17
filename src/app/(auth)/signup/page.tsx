import { Metadata } from "next";
import SignupForm from "./SignupForm";

export const metadata:Metadata={
  title:"Sign up"
}

export default function page() {
  return (
    <div className="">
        <SignupForm/>
    </div>
  )
}
