import React from "react";
import UIUX from "../../../public/UI UX Logo.svg"
function AddvertisingComponent() {
  return (
    <div className="bg-[#F5F2EB] mt-20 py-5 100px:px-10 1000px:p-20 1000px:pt-5 border-y border-black">
      
      <div className=" flex justify-center items-center flex-col">
      <div className=" text-center w-full text-[24px] 1000px:font-medium 1000px:text-left 1000px:text-[30px] p-5">
        What Hogwarts Offers You
      </div>
        <div className="mt-10  grid grid-cols-1 1000px:grid-cols-3 max-w-[1300px] border ">
          <div className=" h-[400px] 1000px:col-span-1 py-8 px-8 w-full 1000px:h-full 1000px:order-1"></div>
          <div className="grid grid-cols-1 800px:grid-cols-2 1000px:col-span-2 gap-10 justify-between py-8 px-8">
            <div className="max-w-[25rem]  rounded-md bg-[#87A1EC] border p-6 border-black border- mx-auto md:mx-0 ">
              <div>
                <img
                  src={UIUX}
                  className=" w-[40px] h-[40px] border border-black"
                  alt=""
                />
                <p className="mt-4 font-medium">UI/UX Design</p>
                <p className=" font-light text-[13px] mt-3">
                  Expand your skill set and create visually appeading,
                  user-friendly interfaces that leave a lasting impression on
                  users
                </p>
              </div>
            </div>
            <div className="max-w-[25rem]  rounded-md bg-[#FE90E7] border p-6 border-black border- mx-auto md:mx-0 ">
              <div>
                <img
                  src={UIUX}
                  className=" w-[40px] h-[40px] border border-black"
                  alt=""
                />
                <p className="mt-4 font-medium">UI/UX Design</p>
                <p className=" font-light text-[13px] mt-3">
                  Expand your skill set and create visually appeading,
                  user-friendly interfaces that leave a lasting impression on
                  users
                </p>
              </div>
            </div>
            <div className="max-w-[25rem]  rounded-md bg-[#FEC901] border p-6 border-black border- mx-auto md:mx-0 ">
              <div>
                <img
                  src={UIUX}
                  className=" w-[40px] h-[40px] border border-black"
                  alt=""
                />
                <p className="mt-4 font-medium">UI/UX Design</p>
                <p className=" font-light text-[13px] mt-3">
                  Expand your skill set and create visually appeading,
                  user-friendly interfaces that leave a lasting impression on
                  users
                </p>
              </div>
            </div>
            <div className="max-w-[25rem]  rounded-md bg-[#89EC87] border p-6 border-black border- mx-auto md:mx-0 ">
              <div>
                <img
                  src={UIUX}
                  className=" w-[40px] h-[40px] border border-black"
                  alt=""
                />
                <p className="mt-4 font-medium">UI/UX Design</p>
                <p className=" font-light text-[13px] mt-3">
                  Expand your skill set and create visually appeading,
                  user-friendly interfaces that leave a lasting impression on
                  users
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddvertisingComponent;
