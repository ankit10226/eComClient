import { Footprints, Shirt, StretchVertical } from "lucide-react";

const subCategoryList = [
  {
    id:'shirts',
    name:'Shirt',
    logo: <Shirt />,
    navigate: '/shop/products?category=all&subCategory=shirts'
  },
  {
    id:'jeans',
    name:'Jeans',
    logo: <StretchVertical />,
    navigate: '/shop/products?category=all&subCategory=jeans'
  },
  {
    id:'shoes',
    name:'Shoes',
    logo: <Footprints />,
    navigate: '/shop/products?category=all&subCategory=shoes'
  },
  {
    id:'tshirts',
    name:'T-Shirts',
    logo: <Shirt />,
    navigate: '/shop/products?category=all&subCategory=tshirts'
  },
] 

export default subCategoryList;