import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "../../components/Search";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import toast from "react-hot-toast";
import { deleteProduct } from "../../redux/slice/Dashboard/DeleteProduct";
import { fetchProducts, removeProduct, setPage } from "../../redux/slice/ProductSlice";

function ProductStack() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userAuth);
  const { products, page } = useSelector((state) => state.products);
  const { succssMessage } = useSelector(state => state.deleteProduct)
  useEffect(() => {
    if (user.role === "user") {
      navigate("/");
    }

    dispatch(setPage(1))
  }, [dispatch, navigate, user.role]);

  const handleUpdate = (productId) => {
    navigate(`/admin/edit/${productId}`)
  };

  const handleDelete = (productId, event) => {
    event.stopPropagation();
     dispatch(deleteProduct(productId));
     dispatch(removeProduct(productId))
     if(succssMessage === "Product deleted Successfully!"){
       dispatch(fetchProducts());
     }
     toast.success("Product deleted Successfully!")
  };

  const redirectProductDetail = (productId, productCategory) => {
          navigate(`/${productCategory}/product/${productId}`)
  }
  return (
    <>
      <div className="px-10 min-h-screen bg-dashboard-bg ">
<div className="w-full flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between items-start lg:items-center py-5">
      {/* Title Section */}
      <div className="text-black font-headline-4 text-2xl lg:text-4xl mb-5 lg:mb-0 w-full lg:w-1/2">
        Product Stack
      </div>
      
      {/* Search and Button Section */}
      <div className="w-full lg:w-1/2 flex flex-col lg:flex-row justify-between items-center gap-5 ">
        {/* Search Component */}
        <SearchBar />

        {/* Add New Product Button */}
        <Link
          to="/dashboard/new"
          className="border border-black bg-black text-white w-full lg:w-auto text-center rounded-full flex flex-row gap-2 justify-center items-center px-4 py-2 font-headline-4 text-xl mt-5 lg:mt-0"
        >
          Add new product
        </Link>
      </div>
    </div>

        {/* Product Table */}
        <div className="w-full overflow-scroll lg:overflow-auto  overflow-y-hidden lg:overflow-x-hidden " >
          <table className=" w-full min-w-[500px] bg-white py-5  rounded-xl ">
            <thead className=" border py-10 ">
              <tr className="py-10 font-headline-4 ">
                <th>Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Actual Price</th>
                <th>Discount Prince</th>
                <th>Piece</th>
                <th>Available Color</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => {
                  return (
                    <tr className=" font-button-s cursor-pointer " onClick={() => redirectProductDetail(product._id, product.category)} key={product._id} >
                      <td className=" w-full flex justify-center " >
                        <div
                          className="border-2 h-16 w-16 rounded-md bg-no-repeat bg-cover bg-center border-table-border-color "
                          style={{
                            backgroundImage: `url(${product.images[0].url})`,
                          }}
                        ></div>
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.actualPrice}</td>
                      <td>{product.discountPrice}</td>
                      <td>{product.stock}</td>
                      <td>
                        <div className="w-full flex justify-center gap-3">
                          {products &&
                            product.colors &&
                            product.colors.map((color, index) => {
                              return (
                                <div
                                  key={index}
                                  className={`h-7 w-7 rounded-full border border-table-border-color `}
                                  style={{ backgroundColor: color }}
                                ></div>
                              );
                            })}
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center ">
                          <div
                            className=" text-darkslategray border border-table-border-color rounded-s-md flex p-2 cursor-pointer "
                            onClick={() => handleUpdate(product._id)}
                          >
                            {" "}
                            <FaRegEdit size={20} />{" "}
                          </div>
                          <div
                            className="text-red-500 border border-table-border-color rounded-e-md flex p-2 cursor-pointer "
                            onClick={(event) => handleDelete(product._id, event)}
                          >
                            <RiDeleteBinLine size={20} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>
    </>
  );
}

export default ProductStack;
