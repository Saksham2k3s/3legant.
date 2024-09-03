import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaChevronDown } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { addProduct } from "../../redux/slice/Dashboard/ProductSlice";
import toast from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";
function AddProduct() {
  const { user } = useSelector((state) => state.userAuth);
  const { successMessage, isLoading } = useSelector(
    (state) => state.adminProduct
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    discountPrice: "",
    actualPrice: "",
    category: "",
    stock: "",
    measurements: "",
    colors: [],
    additionalInfos: [],
  });
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isColorInputVisible, setIsColorInputVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (user.role === "user") {
      navigate("/");
    }
  }, [navigate, user.role]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [productData.description]);

  const handleAddColor = () => {
    if (!productData.colors.includes(selectedColor)) {
      setProductData({
        ...productData,
        colors: [...productData.colors, selectedColor],
      });
    }
    setIsColorInputVisible(false); // Hide the color input after adding the color
  };

  const handleAddAdditionalInfo = () => {
    setProductData({
      ...productData,
      additionalInfos: [
        ...productData.additionalInfos,
        { title: "", content: "", isVisible: false },
      ],
    });
  };

  const handleToggleAdditionalInfoVisibility = (index) => {
    const updatedAdditionalInfos = productData.additionalInfos.map(
      (info, idx) =>
        idx === index ? { ...info, isVisible: !info.isVisible } : info
    );
    setProductData({ ...productData, additionalInfos: updatedAdditionalInfos });
  };

  const handleAdditionalInfoChange = (index, field, value) => {
    const updatedAdditionalInfos = productData.additionalInfos.map(
      (info, idx) => (idx === index ? { ...info, [field]: value } : info)
    );
    setProductData({ ...productData, additionalInfos: updatedAdditionalInfos });
  };

  //Submit Product

  // Submit Product
  const handleAddProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in productData) {
      if (key === "additionalInfos") {
        formData.set(key, JSON.stringify(productData[key]));
      } else {
        formData.set(key, productData[key]);
      }
    }

    images.forEach((image) => {
      formData.append("images", image);
    });

    //Form validations
      dispatch(addProduct(formData));
    

    if (successMessage) {
      toast.success(successMessage);
      setProductData({
        name: "",
        description: "",
        discountPrice: "",
        actualPrice: "",
        category: "",
        stock: "",
        measurements: "",
        colors: [],
        additionalInfos: [],
      })
      setImages([])
    }
  };

  //Image upload

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  //Remove image

  const removeImageHandler = (index) => {
    const filtedImage = images.filter((_, idx) => idx !== index);
    setImages(filtedImage);
    setImagesPreview(filtedImage);
    setProductData((prev) => ({
      ...prev,
      images: filtedImage,
    }));
  };

  //Remove Additional Infos

  const removeAdditionalInfosHandler = (index) => {
    const filtedInfos = productData.additionalInfos.filter((_, idx) => idx !== index);
    setProductData((prev) => ({
        ...prev,
        additionalInfos : filtedInfos
    }))
  }

  //Remove Colors

  const removeColorHandler = (index) => {
    const filtedColors = productData?.colors.filter((_, idx) => idx !== index);
    setProductData((prev) => ({
      ...prev,
      colors : filtedColors
  }))
  }

  return (
    <>
      <form action="" encType="multipart/form-data" onSubmit={handleAddProduct}>
        <div className="px-10 min-h-screen bg-dashboard-bg py-5 ">
          <div className="text-black font-headline-4 text-2xl lg:text-4xl ">
            Add Product
          </div>
          {/* Product Details */}
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="flex flex-wrap gap-5 lg:gap-5 w-full lg:w-1/2 mt-0 lg:mt-4">
              {/* Product Category */}
              <div className="w-full items-start mt-0 lg:mt-4">
                <br />
                <input
                  type="text"
                  placeholder="Product Category"
                  className="text-black font-headline-4 bg-transparent border-none outline-none w-fit focus:outline-none placeholder:text-black placeholder:font-semibold mt-5 lg:mt-0 "
                  value={productData.category}
                  onChange={(e) =>
                    setProductData({ ...productData, category: e.target.value })
                  }
                />
              </div>

              {/* Product Images */}
              <div className="relative flex flex-wrap justify-center gap-7 lg:gap-5 w-full lg:w-full mt-4">
                {imagesPreview.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-[25%] h-[100px] lg:w-[40%] lg:h-[270px]"
                  >
                    <div className="cursor-pointer absolute -top-1 -right-1 bg-red-600 rounded-full ">
                      <RxCrossCircled
                        size={20}
                        color="white"
                        onClick={() => removeImageHandler(index)}
                      />
                    </div>
                    <img
                      src={image.url ? image.url : image}
                      alt={`Uploaded ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <label className="w-[20%] h-[150px] lg:w-[40%] lg:h-[300px] flex items-center justify-center border border-dashed cursor-pointer">
                  <LuImagePlus size={50} />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    name="images"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            {/* Other details */}
            <div className="flex flex-col flex-wrap justify-between  gap-5 w-full lg:w-1/2 sm:pr-0 lg:pr-20 ">
              {/* Name and Description */}
              <div className="text-start w-full flex flex-col gap-5 ">
                <div className="text-black font-headline-4 text-2xl lg:text-4xl items-baseline ">
                  <br />
                  <input
                    type="text"
                    placeholder="Enter Product Title"
                    className="text-black font-headline-4 bg-transparent border-none outline-none w-fit focus:outline-none placeholder:text-black placeholder:font-medium mt-5 lg:mt-0 "
                    value={productData.name}
                    onChange={(e) =>
                      setProductData({ ...productData, name: e.target.value })
                    }
                  />{" "}
                </div>
                <div className="text-darkslategray font-button-s text-md leading-6 tracking-wide">
                  <textarea
                    placeholder="Add description"
                    ref={textareaRef}
                    className="text-darkslategray bg-transparent border-none outline-none focus:outline-none resize-none w-full h-auto"
                    value={productData.description}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        description: e.target.value,
                      })
                    }
                    rows={1}
                  />
                </div>

                {/* Price */}
                <div className="flex flex-col lg:flex-row gap-5 lg:2 w-full ">
                  <div className="text-black font-headline-4 text-2xl flex gap-3 w-[30%] ">
                    $
                    <input
                      type="number"
                      placeholder="Add Price"
                      className="bg-transparent border-none outline-none focus:outline-none h-auto placeholder:text-black font-headline-4 "
                      value={productData.discountPrice}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          discountPrice: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="text-black font-headline-4 text-lg flex gap-3 items-center w-full ">
                    $
                    <input
                      type="number"
                      placeholder="Add MRP or Price before discount"
                      className="bg-transparent border-none outline-none focus:outline-none w-full h-auto placeholder:text-black font-headline-4 appearance-auto "
                      value={productData.actualPrice}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          actualPrice: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Measurements */}
                <div className="text-md font-button-s text-darkslategray font-semibold mt-4">
                  <input
                    placeholder="Measurements"
                    className="text-darkslategray bg-transparent border-none outline-none focus:outline-none resize-none w-full h-auto placeholder:text-darkslategray placeholder:text-md "
                    value={productData.measurements}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        measurements: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Pieces */}

                <div className="text-black font-headline-4 text-lg flex gap-3 items-center w-full mt-5 ">
                  <input
                    type="number"
                    placeholder="Number of Pieces"
                    className="bg-transparent border-none outline-none focus:outline-none w-full h-auto placeholder:text-black font-headline-4 appearance-auto "
                    value={productData.stock}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        stock: e.target.value,
                      })
                    }
                  />
                </div>

                  {/* Colors */}
                  <div className="text-md font-button-s text-darkslategray font-semibold mt-5">
                  <button
                    className="flex items-center"
                    onClick={() => setIsColorInputVisible(!isColorInputVisible)}
                  >
                    Add colors <FaPlusCircle size={20} className="ml-1" />
                  </button>
                  {isColorInputVisible && (
                    <div className="flex items-center mt-2">
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                      />
                      <button
                        className="ml-2 py-1 px-2"
                        onClick={handleAddColor}
                      >
                        <FaPlusCircle size={20} color="black" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Display Selected Colors */}
                <div className="flex flex-wrap gap-2 mt-2 ">
                  {productData.colors.map((color, index) => (
                   <>
                    <div className="relative" >
                      <div className="absolute bg-red-500  rounded-full cursor-pointer " onClick={() => removeColorHandler(index)} >< RxCrossCircled size={15} color="white" /></div>
                    <div
                      key={index}
                      className="w-10 h-10 rounded-full border-2 border-red-500 "
                      style={{ backgroundColor: color }}
                    ></div>
                    </div>
                   </>
                  ))}
                </div>

                {/* Additional Info Section */}

                              {/* Additional Info Section */}

                              {productData.additionalInfos.map((info, index) => (
                  <div key={index} className="mt-4 w-full ">
                    <div className="border-b-2 border-black flex justify-between py-3 align-baseline ">
                      <input
                        type="text"
                        placeholder="Additional Info Title"
                        className="text-black font-headline-4 text-xl bg-transparent border-none outline-none focus:outline-none"
                        value={info.title}
                        onChange={(e) =>
                          handleAdditionalInfoChange(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                      />
                      <div className="flex flex-row gap-2" >
                      <FaChevronDown
                        size={20}
                        className={`cursor-pointer transition-transform duration-300 ${
                          info.isVisible ? "rotate-180" : ""
                        }`}
                        onClick={() =>
                          handleToggleAdditionalInfoVisibility(index)
                        }
                      />
                      <button className="text-sm rounded-xl text-black font-button-s bg-gray-200 px-2 py-1" onClick={() => removeAdditionalInfosHandler(index)} >Remove</button>
                      </div>
                    </div>
                    {info.isVisible && (
                      <div className="text-darkslategray font-button-s text-md leading-6 tracking-wide mt-2">
                        <textarea
                          placeholder="Add additional information"
                          className="text-darkslategray bg-transparent border-none outline-none focus:outline-none resize-none w-full h-auto"
                          value={info.content}
                          onChange={(e) =>
                            handleAdditionalInfoChange(
                              index,
                              "content",
                              e.target.value
                            )
                          }
                          rows={1}
                        />
                      </div>
                    )}
                  </div>
                ))}

                {/* Button to Add New Additional Info */}
                <div className="flex items-center mt-4">
                  <FaPlusCircle
                    size={20}
                    className="mr-2 cursor-pointer"
                    onClick={handleAddAdditionalInfo}
                  />
                  <span className="text-darkslategray font-button-s text-md">
                    Add other information
                  </span>
                </div>
              </div>

              <button
                className="cursor-pointer border-none py-5 px-[74px] bg-neutral-07-100 text-white shadow-[0px_8px_16px_rgba(0,_0,_0,_0.04)] rounded-full flex flex-row items-center justify-center w-[70%] lg:w-[50%] font-button-s "
                type="submit"
              >
                {isLoading ? "Adding..." : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
