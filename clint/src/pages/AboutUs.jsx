import React, { useState } from 'react'
import AboutusTeam from '../Components/AboutUS/AboutusTeam'
import Heading from '../utils/Heading';
import Header from '../Components/HomepageComponents/Header';
function AboutUs() {
    const [open, setOpen] = useState(false);
    const [activeItem, setactiveItem] = useState(0);
    return (
      <div>
        <Heading
          title="About Us -Hogwarts"
          description="About Hogwarts Team and Visson and achivements"
          keywords="courses,allCourse, paid course, mernstack, full stack, students, insta, facebook, html, css , js, reack, mongoose, mongodb, express,"
          />
          <Header open={open} setOpen={setOpen} activeItem={activeItem} />
        <AboutusTeam />
      
    </div>
  )
}

export default AboutUs

