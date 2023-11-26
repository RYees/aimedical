import React, {useEffect} from 'react'
import { Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useTimeoutFn } from 'react-use'
import { MdCancel } from 'react-icons/md'
import Image from 'next/image'

const AiHealth = () => {
    let [isShowing, setIsShowing] = useState(true);
    let [char, setChar] = useState({});
    const [isContentVisible, setIsContentVisible] = useState(true);
    let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 500);


   useEffect(() => {
      if (typeof window !== 'undefined') {
        const myValueString = localStorage.getItem('myKey');
        if(myValueString !== null){
          char = JSON.parse(myValueString);
        }
        setChar(char);
      }
    });

    useEffect(() => {
        const transitionDuration = 20000; // Duration in milliseconds
        const contentVisibilityDuration = 20000; // Duration in milliseconds
        // const timer = setInterval(() => {
        //   setIsShowing((prevIsShowing) => !prevIsShowing);
        //   resetIsShowing();
        // }, transitionDuration); // Set the interval time in milliseconds (e.g., 2000 for 2 seconds)

        // const contentVisibilityTimer = setTimeout(() => {
        //     setIsContentVisible(false);
        //   }, contentVisibilityDuration);
    
        // return () => {
        //   clearInterval(timer); // Clean up the interval when the component is unmounted
          //clearTimeout(contentVisibilityTimer);
        // };
      }, []);


   
  return (
    <div className='fixed right-0 z-10 mt-[32rem] lg:mt-[21rem] md:mt-[21rem] xl:mt-[21rem] 2xl:mt-[21rem]'>
        {isContentVisible && (
        <div className=''>
        <div className='relative h-56 w-64'>
            <Transition
            as={Fragment}
            show={isShowing}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 rotate-[-120deg] scale-50"
            enterTo="opacity-100 rotate-0 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 rotate-0 scale-100 "
            leaveTo="opacity-0 scale-95 "
            >
            <div className="relative h-full w-full rounded-md bg-gradient-to-br from-[#eeb35bf1] via-[#ee5bc2f1] to-[#eeb35bf1] shadow-lg">
                <MdCancel 
                className='cursor-pointer float-right m-1'
                onClick={() => {
                  setIsShowing(false)
                }}
                />
                <div className='flex flex-col text-center justify-center'>
                    <h3 className='text-xl my-3'>Hey there! <strong>{(char as any)?.name}</strong> here</h3>
                    <img src={(char as any)?.image} className='h-20 w-20 mb-5 mx-auto rounded-full'/>
                    <p className='mx-10 text-lg text-gray-600 italic'>Track your daily <strong>Health</strong></p>
                    {/* <p className='text-xl my-10 text-gray-900 hover:text-gray-700 k py-3 font-bold transform underline cursor-pointer'>set a reminder!!!</p> */}
                </div>
            </div>
                
            </Transition>
        </div>
        </div>
        )}
    </div>    
  )
}

export default AiHealth