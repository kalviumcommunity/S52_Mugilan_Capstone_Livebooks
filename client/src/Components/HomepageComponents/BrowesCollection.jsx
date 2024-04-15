import React from "react";
import UIUX from "../../../public/UI UX Logo.svg"
import DM from "../../../public/Digital Marketing Logo.webp"
import Practice from "../../../public/practical learning.jpeg"
import WebD from "../../../public/web develp.jpeg"
function BrowesCollection() {
  return (
    <div className="content-center flex justify-center font-Unbounded mt-8 800px:px-5 1400px:px-16">
      <div className=" min-w-full">
        <div className="text-[24px] text-center 800px:text-left 1000px:text-[30px] 1000px:font-medium  ">
          Browse Top Essential Career Courses
        </div>

        <div className="grid grid-cols-1 800px:grid-cols-2 1100px:grid-cols-3 gap-10 1500px:grid-cols-4 justify-between py-8">
            
            <div className="w-[22rem] h-[17rem] rounded-md bg-[#87A1EC] border p-4 border-black border- mx-auto md:mx-0 ">
                <div>
                    <img src={UIUX} className=" w-[40px] h-[40px] border border-black" alt="" />
                    <p className="mt-4 font-medium" >UI/UX Design</p>
                    <p className=" font-light text-[13px] mt-3">
                        Expand your skill set and create visually appeading, user-friendly interfaces that leave a lasting impression on users 
                
                    </p>
                    <p className=" mt-5 ">
                        Tags
                    </p>
                    <div className=" flex  mt-3 ">
                        <button className=" py-2 px-3 mr-2 rounded-3xl bg-white border border-black text-[10px] m-0">
                            DesignThink
                        </button>
                        <button className=" py-2 px-3 mr-2 rounded-3xl bg-white border border-black text-[10px] m-0">
                            UserExp
                        </button>
                        <button className=" py-2 px-3 mr-2 rounded-3xl bg-white border border-black text-[10px] m-0">
                            UserExp
                        </button>
                    </div>
                </div>
            </div>


            <div className="w-[22rem] h-[17rem] rounded-md bg-[#FE90E7] border p-4 border-black border- mx-auto md:mx-0 ">
                <div>
                    <img src={WebD} className=" w-[40px] h-[40px] border border-black" alt="" />
                    <p className="mt-4 font-medium" >Web Development</p>
                    <p className=" font-light text-[13px] mt-3">
                        Expand your skill set and create dynamic, responsive websites that meet the needs of modern businesses.
                    </p>
                    <p className=" mt-5 ">
                        Tags
                    </p>
                    <div className=" flex  mt-3 ">
                        <button className=" py-2 px-3 mr-2 rounded-3xl bg-white border border-black text-[10px]">
                            DesignThink
                        </button>
                        <button className=" py-2 px-3 mr-2 rounded-3xl bg-white border border-black text-[10px]">
                            UserExp
                        </button>
                        <button className=" py-2 px-3 mr-2 rounded-3xl bg-white border border-black text-[10px]">
                            UserExp
                        </button>
                    </div>
                </div>
            </div>


            <div className="w-[22rem] h-[17rem] rounded-md bg-[#FEC901] border p-4 border-black border- mx-auto md:mx-0 ">
                <div>
                    <img src={DM} className=" w-[40px] h-[40px] border border-black" alt="" />
                    <p className="mt-4 font-medium" >Digital Marketing</p>
                    <p className=" font-light text-[13px] mt-3">
                        Expand your skill set and create visually appeading, user-friendly interfaces that leave a lasting impression on users 
                    </p>
                    <p className=" mt-5 ">
                        Tags
                    </p>
                    <div className=" flex  mt-3 ">
                        <button className=" py-2 px-3 mr-2 rounded-3xl bg-white border border-black text-[10px]">
                            DesignThink
                        </button>
                        <button className=" py-2 px-3 mr-2 rounded-3xl bg-white border border-black text-[10px]">
                            UserExp
                        </button>
                        <button className=" py-2 px-3 mr-2 rounded-3xl bg-white border border-black text-[10px]">
                            UserExp
                        </button>
                    </div>
                </div>
            </div>



            <div className="w-[22rem] h-[17rem] rounded-md bg-[#87A1EC] border p-4 border-black border- mx-auto md:mx-0 ">
                <div>
                    <img src={Practice} className=" w-[40px] h-[40px] border border-black" alt="" />
                    <p className="mt-4 font-medium" >Practical Learning</p>
                    <p className=" font-light text-[13px] mt-3">
                        Expand your skill set and create visually appeading, user-friendly interfaces that leave a lasting impression on users 
                    </p>
                    <p className=" mt-5 ">
                        Tags
                    </p>
                    <div className=" flex  mt-3 ">
                        <button className=" py-2 px-3 mr-2 rounded-3xl bg-white border border-black text-[10px]">
                            DesignThink
                        </button>
                        <button className=" py-2 px-3 mr-2 rounded-3xl bg-white border border-black text-[10px]">
                            UserExp
                        </button>
                        <button className=" py-2 px-3 mr-2 rounded-3xl bg-white border border-black text-[10px]">
                            UserExp
                        </button>
                    </div>
                </div>
            </div>
            

        </div>
      </div>
    </div>
  );
}

export default BrowesCollection;
