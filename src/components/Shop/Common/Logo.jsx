import { ShoppingBag } from 'lucide-react'
import React from 'react'

const Logo = () => {
  return (
    <div className='h-16 flex justify-center items-center'>
      <ShoppingBag /><span className='font-bold text-lg pl-2'>Ecommerce</span>
    </div>
  )
}

export default Logo