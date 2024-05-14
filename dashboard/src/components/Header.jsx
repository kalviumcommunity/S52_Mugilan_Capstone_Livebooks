import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavItems from "../utils/NavItems"
import HambarganMenu from "../assets/Icons/Hamburger Menu.svg"


function Header({ open, setOpen, activeItem }) {
  
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }
  const handleClose = (e) => {
    if(e.target.id === "screen"){
        {
            setOpenSidebar(false)
        }
    }
  }

  return (
    <div className="w-full 800px:w-full h-[60px] 800px:h-screen relative">
      <div
        className="w-full 800px:h-full  800px:bg-[#1A1A1A] z-[80] 800px:p-4 h-full"
      >
        <div className="w-[95%]   max-w-[1600px] m-auto  h-full flex  ">
          <div className=" w-full h-[60px]  800px:h-full flex items-center justify-between 800px:flex-col ">


          {/* this is for logo */}

            <div className=" 800px:mb-10">
              <Link
                to="/"
                className="text-[25px] font-Unbounded font-[500] text-black 800px:text-white"
              >
                Hogwarts
              </Link>
            </div>

          {/* this is for nav items */}

            <div className=" h-full ">
              <div className="flex item-center p-3 h-full">
                <div className=" flex flex-col justify-between  ">

                <NavItems activeItem={activeItem} isMobile={false} />
                <div className=" hidden 800px:block text-white text-center">
                  <Link to='/settings'>Settings</Link>
                </div>
                </div>
                {/* For mobile */}
                <div className="800px:hidden">
                    <img className="w-7 h-7 cursor-pointer" src={HambarganMenu} alt="" onClick={() => setOpenSidebar(true)}/>
                </div>
              </div>
            </div>


          {/* this is for login and get started */}

            
          </div>
        </div>


        {/* mobile sidebar */}

        {
            openSidebar && (
                <div className="fixed w-full h-screen left-0 z-[99999] bg-[#00000024] " onClick={handleClose} id="screen">
                    <div className=" w-[70%] fixed z-[999999999] h-screen bg-white top-0 right-0 ">
                        <NavItems activeItem={activeItem} isMobile={true} />
                    </div>
                </div>
            )
        }
      </div>

    </div>
  );
}

export default Header;