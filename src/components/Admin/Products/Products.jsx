import React from 'react';
import Button from '../../UI/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleProductModal } from '../../../redux/slices/ProductSlice';
import AddProductModal from './AddProductModal';
import ProductDetails from './ProductDetails';
const Products = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-full h-[calc(100vh-64px)] overflow-y-auto"> 
      <AddProductModal />
      <div className="h-fit">
        <div className="flex justify-between items-center p-2">
          <h1 className="font-bold text-2xl text-teal-900 underline">
            Products
          </h1>
          <Button
            className="bg-teal-500 text-white"
            onClick={() => dispatch(toggleProductModal({type:'addModal'}))}
          >
            Add New Product
          </Button>
        </div>
      </div>
      <ProductDetails />
      </div>
  );
};

export default Products;
