import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <>
    <div className='grid grid-flow-row grid-cols-1 800px:h-[550px] border border-b border-black  font-Unbounded  800px:grid-cols-2  '>

        <div className=' border-b  order-1 min-h-[350px] 800px:h-full bg-[#FEC901]'>

        </div>

        <div className=' flex flex-col items-center min-h-[350px] 800px:border-r border-black 800px:h-full justify-between 800px:items-start px-7 1300px:px-[6rem] 1300px:py-[3rem] 1000px:pr-14 py-5 gap-7 '>
            <h1 className=' text-[30px] 1000px:text-[44px] 1400px:text-[45px] text-center font-medium 800px:text-left 800px:text-[34px] 1500px:text-[50px] '>
                Empowering Lifelong Learning for a better You
            </h1>
            <p className=' text-center text-[13px] 800px:text-left 800px:text-[14px] 1000px:text-[15px] 1300px:text-[16px] 1400px:text-[17px] font-light'>
            Access a wealth of knowledge anytime, anywhere with our e-learning platform
            .Engage in interactive lessons, quizzes, and discussions tailored to your learning needs.
            </p>
            <Link to='/getstarted' className=' 1000px:px-5 1000px:py-4 py-2 px-3 text-white bg-black'>
                Get Started
            </Link>
        </div>

    </div>
    
    
    </>
  )
}

export default Hero
