import React from "react";
import Heading from "../utils/Heading";
import { Link } from "react-router-dom";
import signupImage from "../assets/Icons/signupimage.png"

function Login() {
  return (
    <div>
      <div className=" bg-[#F5F2EB] h-screen w-full">
        <Heading
          title="Signup"
          description="Signup Your Self for accessing our resourses"
          keywords="courses,allCourse, paid course, mernstack, full stack, students, insta, facebook, html, css , js, reack, mongoose, mongodb, express,"
        />
        <div className=" w-full h-screen grid grid-cols-1 800px:grid-cols-2">
        <div className=" hidden p-3 800px:block  ">
            <img className=" object-cover h-full w-fill rounded-lg" src={signupImage} alt="Sign up image" />
        </div>
          <div className=" py-3 px-4">
            <div className=" w- full px-3 py-4 flex justify-end">
              <Link to="/signup " className=" text-[16px]">
                Sign up
              </Link>
            </div>
            <div className=" flex m-auto h-[85%] w-full px-10">
              <div className=" flex m-auto flex-col  items-center justify-between h-[70%]">
                <div className=" text-[20px] font-medium">
                  Login to your account
                </div>
                <div className=" text-center text-[12px] font-light">
                  Enter your email and password below to create your account
                </div>
                <div className=" w-full">
                  <input
                    className=" py-2 px-3 text-[13px] font-light border rounded-md focus:border  w-full"
                    type="text"
                    placeholder="Email  eg: Joe@gmail.com"
                  />
                </div>
                <div className=" w-full">
                  <input
                    className=" py-2 px-3 text-[13px] font-light border rounded-md focus:border  w-full"
                    type="password"
                    placeholder="Password  eg: Joe@123"
                  />
                </div>
                <div className=" w-full">
                  <button className=" py-2 px-3 bg-[#FEC901] rounded-md w-full">
                    Login
                  </button>
                </div>
                <div className=" flex justify-center items-center w-full">
                  <hr className=" w-full" />
                  <div className=" w-full text-[8px] text-center ">
                    OR CONTINUE WITH
                  </div>

                  <hr className="w-full" />
                </div>
                <div>
                  <div className=" w-[50px] h-[50px] bg-slate-600 rounded-full "></div>
                </div>
                <div className="text-[10px] text-center font-light">
                  By clicking continue, you agree to our Terms of Service and
                  Privacy Policy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
