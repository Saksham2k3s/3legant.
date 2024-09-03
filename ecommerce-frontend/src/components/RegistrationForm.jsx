import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleRegister,
  setShowPassword,
} from "../redux/slice/LoginSignUpSlice";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { setErrorMessage, signUpUser } from "../redux/slice/AuthSlice";
import toast from "react-hot-toast";
import { RegistrationFromValidation } from "../validations/userValidation";

function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPassword } = useSelector((state) => state.loginSignUp);
  const { isLoading, errorMessage, user, token } = useSelector(
    (state) => state.userAuth
  );
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [ error, setError ] = useState({
    type : '',
    message : ''
  })



  useEffect(() => {
    if (user && user.name) {
      toast.success(`Welcome ${user.name}`);
      navigate("/");
    }

    if (errorMessage !== "") {
      toast.error(errorMessage);
    }
  }, [user, token, errorMessage, navigate]);

  const handleRegister = () => {
    dispatch(toggleRegister());
  };

  const handleShowPassword = () => {
    dispatch(setShowPassword());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     // Check form validation
     dispatch(setErrorMessage());
     const validationResult = RegistrationFromValidation.safeParse(formData);
     setError({
       type: "",
       message: "",
     });
 
     if (!validationResult.success) {
       const firstError = validationResult.error.issues[0];
       setError({
         type: firstError.path[0],
         message: firstError.message,
       });
       return; // Stop execution if validation fails
     }
    if(validationResult.success){
      dispatch(signUpUser(formData));
    }
  };

  return (
    <>
      <form
        className={`m-0 self-center flex flex-col gap-[32px] max-w-full`}
        onSubmit={handleSubmit}
      >
        <div className="self-stretch flex flex-col items-start justify-start  max-w-full">
          <div className="self-stretch flex flex-row items-start justify-start max-w-full">
            <div className="flex-1 flex flex-row items-start justify-start gap-[16px] max-w-full">
            <h1 className="m-0 flex-1 relative text-start text-21xl font-medium text-xl lg:text-4xl">
                Sign In
              </h1>
            </div>
          </div>
          <div className="relative text-left text-[12px] lg:text-[16px] mt-2 ">
            <span className="font-button-s">
              <span className="text-neutral-04-100">
                Already have an account?
              </span>
            </span>
            <Link
              className="font-semibold font-button-s text-mediumseagreen outline-none"
              onClick={handleRegister}
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="self-stretch box-border flex flex-row items-start justify-start max-w-full border-b-[1px] border-solid border-gray-500">
          <div className="flex-1 box-border flex flex-row items-start justify-start pt-0 px-0 pb-3 max-w-full border-b-[1px] border-solid">
            <input
              className="w-full [border:none] [outline:none] font-button-s text-[12px] lg:text-[16px] bg-[transparent] h-[26px] flex-1 relative leading-[26px] text-neutral-04-100 text-left inline-block min-w-[250px] max-w-full p-0"
              placeholder="Your name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>
        {error && error.type === 'name' && (
          <span className="text-red-500 text-start text-[12px] space-x-3 -mt-7 ">
            {error.message}
          </span>
        )}
        <div className="self-stretch box-border flex flex-row items-start justify-start max-w-full border-b-[1px] border-solid">
          <div className="flex-1 box-border flex flex-row items-start justify-start pt-0 px-0 pb-3 max-w-full border-b-[1px] border-solid">
            <input
              className="w-full [border:none] [outline:none] font-button-s text-[12px] lg:text-[16px] bg-[transparent] h-[26px] flex-1 relative leading-[26px] text-neutral-04-100 text-left inline-block min-w-[250px] max-w-full p-0"
              placeholder="Username"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
        </div>
        {error && error.type === 'username' && (
          <span className="text-red-500 text-start text-[12px] space-x-3 -mt-7 ">
            {error.message}
          </span>
        )}

        <div className=" box-border flex flex-row items-start justify-start max-w-full border-b-[1px] border-solid ">
          <div className="flex-1 box-border flex flex-row items-start justify-start pt-0 px-0 pb-3 max-w-full border-b-[1px] border-solid ">
            <input
              className="w-full [border:none] [outline:none] font-button-s text-[12px] lg:text-[16px] bg-[transparent] h-[26px] flex-1 relative leading-[26px] text-neutral-04-100 text-left inline-block min-w-[250px] max-w-full p-0"
              placeholder="Email address"
              type="text"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>
        {error && error.type === 'email' && (
          <span className="text-red-500 text-start text-[12px] space-x-3 -mt-7 ">
            {error.message}
          </span>
        )}

        <div className="self-stretch box-border flex flex-row items-start justify-start max-w-full border-b-[1px] border-solid ">
          <div className="flex-1 box-border flex flex-row items-start justify-start pt-0 px-0 pb-2.5 max-w-full [row-gap:20px] border-b-[1px] border-solid  mq450:flex-wrap">
            <input
              className="w-[calc(100%_-_24px)] [border:none] [outline:none] font-button-s text-[12px] lg:text-[16px] bg-[transparent] h-[26px] flex-1 relative leading-[26px] text-neutral-04-100 text-left inline-block min-w-[281px] max-w-full p-0"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <div
              className="flex flex-col items-start justify-start pt-1 px-0 pb-0 cursor-pointer text-[24px] "
              onClick={handleShowPassword}
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </div>
          </div>
        </div>
        {error && error.type === 'password' && (
          <span className="text-red-500 text-start text-[12px] space-x-3 -mt-7 ">
            {error.message}
          </span>
        )}
        <div className="self-stretch flex flex-row items-start justify-start gap-[12px] max-w-full mq450:flex-wrap">
          <input className="m-0 h-[25px] w-6" type="checkbox" />
          <div className="flex-1 relative text-base leading-[26px] text-left inline-block min-w-[271px] max-w-full">
            <span className="font-button-s text-neutral-04-100">
              {" "}
              I agree with{" "}
            </span>
            <span className="font-semibold font-button-s text-neutral-07-100">
              Privacy Policy
            </span>
            <span className="font-button-s text-neutral-04-100"> and </span>
            <span className="font-semibold font-button-s text-neutral-07-100">
              Terms of Use
            </span>
          </div>
        </div>
        <button
          className="cursor-pointer [border:none] py-2.5 px-5 bg-neutral-07-100 self-stretch rounded-lg flex flex-row items-start justify-center whitespace-nowrap hover:bg-darkslategray text-white text-lg "
          type="submit"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </>
  );
}

export default RegistrationForm;
