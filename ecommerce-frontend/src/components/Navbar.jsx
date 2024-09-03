import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuUserCircle2 } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { RiSearchLine, RiBarChartHorizontalLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLogout, setUser } from "../redux/slice/AuthSlice";
import toast from "react-hot-toast";
import Cart from "./Cart";
import { getUserCart } from "../redux/slice/CartSlice";
import { SearchBox } from "./Search";

function Navbar() {
  const REACT_APP_USER_API_URL = process.env.REACT_APP_USER_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userAuth);
  const { cart } = useSelector((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userProfileMenuOpen, setUserProfileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserCart());
  }, [cartOpen, dispatch]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleUserMenu = () => {
    setUserProfileMenuOpen(!userProfileMenuOpen);
  };

  const toggleCartMenu = () => {
    setCartOpen(!cartOpen);
  };

  const searchBoxToggler = () => {
      setSearchBoxOpen(!searchBoxOpen);
      if(searchBoxOpen){
       
        document.body.style.overflowY = 'scroll'
        document.body.style.overflowX = 'hidden';
      }else{
        document.body.style.overflowY = 'hidden';
        document.body.style.overflowX = 'hidden';
      }
  }

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_USER_API_URL}/logout`
      );
      if (response.data.success) {
        toast.success("Logged Out!");
        dispatch(setLogout());
        dispatch(setUser(null));
        navigate("/login");
      }
    } catch (error) {
      toast.error("Error while logout!");
    }
  };

  return (
    <>
      <div className="w-full bg-white flex flex-row items-center justify-between py-4 px-10 lg:px-40 leading-normal gap-5 text-center text-black font-poppins">
        {/* Logo */}
        <Link className="font-medium inline-block min-w-[105px]">
          <img
            src={logo}
            alt="logo-img"
            className="w-[50px] md:w-[105px] h-[20px] md:h-[24px]"
          />
        </Link>

        {/* Navbar Toggler for Mobile */}
        <button
          className="text-gray-500 bg-transparent text-3xl cursor-pointer block lg:hidden"
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <RxCross1 className="text-sm md:text-lg lg:text-xl" />
          ) : (
            <RiBarChartHorizontalLine className="text-sm md:text-lg lg:text-xl" />
          )}
        </button>

        {/* Nav Menu (hidden on mobile) */}
        <div className="hidden lg:flex flex-row gap-10 justify-between align-middle items-center text-gray-500 text-md font-semibold">
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/shop" onClick={toggleMenu}>
            Shop
          </Link>
          <Link to="/products" onClick={toggleMenu}>
            Products
          </Link>
          <Link to="/contact" onClick={toggleMenu}>
            Contact Us
          </Link>
          {user && user.role === "admin" && (
            <Link to="/dashboard" onClick={toggleMenu}>
              Dashboard
            </Link>
          )}
        </div>

        {/* Icons */}
        {user !== null ? (
          <div className="flex flex-row gap-4 justify-between align-middle items-center text-gray-500 text-4xl font-semibold">
            <div className="cursor-pointer">
              <RiSearchLine className="text-sm md:text-lg lg:text-xl" onClick={searchBoxToggler} />
            </div>
            <div className="cursor-pointer w-full relative">
              <HiOutlineShoppingBag
                className="text-sm md:text-lg lg:text-xl"
                onClick={toggleCartMenu}
              />
              <div className="absolute -top-1 -right-1 bg-black h-2 w-2 lg:h-4 lg:w-4 text-white p-1 text-[8px] font-bold rounded-full flex justify-center align-middle items-center">
                {cart?.length}
              </div>
            </div>
            <div className="cursor-pointer" onClick={toggleUserMenu}>
              <LuUserCircle2 className="text-sm md:text-lg lg:text-xl" />
            </div>
          </div>
        ) : (
          <div>Login/SignUp</div>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 z-30 w-1/2 h-full bg-white flex flex-col items-center justify-center transition-transform transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <button
          className="text-gray-500 bg-transparent text-3xl cursor-pointer block lg:hidden absolute top-2 right-2"
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <RxCross1 className="text-sm md:text-lg lg:text-xl" />
          ) : (
            <RiBarChartHorizontalLine className="text-sm md:text-lg lg:text-xl" />
          )}
        </button>
        <div className="flex flex-col gap-10 text-gray-500 text-sm md:text-md font-semibold">
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/shop" onClick={toggleMenu}>
            Shop
          </Link>
          <Link to="/products" onClick={toggleMenu}>
            Products
          </Link>
          <Link to="/contact" onClick={toggleMenu}>
            Contact Us
          </Link>
          {user && user.role === "admin" && (
            <Link to="/dashboard" onClick={toggleMenu}>
              Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* User Profile Menu */}
      <div
        className={`fixed top-0 right-0 z-30 w-[30%] h-full bg-white flex flex-col items-center justify-center transition-transform transform ${
          userProfileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="text-gray-500 bg-transparent text-3xl cursor-pointer absolute top-2 right-2"
          onClick={toggleUserMenu}
        >
          {userProfileMenuOpen ? (
            <RxCross1 className="text-sm md:text-lg lg:text-xl" />
          ) : (
            <RiBarChartHorizontalLine className="text-sm md:text-lg lg:text-xl" />
          )}
        </button>
        <div className="flex flex-col gap-10 text-gray-500 text-md font-semibold">
          <Link to="/profile" onClick={toggleUserMenu}>
            Profile
          </Link>
          <Link onClick={handleLogout}>Logout</Link>
          <Link>Cart</Link>
          {user && user.role === "admin" && (
            <Link to="/dashboard" onClick={toggleUserMenu}>
              Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Cart Toggler */}
      <div
        className={`fixed top-0 right-0 z-30 w-[80%] md:w-[50%] lg:w-[30%] h-full bg-white flex flex-col transition-transform transform ${
          cartOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          className="text-white bg-black rounded-full p-2 text-2xl cursor-pointer absolute top-5 right-4"
          onClick={toggleCartMenu}
        >
          {cartOpen ? (
            <RxCross1 className="text-sm md:text-lg lg:text-xl" />
          ) : (
            <RiBarChartHorizontalLine className="text-sm md:text-lg lg:text-xl" />
          )}
        </button>
        <div>
          <Cart />
        </div>
      </div>


     {/* Search Box */}
      <div>
        {
          searchBoxOpen && <SearchBox searchBoxToggler = {searchBoxToggler} />  
        }
      </div>
    </>
  );
}

export default Navbar;
