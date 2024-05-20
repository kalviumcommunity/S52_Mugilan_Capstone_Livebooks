import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const navItemsDataUser = [
  {
    name: "Dashboard",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
];
export const navItemsDataAdmin = [
  {
    name: "Dashboard",
    url: "/",
  },
  {
    name: "Paid Courses",
    url: "/admin/paid-courses",
  },
  {
    name: "Free Courses",
    url: "/admin/free-courses",
  },
  {
    name: "Mentors",
    url: "/admin/mentors",
  },
  {
    name: "Student",
    url: "/admin/Students",
  },
];

function NavItems({ activeItem, isMobile }) {
  const userRole = useSelector((state) => state.auth.user.role);
  const [navItemsData, setNavItem] = useState(navItemsDataUser);
  const [roleWidthSize, setRoleWidthSize] = useState(false);
  useEffect(() => {
    if (userRole == "admin") {
      setRoleWidthSize(true);
      setNavItem(navItemsDataAdmin);
    }
  });
  return (
    <>
      <div
        className={
          roleWidthSize
            ? `hidden 800px:flex 800px:flex-col 800px:justify-between 800px:text-sm 1000px:text-base 1300px:text-lg font-Unbounded font-light h-[30vh] `
            : `hidden 800px:flex 800px:flex-col 800px:justify-between text-xl font-Unbounded font-light h-[100px]  `
        }
      >
        {" "}
        {/* Adjusted class name for responsiveness */}
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link to={item.url} key={index}>
              <span className={`px-3 text-white font-thin mb-5`}>
                {item.name}
              </span>
            </Link>
          ))}
      </div>

      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link to="/" className=" font-Unbounded text-[24px]">
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
