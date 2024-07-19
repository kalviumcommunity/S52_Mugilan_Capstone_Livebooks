import React, { useEffect, useState } from "react";
import { useGetFreeCoursesQuery } from "../../../redux/features/courses/courseApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Heading from "@/utils/Heading";

function FreeCourses() {

  const { data, isSuccess, error } = useGetFreeCoursesQuery();
  const [paidCourses, setPaidCourses] = useState([]);


  useEffect(() => {
    if (isSuccess) {
      setPaidCourses(data.course);
    } else if (error) {
      console.log(error);
    }
  }, [data, isSuccess, error]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = paidCourses.filter((course) =>
      course.name.toLowerCase().includes(query)
    );
    setFilteredCourses(filtered);
  };

  // Determine which array to use based on whether there's a search query
  const displayedCourses = searchQuery ? filteredCourses : paidCourses;

  return (
    <div>
      <Heading
        title="FreeCourses Admin -Hogwarts"
        description="List of free courses"
        keywords="question,course, free, paid , freecourses answer, queries, answered, lesson, html, css, js , search"
      />
      <div className="p-3 flex justify-between">
        <input
          type="text"
          placeholder="Search courses..."
          className="p-2 border border-gray-300 rounded"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        Free Courses
        <Link to="/create/freeCourse" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Course
        </Link>
      </div>
      <div className="p-3">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table headers */}
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sno
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Level
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modules
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedCourses.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  No courses found with the keyword "{searchQuery}"
                </td>
              </tr>
            ) : (
              displayedCourses.map((course, index) => (
                <tr key={course._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.level}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.module.length}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FreeCourses;
