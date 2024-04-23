import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavItems from "../../utils/NavItems"
import HambarganMenu from "../../assets/Icons/Hamburger Menu.svg"

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
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "fixed  top-0 left-0 w-full h-[80x] z-[80] border-b bg-white shadow-xl transition duration-500"
            : "w-full border-b border-black bg-white  h-[60px] z-[80]"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] max-w-[1600px] m-auto  h-full flex items-center ">
          <div className=" w-full h-[60px] flex items-center justify-between">


          {/* this is for logo */}

            <div>
              <Link
                to="/"
                className="text-[25px] font-Unbounded font-[500] text-black p-3 "
              >
                Hogwarts
              </Link>
            </div>

          {/* this is for nav items */}

            <div>
              <div className="flex item-center p-3">
                <NavItems activeItem={activeItem} isMobile={false} />
                {/* For mobile */}
                <div className="800px:hidden">
                    <img className="w-7 h-7 cursor-pointer" src={HambarganMenu} alt="" onClick={() => setOpenSidebar(true)}/>


                </div>
              </div>
            </div>


          {/* this is for login and get started */}

            <div className="h-[80px] hidden 800px:block">
                <div className=" font-Unbounded flex items-center h-full ">
                    <div className="px-4 h-[60px] border-x border-black flex items-center ">
                        <Link to='/login'>
                            Login
                        </Link>
                    </div>
                    <div className="px-4 hidden 1000px:flex border-r border-black text-white h-[60px]  text-center  items-center  bg-black">
                        <Link to='/getstarted'>
                            Get Started
                        </Link>
                    </div>

                </div>
            </div>
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
