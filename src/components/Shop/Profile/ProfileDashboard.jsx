import React from 'react'
import profileDashboard from "../../../assets/images/profileDashboard.jpg"

const ProfileDashboard = () => {
  return (
    <div className='relative w-full h-70 flex items-center justify-center overflow-hidden shadow-lg bg-white'>
        <img
          src={profileDashboard}
          alt="Profile"
          className='h-full w-full object-cover transition-all duration-500 ease-in-out'
        />
    </div>
  )
}

export default ProfileDashboard