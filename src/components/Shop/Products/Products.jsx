import React from 'react'
import SidebarFilter from '../Common/SidebarFilter/SidebarFilter'
import { Outlet } from 'react-router-dom'
import ProductDetails from './ProductDetails'

const Products = () => {
  return (
    <div className='h-[calc(100vh-64px)] w-full flex'>    
        <SidebarFilter />         
        <ProductDetails />
    </div>
  )
}

export default Products