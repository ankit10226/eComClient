import { AlignJustify, Check, Gitlab, ParkingSquare } from "lucide-react"

const brandList = [
  {
    id:'adidas',
    name:'Adidas',
    logo: <AlignJustify />,
    navigate: '/shop/products&category=all?brand=adidas'
  },
  {
    id:'nike',
    name:'Nike',
    logo: <Check />,
    navigate: '/shop/products&category=all?brand=nike'
  },
  {
    id:'puma',
    name:'Puma',
    logo: <ParkingSquare />,
    navigate: '/shop/products&category=all?brand=puma'
  },
  {
    id:'reebok',
    name:'Reebok',
    logo: <Gitlab />,
    navigate: '/shop/products&category=all?brand=reebok'
  }
]

export default brandList