import React from "react";
import headerImg from "../assets/shop-page-header.png";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { fetchProducts } from "../redux/slice/ProductSlice";
import { SearchBar } from "../components/Search";

function Shop() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const categoryFilterHandler = (e) => {
    e.preventDefault();
    dispatch(fetchProducts({ category: e.target.value }));
  };
  return (
    <>
      <div>
        {/* Header Section */}
        <div className="max-w-full flex flex-col items-start justify-start py-0 px-5 md:px-20 lg:px-40 box-border relative gap-2 leading-normal tracking-normal text-left text-black1 text-35xl font-headline-3">
          <img
            className="w-full h-[10.5rem] lg:h-[392px] object-cover"
            alt="Shop Page Header"
            src={headerImg}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-start gap-6 z-[1]">
            <h1 className="text-2xl lg:text-4xl font-medium leading-tight text-center text-black mq450:text-[32px] mq450:leading-[35px] mq750:text-[43px] mq750:leading-[46px]">
              Shop Page
            </h1>
            <h3 className="text-md lg:text-xl font-normal leading-[32px] text-center text-black-900 mq450:text-[16px] mq450:leading-[26px]">
              Let’s design the place you always imagined.
            </h3>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-5 mt-10 md:px-20 lg:px-40 flex flex-col md:flex-row gap-7">
          {/* Categories Dropdown */}
          <div className="flex flex-col lg:flex-row gap-5 w-full lg:w-1/2 justify-start">
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <div className="uppercase font-bold text-lg text-gray-600">
                Categories
              </div>
              <div className="border-2 border-gray-300 flex flex-col justify-center items-center px-4 py-2 rounded-lg bg-white shadow-md">
                <select
                  name="categories"
                  id="categories"
                  className="w-full bg-transparent text-gray-600 focus:outline-none rounded-md transition ease-in-out duration-200"
                  onChange={categoryFilterHandler}
                >
                  <option value="Living Room">Living Room</option>
                  <option value="Footwear">Kitchen</option>
                </select>
              </div>
            </div>

            {/* Price Dropdown */}
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <div className="uppercase font-bold text-lg text-gray-600">
                Price
              </div>
              <div className="border-2 border-gray-300 flex flex-col justify-center items-center px-4 py-2 rounded-lg bg-white shadow-md">
                <select
                  name="price"
                  id="price"
                  className="w-full bg-transparent text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition ease-in-out duration-200"
                >
                  <option value="">All Price</option>
                  <option value="">Footwear</option>
                  <option value="">Cloths</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Component */}
          <div className="flex flex-row gap-5 w-full lg:w-1/2 justify-end h-10 ">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Products */}

      {/* Products Grid */}

<div className="flex justify-center w-full px-5 mt-5 lg:mt-10 md:px-20 lg:px-40">
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</div>

      {/* Pagination */}
      <div>
        <Pagination />
      </div>
    </>
  );
}

export default Shop;
