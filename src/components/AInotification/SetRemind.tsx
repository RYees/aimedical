import React, {useEffect} from 'react'
import { Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useTimeoutFn } from 'react-use'
import { MdCancel } from 'react-icons/md'
import Image from 'next/image'
import {GoBellFill} from "react-icons/go"

const SetRemind = () => {
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
    <div className=''>
        {isContentVisible && (
        <div className=''>
        <div className=''>
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
            <div className="flex gap-2">
               set a reminder <GoBellFill className="text-yellow-300 cursor-pointer"/>
            </div>
                
            </Transition>
        </div>
        </div>
        )}
    </div>    
  )
}

export default SetRemind