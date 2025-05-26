import React, { useState } from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import useAuthValidation from '../../hooks/Auth/useAuthValidation';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, showModal } from '../../redux/slices/ModalSlice';  
import { setUser } from '../../redux/slices/AuthSlice';
import api from '../../utils/api/api';

const initialValue = { 
  email: '',
  password: '',
};
const initialError = { 
  email: false,
  password: false,
};
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { checkPage,checkValidation,errorMessage } = useAuthValidation();
  checkPage('login');

  const [formData,setFormData] = useState(initialValue);
  const [error,setError] = useState(initialError);

  const handleInputChange = (e) =>{
    const { name,value } = e.target; 
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }));

    setError((prev)=>({
      ...prev,
      [name]:checkValidation(name,value)
    }));
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let hasError = Object.keys(formData).reduce((acc,key)=>{
      let errorExists = checkValidation(key,formData[key]);
      setError((prev)=>({
        ...prev,
        [key]:errorExists
      }));
      return acc || errorExists;
    },false);
    if(hasError) return; 
    try {
      const response = await api.post(
        "user-login",
        formData,
      );
      if(response.status == 200){ 
        const loginUser = response.data?.user;
        dispatch(setUser(loginUser)); 
        let dashboardPath = loginUser?.role === "user" ? "/shop/dashboard" : "/admin/dashboard";
        navigate(dashboardPath,{ replace: true }); 
        dispatch(showModal({type:'success',message:response.data?.message})); 
      };
    } catch (error) { 
      dispatch(showModal({type:'error',message:error.response?.data?.message || error.message}))
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white w-4/7 p-4 rounded-lg">
        <p className="font-bold text-3xl text-teal-500 text-center mb-4">
          Login
        </p>
        <form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            name="email"
            id="email"
            label="Email"
            className={`${error.email ? 'border-2 border-red-400' : 'mb-4'}`}
            value={formData.email}
            onChange={handleInputChange}
          />
          { error.email && <p className='text-red-400 font-light text-sm'>{errorMessage.email}</p>}
          <Input
            type="password"
            name="password"
            id="password"
            label="Password"
            className={`${error.password ? 'border-2 border-red-400' : 'mb-4'}`}
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
              onClick={() => navigate('/register')}
            >
              New User?
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
