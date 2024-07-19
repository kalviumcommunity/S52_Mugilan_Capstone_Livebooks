import React, { useState } from 'react';

function Quiz({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = questions[questionIndex].options[optionIndex];
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setSubmitted(false);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const allQuestionsAnswered = selectedAnswers.every(answer => answer !== '');

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      {questions && questions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1}</h3>
          <p className="mb-4">{questions[currentQuestionIndex].question}</p>
          <ul className="space-y-2">
            {questions[currentQuestionIndex].options.map((option, optionIndex) => (
              <li key={optionIndex} className={`px-4 py-2 rounded cursor-pointer ${submitted && (option === questions[currentQuestionIndex].answer ? 'bg-green-200' : 'bg-white')} hover:bg-gray-200`} onClick={() => handleOptionSelect(currentQuestionIndex, optionIndex)}>
                {option}
              </li>
            ))}
          </ul>
          <div className="mt-4 space-x-2">
            {currentQuestionIndex > 0 && (
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handlePreviousQuestion}>Previous</button>
            )}
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
            {(currentQuestionIndex === questions.length - 1 || allQuestionsAnswered) && (
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSubmit}>Submit</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
