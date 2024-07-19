import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetFreeCoursesQuery } from "../../../../redux/features/courses/courseApi";
import FreeCoursess from "@/assets/FreeCourses.webp"
import Cookies from "js-cookie";
function FreeCourses() {
  const [freeCourses, setFreeCourses] = useState([]);
  const { data, isSuccess, error } = useGetFreeCoursesQuery();
  const [courseId, setCourseId] = useState();
  useEffect(() => {
    if (isSuccess) {
      setFreeCourses(data.course);

    } else if (error) {
      console.log(error)
    }
  }, [isSuccess, error]);

  const handleCourseClick = (id) => {
    setCourseId(id);
  };

  useEffect(() => {
    if (courseId) {
      Cookies.set('courseId', courseId);
    }
  }, [courseId]);

  return (
    <div>
      <div className="p-3">
        <div className=" text-xl font-medium">Free Course</div>
        <div className=" py-3 pb-3">
          <div className="grid gap-5 800px:grid-flow-row 800px:grid-cols-2 1300px:grid-cols-3  items-center justify-center 800px:justify-start">
            {freeCourses &&
              freeCourses.map((items, index) => (
                <Link
                  to={`/course/${items._id}`}
                  key={index}
                  onClick={() => handleCourseClick(items._id)}
                  className="w-full gap-3 p-3 flex flex-col h-full"
                >
                  <div className=" h-[250px] 1000px:h-full w-full ">
                <div className=" bg-[#87A1EC] border-2 border-black flex flex-col h-full w-full rounded-md  shadow-[6px_6px_3px__rgba(0,0,0,0.7)]">
                  <div className=" w-full max-h-[60%] h-full bg-yellow-200 rounded-t-lg">
                  <img
                      className="h-full w-full"
                      src={items.thumbnail?.url || FreeCoursess }
                      alt=""
                    />
                  </div>
                  <div className=" w-full h-[40%] rounded-b-lg p-3 ">
                    <div className=" flex flex-col h-full w-full justify-between">
                      <div className="1000px:text-sm 1200px:text-base">
                      {items.name}
                      </div>
                      <div className="font-light text-xs 1200px:text-sm">
                        {items.description}
                      </div>
                      <div className=" w-full h-auto ">
                        <div className=" text-right 1000px:text-xs 1200px:text-sm">
                          30%
                        </div>
                        <div className=" bg-neutral-600 w-full h-[10px] rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeCourses;
