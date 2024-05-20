import React from 'react'

function AddCoursesContent({setCourseDetails,courseDetails}) {
  return (
    <div className="space-y-4">
    <h2 className="text-2xl font-bold text-[#84DACB]">Step 1: Course Details</h2>
    <input
      type="text"
      placeholder="Course Name"
      className="w-full p-2 border-2 border-[#87A1EC] rounded"
      value={courseDetails.name}
      onChange={(e) => setCourseDetails({ ...courseDetails, name: e.target.value })}
    />
    <textarea
      placeholder="Course Description"
      className="w-full p-2 border-2 border-[#87A1EC] rounded"
      value={courseDetails.description}
      onChange={(e) => setCourseDetails({ ...courseDetails, description: e.target.value })}
    />
    <input
      type="text"
      placeholder="Thumbnail URL"
      className="w-full p-2 border-2 border-[#87A1EC] rounded"
      value={courseDetails.thumbnail}
      onChange={(e) => setCourseDetails({ ...courseDetails, thumbnail: e.target.value })}
    />
    <input
      type="text"
      placeholder="Tag"
      className="w-full p-2 border-2 border-[#87A1EC] rounded"
      value={courseDetails.tag}
      onChange={(e) => setCourseDetails({ ...courseDetails, tag: e.target.value })}
    />
    <input
      type="text"
      placeholder="Level"
      className="w-full p-2 border-2 border-[#87A1EC] rounded"
      value={courseDetails.level}
      onChange={(e) => setCourseDetails({ ...courseDetails, level: e.target.value })}
    />
  </div>
  )
}

export default AddCoursesContent
