import React, { useEffect, useState } from 'react';
import api from '../../../utils/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAjaxLoader } from '../../../redux/slices/AjaxLoaderSlice';
import Button from '../../UI/Button/Button';
import { fetchProducts, toggleProductModal } from '../../../redux/slices/ProductSlice';
import { showModal } from '../../../redux/slices/ModalSlice';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const {products} = useSelector((state)=>state.product);

  const handleEditForm = (e) =>{
    const productId = e.target.id;  
    dispatch(toggleProductModal({type:'editModal',id:productId}));
  };

  const handleDeleteProduct = async (e) =>{
    const productId = e.target.id;
    const res = confirm("Are you sure you want to delete this product?");
    if (res) {
      dispatch(toggleAjaxLoader());
      try {
        const response = await api.delete(`/admin/delete/product/${productId}`); 
        if (response.status === 200) {
          dispatch(showModal({type:'success',message:response.data?.message})); 
          dispatch(fetchProducts()); 
        }
      } catch (error) {
        dispatch(showModal({type:'error',message:error.response?.data?.message || error.message}))
      }finally{
        dispatch(toggleAjaxLoader());
      }
    }
  }

  useEffect(()=>{
    dispatch(fetchProducts());
  },[dispatch]); 
  
  return (
    <> 
      <div className="w-full p-2 grid lg:grid-cols-2 gap-4 md:grid-cols-1">
        {products.map((value) => (
          <div key={value.id} className='shadow-lg rounded-lg border-1 border-gray-300 hover:border-gray-400 hover:transition ease-linear text-teal-900'>
          <div className="flex h-50" >
            <div className="w-1/3 overflow-hidden rounded-lg flex justify-center items-center">
              <img
                src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${value.image}`}
                alt={`${value.title} image`}
                className="w-full h-auto transition-transform duration-300 ease-linear hover:scale-110"
              />
            </div>
            <div className="w-2/3 overflow-y-scroll p-2">
              <div className='flex'>
                <h1 className='font-bold w-1/3'>Category</h1>
                <p className='pl-2 w-2/3 font-semibold text-teal-700'>{value.category[0].toUpperCase()+value.category.slice(1)}</p>
              </div>
              <div className='flex'>
                <h1 className='font-bold w-1/3'>Sub Category</h1>
                <p className='pl-2 w-2/3 font-semibold text-teal-700'>{value.subCategory[0].toUpperCase()+value.subCategory.slice(1)}</p>
              </div>
              <div className='flex'>
                <h1 className='font-bold w-1/3'>Brand</h1>
                <p className='pl-2 w-2/3 font-semibold text-teal-700'>{value.brand[0].toUpperCase()+value.brand.slice(1)}</p>
              </div>
              <div className='flex'>
                <h1 className='font-bold w-1/3'>Title</h1>
                <p className='pl-2 w-2/3 font-semibold text-teal-700'>{value.title}</p>
              </div>
              <div className='flex'>
                <h1 className='font-bold w-1/3'>Price</h1>
                <p className='pl-2 w-2/3 font-semibold text-teal-700'>{value.price}</p>
              </div>
              <div className='flex'>
                <h1 className='font-bold w-1/3'>Quantity</h1>
                <p className='pl-2 w-2/3 font-semibold text-teal-700'>{value.quantity}</p>
              </div>
              <div className='flex'>
                <h1 className='font-bold w-1/3'>Description</h1>
                <p className='pl-2 w-2/3 font-semibold text-teal-700'>{value.description}</p>
              </div>
            </div>
          </div>
          <div className='flex justify-start items-center p-2 border-t-1 border-teal-200'>
            <Button type="button" className="bg-teal-500 text-white mx-2" id={value.id} onClick={handleEditForm}>Edit</Button>
            <Button type="button" className="bg-teal-900 text-white" id={value.id} onClick={handleDeleteProduct}>Delete</Button>
          </div>
        </div>
        ))}
      </div>
    </>
  );
};

export default ProductDetails;
