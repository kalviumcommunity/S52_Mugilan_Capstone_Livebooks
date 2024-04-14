import React from "react";
import send from "../assets/Icons/Vector.png";
function Footer() {
  return (
    <div>
      <div className="w-full h-auto 1000px:h-[400px] 1000px:p-12 grid grid-cols-1 1000px:grid-cols-3 bg-[#DDDEEF] p-10 ">
        <div className=" grid grid-cols-1 gap-10 1000px:grid-cols-2 1000px:col-span-2 1000px:order-1">
          {/* 1st box */}
          <div className="grid grid-cols-2 gap-16">
            {/* 1st box */}
            <div>
              <h1 className=" text-[18px] mb-4 font-bold 1000px:font-medium">Company</h1>
              <p className="text-[14px] font-thin pt-3 1000px:pt-5" >Blog</p>
              <p className="text-[14px] font-thin pt-3 1000px:pt-5">Contact us</p>
              <p className="text-[14px] font-thin pt-3 1000px:pt-5">Pricing</p>
              <p className="text-[14px] font-thin pt-3 1000px:pt-5">Testimonials</p>
            </div>
            {/* 2st box */}
            <div>
              <h1 className="text-[18px] mb-4 font-bold 1000px:font-medium">Support</h1>
              <p className="text-[14px] font-thin pt-3 1000px:pt-5">Help center</p>
              <p className="text-[14px] font-thin pt-3 1000px:pt-5">Legal</p>
              <p className="text-[14px] font-thin pt-3 1000px:pt-5">Status</p>
            </div>
          </div>
          {/* 2nd box */}
          <div className="text-[18px] font-bold flex flex-col 1000px:font-medium">
            Stay up to date
            <div className="flex items-center">
              <input
                type="text"
                className=" text-[13px] mt-5 w-[60%] py-3 px-4 bg-[#E4E5F2] placeholder:font-light placeholder:text-black rounded-l-md focus:outline-none focus:border-transparent"
                placeholder="Your email address"
              />
              <img
                className="w-[44px] h-[44px] mt-5 bg-[#E4E5F2] py-[10px] px-[10px] rounded-r-md"
                src={send}
                alt="send"
              />
            </div>
          </div>

        </div>
        <div className=" flex flex-col mt-10 1000px:mt-0  ">
            <h1 className="text-[17px] font-bold 1000px:font-medium">Copyright © 2024 ** ltd.</h1>
            <h1 className="text-[13px] py-3 font-light">All rights reserved</h1>
            <div className="flex gap-7 py-3">
                <div className="bg-[#E4E5F2] w-[50px] h-[50px] rounded-full ">

                </div>
                <div className="bg-[#E4E5F2] w-[50px] h-[50px] rounded-full ">

                </div>

            </div>

        </div>
      </div>
    </div>
  );
}

export default Footer;
