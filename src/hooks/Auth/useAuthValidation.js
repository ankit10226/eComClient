import { useState } from 'react';

const useAuthValidation = () => {

  let page = null;
  const checkPage = (value) =>{
    page=value;
  }

  const initialErrorMessage = {
    name: '',
    email: '',
    password: '',
  };
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage);

  const checkValidation = (name, value) => {
    let error = false;

    if (value.trim() === '') {
      error = true;
      setErrorMessage((prev) => ({
        ...prev,
        [name]: `${name.charAt(0).toUpperCase()}${name.slice(1)} is required.`,
      }));
    } else if (name === 'email' && !value.includes('@')) {
      error = true;
      setErrorMessage((prev) => ({
        ...prev,
        [name]: 'Email is invalid.',
      }));
    } else if (name === 'password' && value.length < 6 && page==='register') {
      error = true;
      setErrorMessage((prev) => ({
        ...prev,
        [name]: 'Password must be at least 6 characters long.',
      }));
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    return error;
  };

  return { checkPage,checkValidation, errorMessage };
};

export default useAuthValidation;
