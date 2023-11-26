// import React, { useState, useCallback } from 'react';
// // import '../styles/App.css';
// import toast, { Toaster } from "react-hot-toast";
// const cors = require("cors");
// import axios from 'axios';

// function AppTry() {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState('');
//   const [result, setResult] = useState('');
//   const [statusMessage, setStatusMessage] = useState('');
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [dragOver, setDragOver] = useState(false);

//   const handleFileChange = useCallback((selectedFile:any) => {
//     setFile(selectedFile);
//     setPreview(URL.createObjectURL(selectedFile));
//     setStatusMessage('Image selected. Click "Analyze Image" to proceed.');
//     setUploadProgress(0);
//   }, []);

//   const [base64String, setBase64String] = useState("");
//   const [base64St, setBase64] = useState("");

//   const handleFileUpload = (event:any) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//       const base64 = reader.result;
//       const base64s = (reader.result as string)
//         .replace("data:", "")
//         .replace(/^.+,/, "");
//       //console.log("more land", base64)
//       setBase64String(base64 as string);
//       setBase64(base64s);
//     };

//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (event:any) => {
//     event.preventDefault();
//     setStatusMessage('Sending request...');
//       const data = {
//         model: "gpt-4-vision-preview",
//         messages: [
//           {
//             "role": "user",
//             "content": [
//               {
//                 "type": "text",
//                 "text": "What’s in this image?"
//               },
//               {
//                 "type": "image_url",
//                 //"image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
//                 "image_url": {
//                   "url": `data:image/jpeg;base64,${base64St}`
//                 }
//               }
//             ]
//           }
//         ],
//         max_tokens: 300
//       };

//       try {
//         const response = await fetch('https://api.openai.com/v1/chat/completions', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer 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`, // Use environment variable for API key
//             'Access-Control-Allow-Origin':'https://api.openai.com/v1/chat/completions',
//             'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS',
//           },
          
//           body: JSON.stringify(data)
//         });

//         setUploadProgress(50); // Midway progress

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const apiResponse = await response.json();
//         setUploadProgress(100); // Final progress

//         if (apiResponse.choices && apiResponse.choices.length > 0) {
//           setResult(apiResponse.choices[0].message.content);
//           setStatusMessage('Analysis complete.');
//         } else {
//           console.error('No choices returned from API');
//           setStatusMessage('Failed to get a response from the API.');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         setStatusMessage('An error occurred during the analysis.');
//       }
//     // };
//     // reader.onerror = (error) => {
//     //   console.error('Error:', error);
//     //   setStatusMessage('File reading failed!');
//     // };
//   };

//   const handleDragOver = useCallback((event:any) => {
//     event.preventDefault();
//     setDragOver(true);
//   }, []);

//   const handleDragLeave = useCallback(() => {
//     setDragOver(false);
//   }, []);

//   const handleDrop = useCallback((event:any) => {
//     event.preventDefault();
//     setDragOver(false);
//     const files = event.dataTransfer.files;
//     if (files.length) {
//       handleFileChange(files[0]);
//     }
//   }, [handleFileChange]);

  
//   return (
//     <div className="App">
//       <h1>OpenAI Image Analysis</h1>
//       {/* <div 
//         className={`drop-area ${dragOver ? 'drag-over' : ''}`}
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onClick={() => document.getElementById('fileUpload').click()}
//       >
//         <input
//           type="file"
//           className=""
//           onChange={OnChangeImageFile}
//         />
//         {preview ? (
//           <img src={preview} alt="Preview" className="image-preview" />
//         ) : (
//           <p>Drag and drop an image here, or click to select an image to upload.</p>
//         )}
//       </div> */}
//       <div>
//         <input type="file" accept="image/*" onChange={handleFileUpload} />
//         {base64String && (
//           <img src={base64String} alt="Uploaded" style={{ maxWidth: "30%" }} />
//         )}
//       </div>

//       {statusMessage && <p className="status-message w-full">{statusMessage}</p>}
//       {uploadProgress > 0 && (
//         <progress value={uploadProgress} max="100"></progress>
//       )}
//       <button onClick={handleSubmit} className="analyze-button">
//         Analyze Image
//       </button>
//       {result && (
//         <div className="result">
//           <strong>Analysis Result:</strong>
//           <textarea className='w-full' value={result} readOnly />
//         </div>
//       )}
//     </div>
//   );
// }

// export default AppTry;



//video upload with gpt4vison
// import { useEffect, useState } from 'react';
// //import openai from 'openai';
// const OpenAI = require("openai");
// import cv2 from 'opencv-react'; // Assuming you have installed the 'opencv' package
// import { VideoCapture, imencode } from 'opencv-react';
// // Load environment variables from .env file
// require('dotenv').config();

import { useEffect, useState } from 'react';
import axios from "axios"
import FormData from "form-data";
import React from "react";
import 'cross-fetch/polyfill';


export default function VideoUnderstanding() {
  //const [selectedVideo, setSelectedVideo] = useState(null);
  //const [imageData] = useState(new FormData());
 // const [videoData] = useState(new FormData());

  async function handleFileChange (event: any) {
    // setSelectedVideo(event.target.files[0]);
    event.preventDefault();  

    try {
      const files = event.target.files[0];
      if (!files) {
        console.log('No video alt selected.');
        return;
      }
      //const files = file[0];
      const imageData = new FormData();
      console.log("selected", files)
      // const imageData = new URLSearchParams();
      // if (!files) {
      //   console.log('No video selected.');
      //   return;
      // }
      const apiUrl = "/api/assistantapi";
      imageData.append("file", files);
      console.log("megan", await fetch(apiUrl, 
        {
        method: "POST", // changed from GET
        //body: imageData,
      }
      ))
      //imageData.append('file', file);
      console.log("files", imageData)

      
      //const response = await axios.post(apiUrl,imageData
      // {
      //   method: "POST", // changed from GET
      //   body: imageData,
      // }
      //);

      // const response = await axios.post(apiUrl, imageData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      // const response =await fetch(apiUrl, {
      //   method: "POST", // changed from GET
      //   body: imageData,
      // }).then((r) => r.json());

      //const response = await axios.post(apiUrl, imageData, {
      //   // Increase the maximum request body size limit to 10MB
      //   maxContentLength: 10 * 1024 * 1024,
      // });
      
      
    
      // if (response) {
      //   console.log('Video uploaded successfully.');
      //   // Handle the server response if needed
      // } else {
      //   console.error('Failed to upload video.');
      //   // Handle the error if needed
      // }
    } catch (error) {
      console.error('An error occurred during video upload:', error);
      // Handle the error if needed
    }
    
  };

  // const handleFormSubmit = async (event:any) => {
  //   event.preventDefault();

  //   if (!selectedVideo) {
  //     console.log('No video alt selected.');
  //     return;
  //   }

  //   //const formData = new FormData();
  //   imageData.append('files', selectedVideo);
  //   console.log("files", imageData)

  //   try {
  //        const apiUrl = "/api/gptvision";
  //     const response = await axios.post(apiUrl, {
  //       body: imageData,
  //     });
    
  //     if (response) {
  //       console.log('Video uploaded successfully.');
  //       // Handle the server response if needed
  //     } else {
  //       console.error('Failed to upload video.');
  //       // Handle the error if needed
  //     }
  //   } catch (error) {
  //     console.error('An error occurred during video upload:', error);
  //     // Handle the error if needed
  //   }
  // };
  
  async function OnChangeImageFile(event:any) {
    console.log('alt selected.');
    event.preventDefault();
    try {
      const files = event.target.files[0];
      if (!files) {
        console.log('No video alt selected.');
        return;
      }
      console.log("data", files)
      // const files = file[0];
      // //const vData = new URLSearchParams();
      // if (!files) {
      //   console.log('No video selected.');
      //   return;
      // }

      //const videoData = new URLSearchParams();
      //const formData = new FormData();
      const api = "/api/gptvision"
      const videoData = new FormData();
      console.log("fhon", videoData)
      videoData.append("file", files);
      console.log("fetchon", videoData)
      // console.log('alt selected again.', await fetch(api, 
      //   {
      //     method: "POST", // changed from GET
      //     body: videoData ,
      //   }
      //   ));
      
      const upload = await fetch(api, 
      {
        method: "POST", // changed from GET
        //body: videoData ,
      }
      )
      // .then((r) => r.json());
      console.log("server", upload)
      
    } catch (error) {
      console.log("error", error);
    }
  }
 
  return (
    <>
    <div>
      <h1>Upload Video</h1>
      {/* <form onSubmit={handleFormSubmit} encType="multipart/form-data"> */}
        <input 
        type="file" 
        name="videoFile" 
        onChange={handleFileChange} 
        accept="video/*" 
        /><br />
        <button className='bg-green-500 p-4 m-5' type="submit">Upload</button>
      {/* </form> */}
    </div>

              <form className="mx-10 mt-1 space-y-3" action="#" method="POST">
                  <div className="grid grid-cols-1 space-y-2">
                    <div className="flex w-56 items-center justify-center md:w-full">
                      <label className="group flex h-60 w-full flex-col rounded-lg border-4 border-dashed p-10 text-center">
                        <div className="flex h-full w-full flex-col items-center justify-center text-center  ">
                          {/*-<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>*/}
                          {/* <div className="mx-auto -mt-10 flex max-h-48 w-2/5 flex-auto">
                            <img
                              className="has-mask h-36 object-center"
                              src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                              alt="freepik image"
                            />
                          </div> */}
                          
                            {/* <span className="text-sm">Drag and drop</span> files
                            here <br /> or{" "} */}
                            <p
                              // href=""
                              id=""
                              className="cursor-pointer text-2xl text-blue-600 hover:underline"
                            >
                              select a file
                            </p>{" "}
                            from your computer
                    
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={OnChangeImageFile}
                          name="videoFile" 
                         // onChange={handleFileChange} 
                          accept="video/*"
                        />
                      </label>
                    </div>
                  </div>
              </form>
    </>
  );
}

