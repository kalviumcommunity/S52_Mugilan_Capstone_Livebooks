import { Header } from '@radix-ui/react-accordion';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

function DashboardLayout() {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth.user);
  
    useEffect(() => {
      if (auth == "") {
        navigate("/login");
      }
    }, []);
  
    return (
      <div className=" 800px:flex h-screen">
        <div className=" w-[330px]">
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </div>
        <div className=" w-[100%] 800px:mt-0 1000px:h-[100%] h-auto 800px:min-h-screen bg-[#1A1A1A] p-1 800px:p-2 1000px:p-3 ">
          <div className="w-full h-full bg-[#FFFBF7] rounded-md">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

export default DashboardLayout
