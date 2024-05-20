import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetFreeCoursesQuery } from "../../../../redux/features/courses/courseApi";
import SidebarCourse from "../../utils/SidebarCourse";

function CourseLayout() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.user);
  const [freeCourses, setFreeCourses] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [currentContent, setCurrentContent] = useState(null);
  const { data, isSuccess, error } = useGetFreeCoursesQuery();

  useEffect(() => {
    if (isSuccess) {
      setFreeCourses(data.course);
      console.log(data.course);
    } else if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (auth == "") {
      navigate("/login");
    }
  }, []);

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="flex flex-row justify-between w-full h-screen bg-[#1A1A1A]">
      <div className=" h-full w-[350px] overflow-scroll">
        <SidebarCourse
          data={freeCourses}
          handleContentClick={handleContentClick}
        />
      </div>
      <div className=" h-full w-full p-3">
        <div className=" h-full w-full bg-[#FFFBF7] rounded-md p-3">
          <Outlet context={[selectedContent, data]} />
        </div>
      </div>
    </div>
  );
}

export default CourseLayout;
