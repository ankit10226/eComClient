import React from 'react'
import Button from '../../UI/Button/Button'
import { AlignJustify, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showModal } from '../../../redux/slices/ModalSlice'
import { destroyUserSession } from '../../../redux/slices/AuthSlice'
import { toggleSidebar } from '../../../redux/slices/SidebarSlice'

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () =>{
    let res = confirm('Are you sure want to logout!');
    if(res){
      dispatch(destroyUserSession());
      navigate('/',{ replace: true }); 
    }
  }
 
  return (
    <header className='h-16 w-full shadow-lg flex items-center justify-between lg:justify-end px-4'> 
      <Button type="button" className="bg-teal-900 text-white lg:hidden md:block" onClick={()=>dispatch(toggleSidebar())}>
        <AlignJustify />
      </Button>
      <Button
        type="button"
        className="bg-teal-900 text-white"
        onClick={handleLogout}
      >
       <LogOut className='inline'/>Logout
      </Button>
    </header>
  )
}

export default Header
