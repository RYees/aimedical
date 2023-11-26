import React from 'react';
import axios from 'axios'; // for making HTTP requests

function RelatedQuestionsComponent() {
  // State to store the related questions and answers
  const [relatedQuestions, setRelatedQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);

  // Function to fetch related questions and answers
  const fetchRelatedQuestions = async () => {
    console.log("mushrooms")
    try {
      // Make a POST request to your Next.js API route that handles the OpenAI server code
      const response = await axios.post('/api/openai', {
        query: 'what are related questions to how can i make a sandwich?', // Replace with your desired question
        // Additional parameters if required
      });

      // Extract the related questions and answers from the response
      const { data } = response;
      const { answer } = data;
      console.log("responding...", answer.text)
      let text = answer.text;
      const lines = text.split('\n');

      const items = lines
        .map((line) => line.trim().replace(/^\d+\.\s*/, ''))
        .filter((line) => line !== '');
        const newItem = "tell me more";
        items.unshift(newItem);
        console.log(items);
        setAnswers(items);
        
    //console.log("sickforpractice", items);

      // Update the state with the related questions and answers
      //setRelatedQuestions(relatedQuestions || []);
      //setAnswers(answer || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch related questions and answers when the component mounts
//   React.useEffect(() => {
//     fetchRelatedQuestions();
//   },[]);

  return (
    <div className='mt-40'>
      <h3 className='cursor-pointer' onClick={fetchRelatedQuestions}>RelatedQuestions:</h3>
       <div className='flex flex-col items-start justify-start float-left text-left gap-5'>
        {answers &&
          answers?.map((answer, index) => (
                <button key={index} className='border-3 p-4 bg-gray-200'>
                    {answer}
                </button>            
          
          ))}
      </div>
    </div>
  );
}

export default RelatedQuestionsComponent;