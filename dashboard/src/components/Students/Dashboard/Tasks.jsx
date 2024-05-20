import React from "react";

function Tasks() {
  return (
    <div className=" w-[100%] 1000px:w-[50%] h-[50%] 1000px:h-full mb-4 1000px:mb-0">
    <div className=" p-3  h-full w-full ">
      <div className="font-normal text-lg 1200px:text-xl">Today's Task</div>

      <div className=" w-[30%] mb-2 h-[10%] bg-slate-500 mt-4 rounded-3xl"></div>

      <div className=" overflow-y-auto flex flex-col gap-4 h-[75%] w-full  p-2">
      

        <div className=" bg-[#84DACB] p-2 border border-black flex rounded-xl  shadow-[4px_4px_1px__rgba(0,0,0,0.7)]">
          <div className=" flex w-[80%]">
            <div className=" w-[50px] h-[50px] 800px:w-[3.4vw] 800px:h-[3.4vw] bg-slate-500 rounded-full"></div>
            <div className=" w-[60%]  1000px:w-[70%] flex flex-col justify-between pl-2 1000px:px-3">
              <div className=" text-sm 1200px:text-base">Flex box</div>
              <div className=" font-light text-xs 1200px:text-base overflow-y-auto">cheet sheet</div>
            </div>
          </div>
          <div className=" w-[15%] flex items-end ">
            <div className=" align-text-bottom font-light  800px:font-normal 1300px:text-base text-sm">
              25min
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Tasks;
