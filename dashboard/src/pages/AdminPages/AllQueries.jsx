import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllQuestionsAdminQuery, useAddAnswerMutation } from './../../../redux/features/questions/questionsApi';
import Heading from '@/utils/Heading';

function AllQueries() {
  const { data: allData, isSuccess: allDataIsSuccess, isLoading: allDataIsLoading, error: allDataError, refetch } = useGetAllQuestionsAdminQuery();
  const [senddata] = useAddAnswerMutation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('unanswered');
  const [replies, setReplies] = useState({});
  const navigate = useNavigate();


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleReplyChange = (questionId, value) => {
    setReplies(prev => ({ ...prev, [questionId]: value }));
  };

  const handleReplySubmit = async (questionId, courseName) => {
    if (replies[questionId]) {
      try {
        await senddata({ answer: replies[questionId], questionId, courseName });
        setReplies(prev => ({ ...prev, [questionId]: '' }));
        navigate('admin/')
      } catch (error) {
        console.error("Error submitting reply:", error);
      }
    }
  };



  let filteredQueries = [];
  if (allDataIsSuccess && allData && allData.questions) {
    filteredQueries = allData.questions.filter(query =>
      (query.user?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (query.courseName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (query.moduleName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (query.question?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  }

  const unansweredQueries = filteredQueries.filter(query => !query.answered);
  const answeredQueries = filteredQueries.filter(query => query.answered);

  const displayedQueries = activeTab === 'unanswered' ? unansweredQueries : answeredQueries;

  return (
    <div className=' w-full h-full overflow-auto  '>
      <Heading
        title="Queries -Hogwarts"
        description="Answer all the questions"
        keywords="question, answer, queries, answered, lesson"
      />
    <div className="container p-4">
      <input
        type="text"
        placeholder="Search by name, course, module or question"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-4 py-2 border rounded mb-4"
      />

      <div className="flex mb-4">
        <button
          className={`px-4 py-2 mr-2 ${activeTab === 'unanswered' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('unanswered')}
        >
          Unanswered
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'answered' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('answered')}
        >
          Answered
        </button>
      </div>

      {allDataIsLoading && <p className="text-gray-500">Loading questions...</p>}
      
      {allDataError && <p className="text-red-500">Error fetching questions: {allDataError.message}</p>}
      
      {allDataIsSuccess && displayedQueries.length > 0 ? (
        displayedQueries.map(query => (
          <div key={query._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">{query.courseName}</h2>
            <h3 className="text-lg font-medium text-gray-600 mb-2">{query.moduleName}</h3>
            <p className="text-gray-800 mb-2">{query.question}</p>
            <p className="text-sm text-gray-500 mb-2">Asked by: {query.user.name}</p>
            {query.questionReplays.length > 0 ? (
              <div className="bg-gray-100 p-2 rounded">
                <h4 className="text-md font-medium text-gray-700 mb-1">Replies:</h4>
                {query.questionReplays.map((reply, index) => (
                  <p key={index} className="text-gray-600">{reply}</p>
                ))}
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Type your reply..."
                  value={replies[query._id] || ''}
                  onChange={(e) => handleReplyChange(query._id, e.target.value)}
                  className="w-full px-4 py-2 border rounded mb-2"
                />
                <button 
                  onClick={() => handleReplySubmit(query._id, query.courseName)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Reply
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        !allDataIsLoading && <p className="text-gray-500">No queries found.</p>
      )}
    </div>
    </div>
  );
}

export default AllQueries;
