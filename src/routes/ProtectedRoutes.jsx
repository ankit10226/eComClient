import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/UI/Loading/Loading';
import Auth from '../pages/Auth/Auth';

const ProtectedRoutes = (props) => {
  const navigate = useNavigate();
  const { isLoggedIn,isCheckingSession } = useSelector((state)=>state.auth);

  useEffect(() => {
     if(!isCheckingSession && !isLoggedIn){
      navigate('/login', { replace: true });
     }
  }, [isLoggedIn,isCheckingSession,navigate])
  
  if(isCheckingSession) return <Loading/>;

  return isLoggedIn ? props.children : <Auth />;
}

export default ProtectedRoutes
