import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchDashboards } from '../../../redux/slices/DashboardSlice';
import api from '../../../utils/api/api';
import { showModal } from '../../../redux/slices/ModalSlice';
import { toggleAjaxLoader } from '../../../redux/slices/AjaxLoaderSlice';

const DashboardDetails = () => {

  const dispatch = useDispatch();
  const {dashboards} = useSelector((state)=>state.dashboard);
  
  const handleDashboardDelete = async(e) =>{
    const dashboardId = e.target.id; 
    const res = confirm("Are you sure you want to delete this Dashboard?");
    if (res) {
      dispatch(toggleAjaxLoader());
      try {
        const response = await api.delete(`/admin/delete/dashboard/${dashboardId}`); 
        if (response.status === 200) {
          dispatch(showModal({type:'success',message:response.data?.message})); 
          dispatch(fetchDashboards()); 
        }
      } catch (error) {
        dispatch(showModal({type:'error',message:error.response?.data?.message || error.message}))
      }finally{
        dispatch(toggleAjaxLoader());
      }
    }
  }

  useEffect(() => {
    dispatch(fetchDashboards());
  }, [dispatch]);
  return (
    <div className='w-full p-2'>
      {
        dashboards.map((value)=>(
          <div className='w-full h-60 flex justify-center items-center overflow-hidden mb-4 shadow-lg rounded-lg cursor-pointer' key={value._id}>
              <img src={value.image} alt="Dashboard image" className="transition-transform duration-300 ease-linear hover:scale-110" id={value._id} onClick={handleDashboardDelete}/>
          </div>
        ))
      }
    </div>
  )
}

export default DashboardDetails