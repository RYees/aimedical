import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import ContentLoader from "react-content-loader"
import {AiFillPrinter} from "react-icons/ai"
import {FaDownload} from "react-icons/fa"
import { useReactToPrint } from "react-to-print";

const nutritionreport = (props:any) => {
    const conponentPDF= useRef<HTMLDivElement>(null);
    const [hdata, setData] = useState([])
    const [healthdata, setHealthData] = useState("");
    const [isloading, setLoading] = useState(true);    
    const [datanotexist, setExist] = useState(false)            
    const { data: session } = useSession();
    const user = session?.user;

    const generatePDF= useReactToPrint({
        content: ()=>conponentPDF.current || null,
        documentTitle:"Userdata",
        onAfterPrint:()=>console.log("Data saved in PDF")
    });

      const tracking = async() => {
        if(hdata.length === 0){  
            const timer = setTimeout(() => {
              setLoading(true)
            }, 5000);    
            clearTimeout(timer);
        }
    
        try {
            const response = await axios.get(`/api/fetchHealth?id=${user?.id}`);
            if(response.data.length === 0){
                setExist(true);
            } else {console.log("moveoutof myway")}
            const result = response?.data[0]?.healthtracking[0];
            if(result) {
                setLoading(false);
                setHealthData(result?.pulse);
                setData(result)
                console.log("thiswasdone", result)
            }
        } catch(error) {
            console.log("err", error)
        }
      }
      

      useEffect(()=>{
        const timer = setTimeout(() => {
          tracking();          
        }, 5000);
    
        return () => clearTimeout(timer);
      },[tracking]);

  return (
    <div>
        <div className='px-3'>            
            <div className='mb-2 mt-4 flex justify-end'>
                <ul className='flex gap-4 mx-10'>
                    {/* <li className='text-sm text-yellow-800 transform underline cursor-pointer' onClick={ generatePDF}><FaDownload size={20}/></li> */}
                    <li className='text-sm text-[#f4f4f5] transform underline cursor-pointer' onClick={ generatePDF}><AiFillPrinter size={20}/></li>
                </ul>
            </div>
        </div>
        
        <div ref={conponentPDF} className='lg:mx-20 md:mx-20 xl:mx-20 2xl:mx-20'>
            <div>
                <h1 className='text-[#f4f4f5] font-bold mx-1 mb-5 text-2xl '>
                    Overall Health Report
                </h1>
            </div>

            <div className='flex flex-col sm:flex-row sm:gap-40 lg:flex-row lg:gap-40 md:gap-40 md:flex-row xl:flex-row xl:gap-40 2xl:flex-row 2xl:gap-40'>
                
                    <table className="-ml-12 sm:-ml-0 lg:-ml-0 md:-ml-0 xl:-ml-0 2xl:-ml-0 w-[25rem] lg:w-[30rem] md:w-[30rem] xl:w-[30rem] 2xl:w-[30rem] table-auto border-collapse mx-1 md:mx-10 mb-10">
                        <tbody className=''>
                        <tr className="bg-gray-200">
                            <th className="border-gray-400 text-sm rounded-sm">General</th>          
                        </tr>                
                            <tr className="bg-white">
                                <td className='flex justify-between mt-2'>
                                    <p className='text-sm'>Name</p>
                                    <p className='text-sm'>{hdata.length === 0 ? (
                                        <ContentLoader
                                        speed={2}
                                        width={178}
                                        height={6}
                                        viewBox="0 0 178 6"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                        className=""
                                        >
                                        <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                        </ContentLoader>
                                    ) : (
                                        (hdata as any)?.name
                                    )}
                                    
                                    {(hdata as any)?.name === ''? "null": null}
                                    </p> 
                                </td>
                            </tr>
                            <tr className="bg-white">
                                <td className='flex justify-between'>
                                    <p className='text-sm'>Date of Birth</p> 
                                    <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.dob
                                        )}
                                        
                                        {(hdata as any)?.dob === ''? "null": null}
                                    </p>
                                </td>
                            </tr>
                            <tr className="bg-white">
                                <td className="flex justify-between">
                                    <p className='text-sm'>Gender</p>
                                    <p className='text-sm'>
                                    {hdata.length === 0 ? (
                                        <ContentLoader
                                        speed={2}
                                        width={178}
                                        height={6}
                                        viewBox="0 0 178 6"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                        className=""
                                        >
                                        <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                        </ContentLoader>
                                    ) : (
                                        (hdata as any)?.gender
                                    )}
                                    
                                    {(hdata as any)?.gender === ''? "null": null}
                                    </p>
                                </td>
                            </tr>
                            <tr className="bg-white">
                                <td className="flex justify-between">
                                    <p className='text-sm'>Email</p>
                                    <p className='text-sm'>
                                    {hdata.length === 0 ? (
                                        <ContentLoader
                                        speed={2}
                                        width={178}
                                        height={6}
                                        viewBox="0 0 178 6"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                        className=""
                                        >
                                        <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                        </ContentLoader>
                                    ) : (
                                        (hdata as any)?.email
                                    )}
                                    
                                    {(hdata as any)?.email === ''? "null": null}
                                    </p>
                                </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Phone</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.phone
                                        )}
                                        
                                        {(hdata as any)?.phone === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Weight</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
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
                                        ) : (
                                            (hdata as any)?.weight
                                        )}
                                        
                                        {(hdata as any)?.weight === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Height</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.height
                                        )}
                                        
                                        {(hdata as any)?.height === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Blood Pressure</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.bloodpressure
                                        )}
                                        
                                        {(hdata as any)?.bloodpressure === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Pulse</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.pulse
                                        )}
                                        
                                        {(hdata as any)?.pulse === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Temperature</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.temperature
                                        )}
                                        
                                        {(hdata as any)?.temperature === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Oxygen Saturation</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.oxysaturation
                                        )}
                                        
                                        {(hdata as any)?.oxysaturation === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>                   
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Steps</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.steps
                                        )}
                                        
                                        {(hdata as any)?.steps === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Active Minutes</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.activeminutes
                                        )}
                                        
                                        {(hdata as any)?.activeminutes === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                <td className='flex justify-between'>
                                    <p className='text-sm'>Exercise Rate</p> 
                                    <p className='text-sm'>{hdata.length === 0 ? (
                                        <ContentLoader
                                        speed={2}
                                        width={178}
                                        height={6}
                                        viewBox="0 0 178 6"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                        className=""
                                        >
                                        <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                        </ContentLoader>
                                    ) : (
                                        (hdata as any)?.exeheartrate
                                    )}
                                    
                                    {(hdata as any)?.exeheartrate === ''? "null": null}
                                    </p>
                                </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Exercise Type</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.exercisetype
                                        )}
                                        {(hdata as any)?.exercisetype === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>            
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Chronic Condition</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.chronichcond
                                        )}
                                        
                                        {(hdata as any)?.chronichcond === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Allergies</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.allergies)}
                                            
                                            {(hdata as any)?.allergies === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Symptoms</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.symptoms)}
                                            
                                            {(hdata as any)?.symptoms === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Hosptialize</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.hospitalize)}
                                            
                                            {(hdata as any)?.hospitalize === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Mood</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.mood)}
                                            
                                            {(hdata as any)?.mood === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Stress</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.stress)}
                                            
                                            {(hdata as any)?.stress === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Mental Strategy</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.mentalsymptoms)}
                                            
                                            {(hdata as any)?.mentalsymptoms === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Notes</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.notes)}
                                            
                                            {(hdata as any)?.notes === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Goals</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.goals)}
                                            
                                            {(hdata as any)?.goals === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>BloodType</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.bloodtype)}                                    
                                            {(hdata as any)?.bloodtype === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Family Medical</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.famimedical)}
                                            {(hdata as any)?.famimedical === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Vaccination Record</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.vaccrecord)}
                                            {(hdata as any)?.vaccrecord === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                            <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Life Assessement</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
                                            <ContentLoader
                                            speed={2}
                                            width={178}
                                            height={6}
                                            viewBox="0 0 178 6"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className=""
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="178" height="6" />
                                            </ContentLoader>
                                        ) : (
                                            (hdata as any)?.lifeassess)}
                                            {(hdata as any)?.lifeassess === ''? "null": null}
                                        </p>
                                    </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className='-ml-14 sm:-ml-40 md:-ml-40 xl:-ml-40 2xl:-ml-40'>
                        <table className="w-[25rem] lg:w-[28rem] md:w-[28rem] xl:w-[28rem] 2xl:w-[28rem] table-auto border-collapse mx-1 md:mx-10 mb-10">
                            <tbody className=''>
                            <tr className="bg-gray-200">
                                <th className="border-gray-400 text-sm rounded-sm">Biometrics</th>          
                            </tr>               
                                                    
                                <tr className="bg-white">
                                        <td className='flex justify-between gap-4 mt-1'>
                                            <p className='text-sm'>Body Mass Index</p> 
                                            <p className='text-sm'>{hdata.length === 0 ? (
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
                                            ) : (
                                                (hdata as any)?.bmi
                                            )}
                                            </p>
                                        </td>
                                </tr>                              
                                                    
                                <tr className="bg-white">
                                        <td className='flex justify-between'>
                                            <p className='text-sm'>Carbohydrate</p> 
                                            <p className='text-sm'>{hdata.length === 0 ? (
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
                                            ) : (
                                                (hdata as any)?.carbohydrate)}
                                            </p>
                                        </td>
                                </tr>
                                <tr className="bg-white">
                                        <td className='flex justify-between'>
                                            <p className='text-sm'>Cholestrol</p> 
                                            <p className='text-sm'>{hdata.length === 0 ? (
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
                                            ) : (
                                                (hdata as any)?.cholestrol)}
                                            </p>
                                        </td>
                                </tr>
                                <tr className="bg-white">
                                        <td className='flex justify-between'>
                                            <p className='text-sm'>Hemoglobin</p> 
                                            <p className='text-sm'>{hdata.length === 0 ? (
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
                                            ) : (
                                                (hdata as any)?.hemoglobin)}
                                            </p>
                                        </td>
                                </tr>
                                <tr className="bg-white">
                                        <td className='flex justify-between'>
                                            <p className='text-sm'>Proteins</p> 
                                            <p className='text-sm'>{hdata.length === 0 ? (
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
                                            ) : (
                                                (hdata as any)?.protiens)}
                                            </p>
                                        </td>
                                </tr>
                                <tr className="bg-white">
                                        <td className='flex justify-between'>
                                            <p className='text-sm'>Vitamins</p> 
                                            <p className='text-sm'>{hdata.length === 0 ? (
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
                                            ) : (
                                                (hdata as any)?.vitamins)}
                                            </p>
                                        </td>
                                </tr>
                                <tr className="bg-white">
                                        <td className='flex justify-between'>
                                            <p className='text-sm'>Fats</p> 
                                            <p className='text-sm'>{hdata.length === 0 ? (
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
                                            ) : (
                                                (hdata as any)?.fats)}
                                            </p>
                                        </td>
                                </tr>
                                <tr className="bg-white">
                                        <td className='flex justify-between'>
                                            <p className='text-sm'>Minerals</p> 
                                            <p className='text-sm'>{hdata.length === 0 ? (
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
                                            ) : (
                                                (hdata as any)?.minerals)}
                                            </p>
                                        </td>
                                </tr>
                                <tr className="bg-white">
                                        <td className='flex justify-between'>
                                            <p className='text-sm'>Ecg</p> 
                                            <p className='text-sm'>{hdata.length === 0 ? (
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
                                            ) : (
                                                (hdata as any)?.ecg)}
                                            </p>
                                        </td>
                                </tr>                    
                            </tbody>
                        </table>

                        <table className="w-[25rem] lg:w-[28rem] md:w-[28rem] xl:w-[28rem] 2xl:w-[28rem] table-auto border-collapse mx-1 md:mx-10 mb-10">
                            <tbody className=''>
                            <tr className="bg-gray-200">
                                <th className="border-gray-400 text-sm rounded-sm">Nutrition</th>          
                            </tr>           
                                <tr className="bg-white">
                                        <td className='flex justify-between mt-1'>
                                            <p className='text-sm'>Breakfast</p> 
                                            <p className='text-sm'>{hdata.length === 0 ? (
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
                                            ) : (
                                                (hdata as any)?.fbreakfast
                                            )}</p>
                                        </td>
                                </tr>
                                <tr className="bg-white">
                                        <td className='flex justify-between'>
                                            <p className='text-sm'>Lunch</p> 
                                            <p className='text-sm'>{hdata.length === 0 ? (
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
                                            ) : (
                                                (hdata as any)?.flunch
                                            )}</p>
                                        </td>
                                </tr>
                                <tr className="bg-white">
                                        <td className='flex justify-between'>
                                            <p className='text-sm'>Dinner</p> 
                                            <p className='text-sm'>{hdata.length === 0 ? (
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
                                            ) : (
                                                (hdata as any)?.fdinner
                                            )}</p>
                                        </td>
                                </tr>
                                <tr className="bg-white">
                                        <td className='flex justify-between'>
                                            <p className='text-sm'>Snacks</p> 
                                            <p className='text-sm'>{hdata.length === 0 ? (
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
                                            ) : (
                                                (hdata as any)?.fsnacks
                                            )}</p>
                                        </td>
                                </tr>                   
                            </tbody>
                        </table>

                        <table className="w-[25rem] lg:w-[28rem] md:w-[28rem] xl:w-[28rem] 2xl:w-[28rem] table-auto border-collapse mx-1 md:mx-10 mb-10">
                            <tbody className=''>
                            <tr className="bg-gray-200">
                                <th className="border-gray-400 text-sm rounded-sm">Sleep</th>          
                            </tr>                             
                                <tr className="bg-white">
                                    <td className='flex justify-between mt-1'>
                                        <p className='text-sm'>Sleep Duration</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
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
                                        ) : (
                                            (hdata as any)?.sleepduration
                                        )}</p>
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Sleep Quality</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
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
                                        ) : (
                                            (hdata as any)?.sleepquality
                                        )}</p>
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-sm'>Sleep Start</p> 
                                        <p className='text-sm'>{hdata.length === 0 ? (
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
                                        ) : (
                                            (hdata as any)?.sleepstart
                                        )}</p>
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className='flex justify-between'>
                                        <p className='text-m'>Sleep End</p> 
                                        <p className='text-m'>{hdata.length === 0 ? (
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
                                        ) : (
                                            (hdata as any)?.sleepend
                                        )}</p>
                                    </td>
                                </tr>              
                            </tbody>
                        </table>
                    </div>
            </div>
       </div> 
    </div>
  )
}

export default nutritionreport