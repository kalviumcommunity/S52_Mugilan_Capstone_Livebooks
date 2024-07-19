import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useCreateQuestionMutation } from './../../../../redux/features/questions/questionsApi';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Askquestion() {
    const navigate = useNavigate()
  const [createQuestion, { isLoading, isSuccess, isError }] = useCreateQuestionMutation();
  const [question, setQuestion] = useState('');

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const courseId = Cookies.get("courseId");
  const moduleId = Cookies.get("moduleId");
  const moduleName = Cookies.get("moduleName");
  const courseName = Cookies.get("courseName");


  const handleSubmit = async () => {
    try {
      // Call the createQuestion mutation here with the necessary data
      await createQuestion({ question, courseId, moduleId });
       toast.success("queri submitted successfully")
       navigate(`/course/${courseId}`)
    } catch (error) {
        toast.error(error)

      console.error('Error creating question:', error);
    }
  };

  return (
    <div className="bg-[#F8F9FB] min-h-screen py-8 px-5">
      <Toaster />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
        <div className="bg-[#3F3D56] text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-bold">Course Name: {`${courseName}`}</h2>
          <p className="text-sm">Module Name: {`${moduleName}`}</p>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-[#3F3D56]">
            Ask a Question
          </h3>
          <div className="mb-4">
            <textarea
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9F73AB]"
              rows="4"
              placeholder="Enter your question..."
              value={question}
              onChange={handleQuestionChange}
            ></textarea>
          </div>
          <button
            className="bg-[#9F73AB] text-white px-4 py-2 rounded-md hover:bg-[#A67FB8] transition-colors duration-300"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Askquestion;
