import React from 'react'
import { Listbox, Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import { Fragment, useState, useEffect } from 'react';
import axios from "axios";
import { useSession } from "next-auth/react";
import { CheckIcon} from '@heroicons/react/outline'
import { FcSportsMode } from 'react-icons/fc';


export function DairyForm(props: any) {
    const show = props.show;
    const onClose = props.onClose;
   
    
    // const healthId = props.healthId;
    const [messagebio, setBioMessage] = useState('');
    const [form, setForm] = useState({
        glucose: ''    ,
        cholesterol: '',
        hemoglobin: '',
        carbohydrate: '',
        protiens: '',
        fats: '',
        ecg: '',
        vitamins: '',
        minerals: '',
    });
    let [char, setChar] = useState({});
    // Retrieving data from local storage

    // useEffect(() => {
    //   if (typeof window !== 'undefined') {
    //     const myValueString = localStorage.getItem('myKey');
    //     if(myValueString !== null){
    //       char = JSON.parse(myValueString);
    //     }
    //     setChar(char);
    //   }
    // });

    const { data: session } = useSession();
    const user = session?.user;
    
    const handleSubmit = async(e:any) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('form',form)
        try {
            const res = await axios.post('/api/updatehealthdata/three', 
            {
                healthId: 'healthId',
                glucose: form.glucose     ,
                cholesterol: form.cholesterol  ,
                hemoglobin: form.hemoglobin   ,
                carbohydrate: form.carbohydrate ,
                protiens: form.protiens     ,
                fats: form.fats         ,
                ecg: form.ecg          ,
                vitamins: form.vitamins     ,
                minerals: form.minerals     ,                
                
            })
            console.log('success', res.data);
            setBioMessage('Nice work!!!, you have added an exercise.');
            } catch(error){
                console.log("error", error);
            }
    };

    const closeModal = () => {
        if (typeof onClose === "function") {
        onClose();
        }
    };


  return (
    <>    
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative my-8 inline-block w-full max-w-2xl transform  overflow-hidden  bg-gray-200 text-left align-middle shadow-xl transition-all sm:rounded-md">
              {/* Close icon */}
              <button
                onClick={()=>closeModal}
                className="absolute right-2 top-2 shrink-0 rounded-md p-1 transition hover:bg-gray-100 focus:outline-none"
              >
                {/* <XIcon className="w-5 h-5" /> */}
              </button>

              <div className="py-12">
                <div className="px-4 sm:px-12">
                <Dialog.Title
                    as="h3"                    
                  >
                      <div className="flex gap-3 text-lg mt-3">
                        <img src={(char as any)?.image} className="h-10 w-10 rounded-full" alt="" />
                        {messagebio !== '' ?<p className="text-green-900 font-thin">{messagebio}</p>: 
                        <p className="text-gray-900 font-thin">hey there, you want to add an exercise you work out</p>}
                      </div>
                    
                     <br />
                    
                  </Dialog.Title>
                  <Dialog.Title
                    as="h3"
                    className="mt-2 bg-gradient-to-r from-orange-500  to-pink-500 bg-clip-text text-center text-lg font-bold text-transparent sm:text-4xl"
                  >
                     Exercise
                    
                     <br />
                    
                  </Dialog.Title>

                    <Dialog.Description>
                        <div>
                            <div className='flex justify-between border-10 border-black mb-3'>
                                <div className='flex gap-1'>
                                    <FcSportsMode/>
                                    <p>Strength endurance</p>
                                </div>
                                <div className='flex gap-1'>
                                    <p>30 min</p>
                                    <p>30 kcal</p>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="">
                                <div className="flex gap-1">
                                    <div>
                                        <label className="font-bold">Name</label>
                                        <input
                                        type="text"
                                        // onChange={e => setForm({...form, glucose: e.target.value})} 
                                        // value={form.glucose}
                                        className="p-1 mt-2 w-full rounded"/>
                                        <label className="font-bold">Duration</label>
                                        <input
                                        type="text"
                                        // onChange={e => setForm({...form, cholesterol: e.target.value})} 
                                        // value={form.cholesterol}
                                        className="p-1 mt-2 w-full rounded"/>
                                        <label className="font-bold">Energy Burned</label>
                                        <input
                                        type="text"
                                        // onChange={e => setForm({...form, hemoglobin: e.target.value})} 
                                        // value={form.hemoglobin}
                                        className="p-1 mt-2 w-full rounded"/>
                                        <label className="font-bold">Timestamp</label>  
                                        <input
                                        type="check"
                                        // onChange={e => setForm({...form, hemoglobin: e.target.value})} 
                                        // value={form.hemoglobin}
                                        className="p-1 mt-2 w-full rounded"/>                                      
                                    </div>
                                </div>
                                
                                <div className="mt-10">
                                    <button
                                        className="mx-auto flex h-[46px] w-full rounded-md items-center justify-center space-x-2  border bg-gray-50 p-2 text-gray-500 transition-colors hover:border-yellow-400 hover:bg-yellow-700 hover:text-black hover:font-bold focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                                    >
                                    
                                    <span>
                                            Submit
                                    </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                  </Dialog.Description>
             

                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    </>
  );
}