import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#ffffff4f] rounded-full p-2 cursor-pointer z-10"
    onClick={onClick}
  >
    <span className="text-black text-lg"><MdKeyboardArrowLeft color='black' /></span>
  </div>
);

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#ffffff4f] rounded-full p-2 cursor-pointer z-10"
    onClick={onClick}
  >
    <span className="text-black text-lg"><MdKeyboardArrowRight color='black' /></span>
  </div>
);

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => (
      <div className="h-2 w-2 bg-gray-300 rounded-full cursor-pointer hover:bg-black transition duration-300 ease-in-out">
        {/* You can also add an active class to style the active dot differently */}
      </div>
    ),
    appendDots: (dots) => (
      <div
        style={{
          bottom: '-30px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ul className=" list-none flex ">{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="w-50% lg:w-full h-50% lg:h-auto">
            <img src={image.url} alt={`Slide ${index + 1}`} className=" w-full h-[300px] lg:h-auto object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
