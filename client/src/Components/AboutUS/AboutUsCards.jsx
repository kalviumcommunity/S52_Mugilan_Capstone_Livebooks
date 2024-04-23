import React from "react";
import Kalvium from "../../assets/teamImages/Kalvium.png";

const AboutUsCards = ({ name, posting, subHeading, image, linkedin }) => {
  return (
    <div>
      <div className="w-full p-8 h-auto border border-black shadow-md rounded-xl flex justify-center items-center">
        <div className="w-1/2  flex flex-col justify-start items-start">
          <h1 className="text-2xl text-black mb-2">{name}</h1>
          <h1 className=" text-black mb-2">{posting}</h1>
          <h1 className="mt-6  text-black">{subHeading}</h1>
          <img className="w-24 mt-2" src={Kalvium} alt="" />
          <a
            href={linkedin}
            target="_blank"
            className="mt-6 text-[rgb(1,90,179)] underline"
          >
            LinkedIn
          </a>
        </div>
        <div className=" flex justify-center  items-center h-full w-1/2">
          <img className="  rounded-full" src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AboutUsCards;
