import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { fetchProducts } from '../redux/slice/ProductSlice';
import { useDispatch } from 'react-redux';
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export function SearchBar() {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = () => {
       dispatch(fetchProducts({query : searchQuery}));
    }
  return (
   
      <div className='border border-darkslategray text-darkslategray rounded-full flex w-[100%] lg:w-[50%] bg-white px-5 gap-4 justify-start items-center align-middle py-3 ' >
       <div className=' cursor-pointer ' onClick={handleSearch} >
       <RiSearchLine size={20} />
       </div>
       <input type="text" placeholder='Search Product name' className=' border-none focus:border-none outline-none' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}  />
      </div>
    
  );
}

export const SearchBox = ({ searchBoxToggler }) => {
  const REACT_APP_PRODUCT_API_URL = process.env.REACT_APP_PRODUCT_API_URL;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedProducts, setSearchProducts] = useState([]);
  const navgate = useNavigate();
  const getSearchProducts =  async (query) => {
    try {
      const response = await axios.get(`${REACT_APP_PRODUCT_API_URL}/all?keyword=${query}`);

      setSearchProducts(response.data.products);
    } catch (error) {
       toast.error("Internal Error Please Search after some time") 
    }
  };

  //Searching With Debouncing
  const debouncedSearching = (fn, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  // Create a debounced version of getSearchProducts
  const handleSearch = debouncedSearching(getSearchProducts, 400);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value); // Call debounced function with new search query
  };

  const handleNavigation = (productCategory, productId) => {
    searchBoxToggler();
   navgate(`/${productCategory}/product/${productId}`)
  }

  return (
    <>
      <div className="absolute border-t-2 border-black h-[70%] bottom-0 w-full bg-white rounded-t-lg z-50 py-5 px-3">
        <div className="w-full flex justify-end cursor-pointer" onClick={searchBoxToggler}>
          <RxCross1 size={30} />
        </div>

        {/* Search Bar */}

        <div className="w-full flex justify-center">
          <div className="border border-darkslategray text-darkslategray rounded-full flex w-[100%] lg:w-[50%] bg-white px-5 gap-4 justify-start items-center py-3 mt-3 ">
            <div className="cursor-pointer" onClick={() => handleSearch(searchQuery)}>
              <RiSearchLine size={20} />
            </div>
            <input
              type="text"
              placeholder="Search Product name"
              className="border-none focus:border-none outline-none"
              value={searchQuery}
              onChange={handleInputChange} // Use onChange to handle input changes
            />
          </div>
        </div>

        {/* Searched Products to Show */}
        {
          searchedProducts.length > 0 && <div className='flex flex-col w-full justify-center gap-4 px-5 py-1' >
           <div className='w-[100%] lg:w-[50%] self-center ' >
           {
            searchedProducts.map((product) => {
              return <div className='w-full flex gap-4 justify-start align-middle px-2 py-4 cursor-pointer hover:bg-slate-300' key={product._id} onClick={() => handleNavigation(product.category, product._id)} >
                  <div>
                    <img src={product.images[0].url} alt="" className='h-[50px] w-[50px]' />
                  </div>
                  <div className=' self-center ' >{product.name}</div>
              </div>
            })
           }
           </div>
          </div>
        }
      </div>
    </>
  );
};