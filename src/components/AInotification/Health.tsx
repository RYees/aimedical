import React, {useEffect} from 'react'
import { Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useTimeoutFn } from 'react-use'
import { MdCancel } from 'react-icons/md'
import Image from 'next/image'

const Health = () => {
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
    <div className='fixed right-0 z-10 mt-0 mr-2'>
        {isContentVisible && (
        <div className=''>
        <div className='relative h-64 w-72'>
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
            <div className="relative h-full w-full rounded-md bg-gradient-to-bl from-red-300 via-red-700 to-red-300 shadow-lg">
                <MdCancel 
                className='cursor-pointer float-right m-1'
                onClick={() => {
                  setIsShowing(false)
                }}
                />
                <div className='flex flex-col text-center justify-center'> 
                    <div className='my-10 '>               
                        <p className='text-xl text-gray-900 hover:text-gray-700 py-3 font-bold cursor-pointer'>
                            The Patient Needs Attention</p>
                        <p className='text-md text-gray-900 hover:text-gray-700 py-3 font-bold cursor-pointer'>
                            The Patient Needs Attention</p>
                        <p className='text-lg text-gray-900 hover:text-gray-700 py-3 font-bold cursor-pointer'>
                        The Patient Needs Attention</p>
                    </div>
                </div>
            </div>
                
            </Transition>
        </div>
        </div>
        )}
    </div>    
  )
}

export default Health