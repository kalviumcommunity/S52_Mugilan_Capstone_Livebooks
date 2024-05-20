import React from "react";

function Progrestion() {
  return (
    <div className="w-[100%] 1000px:w-[50%] h-[100%] 1000px:h-full">
      <div className="w-full gap-3 p-3 flex flex-col h-full ">
        <div>
          <div className="font-normal text-lg 1200px:text-xl">Course Progression</div>
        </div>
        <div className=" h-[250px] 1000px:h-full w-full ">
          <div className=" bg-[#87A1EC] border-2 border-black flex flex-col h-full w-full rounded-md  shadow-[6px_6px_3px__rgba(0,0,0,0.7)]">
            <div className=" w-full max-h-[60%] h-full bg-yellow-200 rounded-t-lg"></div>
            <div className=" w-full h-[40%] rounded-b-lg p-3 ">
              <div className=" flex flex-col h-full w-full justify-between">
                <div className="1000px:text-sm 1200px:text-base">Full Stack Development</div>
                <div className="font-light text-xs 1200px:text-sm">FlexBox</div>
                <div className=" w-full h-auto ">
                  <div className=" text-right 1000px:text-xs 1200px:text-sm">30%</div>
                  <div className=" bg-neutral-600 w-full h-[10px] rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progrestion;
