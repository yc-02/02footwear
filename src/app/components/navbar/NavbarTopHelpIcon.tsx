import Link from 'next/link';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';


export default function NavbarTopHelpIcon() {


  return (
  <div className='group relative flex flex-col items-center'>
    <button>
      <QuestionMarkCircleIcon className='w-6 h-6'/>
    </button>
    <div className= "hidden group-hover:block rounded-lg w-40 h-40 bg-slate-50  absolute top-6 p-5 shadow">
        <Link href='/order' className=' hover:text-slate-500 underline'>
        Track my Order</Link>
    </div> 
  </div>
    )
}
