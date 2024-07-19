import React from 'react';
import { useGetAllQuestionsuserQuery } from './../../../redux/features/questions/questionsApi';

function Questions() {
  const { data, isSuccess, isLoading, error } = useGetAllQuestionsuserQuery();

  return (
    <div className=' w-full h-full overflow-auto  '>
    <div className="container p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Questions</h1>
      
      {isLoading && <p className="text-gray-500">Loading questions...</p>}
      
      {error && <p className="text-red-500">Error fetching questions: {error.message}</p>}
      
      {isSuccess && data.questions.length > 0 && (
        data.questions.map((question) => (
          <div key={question._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">{question.courseName}</h2>
            <h3 className="text-lg font-medium text-gray-600 mb-2">{question.moduleName}</h3>
            <p className="text-gray-800 mb-2">{question.question}</p>
            {question.questionReplays.length > 0 ? (
              <div className="bg-gray-100 p-2 rounded">
                <h4 className="text-md font-medium text-gray-700 mb-1">Replies:</h4>
                {question.questionReplays.map((reply, index) => (
                  <p key={index} className="text-gray-600">{reply}</p>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No replies yet.</p>
            )}
          </div>
        ))
      )}

      {isSuccess && data.questions.length === 0 && (
        <p className="text-gray-500">No questions found.</p>
      )}
    </div>
    </div>
  );
}

export default Questions;
