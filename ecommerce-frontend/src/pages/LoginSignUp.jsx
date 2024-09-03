import React from "react";
import leftImage from "../assets/sofa-image-2.png";
import { Link } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from '../components/LoginForm'
import { useSelector } from 'react-redux'


function LoginSignUp() {
  const { register } = useSelector(
    (state) => state.loginSignUp
  );

  return (
    <>
      <div className="w-full overflow-hidden bg-white flex flex-col lg:flex-row gap-[88px] text-center text-5xl text-black font-headline-4">
        {/* Image Section */}
        <div className="h-screen w-full lg:w-[736px] flex flex-row items-start justify-center py-8 px-5 box-border relative">
          <img
            className="h-full w-full absolute top-0 right-0 bottom-0 left-0 object-cover"
            loading="lazy"
            alt=""
            src={leftImage}
          />
          <Link className="relative font-small text-[25px] md:text-[35px] inline-block z-[1]">
            <span>3legant</span>
            <span className="text-black">.</span>
          </Link>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-[456px] h-screen flex flex-col items-center justify-center px-5 lg:px-0 box-border">
          {register ? <RegistrationForm /> : <LoginForm />}
        </div>
      </div>
    </>
  );
}

export default LoginSignUp;
