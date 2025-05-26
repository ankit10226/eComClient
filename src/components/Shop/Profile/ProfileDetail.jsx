import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const navList = [
  { id: 'orders', title: 'Orders', path: 'orders' },
  { id: 'address', title: 'Address', path: 'address' },
];

const ProfileDetail = () => {
  return (
    <div className="border border-gray-300 rounded-lg m-4 text-teal-900 p-2">
      <ul className="flex font-semibold mb-1">
        {navList.map((list) => (
          <NavLink
            to={list.path}
            key={list.id}
            end 
            className={({ isActive }) => 
              isActive
                ? "border px-2 rounded shadow border-gray-400"
                : "px-2 text-teal-600 border border-gray-200"
            }
          >
            <li>
              {list.title}
            </li>
          </NavLink>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default ProfileDetail;
