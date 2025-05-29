import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder, fetchOrderDetail } from '../../../../redux/slices/OrderSlice';
import Modal from '../../../UI/Modal/Modal'; // Create this or use any modal component
import Button from '../../../UI/Button/Button';
import { Eye } from 'lucide-react';
import OrderDetail from './OrderDetail';

const Orders = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); 

  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchOrder(user.userId));
    }
  }, [dispatch, user?.userId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = order.slice(indexOfFirstItem, indexOfLastItem); 
  const totalPages = Math.ceil(order.length / itemsPerPage);

  return (
    <>
      <OrderDetail />
      <div className="border border-gray-300 rounded-md p-4">
        <h2 className="text-lg font-semibold mb-4">Your Orders</h2>
        <table className="w-full table-auto border border-collapse border-gray-300 text-sm text-gray-800 font-semibold">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border border-gray-300 px-3 py-2">Sr No.</th>
              <th className="border border-gray-300 px-3 py-2">Total Items</th>
              <th className="border border-gray-300 px-3 py-2">Total Amount</th>
              <th className="border border-gray-300 px-3 py-2">Status</th>
              <th className="border border-gray-300 px-3 py-2">Order Date</th>
              <th className="border border-gray-300 px-3 py-2">Address</th>
              <th className="border border-gray-300 px-3 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((ord, index) => (
                <tr key={ord.id}>
                  <td className="border border-gray-300 px-3 py-2">{indexOfFirstItem + index + 1}</td>
                  <td className="border border-gray-300 px-3 py-2">{ord.total_items}</td>
                  <td className="border border-gray-300 px-3 py-2">&#8377;{ord.total_amount}</td>
                  <td className="border border-gray-300 px-3 py-2 capitalize">{ord.status}</td>
                  <td className="border border-gray-300 px-3 py-2">{new Date(ord.created_at).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-3 py-2 capitalize">{`${ord.address.address}, ${ord.address.state}, ${ord.address.pincode}`}</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Button type="button" className="bg-gray-800 text-white mx-2" id={ord.id} onClick={()=>dispatch(fetchOrderDetail(ord.id))}>
                      <Eye />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>


        {totalPages > 1 && (
          <div className="flex justify-end mt-4 space-x-2 text-sm">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
            >
              Prev
            </button>
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === num + 1 ? 'bg-blue-500 text-white' : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                {num + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        )}
  
      </div>
    </>
  );
};

export default Orders;
