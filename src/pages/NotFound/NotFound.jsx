import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux/slices/AuthSlice';
import Button from '../../components/UI/Button/Button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { user } = useSelector((state)=>state.auth);
  // const dispatch = useDispatch();
  // useEffect(() => { 
  //   dispatch(logoutUser());
  // }, [dispatch])
  
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center bg-cyan-100'>
      <h1 className="text-5xl font-bold mb-4">404 Not Found</h1>
      <p className="text-xl mb-8">
        The page you are looking for does not exist.
      </p>
      <Link to={user?.role === 'user' ? '/shop/dashboard' : '/admin/dashboard'}>
        <Button className="bg-red-400 text-white">Go To Dashboard</Button>
      </Link>
    </div>
  )
}

export default NotFound
