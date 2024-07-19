import React from 'react';
import Quiz from './Quiz.jsx';
import { Link, useOutletContext } from 'react-router-dom';
import { Video } from 'lucide-react';
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie';
function CoursesContent() {
  const [selectedContent] = useOutletContext();
  const courseId = Cookies.get('courseId');
  return (
    <div className=' relative h-full'>
      <Link to={`/askquestion/${courseId}`} className=' absolute bottom-0 right-0 bg-green-400 px-2 py-3'>
        Ask Dought
      </Link>
      {selectedContent && (
        <div>
          {selectedContent.title && <h1>{selectedContent.title}</h1>}
          {selectedContent.content && (
            <div className="max-w-full h-full mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">{selectedContent.heading}</h2>
            <h3 className="text-lg font-semibold mb-2">{selectedContent.subHeading}</h3>
            <p className="mb-4">{selectedContent.content}</p>
          </div>
          
        )}
          {selectedContent.url && (
            <div>
              <h3>Video</h3>
              <ReactPlayer url={selectedContent.url} />
            </div>
          )}
          {selectedContent.questions && (
            <Quiz questions={selectedContent.questions} />
          )}
        </div>
      )}
    </div>
  );
}

export default CoursesContent;
