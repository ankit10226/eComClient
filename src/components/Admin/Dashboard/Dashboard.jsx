import React, { useState } from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { CloudUpload } from 'lucide-react';
import { showModal } from '../../../redux/slices/ModalSlice';
import { useDispatch } from 'react-redux';
import { toggleAjaxLoader } from '../../../redux/slices/AjaxLoaderSlice';
import api from '../../../utils/api/api';
import DashboardDetails from './DashboardDetails';
import { fetchDashboards } from '../../../redux/slices/DashboardSlice';

const initialFormData = { 
}

const initialError = {  
  imageUrlError:false
};
const Dashboard = () => {
  const dispatch = useDispatch();

  const [formData,setFormData] = useState(initialFormData);
  const [error,setError] = useState(initialError);
  const [imageUrl, setImageUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setFileName(file.name);

    dispatch(toggleAjaxLoader());
    try {
      const response = await api.post(
        "/admin/upload/image",
        formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        const uploadedUrl = response.data?.url;
  
        if (uploadedUrl) {
          setImageUrl(uploadedUrl);
          setFormData(prev => ({ ...prev, image: uploadedUrl }));
          setError((prev)=>({
            ...prev,
            imageUrlError: false
          }));
          // dispatch(showModal({ type: "success", message: "Image uploaded successfully!" }));
        }
      }
    } catch (err) {
      console.error("Image upload error:", err);
      dispatch(showModal({ type: "error", message: "Image upload failed!" }));
    }finally{
      dispatch(toggleAjaxLoader());
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(!imageUrl){
      setError((prev)=>({
        ...prev,
        imageUrlError: true
      }));
      return;
    }     
    try {
      const response = await api.post(
        "/admin/upload/dashboard",
        formData
      );
  
      if (response.status === 200) {
        setFileName('');
        dispatch(showModal({type:'success',message:response.data?.message}));
        dispatch(fetchDashboards());
      }
    } catch (error) {
      dispatch(showModal({type:'error',message:error.response?.data?.message || error.message}))
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] overflow-y-auto">
      <div className="h-fit">
        <div className="p-2">
          <h1 className="font-bold text-2xl text-teal-900 underline mb-4">
            Dashboard
          </h1>
          <div className="bg-white p-4 w-full rounded-lg shadow-lg">
            <form onSubmit={handleFormSubmit}>
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center w-full p-2 border-2 border-dashed border-teal-300 rounded-lg cursor-pointer hover:bg-teal-50 transition mb-4"
              >
                <CloudUpload className="w-10 h-10 text-teal-600 mb-2" />
                <span className="text-sm text-gray-600">
                  {fileName ? fileName : 'Upload Image'}
                </span>
              </label>
              <Input
                type="file"
                name="file"
                id="file"
                className="hidden"
                onChange={handleFileSelect}
              />
              { (!imageUrl && error.imageUrlError) && <p className='text-red-400 font-light text-sm mb-4'>{`Please upload image!`}</p>}
              <Button type="submit" className="bg-teal-500 text-white w-full">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
      <DashboardDetails />
    </div>
  );
};

export default Dashboard;
