import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AlignJustify, User } from "lucide-react";
import Logo from "../../Shop/Common/Logo";
import CategoryList from "./CategoryList";
import Cart from "../Cart/Cart";
import { destroyUserSession } from "../../../redux/slices/AuthSlice"; 
import Button from "../../UI/Button/Button";
import { toggleSidebar } from "../../../redux/slices/SidebarSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    let res = confirm('Are you sure want to logout!');
    if(res){
      dispatch(destroyUserSession());
      navigate('/',{ replace: true }); 
    }
  };

  const handleProfileClick = () => {
    navigate("/shop/profile/orders");
    setShowDropdown(false);
  };
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 w-full shadow-lg flex items-center justify-between px-4 relative">
      <div className="flex justify-center items-center">
        <Button type="button" className="bg-teal-900 text-white lg:hidden md:hidden sm:block mr-4" onClick={()=>dispatch(toggleSidebar())}>
          <AlignJustify />
        </Button>
        <span className="hidden lg:block md:block sm:hidden">
          <Logo />
        </span>
      </div>

      <div className="hidden lg:block md:block sm:hidden">
        <CategoryList />
      </div>
      
      <div className="flex justify-between items-center relative" ref={dropdownRef}>
        <Cart />
        <span
          className="bg-teal-900 text-white p-2 rounded-3xl ml-4 flex justify-center items-center cursor-pointer relative"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <User className="inline" />
        </span>

        {showDropdown && (
          <div className="absolute right-0 top-14 bg-white border border-gray-400 shadow-md rounded-md w-32 z-10">
            <button
              className="w-full text-left px-4 py-2 rounded-md text-tea-900 hover:bg-gray-100"
              onClick={handleProfileClick}
            >
              Profile
            </button>
            <hr className="text-gray-200 mx-2"/>
            <button
              className="w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
