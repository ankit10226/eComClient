import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPortal } from 'react-dom';
import { hideModal } from '../../../redux/slices/ModalSlice';
import Button from '../Button/Button'; 
import { CircleCheck, CircleX, TriangleAlert } from 'lucide-react';

const Modal = ({}) => {
  const dispatch = useDispatch();
  const { isVisible,type,message } = useSelector((state)=>state.modal);

  const iconMap = {
    alert: <TriangleAlert color="#98eb00" size={80} />,
    success: <CircleCheck color="#008631" size={80} />,
    error: <CircleX color="#FF0000" size={80} />,
  };

  const buttonColour = {
    alert: 'bg-[#98eb00]',
    success: 'bg-[#008631]',
    error: 'bg-[#FF0000]',
  }
  
  if(!isVisible) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-80" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="bg-white p-4 w-86 rounded-lg shadow-lg">
        {/* <span className='float-right py-2' onClick={() => dispatch(hideModal())}><X /></span> */}
        
        <div className="flex items-center justify-center">
        {iconMap[type]}
        </div>  
          
        <p className={`py-4 font-semibold text-gray-800 text-center`}>{message}</p>
        <div className={`flex justify-center items-center`}>
          <Button type="type" className={`mt-4 px-4 py-2 text-white ${buttonColour[type]}`} onClick={() => dispatch(hideModal())}>
            Close
          </Button> 
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
  
}

export default Modal