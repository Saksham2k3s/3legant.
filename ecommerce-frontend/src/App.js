import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { setUser } from "./redux/slice/AuthSlice";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import AddProduct from "./pages/Dashboard/AddProduct";
import axios from "axios";
import Contact from "./pages/Contact";
import EditProduct from "./pages/Dashboard/EditProduct";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LoginSignUp from "./pages/LoginSignUp";
import Navbar from "./components/Navbar";
import ProductDetail from "./pages/ProductDetail";
import ProductStack from "./pages/Dashboard/ProductStack";
import Profile from "./pages/Profile";
import React, { useEffect, useState } from "react";
import Shop from "./pages/Shop";
import Wishlist from "./pages/Wishlist";

function App() {
  const { user } = useSelector((state) => state.userAuth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${process.env.REACT_APP_USER_API_URL}/profile`
      );
      if (result.status === 200) {
        dispatch(setUser(result.data.data));
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader" >
          <h3>🛒 Hold on, it's loading...</h3>
        </div>
      ) : (
        <div className="min-h-screen min-w-screen overflow-x-hidden lg:overflow-x-auto ">
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                zIndex: 9999,
              },
            }}
          />
          {user && <Navbar />}
          {/* {user && <Breadcrumb />} */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/products" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginSignUp />}
            />

            <Route path="/:category/product/:id" element={<ProductDetail />} />
            {user ? (
              <>
                <Route path="/dashboard" element={<ProductStack />} />
                <Route path="/dashboard/new" element={<AddProduct />} />
                <Route path="/admin/edit/:id" element={<EditProduct />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
