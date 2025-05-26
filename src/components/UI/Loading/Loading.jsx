import React from 'react'
import Loader from '../../../assets/loader.svg'

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-svh w-svw bg-cyan-100'>
        <img src={Loader} alt="Loading...." className='h-1/2 w-1/2 mb-10'/>
    </div>
  )
}

export default Loading
