import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchFilteredProducts } from "../../../redux/slices/ProductSlice";
import Button from "../../UI/Button/Button"
import { setCartItem, setTotalAmount } from "../../../redux/slices/CartSlice";
import { showModal } from "../../../redux/slices/ModalSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);  
  
  const [searchParams] = useSearchParams(); 

  const category = searchParams.get("category");
  const subCategories = searchParams.getAll("subCategory");
  const brands = searchParams.getAll("brand");

  const showProductDetail = (e) => {
    const id = e.target.id; 
  };

  const handleAddToCart = (e) =>{
    const id = e.target.id;
    const product = products.find((item)=> item._id === id);
    
    let itemPresent = cartItems.find((item)=> item._id === id);
    if(itemPresent){ 
      dispatch(showModal({type:'alert',message:'Item is already added to cart.'}));
    }else{ 
      const newItem = { ...product, cartQty: 1 };
      const payload = [
        ...cartItems,
        newItem
      ] 
      dispatch(setCartItem(payload));
      dispatch(setTotalAmount({type:'new',value:product.price}));
      dispatch(showModal({ type: "success", message: "Item added to cart." }));
    }
  }

  useEffect(() => {
    const filters = {
      category,
      subCategories,
      brands,
    };
    dispatch(fetchFilteredProducts(filters));
  }, [searchParams.toString()]);

  return (
    <div className="lg:w-5/6 md:w-4/5 sm:w-3/4 w-2/3 overflow-y-auto my-2 mx-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl text-teal-900 my-3">Products</h1>
        <span className="text-sm font-semibold text-teal-900 mr-2">Total Products : {products.length}</span>
      </div>
      <hr className="mb-4 text-gray-300"/>
      <div className="w-full p-2 grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {products.map((value) => (
          <div
            key={value._id}
            className="shadow-lg rounded-lg border-1 border-gray-300 hover:border-gray-400 hover:transition ease-linear text-teal-900"
          >
            <div className="">
              <div className="h-74 overflow-hidden rounded-lg flex justify-center items-center mb-6 cursor-pointer">
                <img
                  src={value.image}
                  alt={`${value.title} image`}
                  id={value._id}
                  className={`w-full h-auto transition-transform duration-300 ease-linear hover:scale-110 ${value.quantity === 0 ? 'grayscale' : ''}`}
                  onClick={showProductDetail}
                />
              </div>
              <hr className="m-4 text-gray-300"/>
              <div className="mx-4">
                <h1 className="font-semibold text-lg text-teal-900">{value.title}</h1>
                <div className="flex justify-between items-center py-1">
                  <p className="font-semibold text-teal-700">
                    {value.subCategory[0].toUpperCase() +
                      value.subCategory.slice(1)}
                  </p>
                  <p className="font-semibold text-teal-700">
                    {value.brand[0].toUpperCase() + value.brand.slice(1)}
                  </p>
                </div>
                <p className="font-semibold text-teal-700">
                   &#8377;{value.price}
                </p>
                <Button type="button" className={`text-white w-full my-2 ${value.quantity === 0 ? 'bg-gray-500' : 'bg-teal-900'}`} id={value._id} onClick={handleAddToCart} disabled={value.quantity === 0}>
                  {value.quantity === 0 ? "Out of Stock" : "Add To Cart"}
                </Button> 
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
