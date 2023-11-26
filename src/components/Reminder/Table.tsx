import React, {useState} from 'react'
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import axios from "axios";
import { useRouter } from "next/router";
import UpdateReminder from './UpdateReminder';
import toast, { Toaster } from "react-hot-toast";
import ContentLoader from "react-content-loader"

const Table = (props:any) => {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [view, setupView] = useState(true);
    const [back, setBack] = useState(false); 
    const [message, setMessage] = useState(''); 
    const [datalist, setDatalist] = useState();

    let table = false;
    let REMINDER_LIST:any;
    if(props.reminders !== undefined){
         table = true;
         REMINDER_LIST = props.reminders;
    }

    if(props?.reminders?.length === 0){
        toast.success('Nothing yet, set your medication reminder!', { duration: 5000 });
    }
    //console.log("tablerem", props?.reminders?.length );
    function setView() {
        setShow(!show);
    }

    function editReminder(data:any) {
        console.log("tablerem", data);
        setupView(false);
        setBack(true);
        setDatalist(data);
    }

    function visible() {
        setupView(true);
        setBack(false);
        router.reload();
    }

    const deleteReminder = async (id:any) => {
        //e.preventDefault(); 
        try {
          const res = await axios.delete(`/api/deletereminder/${id}`)
          console.log('success deletion', res.data);
          router.reload();
        } catch(error){
          console.log("error", error);
        }
      }

  return (
    <>
    <div>
        {back? 
        <div className='mx-7 text-slate-500 transform underline cursor-pointer' onClick={()=>visible()}>
           back  
        </div>: null}
        
                
        {view?
        <div className="sm:px-6 w-full">
            <h1 className='font-bold text-[#f4f4f5] text-xl -ml-10 sm:-ml-0 lg:-ml-0 md:-ml-0 xl:-ml-0 2xl:-ml-0'>Your Medication Reminders</h1>            
            {/* <div className="px-4 md:px-10 py-4 md:py-7">
                <div className="flex items-center justify-between">
                    <p  className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">My Medications</p>
                    <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                        <p>Sort By:</p>
                        <select aria-label="select" className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
                            <option className="text-sm text-indigo-800">Latest</option>
                            <option className="text-sm text-indigo-800">Oldest</option>                            
                        </select>
                    </div>
                </div>
            </div> */}

            <div className="text-[#16151a] py-4 -ml-16 sm:-ml-0 lg:-ml-0 md:-ml-0 xl:-ml-0 2xl:-ml-0 md:py-7 px-4 md:px-8 xl:px-10">
                <div className="mt-7 overflow-x-auto">
                    {table?
                    <table className="w-full whitespace-nowrap">
                        <tbody>
                        
                        {REMINDER_LIST.map((data:any) => (
                            <tr key={data.id} className="focus:outline-none h-16 border border-gray-700 rounded">
                                    {/* <td>
                                        <div className="ml-5">
                                            <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                                <input placeholder="checkbox" type="checkbox" className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                                                <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                                    <svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z"></path>
                                                        <path d="M5 12l5 5l10 -10"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </td> */}
                                    <td className="">
                                        <div className="flex items-center pl-5">
                                            <p className="text-base font-medium leading-none text-[#f4f4f5] mr-2 transform capitalize">
                                                {data.medicinename}
                                            </p>                                        
                                        </div>
                                    </td>
                                    <td className="pl-24">
                                        <div className="flex items-center">                  
                                            <p className="text-sm leading-none text-[#f4f4f5] ml-2">
                                                {data.dosage}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="pl-5">
                                        <div className="flex items-center">     
                                            <p className="text-sm leading-none text-[#f4f4f5] ml-2">{data.phoneNumber}</p>
                                        </div>
                                    </td>
                                    <td className="pl-5">
                                        <div className="flex items-center">      
                                            <p className="text-sm leading-none text-[#f4f4f5] ml-2">{data.type}</p>
                                        </div>
                                    </td>
                                    <td className="pl-5">
                                        <div className="flex items-center">      
                                            <p className="text-sm leading-none text-[#f4f4f5] ml-2">{data.dateTime}</p>
                                        </div>
                                    </td>
                                    <td className="pl-5">
                                        <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">Every {data.days}</button>
                                    </td>

                                    <td className="pl-5">
                                    <div className="flex items-center">                  
                                        <p className="text-sm leading-none text-[#f4f4f5] ml-2">
                                            <AiOutlineEdit size={22} 
                                            className='cursor-pointer hover:text-blue-500'
                                            onClick={()=> {editReminder(data)}}
                                            />
                                        </p>
                                    </div>
                                    </td>

                                    <td className="pl-5">
                                    <div className="flex items-center">                  
                                        <p className="text-sm leading-none text-[#f4f4f5] ml-2">
                                            <AiOutlineDelete 
                                            onClick={()=>{deleteReminder(data.id)}}  
                                            size={22} 
                                            className='cursor-pointer hover:text-red-500'/>
                                        </p>
                                    </div>
                                    </td>
                                
                                </tr>
                                ))}     
                                    <tr className="h-3"></tr>                         
                                </tbody>
                            </table>:

                            <tr className="focus:outline-none h-16 border border-gray-50 rounded">
                            <td>
                                <div className="ml-5">
                                    <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                        <input placeholder="checkbox" type="checkbox" className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                                        <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                            <svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <path d="M5 12l5 5l10 -10"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="">
                                <div className="flex items-center pl-5">
                                    <p className="text-base font-medium leading-none text-[#f4f4f5] mr-2 transform capitalize">
                                        <ContentLoader
                                        speed={2}
                                        width={178}
                                        height={6}
                                        viewBox="0 0 178 6"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                        className="ml-4"
                                        >
                                        <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                        </ContentLoader>
                                    </p>                                        
                                </div>
                            </td>
                            <td className="pl-24">
                                <div className="flex items-center">                  
                                    <p className="text-sm leading-none text-[#f4f4f5] ml-2">
                                        <ContentLoader
                                        speed={2}
                                        width={178}
                                        height={6}
                                        viewBox="0 0 178 6"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                        className="ml-4"
                                        >
                                        <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                        </ContentLoader>
                                    </p>
                                </div>
                            </td>
                            <td className="pl-5">
                                <div className="flex items-center">     
                                    <p className="text-sm leading-none text-[#f4f4f5] ml-2">
                                        <ContentLoader
                                        speed={2}
                                        width={178}
                                        height={6}
                                        viewBox="0 0 178 6"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                        className="ml-4"
                                        >
                                        <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                        </ContentLoader>
                                    </p>
                                </div>
                            </td>
                            <td className="pl-5">
                                <div className="flex items-center">      
                                    <p className="text-sm leading-none text-[#f4f4f5] ml-2">
                                        <ContentLoader
                                        speed={2}
                                        width={178}
                                        height={6}
                                        viewBox="0 0 178 6"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                        className="ml-4"
                                        >
                                        <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                        </ContentLoader>
                                    </p>
                                </div>
                            </td>
                            <td className="pl-5">
                                <div className="flex items-center">      
                                    <p className="text-sm leading-none text-[#f4f4f5] ml-2">
                                        <ContentLoader
                                        speed={2}
                                        width={178}
                                        height={6}
                                        viewBox="0 0 178 6"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                        className="ml-4"
                                        >
                                        <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                        </ContentLoader>
                                    </p>
                                </div>
                            </td>                                
                        </tr>
                        }   
                </div>
            </div>
        </div>:<UpdateReminder datalist={datalist}/>}
    </div>
    <Toaster />
    </>
  )
}

export default Table
