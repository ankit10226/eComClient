import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideModal, showModal } from '../../redux/slices/ModalSlice';
import useAuthValidation from '../../hooks/Auth/useAuthValidation';
import api from '../../utils/api/api';

const initialValue = {
  name: '',
  email: '',
  password: '',
};
const initialError = {
  name: false,
  email: false,
  password: false,
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { checkPage,checkValidation,errorMessage } = useAuthValidation();
  checkPage('register');

  const [formData, setFormData] = useState(initialValue);
  const [error, setError] = useState(initialError);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: checkValidation(name,value),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const hasError = Object.keys(formData).reduce((acc, key) => {
      const errorExists = checkValidation(key, formData[key]);
      setError(prev => ({ ...prev, [key]: errorExists }));
      return acc || errorExists;
    }, false);
    if (hasError) return ; 
    try {
      const response = await api.post(
        "/user-register",
        formData
      );   
      if(response.status == 200){
        dispatch(showModal({type:"success",message:"Registration Successful."}));
        setTimeout(() => {
          dispatch(hideModal());
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      dispatch(showModal({type:"error",message:error.response?.data?.message || error.message}));
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white w-4/7 p-4 rounded-lg">
        <p className="font-bold text-3xl text-teal-500 text-center mb-4">
          Register
        </p>
        <form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            className={`${error.name ? 'border-2 border-red-400' : 'mb-4'}`}
            name="name"
            id="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          { error.name && <p className='text-red-400 font-light text-sm'>{errorMessage.name}</p>}
          <Input
            type="text"
            className={`${error.email ? 'border-2 border-red-400' : 'mb-4'}`}
            name="email"
            id="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          { error.email && <p className='text-red-400 font-light text-sm'>{errorMessage.email}</p>}
          <Input
            type="password"
            className={`${error.password ? 'border-2 border-red-400' : 'mb-4'}`}
            name="password"
            id="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          { error.password && <p className='text-red-400 font-light text-sm'>{errorMessage.password}</p>}
          <div className="text-center mt-2 mb-4">
            <Button type="submit" className="bg-teal-500 text-white w-full">
              Submit
            </Button>
          </div>
          <p className="text-right font-semibpld">
            <span
              className="text-teal-500 text-sm cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
