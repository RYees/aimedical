// import { useCompletion, useChat } from 'ai/react';
 
// export default function ConvertToRuby() {
//   const { completion, input, handleInputChange, handleSubmit } = useCompletion({api: '/api/completion'});
 
//   return (
//     <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
//       <form onSubmit={handleSubmit}>
//         <input
//           className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2 text-black"
//           value={input}
//           placeholder="Conver to Ruby..."
//           onChange={handleInputChange}
//         />
//       </form>
//       <div className="whitespace-pre-wrap my-6">{completion}</div>
//     </div>
//   );
// }


// 'use client';
 
// import { useChat } from 'ai/react';
 
// export default function Chat() {
//   const { messages, input, handleInputChange, handleSubmit } = useChat({api: '/api/completion'});
 
//   return (
//     <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
//       {messages.map(m => (
//         <div key={m.id}>
//           {m.role === 'user' ? 'User: ' : 'AI: '}
//           {m.content}
//         </div>
//       ))}
 
//       <form onSubmit={handleSubmit}>
//         <label>
//           Say something...
//           <input
//             className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
//             value={input}
//             onChange={handleInputChange}
//           />
//         </label>
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }

import type { NextPage } from "next";
import { useChat } from "ai/react";
import axios from "axios";
import { request } from "http";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Chat: NextPage = (props: any) => {
  const character = props.character;
  console.log("lether", character)
  const aiSdkChat = `/api/aiSdkChat`;
  const langChainChat = `/api/langChainChat`;
  const [fetchedMessages, setFetchedMessages] = useState([]); 
  const [isFetching, setIsFetching] = useState(true);
  const { data: session, status } = useSession();
  const user = session?.user;
  
  let { messages, input, isLoading, stop, handleInputChange, handleSubmit } =
    useChat({
      api: langChainChat,
    });
          
    useEffect(() => {
        const saveMessageToDatabase = async (message:any) => {
          try {
            const requestinputs = {
                chatid: message.id,
                role: message.role,
                content: message.content,
                userId: user?.id,
                characterId: 1,
            }
            const response = await axios.post('/api/characterchat', requestinputs)
            console.log("New message saved to database");
            messages = [];
          } catch (error) {
            console.error("Error saving message to database:", error);
          }
        };
    
        if (!isLoading && messages.length > 0) {
          const lastMessage = messages[messages.length - 1];
          saveMessageToDatabase(lastMessage);
        }
    }, [messages, isLoading, user]);
    
    

     if (!isLoading) {console.log("output", messages); }

 
    const handler = async (event: any) => {
        if (event.keyCode === 13) {
        console.log("exact", input)
        try {
            const requestinputs = {
                chatid: '',
                role: "user",
                content: input,
                userId: user?.id,
                characterId: 1,
            }
            const response = await axios.post('/api/characterchat', requestinputs)
            console.log("New message saved to database");
        } catch (error) {
            console.error("Error saving message to database:", error);
        }
        }
    };

    useEffect(() => {
        // Fetch stored messages from the database
        const fetchStoredMessages = async () => {
          try {
            const response = await axios.get(`/api/fetchcharacterchat?userId=${user?.id}&characterId=1`); // Replace with the appropriate API endpoint for fetching messages
            const fetchedMessages = response.data; // Assuming the response contains an array of messages
            setFetchedMessages(fetchedMessages);
          } catch (error) {
            console.error("Error fetching stored messages:", error);
          } finally {
            setIsFetching(false);
          }
        };
    
        const timer = setTimeout(() => {
            fetchStoredMessages();
          }, 5000);
      
        return () => clearTimeout(timer); // Clear the timer if the component unmounts before 5 seconds
      },[fetchedMessages]);

      console.log("surrenderd", messages)


    if (isFetching) {
        return <div>Loading...</div>;
    }

    const handleGoogle = async () => {
      try {
        console.log("testing ohohoho")
        const apiUrl = "/api/questionanswer";
        const response = await axios.post(apiUrl, {
          query: "what is a cat",
        });
        console.log("response_google", response.data);       
      } catch (error) {
        console.log("error", error);
      }
    };
    console.log("seem", process.env.NEXT_PUBLIC_OPEN_AI_APIKEY)

  return (
    <>
      <div className="mx-auto w-full max-w-md py-24 flex flex-col">
        <p className="font-bold text-lg" onClick={handleGoogle}>ChatGPT</p>
        {fetchedMessages.map((m: any) => (
          <div key={m.id} className="w-96 mb-2 p-2">
            {m.role === "user" ? "You: " : "AI: "}
            {m.content}
          </div>
        ))}

        <br />
        {messages.map((m) => (
          <div key={m.id} className="w-96 mb-2 p-2">
            {m.role === "user" ? "You: " : "AI: "}
            {m.content}
          </div>
        ))}

        <br />
          

        <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <input
            name="box"
            className="w-96 flex rounded bottom-0 border border-gray-300 text-gray-700 mb-2 p-2"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => handler(e)}
          />
        </label>
         
          {isLoading ? (
            <button
              type="submit"
              className="opacity-50 cursor-not-allowed w-96 rounded bg-sky-500 hover:bg-sky-700 mb-2 p-2"
              disabled
            >
              Send
            </button>
          ) : (
            <button
              type="submit"
              className="w-96 rounded bg-sky-500 hover:bg-sky-700 mb-2 p-2"
            >
              Send
            </button>
          )}
        </form>

      </div>
    </>
  );
};

export default Chat;


// import { useState } from 'react';

// export default function ChatForm() {
//   const [question, setQuestion] = useState('');
//   const [character, setCharacter] = useState('');
//   const [behavior, setBehavior] = useState('');
//   const [response, setResponse] = useState('');
//   const [isFetching, setIsFetching] = useState(false);
  

//   const displayResponse = (words:any, index:any) => {
//     if (index < words.length) {
//       setResponse((prevResponse) => prevResponse + ' ' + words[index]);
//       setTimeout(() => {
//         displayResponse(words, index + 1);
//       }, 200); // Adjust the delay between each word as needed
//     } else {
//       setIsFetching(false);
//     }
//   };

//   const handleSubmit = (e:any) => {
//     e.preventDefault();

//     const payload = {
//       messages: [
//         {
//           role: 'user',
//           content: question,
//           character: character,
//           behavior: behavior,
//         },
//       ],
//     };

//     setIsFetching(true);
//     setResponse('');

//     fetch('/api/langChainChat', {
//       method: 'POST',
//       body: JSON.stringify(payload),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle the response from the backend
//         console.log(data);
//         const aiResponse = data.choices[0].message.content;
//         const words = aiResponse.split(' ');
//         displayResponse(words, 0);
//       })
//       .catch((error) => {
//         // Handle any errors
//         console.error(error);
//         setIsFetching(false);
//       });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Question:
//           <input
//             type="text"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//           />
//         </label>
//         <label>
//           Character:
//           <input
//             type="text"
//             value={character}
//             onChange={(e) => setCharacter(e.target.value)}
//           />
//         </label>
//         <label>
//           Behavior:
//           <input
//             type="text"
//             value={behavior}
//             onChange={(e) => setBehavior(e.target.value)}
//           />
//         </label>
//         <button type="submit">Submit</button>
//       </form>

//       {isFetching && <p>Loading...</p>}

//       {!isFetching && response && (
//         <div>
//           <h3>User Question:</h3>
//           <p>{question}</p>
//           <h3>AI Response:</h3>
//           <p>{response}</p>
//         </div>
//       )}
//     </div>
//   );
// }