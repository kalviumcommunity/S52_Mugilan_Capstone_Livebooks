import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetsingleFreeCoursesQuery } from "../../../redux/features/courses/courseApi";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";

function SidebarCourse({ handleContentClick }) {
  const [courseData, setCourseData] = useState([]);
  const { id } = useParams();
  const { data, isSuccess, error } = useGetsingleFreeCoursesQuery(id);

  useEffect(() => {
    if (isSuccess) {
      setCourseData(data.course);
    } else if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    Cookies.set("courseId", courseData?._id)
    Cookies.set("courseName", courseData?.name)

  },[courseData])

  const handleModuleClick = (moduleId, moduleName) => {
    Cookies.set("moduleId", moduleId);
    Cookies.set("moduleName", moduleName);
  };


  return (
    <div className=" w-full h-[98%] ">
      <div className=" grid grid-cols-1 items-center justify-start overflow-y-auto text-white">
        <div className=" h-[130px] w-full flex items-left flex-col justify-center gap-4 p-4">
          <div>{courseData.name}</div>
          <div className=" h-[8px] w-[80%] rounded-lg bg-white"></div>
          <div>30% Completed</div>
        </div>
        <div>
          {courseData &&
            courseData.module &&
            courseData.module.map((items, index) => (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value="item-1" className="border-t p-2">
                  <AccordionTrigger onClick={() => handleModuleClick(items._id, items.heading)}>
                    {items.heading}
                  </AccordionTrigger>
                  {items.video && (
                    <AccordionContent
                      className="py-2 pl-8 mt-3 cursor-pointer"
                      onClick={() => handleContentClick(items.video,courseData._id)}
                    >
                      <Link to={`${id}/${items._id}/${items.video._id}`}>
                        Content
                      </Link>
                    </AccordionContent>
                  )}
                  {items.cheatSheets && (
                    <AccordionContent
                      className="py-2 pl-8 mt-3 cursor-pointer"
                      onClick={() => handleContentClick(items.cheatSheets,courseData._id)}
                    >
                      <Link to={`${id}/${items._id}/${items.cheatSheets._id}`}>
                        Cheat Sheet
                      </Link>
                    </AccordionContent>
                  )}
                  {items.quizzes && (
                    <AccordionContent
                      className="py-2 pl-8 mt-3 cursor-pointer"
                      onClick={() => handleContentClick(items.quizzes,courseData._id)}
                    >
                      <Link to={`${id}/${items._id}/${items.quizzes._id}`}>
                        Quiz
                      </Link>
                    </AccordionContent>
                  )}
                </AccordionItem>
              </Accordion>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SidebarCourse;