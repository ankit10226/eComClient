import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../redux/slices/SidebarSlice";
import categoryList from "../../../utils/Shop/categoryList";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Dot } from "lucide-react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isVisible } = useSelector((state) => state.sidebar); 
  return (
    <>
      {isVisible && (
        <div
          className="fixed inset-0 z-20 lg:hidden md:hidden"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-svh w-2/5 lg:hidden md:hidden sm:block max-w-xs bg-gray-800 text-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out 
          ${isVisible ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Logo />
        <hr className="mx-4 text-gray-200"/>
        <ul className="py-4 px-6">
          {categoryList.map((list) => (
            <Link
              to={list.navigate}
              key={list.id}
              onClick={() => dispatch(toggleSidebar())}
            >
                
              <li className="w-fit flex items-center justify-start py-2 cursor-pointer transition duration-200 ease-in-out hover:scale-110">
                <Dot />
                {list.title} 
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
