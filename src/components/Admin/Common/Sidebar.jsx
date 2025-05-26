import React from 'react';
import Logo from './Logo';
import sidebarList from '../../../utils/Admin/sidebarList';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../../redux/slices/SidebarSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isVisible } = useSelector((state) => state.sidebar);

  return (
    <>
      {isVisible && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-svh w-3/4 max-w-xs bg-gray-800 text-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out 
          ${isVisible ? 'translate-x-0' : '-translate-x-full'} 
          lg:static lg:translate-x-0 lg:block lg:w-1/5 lg:shadow-xl lg:bg-white lg:text-gray-800`}
      >
        <Logo />
        <ul className="py-4 px-6">
          {sidebarList.map((list) => (
            <Link
              to={list.navigate}
              key={list.id}
              onClick={() => dispatch(toggleSidebar())}
            >
              <li className="w-fit flex items-center justify-start py-2 cursor-pointer transition duration-200 ease-in-out hover:scale-110">
                {list.logo}
                <span className="pl-2 text-md font-semibold">{list.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
