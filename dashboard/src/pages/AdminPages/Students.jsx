import React, { useState } from 'react';
import { useGetAlluserQuery } from '../../../redux/features/user/userApi';
import Heading from '@/utils/Heading';

function Students() {
  const { data, isSuccess, error } = useGetAlluserQuery();
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter students based on role and search query
  const filteredStudents = data ? data.users.filter(user =>
    user.role.toLowerCase() === 'student' &&
    (user.name.toLowerCase().includes(searchQuery) || user.email.toLowerCase().includes(searchQuery))
  ) : [];

  return (
    <div>
      <Heading
        title="Students Admin -Hogwarts"
        description="List of Students"
        keywords="question,course,list of students,users, students, list of mentors, mentores, hogwatrs, school, learning free, paid , freecourses answer, queries, answered, lesson, html, css, js , search"
      />
      <div className="p-3 flex justify-between items-center"> 
        <div className="flex items-center justify-center">
          <h3>Name or Emai : </h3>
          <input
            type="text"
            placeholder="Search mentors..."
            className="p-2 border ml-2 border-gray-300 rounded"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      <div className=" text-lg">Students</div>
      </div>

      <div className="p-3">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sno
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Courses
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student, index) => (
              <tr key={student._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.courses.length}</td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                  No students found with the keyword "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;
