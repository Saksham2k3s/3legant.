import React from 'react'
import { Link } from 'react-router-dom'
import { LuTicket } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { FaArrowRightLong } from "react-icons/fa6";
function OfferNavbar() {
  return (
    <>
      <div
      className={`w-full bg-neutral-02-100 flex flex-row items-start justify-between py-2 pr-4 pl-[524px] box-border leading-[normal] tracking-[normal] gap-[20px] text-center text-sm text-darkslategray font-button-xs`}
    >
      <div className="flex flex-row items-start justify-center gap-[12px]">
        <div className="flex flex-row items-center justify-center gap-[12px]">
          <LuTicket/>
          <div className=" leading-[22px] font-semibold">30% off storewide — Limited time!</div>
        </div>
        <div className="flex flex-row items-center justify-center text-left text-blue border-b-[1px] border-blue-500 border-solid border-blue">
          <Link className="flex flex-row items-center justify-start gap-[4px] text-blue-500  ">
            <div className=" leading-[24px] font-medium inline-block min-w-[69px] list-none outline-none ">
              Shop Now
            </div>
            <FaArrowRightLong/>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start cursor-pointer pt-0.5 px-0 pb-0">
       <RxCross1/>
      </div>
    </div>
    </>
  )
}

export default OfferNavbar