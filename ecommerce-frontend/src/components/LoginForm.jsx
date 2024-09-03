import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleRegister,
  setShowPassword,
} from "../redux/slice/LoginSignUpSlice";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { loginUser, setErrorMessage } from "../redux/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginValidation } from "../validations/userValidation";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPassword } = useSelector((state) => state.loginSignUp);
  const { isLoading, errorMessage, user } = useSelector(
    (state) => state.userAuth
  );
  const [formData, setFormData] = useState({
    loginIdentifier: "",
    password: "",
  });

  const [error, setError] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    if (user && user.name) {
      toast.success(`Welcome back ${user.name}`);
      navigate("/");
    }

    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [user, errorMessage, navigate]);

  const handleRegister = () => {
    dispatch(toggleRegister());
  };

  const handleShowPassword = () => {
    dispatch(setShowPassword());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setErrorMessage("")); // Reset error state
    // Check form validation
    const validationResult = LoginValidation.safeParse(formData);
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

    if (validationResult.success) {
      dispatch(loginUser(formData));
    }
  };

  return (
    <>
      <form
        className="m-0 self-center flex flex-col gap-[32px] max-w-full"
        onSubmit={handleSubmit}
      >
        <div className="self-stretch flex flex-col items-start justify-start max-w-full">
          <div className="self-stretch flex flex-row items-start justify-start max-w-full">
            <div className="flex-1 flex flex-row items-start justify-start gap-[16px] max-w-full">
              <h1 className="m-0 flex-1 relative text-start text-21xl font-medium text-xl lg:text-4xl">
                Sign In
              </h1>
            </div>
          </div>
          <div className="relative text-left text-[12px] lg:text-[16px] mt-2 ">
            <span className="font-button-s">
              <span className="text-neutral-04-100 ">
                Do not have an account?
              </span>
            </span>
            <Link
              className="font-semibold font-button-s text-mediumseagreen outline-none"
              onClick={handleRegister}
            >
              Sign Up
            </Link>
          </div>

        </div>
        <div className="box-border flex flex-row items-start justify-start max-w-full border-b-[1px] border-solid">
          <div className="flex-1 box-border flex flex-row items-start justify-start pt-0 px-0 pb-3 max-w-full border-b-[1px] border-solid">
            <input
              className="w-full [border:none] [outline:none] font-button-s text-[12px] lg:text-[16px] bg-[transparent] h-[26px] flex-1 relative leading-[26px] text-neutral-04-100 text-left inline-block min-w-[250px] max-w-full p-0"
              placeholder="Your username or email address"
              type="text"
              value={formData.loginIdentifier}
              onChange={(e) =>
                setFormData({ ...formData, loginIdentifier: e.target.value })
              }
            />
          </div>
        </div>
        {error && error.type === "email" && (
          <span className="text-red-500 text-start text-[12px] space-x-3 -mt-7">
            {error.message}
          </span>
        )}

        <div className="self-stretch box-border flex flex-row items-start justify-start max-w-full border-b-[1px] border-solid">
          <div className="flex-1 box-border flex flex-row items-start justify-start pt-0 px-0 pb-2.5 max-w-full [row-gap:20px] border-b-[1px] border-solid mq450:flex-wrap">
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
              className="flex flex-col items-start justify-start pt-1 px-0 pb-0 cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? (
                <IoEyeOffOutline size={20} />
              ) : (
                <IoEyeOutline size={20} />
              )}
            </div>
          </div>
        </div>
        {error && error.type === "password" && (
          <span className="text-red-500 text-start text-[12px] space-x-3 -mt-7">
            {error.message}
          </span>
        )}
        
        <button
          className="cursor-pointer [border:none] py-2.5 px-5 bg-neutral-07-100 self-stretch rounded-lg flex flex-row items-start justify-center whitespace-nowrap hover:bg-darkslategray text-white text-lg"
          type="submit"
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </>
  );
}

export default LoginForm;