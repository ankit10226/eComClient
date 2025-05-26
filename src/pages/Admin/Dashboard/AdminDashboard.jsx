import React from 'react';
import Button from '../../../components/UI/Button/Button';
import { useDispatch } from 'react-redux';
import { destroyUserSession } from '../../../redux/slices/AuthSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import { showModal } from '../../../redux/slices/ModalSlice'; 
import Sidebar from '../../../components/Admin/Common/Sidebar';
import Header from '../../../components/Admin/Common/Header';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  return (
    <div className='h-screen w-full flex'> 
      <Sidebar /> 
      <div className='w-full lg:w-4/5 md:w-full sm:w-full h-full'>
        <Header />
        <div className='h-fit w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
