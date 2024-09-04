import React, { useEffect, useState, } from "react";
import {
  FaStar,
  FaPlus,
  FaMinus,
  FaArrowRightLong,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { Link } from "react-router-dom";
import ProductsList from "../components/ProductsList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../redux/slice/ProductDetailSlice";
import { addIntoCart } from "../redux/slice/CartSlice";
import ImageCarousel from "../components/ImageCarousel";
import toast from "react-hot-toast";
import { fetchProducts } from "../redux/slice/ProductSlice";

function ProductDetail() {
  const stars = [1, 2, 3, 4, 5];
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.productDetail);
  const { user } = useSelector((state) => state.userAuth);
  const [selectedColor, setSelectedColor] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (productDetail.colors && productDetail.colors.length > 0) {
      setSelectedColor(productDetail.colors[0]);
    }
  }, [productDetail.colors]);

  // Add a visibility state for each additional information section
  const [additionalInfos, setAdditionalInfos] = useState([]);

  useEffect(() => {
    if (productDetail.additionalInfos) {
      // Initialize the visibility state
      const infosWithVisibility = productDetail.additionalInfos.map((info) => ({
        ...info,
        isVisible: false,
      }));
      setAdditionalInfos(infosWithVisibility);
    }
  }, [productDetail.additionalInfos]);

  const toggleVisibility = (index) => {
    const updatedInfos = additionalInfos.map((info, idx) => {
      if (idx === index) {
        return { ...info, isVisible: !info.isVisible };
      }
      return info;
    });
    setAdditionalInfos(updatedInfos);
  };

  const handleProductAddingIntoCart = () => {
    dispatch(addIntoCart(id));
  };

  if (!productDetail || !productDetail.images) {
    return <div>Loading...</div>;
  }

  const handleNewsletterSignUp = () => {
    if (email === "") {
      toast.error("Please Enter email first");
    } else {
      toast.success("Thanks for signup our newsletter!");
    }
  };

  return (
    <>
      <div className="px-5 md:px-40 flex flex-col gap-10 lg:gap-20 ">
        {/* Product Details */}
        <div className=" flex flex-col lg:flex-row gap-4 w-full py-5 ">
          {/* Product Images */}
          <div className="w-full lg:w-1/2">
            <div className="block lg:hidden">
              <div className="w-full">
                <ImageCarousel images={productDetail?.images} />
              </div>
            </div>
            <div className="hidden lg:block ">
              <div className="flex flex-wrap gap-5 w-full py-5 ">
                {productDetail.images.map((image, idx) => {
                  return (
                    <img
                      key={image.id}
                      src={image.url}
                      alt={`image-${idx}`}
                      className="w-[40%] h-[300px]"
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Other details */}

          <div className=" relative flex flex-col flex-wrap gap-5 w-full lg:w-1/2  pr-0 lg:pr-20">
            {user.role === "admin" && (
              <div className=" ">
                <Link
                  to={`/admin/edit/${productDetail._id}`}
                  className=" absolute top-6 right-2 bg-black font-button-s text-white px-3 py-2 font-semibold rounded-full text-sm"
                >
                  Edit product
                </Link>
              </div>
            )}
            <div className="flex gap-5">
              <div className="flex gap-1 text-black">
                {stars.map((num) => (
                  <FaStar key={num} size={15} />
                ))}
              </div>
              <div className="text-md font-button-s text-darkslategray cursor-pointer">
                11 Reviews
              </div>
            </div>
            {/* Name and Description */}
            <div className="text-start w-full flex flex-col gap-5">
              <div className="text-black font-headline-4 text-4xl">
                {productDetail.name}
              </div>
              <div className="text-darkslategray font-button-s text-md leading-6 tracking-wide">
                {productDetail.description}
              </div>
              <div className="flex gap-5">
                <div className="text-black font-headline-4 text-2xl">
                  ${productDetail.discountPrice}
                </div>
                <div className="[text-decoration:line-through] text-neutral-04-100 text-lg">
                  ${productDetail.actualPrice}
                </div>
              </div>
              <div className="text-md font-button-s text-darkslategray font-semibold">
                Measurements
              </div>
              <div className="text-xl text-black font-headline-4">
                {productDetail.measurements}
              </div>
              <div className="text-md font-button-s text-darkslategray font-semibold">
                {`Choose Color > `}
              </div>
              <div className="text-xl text-black font-headline-4 flex gap-2">
                {productDetail.colors &&
                  productDetail.colors.map((color, index) => {
                    return (
                      <div
                        key={index}
                        className={`h-7 w-7 rounded-full cursor-pointer ${
                          selectedColor === color
                            ? "border-y-2 border-x-2 border-blue"
                            : "border border-table-border-color"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      ></div>
                    );
                  })}
              </div>
            </div>
            <div className="flex gap-5">
              <div className="bg-[#f3f5f7] rounded-md flex flex-row items-center px-2 py-1 w-fit">
                <div className="w-8 h-8 flex items-center justify-center">
                  <FaPlus size={10} />
                </div>
                <div className="w-8 h-8 flex items-center justify-center text-lg">
                  {"1"}
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                  <FaMinus size={10} />
                </div>
              </div>
              <div className="border border-black text-center rounded-md flex flex-row gap-2 justify-center items-center px-2 py-1 w-full font-headline-4 text-xl">
                <GoHeart /> Wishlist
              </div>
            </div>
            <div
              className="cursor-pointer border-none py-[9px] px-[74px] bg-neutral-07-100 text-white shadow-[0px_8px_16px_rgba(0,_0,_0,_0.04)] rounded-lg flex flex-row items-center justify-center"
              onClick={handleProductAddingIntoCart}
            >
              Add to Cart
            </div>
            <div>
              {additionalInfos.map(
                (info, index) =>
                  info.title &&
                  info.content && (
                    <div key={index} className="mt-4 w-full">
                      <div
                        className="border-b-2 border-black flex justify-between py-3 align-baseline cursor-pointer"
                        onClick={() => toggleVisibility(index)}
                      >
                        <div className=" font-headline-4 text-xl">
                          {info.title}
                        </div>
                        <FaChevronDown
                          size={20}
                          className={`cursor-pointer transition-transform duration-300 ${
                            info.isVisible ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      {info.isVisible && (
                        <div className="text-darkslategray font-button-s text-md leading-6 tracking-wide mt-2">
                          {info.content}
                        </div>
                      )}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        {/* More Products */}
        <div
          className={`static w-full flex flex-row items-end justify-between gap-[20px] text-left text-[40px] text-neutral-07-100 font-poppins`}
        >
          <Link className="text-2xl lg:text-4xl">
            <p className="m-0">You might also like</p>
          </Link>
          <div className="flex flex-row items-center justify-start gap-[4px] text-base text-neutral-07-100 font-button-s border-b-[1px] border-solid border-neutral-07-100">
            <div className="flex flex-row items-center justify-start">
              <Link className="font-medium text-[inherit] inline-block min-w-[108px]">
                More Products
              </Link>
            </div>
            <FaArrowRightLong />
          </div>
        </div>
      </div>

      {/* product list */}
      <div className="mt-20 px-5 pl-0 md:pl-40 md:px-0 ">
        <ProductsList />
      </div>

      {/* Newsletter Section Start */}
      <div
        className={`w-full mt-20 h-fit py-10 lg:py-0 lg:h-[350px] bg-[url('assets/newsletter-img.png')] bg-no-repeat bg-center bg-cover flex flex-col items-center align-middle justify-center`}
      >
        <div className="text-[25px] lg:text-[40px] font-medium">
          Join Our Newsletter
        </div>
        <div className="text-[14px] lg:text-[18px] font-normal mt-4 font-button-s">
          Sign up for deals, new products and promotions
        </div>
        <div className="flex mt-4 w-[65%] lg:w-[35%] py-3 justify-between px-3 flex-row border-b-2 border-darkslategray text-darkslategray">
          <div className="flex gap-4">
            <FaEnvelope />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="bg-transparent border-none outline-none focus:border-none focus:outline-none"
            />
          </div>
          <div>
            <Link
              className="text-[12px] lg:text-[16px] font-button-s"
              onClick={handleNewsletterSignUp}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      {/* Newsletter Section Start */}
    </>
  );
}

export default ProductDetail;
