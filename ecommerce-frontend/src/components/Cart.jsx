import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  removeProduct,
} from "../redux/slice/CartSlice";
import toast from "react-hot-toast";
function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0)
  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
    dispatch(removeFromCart(productId));
  };

 useEffect(() => {
  if(cart.length > 0){
    const totalPriceSum = cart.reduce((preValue, item) => (
        preValue += item.quantity * item.product.discountPrice
    ), 0)
    setTotal(totalPriceSum);
  }

  
 },[cart])

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };
  return (
    <>
      <div className=" p-4 ">
        <div className="flex w-full  ">
          <div className="w-1/2 text-black text-start">
            <h1 className=" font-headline-4 ">Cart</h1>
          </div>
        </div>
        {
          cart.length === 0 ? (
            <div className=" h-full  flex flex-col justify-center align-middle items-center" >
              <img src="https://cdn-icons-png.flaticon.com/128/17389/17389099.png" alt="empty-cart" className="h-[30%] w-[30%]" />
               <h3 className="text-xl lg:text-3xl text-black font-headline-4" >Your Cart Is Empty Now</h3>
               <br/>
               <div>
               <Link to={'/shop'} className="text-md font-button-s underline " >Shop now</Link>
               </div>
            </div>
          ) : ( <div className="" >
            {cart && cart.map((item) => {
              return (
              item && item.product && (
                  <div className="w-full h-[150px] flex flex-row gap-4 border-b-gray-300 border-b-2  ">
                    <div className="w-[30%] py-3 ">
                      <img
                        src={item?.product?.images[0]?.url}
                        alt="table-img"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex flex-row justify-between w-[70%] py-3">
                      <div className="flex flex-col justify-evenly w-full">
                        <div className="text-black font-button-s text-md font-semibold mb-2">
                          {item.product.name}
                        </div>
                        <div className="text-darkslategray font-button-s text-sm mb-2">
                          Color: Black
                        </div>
                        <div className="border border-black rounded-md flex flex-row items-center px-2 py-1 w-fit">
                          <button
                            className="w-8 h-8 flex items-center justify-center"
                            onClick={() => handleIncrement(item.product._id)}
                          >
                            <FaPlus size={10} />
                          </button>
                          <div className="w-8 h-8 flex items-center justify-center text-lg ">
                            {item.quantity}
                          </div>
                          <button
                            className="w-8 h-8 flex items-center justify-center"
                            onClick={() => handleDecrement(item.product._id)}
                          >
                            <FaMinus size={10} />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col w-[30%] py-3">
                        <div className=" font-headline-4 text-start text-black">
                          {item.product.price}
                        </div>
                        <div
                          className=" text-darkslategray mt-3 cursor-pointer  "
                          onClick={() => handleRemoveProduct(item.product._id)}
                        >
                          <RxCross1 size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) 
              );
            })}
            </div>)
        }
       
       <div className="bg-black py-2 w-full text-white text-center rounded-xl absolute bottom-12 font-button-s " >Total: ${total}</div>
       <button className="w-full border-2 border-black rounded-xl font-button-s text-black bg-white outline-none absolute bottom-2 py-2 font-semibold" onClick = {() => {toast.success("Order Places Successfully")}} >Place Order</button>
      </div>
    </>
  );
}

export default Cart;
