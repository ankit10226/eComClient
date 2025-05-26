import React from "react";
import { Link } from "react-router-dom";

const ShopBy = (props) => {
  return (
    <div className="p-4 text-teal-900 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Shop By {props.title}
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {props.list.map((list) => (
          <Link to={list.navigate} key={list.id}>
            <div className="border border-gray-300 rounded-lg flex flex-col justify-center items-center py-4 lg:mx-8 md:mx-4 sm:mx-2 mx-0.5 cursor-pointer hover:border-gray-500">
              <span className="py-4">{list.logo}</span>
              <p className="font-bold">{list.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopBy;
