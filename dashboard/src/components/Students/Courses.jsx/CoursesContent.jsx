import React from 'react';
import Quiz from './Quiz.jsx';
import { useOutletContext } from 'react-router-dom';
import { Video } from 'lucide-react';
import ReactPlayer from 'react-player'
function CoursesContent() {
  const [selectedContent] = useOutletContext();

  return (
    <div className=''>
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
