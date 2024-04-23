import React from 'react'
import UIUX from "@/assets/Icons/signupimage.png"
function GetStarted1() {
  return (
    <div className=' p-5 1200px:px-14 '>
        <div className=' text-center text-[18px]  1000px:text-[25px] 1000px:mt-10'>
            Buy any courses you need and develop your <span className=' text-[#84DACB]'>Skills</span>.
        </div>
        <div>
            <div className=' h-[350px] mt-20 flex flex-col 800px:flex-row  justify-between '>
                <div className=' border w-full 1100px:w-[80%] 1300px:w-[70%] 1400px:w-[60%] 1500px:w-[50%] border-black flex flex-col h-full rounded-lg '>
                    <img src={UIUX} className='border-b h-[75%]' alt="" />
                    <div className=' p-3 flex h-[25%]  flex-col justify-between'>
                        <div>Full stack development</div>
                        <div className=' flex justify-between items-center'>
                            <div>
                                English
                            </div>
                            <div>
                                RS : 5000
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' w-full flex justify-center items-center'>
                    <button className=' py-2 px-3 mt-5 bg-[#FEC901] border border-black rounded-md'>
                        Buy Now
                    </button>

                </div>
            </div>
        </div>
      
    </div>
  )
}

export default GetStarted1
