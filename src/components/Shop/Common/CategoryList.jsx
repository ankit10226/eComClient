import { LucideTicketSlash } from "lucide-react";
import React from "react";
import categoryList from "../../../utils/Shop/categoryList";
import { Link } from "react-router-dom";

const CategoryList = () => {
  return (
    <ul className="flex h-full text-teal-900 font-semibold cursor-pointer justify-evenly items-center">
      {categoryList.map((list) => (
        <Link to={list.navigate} key={list.id}>
          <li className="px-4">{list.title}</li>
        </Link>
      ))}
    </ul>
  );
};

export default CategoryList;
