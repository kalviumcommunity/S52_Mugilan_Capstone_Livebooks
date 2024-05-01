
import Heading from "@/utils/Heading";
import React, { useRef, useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import signupImage from "../assets/Icons/signupimage.png";
import { useSelector } from "react-redux";
import { useActivationMutation } from "../../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";

function Verification() {

  const auth = useSelector((state) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState(false);
  const inputRef = Array.from({ length: 4 }, () => useRef(null));
  const [verifyNumber, setVerifyNumber] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfullt");
      navigate("/");
    }
    if (error) {

        toast.error(error.data.message);
        setInvalidError(true)
      
    }
  }, [isSuccess, error]);

  const verificationHandler = async () => {

    const verificationNumber = Object.values(verifyNumber).join("");

    if (verificationNumber.length != 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: auth.token,
      activation_code: verificationNumber,
    });
  }

  const handleInputChange = (index, value) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);
    if (value === "" && index > 0) {
      inputRef[index - 1].current.focus();
    } else if (value.length === 1 && index < 3) {
      inputRef[index + 1].current.focus();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {

      verificationHandler();
    }
  };


  return (
    <div>
    <div><Toaster/></div>

      <Heading
        title="Verify Account"
        description="Login to access our resourses"
        keywords="courses,allCourse, paid course, mernstack, full stack, students, insta, facebook, html, css , js, reack, mongoose, mongodb, express, login, signin , signup"
      />
      <div className="w-full h-screen grid grid-cols-1 800px:grid-cols-2">
        <div className=" hidden p-3 800px:block relative ">
          <img
            className=" object-cover h-full w-fill rounded-lg"
            src={signupImage}
            alt="Sign up image"
          />
          <div className=" font-medium absolute text-[23px] top-[50px] left-[70px]">
            {" "}
            HOGWARTS{" "}
          </div>
        </div>
        <div className=" flex m-auto items-center">
          <div className=" p-10 justify-center items-center h-[60%] flex flex-col">
            <h1 className=" text-center 1000px:text-[24px] mb-5">
              {" "}
              Verify Your Account
            </h1>

            <h1 className=" text-center"> Ckeck your email and take the OTP</h1>
            <br />
            <div className="w-full flex items-center justify-center mt-2">
              <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
                <VscWorkspaceTrusted size={40} />
              </div>
            </div>
            <br />
            <div className="1100px:w-auto gap-4 flex items-center justify-around">
              {Object.keys(verifyNumber).map((key, index) => (
                <input
                  type="text"
                  key={key}
                  ref={inputRef[index]}
                  className={`w-[50px] h-[50px] 1000px:w-[65px] 1000px:h-[65px] bg-transparent border-[2px] rounded-[10px] flex items-center text-black justify-center text-center ${
                    invalidError
                      ? "shake border-red-500"
                      : " border-[#0000004a]"
                  }`}
                  placeholder="0"
                  maxLength={1}
                  value={verifyNumber[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              ))}
            </div>
            <br />
            <br />
            <button
              onClick={verificationHandler}
              className=" py-2 px-3 bg-[#FEC901] rounded-md"
            >
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verification;