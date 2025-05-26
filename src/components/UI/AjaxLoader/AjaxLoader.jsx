import React from 'react'
import Loader from '../../../assets/ajaxLoader.svg'
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
const AjaxLoader = () => { 
  const { isAjaxLoaderVisible } = useSelector((state)=>state.ajaxLoader);
  
  if(!isAjaxLoaderVisible) return null;
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}> 
        <img src={Loader} alt="Loading...." className='h-1/3 w-1/3 mb-10'/> 
    </div>,
    document.getElementById('ajax-loader-root')
  );
}

export default AjaxLoader