import React, { useEffect } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addIntoCart, setSuccessMessage } from "../redux/slice/CartSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { isLoading, successMessage } = useSelector((state) => state.cart);
  const { name, _id, images, discountPrice, actualPrice } = product;

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(setSuccessMessage());
    }
  }, [successMessage, dispatch, product.category]);

  const handleProductAddingIntoCart = () => {
    dispatch(addIntoCart(_id));
  };

  const stars = [1, 2, 3, 4, 5];
  return (
    <>
      {/* <Link to={`/${product.category}/product/${product._id}`}>
        <div className=" w-full h-full self-center  flex flex-col items-center justify-center align-middle gap-3  text-left text-base text-black ">
          <section className="relative self-stretch flex flex-col w-full h-[250px] items-center justify-center p-4 text-center text-base text-black">
            <img
              className="w-full h-full absolute m-0 top-0 right-0 bottom-0 left-0 max-w-full overflow-hidden max-h-full object-cover"
              alt=""
              src={images[0].url}
            />
            <div className="self-stretch flex flex-row items-start justify-between gap-5">
              <div className=" items-start justify-start z-10 ">
                <div className="rounded bg-mediumseagreen items-start justify-start py-1 px-3.5 text-white">
                  -50%
                </div>
              </div>
              <div className="h-8 w-8 shadow-[0px_8px_16px_-8px_rgba(15,_15,_15,_0.12)] rounded-full bg-white flex flex-row items-center justify-center p-1.5 box-border z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <FaRegHeart color="red" />
              </div>
            </div>
            <button
              className=" self-center cursor-pointer border-none w-full py-[9px] px-[74px] bg-neutral-07-100 text-white shadow-[0px_8px_16px_rgba(0,_0,_0,_0.04)] rounded-lg flex flex-row items-start justify-start whitespace-nowrap z-30 opacity-0 group-hover:opacity-100 transition-opacity "
              onClick={handleProductAddingIntoCart}
            >
              {isLoading ? "Adding..." : "Add to Cart"}
            </button>
          </section>
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="self-stretch flex flex-col items-start justify-start gap-1">
                <div className="flex gap-1 text-darkslategray ">
                  {stars.map((num) => (
                    <FaStar size={15} />
                  ))}
                </div>
                <div className="self-stretch relative leading-6 font-semibold">
                  {name}
                </div>
                <div className="flex flex-row items-start justify-start py-0 pr-5 pl-0 gap-[12px] text-sm">
                  <div className="relative leading-[22px] font-semibold inline-block min-w-[56px] whitespace-nowrap">
                    ${discountPrice}
                  </div>
                  <div className="relative [text-decoration:line-through] leading-[22px] text-neutral-04-100 inline-block min-w-[57px] whitespace-nowrap">
                    ${actualPrice}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link> */}

<Link to={`/${product.category}/product/${product._id}`} >
    <div className="group w-full flex flex-col items-start justify-start gap-3  text-left text-base text-black ">
      <section className="relative w-full h-[200px] lg:w-full lg:h-full self-stretch flex flex-col items-start justify-start p-4 gap-[215px] text-center text-base text-black">
        <img
          className="w-full h-full absolute m-0 top-0 right-0 bottom-0 left-0 max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src={images[0]?.url}
        />
        <div className="self-stretch flex flex-row items-start justify-between gap-5">
          <div className=" items-start justify-start z-10 ">
            <div className="rounded bg-mediumseagreen items-start justify-start py-1 px-3.5 text-white">
              -50%
            </div>
          </div>
          <div className="h-8 w-8 shadow-[0px_8px_16px_-8px_rgba(15,_15,_15,_0.12)] rounded-full bg-white flex flex-row items-center justify-center p-1.5 box-border z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <FaRegHeart color="red" />
          </div>
        </div>
        <button
          className="cursor-pointer border-none py-[9px] px-[74px] bg-neutral-07-100 text-white shadow-[0px_8px_16px_rgba(0,_0,_0,_0.04)] rounded-lg flex flex-row items-start justify-start whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleProductAddingIntoCart}
        >
          { isLoading ? 'Adding...' : 'Add to Cart' }
        </button>
      </section>
      <div className="self-stretch flex flex-col items-start justify-start">
        <div className="self-stretch flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-col items-start justify-start gap-1">
            <div className="flex gap-1 text-darkslategray ">
              {stars.map((num) => (
                <FaStar size={15} />
              ))}
            </div>
            <div className="self-stretch relative leading-6 font-semibold">
              {name}
            </div>
            <div className="flex flex-row items-start justify-start py-0 pr-5 pl-0 gap-[12px] text-sm">
              <div className="relative leading-[22px] font-semibold inline-block min-w-[56px] whitespace-nowrap">
                ${discountPrice}
              </div>
              <div className="relative [text-decoration:line-through] leading-[22px] text-neutral-04-100 inline-block min-w-[57px] whitespace-nowrap">
                ${actualPrice}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
    </>
  );
}

export default ProductCard;
