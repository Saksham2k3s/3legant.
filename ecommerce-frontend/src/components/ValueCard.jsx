import React from 'react';
import { Link } from 'react-router-dom';

function ValueCard({ cardValue }) {
  const { Icon, title, subtitle } = cardValue;
  return (
    <div
      className="w-full bg-[#f3f5f7] flex flex-col items-start justify-start py-12 px-8 box-border gap-[16px] leading-[normal] tracking-[normal] text-left text-xl text-neutral-07-100 font-caption"
    >
      {Icon}
      <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
        <Link className="[text-decoration:none] relative leading-[28px] font-medium font-headline-4 ">
          {title}
        </Link>
        <div className=" text-gray-700 text-sm font-button-s ">
          {subtitle}
        </div>
      </div>
    </div>
  );
}

export default ValueCard;
