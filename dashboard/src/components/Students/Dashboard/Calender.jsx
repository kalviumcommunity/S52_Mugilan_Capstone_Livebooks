import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

function Calender() {
  return (
    <div className="  p-3 flex flex-col border-2 border-black h-full w-full bg-[#FEC901] rounded-lg shadow-[4px_4px_1px__rgba(0,0,0,0.8)] ">
      <div className="shadow-[5px_5px_2px__rgba(0,0,0,0.7)] border-2 border-black rounded-md flex justify-center bg-[#84DACB]">
        <Calendar />
      </div>
      <div className=" overflow-y-auto w-full mt-5 h-full">

          <div className=" flex flex-col gap-4 h-full w-full overflow-y-auto p-2">
          <div className=" bg-[#84DACB] p-2 border border-black flex rounded-xl  shadow-[4px_4px_1px__rgba(0,0,0,0.7)]">
          <div className=" flex w-[80%]">
            <div className=" w-[50px] h-[50px] 800px:w-[3vw] 800px:h-[3vw] bg-slate-500 rounded-full"></div>
            <div className=" w-[60%]  1000px:w-[70%] flex flex-col justify-between pl-2 1000px:px-3">
              <div className=" text-sm 1200px:text-base">Flex box</div>
              <div className=" font-light text-xs 1200px:text-sm overflow-y-auto">cheet sheet</div>
            </div>
          </div>
          <div className=" w-[15%] flex items-end ">
            <div className=" align-text-bottom font-light  800px:font-normal 1300px:text-sm text-xs">
              25min
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
  );
}

export default Calender;
