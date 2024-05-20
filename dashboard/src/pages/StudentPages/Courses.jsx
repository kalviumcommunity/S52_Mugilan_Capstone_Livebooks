import FreeCourses from "@/components/Students/Courses.jsx/FreeCourses";
import Paidcourses from "@/components/Students/Courses.jsx/PaidCourses";
import Heading from "@/utils/Heading";
import React from "react";

function Courses() {
  return (
    <div className=" p-2 h-full w-full">
      <Heading
        title="Dashboard -Hogwarts"
        description="About Hogwarts Team and Visson and achivements"
        keywords="courses,allCourse, paid course, mernstack, full stack, students, insta, facebook, html, css , js, reack, mongoose, mongodb, express,"
      />
      <div className="h-full w-full overflow-scroll">
        <Paidcourses />
        <FreeCourses />
      </div>
    </div>
  );
}

export default Courses;
