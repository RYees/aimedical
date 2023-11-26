import React from 'react'

const oldcode = () => {
  return (
    <div>
        oldcode
    </div>
  )
}

export default oldcode
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// //@ts-nocheck
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const messagingSID = process.env.TWILIO_MESSAGING_SERVICE_SID;
// const client = require('twilio')(accountSid, authToken);

// import Header from "~/components/Header/Header";
// import Sidebar from "~/components/Sidebar/Sidebar";
// import Characters from "~/components/Characters/Characters";
// import AuthModal from "~/components/helper/AuthModal";
// import { useState, useEffect } from "react";
// import { PrismaClient } from "@prisma/client";
// import axios from "axios";
// //import CronJob from 'node-cron';
// import { CronJob } from "cron";
// import Agenda from "agenda";

// // const job = new CronJob('* * * * * *', () => {
// //   console.log('Runs every minute!');
// // });

// function HomePage(props) {
//   const [showModal, setShowModal] = useState(false);
//   const closeModal = () => setShowModal(false);
//   const openModal = () => setShowModal(true);
//   // const character = props.character;
//   // const user = props.user;
//   // const favourite = props.favourite;
//   const [show, setShow] = useState([]);
//   console.log("hey to my nigger tops", props)
//   return (
//     <>
//       <div className="relative w-[74.3rem] bg-slate-800">
//         {/* <div>
//           <Header openModal={openModal} />
//         </div> */}
//         <div className="">
//           {/* <Sidebar /> */}
//           {/* <Characters character={character} favourite={favourite}/> */}
//         </div>
//       </div>
//       {/* <AuthModal show={showModal} onClose={closeModal} /> */}
//     </>
//   );
// }

// export default HomePage;

// const getString = (dayOfWeek:any) => {
//   if(dayOfWeek == 0) return "S";
//   if(dayOfWeek == 1) return "M";
//   if(dayOfWeek == 2) return "T";
//   if(dayOfWeek == 3) return "W";
//   if(dayOfWeek == 4) return "Th";
//   if(dayOfWeek == 5) return "F";
//   return "Sa";
// }
// const prisma = new PrismaClient()
// // export async function getServerSideProps(context) {
// //   const prisma = new PrismaClient();
// //   const data = await prisma.character.findMany();
// //   const response = await prisma.user.findMany();
// //   const userfav = await prisma.user.findUnique(
// //     {
// //         where: {
// //             id: '9488e8dc-9756-465b-8345-0cf06a9d2400',
// //         },
// //         include: {
// //             healthtracking: true,
// //             characters: {
// //                 include: {
// //                     character: true
// //                 }
// //             },
// //             reminders: true
// //         },
// //     }
// //   );

// //    return {
// //     props: {
// //       character: JSON.parse(JSON.stringify(data)),
// //       user: JSON.parse(JSON.stringify(response)),
// //       favourite: JSON.parse(JSON.stringify(userfav)),
// //     },
// //   };
// // }
// import { init } from './api/init'
// import {UserNotification} from "./api/notification";

// // export async function getServerSideProps() {
// //   //return "hey to my nigger tops";
// //   console.log("hey to my nigger tops")
// //   //const job = new CronJob('* * * * *', () => {
// //     //fetch("/api/scheduler");  
//   //   const data = init();
//   //  // return data;
// //     //console.log("val", val)
// //     //return val;
// //   //});
  
// //   job.start();  


  
// //   return {
// //     props: { data } 
// //   }
// // }

// export const getServerSideProps = async () => {
//   // const data = await axios.get('/api/init')
//   // console.log("data", data);
//   const job = new CronJob('* * * * *',  async () => {
//     console.log("dumb");

//     try {
// const date = new Date();
// const dayOfWeek = date.getDay();
// const searchString = getString(dayOfWeek)
// console.log("sports");

// const response = await prisma.reminder.findMany({  
  
//   where: {
//       days: {
//           contains: searchString,
//           mode: 'insensitive'
//       },
//     //   time: {
//     //     contains: currentime 
//     //   }
//   },  

// })
// .then(data => {  
//     console.log("data", data);
//     const MessagingData = data.map(element => {
//         if(element.opted == true){
//             const message = `Hello user. We hope you are doing well. Here is your reminder for medicine intake. You have to take Medicine Name : "${element.medicinename}" with Dosage : "${element.dosage}". Thank You, Have A great Day.`;
//             return {
//                 number : element.phoneNumber , 
//                 message : message
//             };
//         }
//     })

//     console.log("Message", MessagingData);

    // Promise.all(
    //   MessagingData.map((data:any) => {
    //       return client.messages.create({
    //           to: "+251922147859",
    //           from: "+14782102780",
    //           body: "testing message"
    //       });
    //   })
    // )
//     // .then(messages => {
//     //   console.log("Messages Sent");
//     // })
//     // .catch(err => console.error(err));


// })
// .catch(err => {
//     console.log(err);
// })
// } catch(error) {
// console.log("error", error);
// }
//   });



// // const job = new CronJob('* * * * *', async function() {
// //   const users = await prisma.user.findMany();
// //   console.log(users);
// //   // Do something with users...
// // });
// job.start();
//   return { // response: JSON.parse(JSON.stringify(response)) 
//     props: { 
//       //job: JSON.parse(JSON.stringify(job))
//      } 
//   }
// }
// // export const getServerSideProps = async () => {
// //   console.log("hey")
// //   Agenda.define('log user', (job, done) => {
// //     // Call Prisma API route
// //     axios.get("api/scheduler");
// //     done(); 
// //   });

// //   const data = await axios.get('/api/init');
  
// //   return {
// //     props: { data }  
// //   }
// // }




// dashboard old code
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
//@ts-nocheck
// import React, {useEffect, useState} from "react";
// import Category from "./Catergory";
// import Image from "next/image";
// import {black} from '../../../public/black.jpg';
// import { useRouter } from "next/router";

// function Character(props: { character: any }) {
//   const router = useRouter();
//   const CHARACTER_LIST = props.character;
//   const character = CHARACTER_LIST[0];
  
//   //console.log("character", CHARACTER_LIST[0]);

//   function onCharacterClickHandler(name:any) {
//     router.push(`/${name}`);
//   }
 
//   return (
//     <>

//     <div className="shadow-6xl bg-gradient-to-r from-white via-yellow-200 to-white rounded h-full">
      
//         {/* <div className="flex justify-start flex-col overflow-hidden hidden md:block">
//             <Image src='/reminder_a.png' height={300} width={300} className="rotate-45 md:ml-80"/>
//             <Image src='/reminder_b.png' height={300} width={300} className="-rotate-45 md:ml-80"/>
//             <Image src='/classer.png' height={150} width={150} className="-rotate-45 ml-9 -mt-40"/>
//         </div>


//         <div className="flex justify-end float-right -mt-[20rem] flex-col gap-10 overflow-hidden right-0 absolute z-10 mr-96 hidden md:block">           
//             <Image src='/brain.png' height={200} width={200} className="-rotate-45"/>
//             <Image src='/watch.png' height={200} width={200} className="-rotate-45 "/>
//             <Image src='/circle.png' height={170} width={170} className="rotate-45 md:-mt-4"/>
//         </div> */}

        
//         <div className="flex justify-center flex-row flex-wrap sm:-ml-0 md:-ml-0 lg:-ml-0 xl:-ml-0 2xl:-ml-0 sm:-mt-0 md:-mt-0 lg:-mt-0 xl:-mt-0 2xl:-mt-10 -ml-5 ">                   

//                 <div className="relative w-72 md:w-96 sm:w-96 lg:w-96 xl:w-96 2xl:w-96 mb-10 mx-2 my-[1rem] lg:mt-10 md:mt-10 xl:mt-10 2xl:-mt-[28rem] overflow-hidden rounded-lg text-gray-700 bg-gradient-to-r from-white via-yellow-100 to-white">
//                     <div onClick={() => onCharacterClickHandler(character.name)} className="cursor-pointer rounded-lg hover:bg-gradient-to-r from-white via-yellow-300 to-white">
//                         <div className="m-2 flex justify-center overflow-hidden">
//                             <img
//                             className="rounded-[14px] "
//                             width="1508px"
//                             height="1308px"
//                             src={character.image}
//                             />
//                         </div>
                      
//                         <div className="flex justify-center text-[14px] font-bold">
//                             {/* <p>{character.name}</p> */}
//                         </div>
//                         {/* <div className="mt-[4px] px-2 text-center text-[12px] font-[400]">
//                             <p>{character.description}</p>             
//                         </div> */}

//                     </div>                  
//                 </div>

                
//                 <div className="md:-mt-[26rem] lg:-mt-[26rem] xl:-mt-[26rem] :-mt-[26rem] absolute text-white">
//                   <h1 className="md:mx-24 sm:mx-24 bg-black bg-opacity-30 rounded transition duration-300 hover:hidden cursor-pointer font-bold text-center text-xl font-serif italic w-[16em] my-10 leading-10 px-3">Welcome! I'm glad you're here. My name is {character.name} and I'm here to help you out however I can. Feel free to message me any questions you may have - I'd be happy to help you navigate the site, find what you need or just have a friendly chat.</h1>
//                   <div className="flex justify-center my-10">
//                     <button className="py-3 px-8 font-bold text-white hover:brightness-110 rounded bg-gradient-to-br from-[#ffffffd9] via-yellow-500 to-[#ffffffd9]" onClick={() => onCharacterClickHandler(character.name)}>
//                       start chat
//                     </button>  
//                   </div>                    
//                 </div> 

//         </div>

        
//         {/* <div className="flex justify-end float-right -mt-[65rem] flex-col overflow-hidden">
//             <Image src='/classer.png' height={200} width={200} className="-rotate-45 ml-10 mt"/>
//         </div> */}
                      

//    </div>
//   </>
//   );
// }
// export default Character;
