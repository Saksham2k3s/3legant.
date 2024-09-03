import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementPage,
  fetchProducts,
  incrementPage,
  setPage,
} from "../redux/slice/ProductSlice";

function Pagination() {
  const dispatch = useDispatch();
  const { page, totalProducts, resultPerPage } = useSelector(
    (state) => state.products
  );
  const totalPages = Math.ceil(totalProducts / resultPerPage);

  const handlePageDecrement = () => {
    if (page > 1) {
      const newPage = page - 1;
      dispatch(decrementPage());
      dispatch(fetchProducts({ page: newPage }));
    }
  };

  const handlePageIncrement = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      dispatch(incrementPage());
      dispatch(fetchProducts({ page: newPage }));
    }
  };

  const handlePageFirst = () => {
    const newPage = 1;
    dispatch(setPage(newPage));
    dispatch(fetchProducts({ page: newPage }));
  };

  const handlePageLast = () => {
    dispatch(setPage(totalPages));
    dispatch(fetchProducts({ page: totalPages }));
  };

  return (
    <div className="w-full flex justify-center py-10 font-button-s">
      <div className="flex justify-center">
        <button
          className="bg-black p-3 text-white rounded-s-lg"
          onClick={handlePageFirst}
        >
          First
        </button>
        <button
          className="bg-black p-3 text-white border-x border-white"
          onClick={handlePageDecrement}
          disabled={page < 2}
        >
          Prev
        </button>
        <div className="bg-black p-3 text-white border-x border-white">
          {page}
        </div>
        <button
          className="bg-black p-3 text-white border-x border-white"
          onClick={handlePageIncrement}
          disabled={page === totalPages}
        >
          Next
        </button>
        <button
          className="bg-black p-3 text-white rounded-e-lg"
          onClick={handlePageLast}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Pagination;
