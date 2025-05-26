import React, { useEffect, useState } from "react";
import subCategoryList from "../../../../utils/Shop/subCategory";
import brandList from "../../../../utils/Shop/Brand";
import SidebarFilterList from "./SidebarFilterList";
import { useSearchParams, useNavigate } from "react-router-dom";

const SidebarFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get("category") || "all";
  const subCategory = searchParams.getAll("subCategory");
  const brand = searchParams.getAll("brand");

  const [selectedSubCategories, setSelectedSubCategories] = useState(subCategory);
  const [selectedBrands, setSelectedBrands] = useState(brand);

  useEffect(() => {
    const newParams = new URLSearchParams();

    newParams.set("category", category);

    selectedSubCategories.forEach((sc) => newParams.append("subCategory", sc));
    selectedBrands.forEach((b) => newParams.append("brand", b));

    navigate(`/shop/products?${newParams.toString()}`, { replace: true });
  }, [selectedSubCategories, selectedBrands, category, navigate]);

  const handleSubCategoryChange = (id) => {
    setSelectedSubCategories((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBrandChange = (id) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className={`h-full lg:w-1/6 md:w-1/5 sm:w-1/4 w-1/3 shadow-2xl text-teal-900 py-4`}>
      <h1 className="font-bold text-lg mb-4 pl-6">Filters</h1>
      <hr className="mb-4 text-gray-300 mx-4"/>
      <SidebarFilterList
        title="Category"
        list={subCategoryList}
        selectedList={selectedSubCategories}
        onChange={handleSubCategoryChange}
      />
      <SidebarFilterList
        title="Brand"
        list={brandList}
        selectedList={selectedBrands}
        onChange={handleBrandChange}
      />
    </div>
  );
};

export default SidebarFilter;
