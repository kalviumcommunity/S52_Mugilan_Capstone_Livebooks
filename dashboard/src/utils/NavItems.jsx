import React from "react";
import { Link } from "react-router-dom";

export const navItemsData = [
  {
    name: "Dashboard",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
];

function NavItems({ activeItem, isMobile }) {
  return (
    <>
      <div className="hidden 800px:flex 800px:flex-col h-[100px] 800px:justify-between text-xl font-Unbounded font-light  ">
        {" "}
        {/* Adjusted class name for responsiveness */}
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link to={item.url} key={index}>
              <span
                className={`px-6 text-white`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>


      {isMobile && (
        <div className="800px:hidden mt-5">
            <div className="w-full text-center py-6">
                <Link to='/' className=" font-Unbounded text-[24px]">
                    Hogwarts
                </Link>

            </div>
            {navItemsData &&
              navItemsData.map((i, index) => (

                <Link to={i.url} key={index}>
                  <span
                    className={`${
                      activeItem === index ? "text-blue-500" : "text-gray-600"
                    }  px-6  block text-[18px] font-Unbounded py-6 `}
                  >
                    {i.name}
                  </span>
                </Link>

              ))}
          </div>

      )}
    </>
  );
}

export default NavItems;
