import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProducts } from "../redux/slice/WishlistSlice";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const { myProducts: products } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyProducts());
  }, [dispatch]);
  return (
    <>
      <div className="flex justify-center w-full px-5 mt-5 lg:my-10 md:px-20 lg:px-40">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products && products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
