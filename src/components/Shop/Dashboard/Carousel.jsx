import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboards } from '../../../redux/slices/DashboardSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = () => {
  const dispatch = useDispatch();
  const { dashboards } = useSelector((state) => state.dashboard);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchDashboards());
  }, [dispatch]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? dashboards.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === dashboards.length - 1 ? 0 : prev + 1
    );
  };

  if(!dashboards.length > 0){
    return null;
  }

  return (
    <div className='relative w-full h-80 flex items-center justify-center overflow-hidden shadow-lg bg-white'>
    {dashboards.length > 0 && (
      <>
        <img
          src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${dashboards[currentIndex].image}`}
          alt={`Dashboard ${currentIndex}`}
          className='h-full w-full object-cover transition-all duration-500 ease-in-out'
        />

        {/* Left Button */}
        <button
          onClick={handlePrev}
          className='absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-200 text-black p-2 rounded-full shadow'
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Button */}
        <button
          onClick={handleNext}
          className='absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-200 text-black p-2 rounded-full shadow'
        >
          <ChevronRight size={24} />
        </button>
      </>
    )}
  </div>
  )
}

export default Carousel