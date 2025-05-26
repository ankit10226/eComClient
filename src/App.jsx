import './App.css';
import UserRouter from './routes/ShopRouter';
import Modal from './components/UI/Modal/Modal';
import { checkUserSession } from './redux/slices/AuthSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminRouter from './routes/AdminRouter';
import AuthRouter from './routes/AuthRouter';
import ShopRouter from './routes/ShopRouter';
import AjaxLoader from './components/UI/AjaxLoader/AjaxLoader';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);    
  return (
    <>
      <AjaxLoader />
      <Modal />
      {!user ? (
        <AuthRouter />
      ) : user?.role === 'user' ? (
        <ShopRouter />
      ) : (
        <AdminRouter />
      )}
    </>
  );
}

export default App;
