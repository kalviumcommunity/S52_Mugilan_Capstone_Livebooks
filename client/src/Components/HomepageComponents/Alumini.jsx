import React from 'react'
import Amazon from "../../assets/University /Amazon-logo.png";
import Google from "../../assets/University /Googole image.jpg";
import Bomb from "../../assets/University /IIT Bomb ay.jpg";
import Dehli from "../../assets/University /IIT Dehli.png";
import Microsoft from "../../assets/University /Microsoft_logo_(2012).svg.png";
import Standford from "../../assets/University /Stanford-University-Logo.jpg";
function Alumini() {
  return (
    <div>
      <div className="mt-24 p-5">
        <div className=" flex items-center justify-center">
          <div className=" text-[24px] text-center 1000px:font-medium 1100px:text-[25px] 1400px:text-[30px] ">
            LEARN THE BEST FROM THE ALUMNI OF
          </div>
        </div>

        <div className=" flex justify-center mt-10 ">
          <div className="flex items-center justify-between flex-wrap gap-5 w-[1000px]">
            <img src={Amazon} className="w-[150px] " alt="Amazon" />
            <img src={Standford} className="w-[150px] " alt="Amazon" />
            <img src={Google} className="w-[150px] " alt="Amazon" />
            <img src={Bomb} className="w-[150px] " alt="Amazon" />
            <img src={Dehli} className="w-[150px] " alt="Amazon" />
            <img src={Microsoft} className="w-[150px] " alt="Amazon" />
          </div>
        </div>

        {/* Carosul  */}
        {/* <div className=' flex justify-center items-center'>

        <EmblaCarousel />
        </div> */}




        {/* Add page */}

      </div>
    </div>
  )
}

export default Alumini
