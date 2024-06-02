import { useState, useEffect } from "react";
import {
  useCreateFreeCourseMutation,
  useCreatePaidCourseMutation,
} from "../../../redux/features/courses/courseApi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

function CreateCourse() {
  const [
    createFreeCourse,
    {
      isSuccess: createFreeCourseSuccess,
      error: createFreeCourseError,
      isLoading: createFreeCourseisLoading,
    },
  ] = useCreateFreeCourseMutation();
  const [
    createPaidCourse,
    {
      isSuccess: createPaidCourseSuccess,
      error: createPaidCourseError,
      isLoading: createPaidCourseLoading,
    },
  ] = useCreatePaidCourseMutation();
  const location = useLocation();
  const currentPathname = location.pathname;
  const [step, setStep] = useState(1);

  const [courseDetails, setCourseDetails] = useState({
    name: "",
    description: "",
    thumbnail: "",
    tag: "",
    level: "",
    modules: [],
  });
  const [currentModuleIndex, setCurrentModuleIndex] = useState(null);
  const [currentModule, setCurrentModule] = useState({
    heading: "",
    subHeading: "",
    video: { url: "" },
    content: "",
    quizzes: [],
  });
  const [currentQuiz, setCurrentQuiz] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [step, currentModule, currentQuiz]);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleSaveModule = () => {
    const updatedModules = [...courseDetails.modules];
    if (currentModuleIndex === null) {
      updatedModules.push(currentModule);
    } else {
      updatedModules[currentModuleIndex] = currentModule;
    }
    setCourseDetails({ ...courseDetails, modules: updatedModules });
    setCurrentModule({
      heading: "",
      subHeading: "",
      video: { url: "" },
      content: "",
      quizzes: [],
    });
    setCurrentModuleIndex(null);
    setStep(1); // Return to step 1 after saving module
  };

  const handleAddQuestion = () => {
    setCurrentModule((prevModule) => ({
      ...prevModule,
      quizzes: [...prevModule.quizzes, currentQuiz],
    }));
    setCurrentQuiz({
      question: "",
      options: ["", "", "", ""],
      answer: "",
    });
  };

  const handleInputChange = (e, key, index) => {
    if (key === "options") {
      const options = [...currentQuiz.options];
      options[index] = e.target.value;
      setCurrentQuiz({ ...currentQuiz, options });
    } else {
      setCurrentQuiz({ ...currentQuiz, [key]: e.target.value });
    }
  };

  const handleModuleClick = (index) => {
    setCurrentModuleIndex(index);
    setCurrentModule(courseDetails.modules[index]);
    setStep(2);
  };

  const handleAddModule = () => {
    setStep(2);
    setCurrentModule({
      heading: "",
      subHeading: "",
      video: { url: "" },
      content: "",
      quizzes: [],
    });
    setCurrentModuleIndex(null);
  };
  const navigate = useNavigate();

  useEffect(() => {

    if (currentPathname === "/create/paidCourse") {
      console.log('Inside /create/paidCourse condition');
      if (createPaidCourseSuccess) {
        console.log("mugilan");
        navigate("/admin/paid-course");
        toast.success("Course added successfully");
        console.log(courseDetails);
      } else if (createPaidCourseError) {
        toast.error("Course addition failed");
      }
    }
  
    if (currentPathname === "/create/freeCourse") {
      console.log('Inside /create/freeCourse condition');
      if (createFreeCourseSuccess) {
        console.log("mugilan");
        navigate("/admin/free-courses");
        toast.success("Course added successfully");
        console.log(courseDetails);
      } else if (createFreeCourseError) {
        toast.error("Course addition failed");
      }
    }
  }, [currentPathname, createFreeCourseSuccess, createFreeCourseError, createPaidCourseSuccess, createPaidCourseError, courseDetails]);

  const handleFinishButton = (courseData) => {
    if (currentPathname === "/create/freeCourse") {
      createFreeCourse(courseData);
    }
    if (currentPathname === "/create/paidCourse") {
      createPaidCourse(courseData);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#FFFBF7] h-full p-8 overflow-auto">
      {(createFreeCourseisLoading || createPaidCourseLoading) && (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}
      <Toaster />
      <div className="w-full md:w-1/3 p-4 border-r-4 border-[#84DACB] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#84DACB] mb-4">Modules</h2>
        {courseDetails.modules.map((module, index) => (
          <div
            key={index}
            className="bg-[#FE90E7] p-2 mb-2 shadow-md rounded cursor-pointer"
            onClick={() => handleModuleClick(index)}
          >
            <h3 className="text-xl font-semibold text-[#87A1EC]">
              {module.heading}
            </h3>
            <p className="text-[#84DACB]">{module.subHeading}</p>
          </div>
        ))}
        <button
          className="w-full p-2 bg-[#84DACB] text-white font-bold rounded shadow-md mt-4"
          onClick={handleAddModule}
        >
          Add New Module
        </button>
      </div>
      <div className="w-full md:w-2/3 p-4 overflow-y-auto relative">
        <div className="absolute bottom-1 right-1">
          <button
            onClick={() => handleFinishButton(courseDetails)}
            className="py-2 px-4 rounded-sm bg-[#FEC901]"
          >
            Finish
          </button>
        </div>
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#84DACB]">
              Step 1: Course Details
            </h2>
            <input
              type="text"
              placeholder="Course Name"
              className="w-full p-2 border-2 border-[#87A1EC] rounded"
              value={courseDetails.name}
              onChange={(e) =>
                setCourseDetails({ ...courseDetails, name: e.target.value })
              }
            />
            <textarea
              placeholder="Course Description"
              className="w-full p-2 border-2 border-[#87A1EC] rounded"
              value={courseDetails.description}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  description: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Thumbnail URL"
              className="w-full p-2 border-2 border-[#87A1EC] rounded"
              value={courseDetails.thumbnail}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  thumbnail: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Tag"
              className="w-full p-2 border-2 border-[#87A1EC] rounded"
              value={courseDetails.tag}
              onChange={(e) =>
                setCourseDetails({ ...courseDetails, tag: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Level"
              className="w-full p-2 border-2 border-[#87A1EC] rounded"
              value={courseDetails.level}
              onChange={(e) =>
                setCourseDetails({ ...courseDetails, level: e.target.value })
              }
            />
            <button
              className="w-full p-2 bg-[#84DACB] text-white font-bold rounded shadow-md"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#84DACB]">
              Step 2: Module Details
            </h2>
            <input
              type="text"
              placeholder="Module Heading"
              className="w-full p-2 border-2 border-[#87A1EC] rounded"
              value={currentModule.heading}
              onChange={(e) =>
                setCurrentModule({ ...currentModule, heading: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Module Subheading"
              className="w-full p-2 border-2 border-[#87A1EC] rounded"
              value={currentModule.subHeading}
              onChange={(e) =>
                setCurrentModule({
                  ...currentModule,
                  subHeading: e.target.value,
                })
              }
            />
            <button
              className="w-full p-2 bg-[#84DACB] text-white font-bold rounded shadow-md"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#84DACB]">
              Step 3: Module Video URL
            </h2>
            <input
              type="text"
              placeholder="Video URL"
              className="w-full p-2 border-2 border-[#87A1EC] rounded"
              value={currentModule.video.url}
              onChange={(e) =>
                setCurrentModule({
                  ...currentModule,
                  video: { url: e.target.value },
                })
              }
            />
            <button
              className="w-full p-2 bg-[#84DACB] text-white font-bold rounded shadow-md"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#84DACB]">
              Step 4: Module Content
            </h2>
            <textarea
              placeholder="Module Content"
              className="w-full p-2 border-2 border-[#87A1EC] rounded"
              value={currentModule.content}
              onChange={(e) =>
                setCurrentModule({ ...currentModule, content: e.target.value })
              }
            />
            <button
              className="w-full p-2 bg-[#84DACB] text-white font-bold rounded shadow-md"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        )}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#84DACB]">
              Step 4: Add Quiz
            </h2>
            <input
              type="text"
              placeholder="Question"
              className="w-full p-2 border-2 border-[#87A1EC] rounded"
              value={currentQuiz.question}
              onChange={(e) => handleInputChange(e, "question")}
            />
            {currentQuiz.options.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                className="w-full p-2 border-2 border-[#87A1EC] rounded"
                value={option}
                onChange={(e) => handleInputChange(e, "options", index)}
              />
            ))}
            <input
              type="text"
              placeholder="Answer"
              className="w-full p-2 border-2 border-[#87A1EC] rounded"
              value={currentQuiz.answer}
              onChange={(e) => handleInputChange(e, "answer")}
            />
            <button
              className="w-full p-2 bg-[#FE90E7] text-white font-bold rounded shadow-md"
              onClick={handleAddQuestion}
            >
              Add Question
            </button>
            <div className="mt-4">
              {currentModule.quizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="bg-[#87A1EC] p-2 mb-2 rounded shadow-md"
                >
                  <p className="font-bold">{quiz.question}</p>
                  <ul className="list-disc pl-6">
                    {quiz.options.map((option, optIndex) => (
                      <li key={optIndex}>{option}</li>
                    ))}
                  </ul>
                  <p className="font-bold">Answer: {quiz.answer}</p>
                </div>
              ))}
            </div>
            <button
              className="w-full p-2 bg-[#84DACB] text-white font-bold rounded shadow-md"
              onClick={handleSaveModule}
            >
              Save Module
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateCourse;
