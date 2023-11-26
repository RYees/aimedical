/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
//@ts-nocheck
import React, {useEffect, useState} from "react";
import Category from "./Catergory";
import Image from "next/image";
import black from '../../../public/black.jpg';
import { useRouter } from "next/router";
import ContentLoader from "react-content-loader";

function Character(props: { character: any }) {
  const router = useRouter();
  const CHARACTER_LIST = props.character;
  const character = CHARACTER_LIST[0];
  
  //console.log("character", CHARACTER_LIST[0]);

  function onCharacterClickHandler(name:any) {
    router.push(`/${name}`);
  }
 
  return (
    <>
    <div className="flex flex-col shadow-6xl rounded h-full">
        {/* <div 
        className="relative mt-4 z-10 h-16 bg-[rgba(0,0,0,0.7)] flex w-full flex-col justify-center border-b-[2px] border-[#606465] pb-7 pt-2"
        >
          <Image src={black} alt='loader' className='object-cover -z-10 absolute rounded h-20'/>
          <Category /> 
        </div> */}

        <div className="flex justify-center flex-row flex-wrap sm:-ml-0 md:-ml-0 lg:-ml-0 xl:-ml-0 2xl:-ml-0 sm:-mt-0 md:-mt-0 lg:-mt-0 xl:-mt-0 2xl:-mt-0 -ml-5 -mt-32">     
         {/* Whether you're looking for information, need assistance with something or just want to shoot the breeze, I'm here for you. Make yourself at home and let me know if there's any way I can enhance your experience here. Have a wonderful time and please don't hesitate to reach out if you need anything at all! */}

                <div className="relative w-72 md:w-96 sm:w-96 lg:w-96 xl:w-96 2xl:w-96 mb-10 mx-2 my-[1rem] mt-40 lg:mt-10 md:mt-10 xl:mt-10 2xl:mt-10 overflow-hidden rounded-lg text-gray-700">
                    <div onClick={() => onCharacterClickHandler(character.name)} className="cursor-pointer rounded-lg shadow-2xl">
                        <div className="m-2 flex justify-center overflow-hidden shadow-2xl">
                              {character.image === null || character.image === '' || character.image === undefined || character.image === 'null' ? (
                                <ContentLoader
                                speed={2}
                                width={430}
                                height={450} // Adjust the height and make it equal to the width for a square box
                                viewBox="0 0 430 450" // Adjust the viewBox accordingly
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                                className="ml-1 inline-block"
                                >
                                <rect x="0" y="0" rx="3" ry="3" width="430" height="450" /> 
                                </ContentLoader>
                                ):(                              
                                  <img
                                  className="rounded-[14px] h-[30rem]"
                                  
                                  src={character.image}
                                  />
                              )}
                        </div>
                      
                        <div className="flex justify-center text-[14px] font-bold">
                            {/* <p>{character.name}</p> */}
                        </div>
                        {/* <div className="mt-[4px] px-2 text-center text-[12px] font-[400]">
                            <p>{character.description}</p>            
                        </div> */}

                    </div>                  
                </div>

                <div className="relative">
                    <div className="absolute inset-10">
                      <div className="mx-auto h-full w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-orange-300 opacity-30 blur-lg"></div>
                    </div>
                 
                    <div className="mt-20 inline-block relative">
                      <h1 className="md:mx-24 sm:mx-24 text-center text-lg font-abc font-thin bg-[#f4f4f5] bg-opacity-10 p-2 rounded-xl w-[16em] my-10 leading-10 text-[#f4f4f5]">Welcome! I'm glad you're here. My name is {character.name} and I'm here to help you out however I can. Feel free to message me any questions you may have - I'd be happy to help you navigate the site, find what you need or just have a friendly chat.</h1>
                      <div className="flex justify-center">
                        <button className="py-3 px-8 font-bold hover:brightness-110 rounded bg-gradient-to-r from-[#f4f4f5] via-[#f4f4f5]-300 to-[#f4f4f5] text-[#16151a]" onClick={() => onCharacterClickHandler(character.name)}>
                          start chat
                        </button>  
                      </div>                    
                    </div> 

                  </div>


                
                

        </div>
       

   </div>
  </>
  );
}
export default Character;
