import React from 'react'
import Carousel from './Carousel' 
import subCategoryList from '../../../utils/Shop/subCategory'
import brandList from '../../../utils/Shop/Brand'
import ShopBy from './ShopBy'

const Dashboard = () => {
  return (
    <div className="w-full h-[calc(100vh-64px)] overflow-y-auto">
      <Carousel />
      <ShopBy title="Category" list={subCategoryList}/>
      <ShopBy title="Brand" list={brandList}/> 
    </div>
  )
}

export default Dashboard
