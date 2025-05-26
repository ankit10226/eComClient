import React from 'react';
import { Outlet } from 'react-router-dom';
import Common from '../../components/Auth/Common';

const Auth = () => {
  return (
    <div className='w-screen min-h-screen grid grid-cols-2 bg-cyan-100'>
      <Common />
      <Outlet />
    </div>
  );
};

export default Auth;
