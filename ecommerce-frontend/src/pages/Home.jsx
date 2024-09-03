import React, { useEffect } from "react";
import ImageCarousel from "../components/ImageCarousel";
import { FaArrowRightLong, FaEnvelope } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ProductsList from "../components/ProductsList";
import { valueCardData } from "../utils/constants";
import ValueCard from "../components/ValueCard";
import SaleBanner from "../assets/banner-image.png";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slice/ProductSlice";
import { carouselImages } from "../utils/constants";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, query: "", category: "" }));
  }, [dispatch]);
  return (
    <>
      <div className=" px-5 md:px-40 flex flex-col gap-10 lg:gap-20  ">
        {/* Image Carousel */}

        <div className="w-full">
          <ImageCarousel images={carouselImages} />
        </div>

        {/* Hero Heading Section */}
        <div className="w-full flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-1/2 flex items-start">
            <div className="text-inherit font-medium font-inherit max-w-full text-[30px] lg:text-[42px] ">
              <p className="m-0 text-neutral-07-100">
                <span>Simply Unique</span>
                <span className="text-gray-400 text-[32px] lg:text-[72px]">
                  /
                </span>
              </p>
              <p className="mt-0 text-neutral-07-100">
                <span>Simply Better.</span>
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex items-end justify-start lg:justify-end align-middle ">
            <div className=" leading-[26px] self-center ">
              <span className="font-semibold">3legant</span>
              <span className="text-dimgray">
                {" "}
                is a gift & decorations store based in HCMC, Vietnam. Est since
                2019.
              </span>
            </div>
          </div>
        </div>

        {/* Hero Heading Section End */}

        {/* Card Gellery Section */}

        <div>
          <div className="flex justify-center align-middle flex-col lg:flex-row gap-6">
            <div className=" bg-[url('assets/sofa-image-2.png')] bg-no-repeat bg-center bg-cover h-[250px] lg:h-[500px] w-full lg:w-1/2 ">
              <div className=" py-4 px-5 ">
                <h1 className="text-neutral-07-100">Living Rooms</h1>
                <Link to={"/shop"}>
                  <span className="border-b-2 border-black flex flex-row gap-5 w-fit text-neutral-07-100 text-[20px] mt-3 ">
                    Show now <FaArrowRightLong size={18} />{" "}
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col w-full lg:w-1/2 h-[500px] gap-6 ">
              <div className=" bg-[url('assets/element-image-2.png')] bg-no-repeat bg-center bg-cover h-[50%] w-full ">
                <div className=" py-4 px-5 ">
                  <h1 className="text-neutral-07-100">Drawing Room</h1>
                  <Link to={"/shop"}>
                    <span className="border-b-2 border-black flex flex-row gap-5 w-fit text-neutral-07-100 text-[20px] mt-3 ">
                      Show now <FaArrowRightLong size={18} />{" "}
                    </span>
                  </Link>
                </div>
              </div>
              <div className=" bg-[url('assets/element-image-3.png')] bg-no-repeat bg-center bg-cover h-[50%] w-full ">
                <div className=" py-4 px-5 ">
                  <h1 className="text-neutral-07-100">Kitchen</h1>
                  <Link to={"/shop"}>
                    <span className="border-b-2 border-black flex flex-row gap-5 w-fit text-neutral-07-100 text-[20px] mt-3 ">
                      Show now <FaArrowRightLong size={18} />{" "}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Gellery Section End */}

        {/* New Arrivals Section */}
        <div className="w-full flex items-end justify-between gap-5 text-left text-[40px] text-neutral-07-100  font-button-s ">
          {/* "New Arrivals" Heading */}
          <Link to="/new-arrivals" className="font-medium">
            <p className="m-0">New</p>
            <p className="m-0">Arrivals</p>
          </Link>

          {/* More Products Link */}
          <div className="flex items-center justify-center align-middle gap-2 text-base text-neutral-07-100 font-button-s border-b border-neutral-07-100">
            <Link to="/products" className="font-medium text-inherit">
              More Products
            </Link>
            <FaArrowRightLong />
          </div>
        </div>
      </div>
      {/* Product List */}
      <div className="mt-20 px-5 md:px-0 pl-0 md:pl-40  ">
        <ProductsList />
      </div>

      {/* Value Cards */}
      <div className="px-5 md:px-40 mt-20 ">
        <div className="flex flex-col lg:flex-row gap-5">
          {valueCardData.map((cardValue) => {
            return <ValueCard cardValue={cardValue} />;
          })}
        </div>
      </div>
      {/* Value Cards end */}

      {/* Sale Banner Start */}

      <div className="w-full flex mt-20 bg-[#f3f5f7]">
        <section className="flex flex-col md:flex-row items-start justify-start max-w-full gap-0 text-left text-neutral-07-100 font-button-s">
          {/* Image with responsive styles */}
          <img
            className="h-auto flex-1 w-full md:w-1/2 relative overflow-hidden object-cover min-h-[400px] mq750:min-w-full mq1125:flex-1"
            loading="lazy"
            alt="Sale Banner"
            src={SaleBanner}
          />

          {/* Text content with responsive styles */}
          <div className="flex flex-col items-start justify-center flex-1 w-full md:w-1/2 bg-[#f3f5f7] py-[140px] px-5 box-border gap-[24px]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
              <b className="uppercase text-blue">SALE UP TO 35% OFF</b>
              <h1 className="relative text-21xl font-medium font-headline-4">
                <p>
                  <span className="uppercase">Hundreds</span> of
                </p>
                <p>New lower prices!</p>
              </h1>
              <div className="text-xl">
                It’s more affordable than ever to give every room in your home a
                stylish makeover
              </div>
            </div>
            {/* Shop Now Button */}
            <div className="flex flex-row items-center justify-start gap-[4px] border-b-[1px] border-solid border-neutral-07-100">
              <div className="flex flex-row items-center justify-start">
                <Link className="flex flex-row gap-4 font-medium min-w-[76px]">
                  Shop Now <FaArrowRightLong />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Sale Banner end */}

      {/* Newsletter Section Start */}
      <div
        className={`w-full h-fit py-10 lg:py-0 lg:h-[350px] bg-[url('assets/newsletter-img.png')] bg-no-repeat bg-center bg-cover flex flex-col items-center align-middle justify-center `}
      >
        <div className="text-[25px] lg:text-[40px] font-medium ">
          Join Our Newsletter
        </div>
        <div className="text-[14px] lg:text-[18px] font-normal mt-4 font-button-s  ">
          Sign up for deals, new products and promotions
        </div>
        <div className="flex mt-4 w-[65%] lg:w-[35%] py-3 justify-between px-3 flex-row border-b-2 border-darkslategray text-darkslategray">
          <div className="flex gap-4  ">
            <FaEnvelope />
            <input
              type="text"
              placeholder="Email Address"
              className="bg-transparent border-none outline-none focus:border-none focus:outline-none"
            />
          </div>
          <div>
            <Link className="text-[12px] lg:text-[16px] font-button-s ">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      {/* Newsletter Section Start */}
    </>
  );
}

export default Home;
