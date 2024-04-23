import React from 'react'
import companyImage from "../../assets/University /Company.png"
export default function StudentsCompany() {
  return (
    <div className=' mt-24'>
        <div className=' text-[24px] p-4 1000px:font-medium text-center 1000px:text-[30px]'>
        Our Students Hired form to Most company
        </div>
        <div className='mt-5 p-3 flex justify-center items-center' >
            <img src={companyImage} className=' 1000px:w-[1000px] 1300px:w-[1200px] ' alt="" />

        </div>
      
    </div>
  )
}
