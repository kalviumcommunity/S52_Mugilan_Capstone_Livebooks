
import React, { useEffect, useState } from "react";
import Heading from "../utils/Heading";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/Icons/signupimage.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import toast,{Toaster} from "react-hot-toast";

const schema = Yup.object().shape({
 name: Yup.string().required("Please enter your name"),
 email: Yup.string()
   .email("Invalid email!")
   .required("Please enter your email!"),
 password: Yup.string().required("Please enter your password!").min(6),
});


function Signup() {
 const [show, setShow] = useState(false);
 const [register,{ data, error,isSuccess} ] = useRegisterMutation()
 const navigate = useNavigate();


 
 useEffect(() => {
  if (isSuccess) {

    // Display success toast when registration is successful
    toast.success(data.message || "Registration successful")
    // Navigate to the "/verification" route
    navigate("/verification");
  }
  if (error) {
    // Display error toast if there is an error
   toast.error(error.data.message )
  }
}, [isSuccess, error]);


 const formik = useFormik({
   initialValues: { name: "", email: "", password: "" },
   validationSchema: schema,
   onSubmit: async ({ email, password, name }) => {
    const data ={
      name, email, password
    }
    await register(data)
   },
 });

 const { errors, touched, values, handleChange, handleSubmit, handleBlur } = formik;

 const togglePasswordVisibility = () => {
   setShow(!show);
 };

 return (
   <div className=" bg-[#F5F2EB] h-screen w-full">

    <div><Toaster/></div>
     <Heading
       title="Signup -Hogwarts"
       description="Signup to access our resourses"
       keywords="courses,allCourse, paid course, mernstack, full stack, students, insta, facebook, html, css , js, reack, mongoose, mongodb, express, login, signin , signup"
     />
     <div className="w-full h-screen grid grid-cols-1 800px:grid-cols-2">
       <div className=" hidden p-3 800px:block relative  ">
         <img
           className=" object-cover h-full w-fill rounded-lg"
           src={signupImage}
           alt="Sign up image"
         />
         <div className=" font-medium absolute text-[23px] top-[50px] left-[70px]">
           HOGWARTS
         </div>
       </div>
       <div className=" py-3 px-4  800px:py-5 800px:px-7 ">
         <div className=" w- full px-3 py-4 flex justify-end">
           <Link to="/login " className=" text-[16px]">
             Login
           </Link>
         </div>
         <div className=" flex m-auto h-[85%] w-full px-10">
           <form
             onSubmit={handleSubmit}
             className=" flex m-auto flex-col  items-center justify-between h-[70%]"
           >
             <div className=" text-[20px] font-medium 1000px:text-[23px]">
               Signin your account
             </div>
             <div className=" text-center text-[12px] 1000px:text-[14px] font-light">
               Enter your email and password below to Login to your account
             </div>

             {/* name */}
             <div className=" w-full">
               <input
                 className={`${
                   errors.email && touched.email && "border-red-500"
                 } py-2 px-3 1000px:py-3 1000px:px-4 text-[13px] font-light border rounded-md focus:border  w-full`}
                 type="name"
                 value={values.name}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 id="name"
                 placeholder="Name  eg: Joe"
               />
               {errors.name && touched.name && (
                 <div className="text-red-500 text-xs mt-2">
                   {errors.name}
                 </div>
               )}
             </div>

             {/* email */}
             <div className=" w-full">
               <input
                 className={`${
                   errors.email && touched.email && "border-red-500"
                 } py-2 px-3 1000px:py-3 1000px:px-4 text-[13px] font-light border rounded-md focus:border  w-full`}
                 type="email"
                 value={values.email}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 id="email"
                 placeholder="Email  eg: Joe@gmail.com"
               />
               {errors.email && touched.email && (
                 <div className="text-red-500 text-xs mt-2">
                   {errors.email}
                 </div>
               )}
             </div>

             {/* Password */}
             <div className=" w-full relative h-auto">
               <input
                 className={`${
                   errors.password && touched.password && "border-red-500"
                 } py-2 px-3 1000px:py-3 1000px:px-4 text-[13px] font-light border rounded-md focus:border  w-full`}
                 type={!show ? "password" : "text"}
                 value={values.password}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 id="password"
                 name="password"
                 placeholder="Password  eg: Joe"
               />
               <div

                 className="absolute cursor-pointer top-[10px] right-8"

                 onClick={togglePasswordVisibility}
               >
                 {!show ? (
                   <AiOutlineEyeInvisible
                     className={`${
                       !errors.password
                         ? "absolute  cursor-pointer"
                         : "absolute  cursor-pointer"
                     }`}
                     size={20}
                     onClick={() => setShow(true)}
                   />
                 ) : (
                   <AiOutlineEye
                     className={`${
                       !errors.password
                         ? "absolute cursor-pointer"
                         : "absolute cursor-pointer"
                     }`}
                     size={20}
                     onClick={() => setShow(false)}
                   />
                 )}
               </div>
               {errors.password && touched.password && (
                 <div className="text-red-500 text-xs mt-2">
                   {errors.password}
                 </div>
               )}
             </div>
             <div className=" w-full">
               <button
                 type="submit"
                 className=" py-2 px-3 bg-[#FEC901] rounded-md w-full"
               >
                 Sign up
               </button>
             </div>
             <div className=" flex justify-center items-center w-full">
               <hr className=" w-full" />
               <div className=" w-full text-[8px] text-center ">
                 OR CONTINUE WITH
               </div>

               <hr className="w-full" />
             </div>
             <div className=" flex justify-center items-center">
               <FcGoogle className=" cursor-pointer size-6 1000px:size-8" />
             </div>
             <div className="text-[10px] text-center font-light">
               By clicking continue, you agree to our Terms of Service and
               Privacy Policy.
             </div>
           </form>
         </div>
       </div>
     </div>
   </div > 
 )
}
export default Signup;
