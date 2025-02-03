import {
  addIntoCart,
  setSuccessMessage as clearCartSuccessMessage,
} from "../redux/slice/CartSlice";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  wishlistProduct,
  setSuccessMessage as clearWishlistSuccessMessage,
  toggleWishlist,
} from "../redux/slice/WishlistSlice";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { isLoading, successMessage: cartSuccessMessage } = useSelector(
    (state) => state.cart
  );
  const { myProducts, successMessage: wishlistSuccessMessage } = useSelector(
    (state) => state.wishlist
  );
  const { name, _id, images, discountPrice, actualPrice } = product;

  useEffect(() => {
    let timeout;
    
    if (cartSuccessMessage) {
      timeout = setTimeout(() => {
        toast.success(cartSuccessMessage, { duration: 3000 });
        dispatch(clearCartSuccessMessage());
      }, 200);
    }

    if (wishlistSuccessMessage) {
      timeout = setTimeout(() => {
        toast.success(wishlistSuccessMessage, { duration: 3000 });
        dispatch(clearWishlistSuccessMessage());
      }, 200);
    }

    return () => clearTimeout(timeout); 
  }, [cartSuccessMessage, wishlistSuccessMessage, dispatch]);

  const handleProductAddingIntoCart = (event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(addIntoCart(_id));
  };

  // Add product to wishlist
  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(toggleWishlist(product))
    dispatch(wishlistProduct(_id));
  };

  // Return true if wishlist contains product id
  const wishlistContainsProduct = () => {
    // Check if the product is in the wishlist
    return myProducts.some((item) => item._id === _id);
  };

  function getDiscountPercentage() {
    if (actualPrice <= 0) return 0; // Prevent division by zero
    return Math.round(((actualPrice - discountPrice) / actualPrice) * 100);
}

  const stars = [1, 2, 3, 4, 5];
  return (
    <>
      <Link to={`/${product.category}/product/${product._id}`}>
        <div className="group w-full flex flex-col items-start justify-start gap-3  text-left text-base text-black ">
          <section className="relative w-full h-[200px] lg:w-full lg:h-full self-stretch flex flex-col items-start justify-start p-4 gap-[215px] text-center text-base text-black">
            <img
              className="w-full h-full absolute m-0 top-0 right-0 bottom-0 left-0 max-w-full overflow-hidden max-h-full object-cover"
              alt=""
              src={images ? images[0]?.url : ''}
            />
            <div className="self-stretch flex flex-row items-start justify-between gap-5">
              <div className=" items-start justify-start z-10 ">
                <div className="rounded bg-mediumseagreen items-start justify-start py-1 px-3.5 text-white">
                  {getDiscountPercentage()}%
                </div>
              </div>
              <div
                className="h-8 w-8 shadow-[0px_8px_16px_-8px_rgba(15,_15,_15,_0.12)] rounded-full bg-white flex flex-row items-center justify-center p-1.5 box-border z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => handleClick(e)}
              >
                {myProducts && wishlistContainsProduct() ? (
                  <FaHeart color="red " />
                ) : (
                  <FaRegHeart color="red" />
                )}
              </div>
            </div>
            <div
              className="cursor-pointer border-none py-[9px] px-[74px] bg-neutral-07-100 text-white shadow-[0px_8px_16px_rgba(0,_0,_0,_0.04)] rounded-lg flex flex-row items-start justify-start whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(event) => handleProductAddingIntoCart(event)}
            >
              {isLoading ? "Adding..." : "Add to Cart"}
            </div>
          </section>
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="self-stretch flex flex-col items-start justify-start gap-1">
                <div className="flex gap-1 text-darkslategray ">
                  {stars.map((num, idx) => (
                    <FaStar key={idx} size={15} />
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
