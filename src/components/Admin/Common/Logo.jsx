import { Framer } from 'lucide-react'
import React from 'react'

const Logo = () => {
  return (
    <div className='h-16 shadow-lg flex justify-center items-center'>
      <Framer/><span className='font-bold text-xl'>AdminPanel</span>
    </div>
  )
}

export default Logo