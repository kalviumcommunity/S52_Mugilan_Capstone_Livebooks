import React from 'react'
import Header from '../Components/HomepageComponents/Header'
import Heading from '../utils/Heading'
import CoursesCarasol from '../Components/Courses/CoursesCarasol'

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




      
    </div>
  )
}

export default Courses
