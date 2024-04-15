import React from 'react'
import Footer from '../Footer'
import { Link } from 'react-router-dom'

function CotactUs1() {
  return (
    <div>
      <div className="grid bg-[#FEC901] grid-flow-row grid-cols-1 800px:h-[600px] border border-b pb-5 800px:pb-0 border-black  font-Unbounded  800px:grid-cols-2  ">
        <div className="  flex justify-center w-full items-center  order-1 min-h-[350px] 800px:h-full bg-[#FEC901] ">
            <div className=" bg-[#A7BDFF] shadow-xl py-7 flex flex-col px-9 w-[80%] 400px:w-[70%] 800px:w-[70%] 1200px:w-[60%] 1500px:w-[55%] rounded-lg">
                <p className=" text-[15px] font-medium mb-3 1000px:text-[20px]">
                    Contact
                </p>
                <input type="text" placeholder=" Name" className="bg-[#89EC87] focus:outline-none focus:border-transparent py-4 px-2 placeholder:text-black placeholder:font-light border border-black rounded-md shadow-lg" />
                <br />
                <input type="text" placeholder=" Phone No" className="bg-[#89EC87] focus:outline-none focus:border-transparent py-4 px-2 placeholder:text-black placeholder:font-light border border-black rounded-md shadow-lg" />
                <br />
                <input type="text" placeholder=" Email Id" className="bg-[#89EC87] focus:outline-none focus:border-transparent py-4 px-2 placeholder:text-black placeholder:font-light border border-black rounded-md shadow-lg" />
                <br />
                <input type="text" placeholder=" Message" className="bg-[#89EC87] focus:outline-none focus:border-transparent py-4 px-2 placeholder:text-black placeholder:font-light border border-black rounded-md shadow-lg h-[150px]" />
                <div className=" flex  justify-center ">
                  <button className=" py-2 px-3 mt-3 border border-black bg-[#ec8787] w-auto rounded-md">Submit</button>
                </div>
            </div>
        </div>

        <div className=" flex flex-col items-center min-h-[350px] 800px:border-r border-black 800px:h-full justify-between 800px:items-start px-7 1300px:px-[6rem] 1300px:py-[3rem] 1000px:pr-14 py-5 gap-7 ">
          <h1 className=" text-[30px] 1000px:text-[40px] 1400px:text-[45px] text-center font-medium 800px:text-left 800px:text-[34px] 1500px:text-[50px] ">
            Contact Our team
          </h1>
          <p className=" text-center text-[13px] 800px:text-left 800px:text-[14px] 1000px:text-[15px] 1300px:text-[16px] 1400px:text-[17px] font-light">
            Access a wealth of knowledge anytime, anywhere with our e-learning
            platform .Engage in interactive lessons, quizzes, and discussions
            tailored to your learning needs.
          </p>
          <div>
            <p className=" pt-3">Instagram</p>
            <p className=" pt-3">Twiter</p>
            <p className=" pt-3">Linked In</p>
          </div>
          <Link
            to="/getstart"
            className=" 1000px:px-5 1000px:py-4 py-2 px-3 text-white bg-black"
          >
            Get Started
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CotactUs1
