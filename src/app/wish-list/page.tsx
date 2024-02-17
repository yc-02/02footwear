import { Metadata } from 'next'
import WishList from './WishList'

export const metadata:Metadata={
  title:"Wish List"
}

export default function WishListPage() {
  return (
    <div className='p-10'>
      <WishList/>
    </div>
  )
}
