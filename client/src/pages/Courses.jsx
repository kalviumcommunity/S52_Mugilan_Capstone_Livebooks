import React from 'react'
import Header from '../Components/HomepageComponents/Header'
import Heading from '../utils/Heading'
import CoursesCarasol from '../Components/Courses/CoursesCarasol'
import PaidCourses from '@/Components/Courses/PaidCourses'
import Footer from '@/Components/Footer'


function Courses() {
  return (
    <div>
        <Header />
        <Heading 
        title="Courses -Howarts"
        description="These are the Courses we are offering to students at the University of Hogwarts"
        keywords="courses,allCourse, paid course, mernstack, full stack, students, insta, facebook, html, css , js, reack, mongoose, mongodb, express,"
        />
        <CoursesCarasol  />
        <div className=' flex m-auto justify-center py-8'>

      <div className='px-20 mt-20 flex w-[40%] justify-between items-center'>
        <button>
          Front End
        </button>
        <button>
          BackEnd
        </button>
        <button>
          Full Stack
        </button>
      </div>
        </div>

        <div className=' mb-10'>

      <PaidCourses />
        </div>

      <Footer />
    </div>
  )
}

export default Courses
