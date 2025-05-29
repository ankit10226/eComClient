import React from 'react'
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../UI/Button/Button';
import { toggleOrderDetailModal } from '../../../../redux/slices/OrderSlice';

const OrderDetail = () => {
    const dispatch = useDispatch();
    const { orderDetail,isOrderDetailModalVisible } = useSelector((state)=>state.order);

  if (!isOrderDetailModalVisible) return null;
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-40"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white p-4 lg:w-1/3 md:w-2/3 w-2/3 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        {
            orderDetail.map((value)=>( 
            <div className="flex justify-between mx-4 my-2 text-gray-900" key={value.id}>
                <div className="left flex">
                    <div className="h-20 w-16 overflow-hidden rounded-md flex justify-center items-center cursor-pointer">
                    <img
                    src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${value.product.image}`}
                    alt={`${value.product.title} image`} 
                    className="w-full h-auto transition-transform duration-300 ease-linear hover:scale-110"
                    />
                </div>
                <div className="flex flex-col justify-around items-start ml-2">
                    <p className="text-sm font-semibold">{value.product.title}</p>  
                </div>
                </div>
                <div className="right flex flex-col justify-around items-end">
                <p className="text-sm font-semibold">&#8377;{value.price} x {value.quantity}</p> 
                </div>
            </div>
            ))
        }
        <div className="flex justify-end ">
          <Button
            type="button"
            className="bg-red-400 text-white mr-2"
            onClick={() => dispatch(toggleOrderDetailModal())}
          >
            Close
          </Button>       
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default OrderDetail
