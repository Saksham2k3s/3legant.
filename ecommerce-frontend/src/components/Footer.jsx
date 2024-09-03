import React from 'react'
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <div className='w-full flex flex-col lg:flex-row justify-between align-middle bg-black text-white px-10 lg:px-40 py-5' >
     <Link className="font-medium inline-block min-w-[105px] text-[2.5rem] text-center lg:text-start font-headline-4 ">
          3legant.
     </Link>
     <div className=' flex justify-center align-middle mt-5 lg:mt-0  ' >
        <div className='w-fit flex gap-3 self-center text-2xl ' >
          <FaFacebook className=' cursor-pointer ' />
          <FaInstagram className=' cursor-pointer ' />
          <FaTwitter className=' cursor-pointer ' />
        </div>
     </div>
    </div>
  )
}

export default Footer