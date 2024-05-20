import React from "react";
import Streak from "@/components/Students/Dashboard/Streak";
import Profile from "@/components/Students/Dashboard/Profile";
import Tasks from "@/components/Students/Dashboard/Tasks";
import Progrestion from "@/components/Students/Dashboard/Progrestion";
import Calender from "@/components/Students/Dashboard/Calender";
import Heading from "@/utils/Heading";
import { useSelector } from "react-redux";

function Dashboard() {
  return (
    <div className=" 800px:flex h-full">
      <Heading
        title="Dashboard -Hogwarts"
        description="About Hogwarts Team and Visson and achivements"
        keywords="courses,allCourse, paid course, mernstack, full stack, students, insta, facebook, html, css , js, reack, mongoose, mongodb, express,"
      />
      {/* dashboard */}
      {/* main div */}
      <div className="800px:pl-1 1100px:pl-10 h-full 1000px:w-[70%]  1300px:w-[74%] 1000px:pt-5 flex flex-col justify-between">
        {/* for the profile */}
        <Profile />
        {/* Streak */}
        <Streak />

        {/* div */}
        <div className="h-full flex flex-col 1000px:flex-row overflow-scroll  w-full">
          <Tasks />
          <Progrestion />
        </div>
      </div>
      {/* for the calender */}
      <div className="  800px:w-full 1000px:w-[35%]  1300px:w-[28%] h-full px-2 py-3">
        <Calender />
      </div>
    </div>
  );
}

export default Dashboard;
