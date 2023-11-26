import React from 'react'
import { IoFastFoodOutline } from 'react-icons/io5';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { BiNote } from 'react-icons/bi';
import { FcSportsMode } from 'react-icons/fc';
import { PiBowlFoodFill } from 'react-icons/pi';
import PieChart from '~/components/HealthTracking/PieChart';
import { useState, useEffect } from 'react';
import { DairyForm } from '~/components/HealthTracking/DairyForm';
import BarChart from '~/components/HealthTracking/BarChart';
import DoughnutChart from '~/components/HealthTracking/Doughnut';
import ContentLoader from "react-content-loader"
import { useSession } from 'next-auth/react';
import axios from 'axios';


const Dairy = () => {
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const openModal = () => setShowModal(true);
    const [hdata, setData] = useState([])
    const [healthdata, setHealthData] = useState("");
    const [isloading, setLoading] = useState(true);    
    const [datanotexist, setExist] = useState(false)            
    const { data: session } = useSession();
    const user = session?.user;

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

    const [waterData, setWater] = useState({
        labels: ['Water intake'],
        datasets: [
          {
            data: [60, 50], 
            backgroundColor: ['#1f80eff1', '#daedf8f1'],      
          }
        ]
      });
    
      const [caloryConsumed, setCaloryConsumed] = useState({
        labels: ['Consumed'],
        datasets: [
          {
            data: [90, 10], 
            backgroundColor: ['#9c9c05d9', '#f4f4b6d9'],      
          }
        ]
      });
    
      const [caloryBurned, setCaloryBurned] = useState({
        labels: ['Burned'],
        datasets: [
          {
            data: [50, 50], 
            backgroundColor: ['#f15816f1', '#e1f1c6f1'],      
          }
        ]
      });
    
      const [caloryRemaining, setCaloryRemaining] = useState({
        labels: ['Remaining'],
        datasets: [
          {
            data: [40, 50], 
            backgroundColor: ['#eace17f1', '#f1ebc6f1'],      
          }
        ]
      });

      
  return (
    <div>
        <div className='my-3 md:mx-5 mx-0 bg-white flex flex-wrap flex-col md:flex-row justify-between gap-4 rounded-lg'>
            <div className='p-2 flex-1'>
                <ul className='flex gap-4 mb-2'>
                    <li className='flex cursor-pointer hover:font-bold'><IoFastFoodOutline className='text-yellow-700'/>Food</li>
                    <li className='flex cursor-pointer hover:font-bold'
                    onClick={openModal}>
                        <FcSportsMode/>Exercise</li>
                    <li className='flex cursor-pointer hover:font-bold'><FaArrowTrendUp className='text-yellow-700'/>Biometric</li>
                    <li className='flex cursor-pointer hover:font-bold'><BiNote className='text-yellow-700'/>Note</li>
                    <li className='flex cursor-pointer hover:font-bold'><PiBowlFoodFill className='text-yellow-700'/>Fast</li>
                </ul>
                <div className='border-2 rounded p-16  flex-1'>
                    <p className='text-gray-200'>Add food, exercise, biomertircs or notes to see them in your diary</p>
                    {/* <textarea name="" id="" cols={100} rows={6} className='px-2' placeholder='Add food, exercise, biomertircs or notes to see them in your diary'>
                    </textarea> */}
                </div>
            </div>
            <div className='px-5 bg-yellow-100'>
                Daily target
            </div>
        </div>

        <div className='bg-white mt-[2.2rem] rounded-2xl'>
            <div className='p-2 rounded-xl'>  
                <h1 className='mx-5 text-black transform capitalize font-bold text-xl'>
                    Energy Summary
                </h1> 
            </div>
            <div className='flex flex-wrap flex-col md:flex-row gap-3 ml-5'>
                <div className="h-32 w-32 px-2">
                    <DoughnutChart  data={waterData}/>
                </div>
                <div className="h-32 w-32 px-2">
                    <DoughnutChart  data={caloryConsumed}/>
                </div>
                <div className="h-32 w-32 px-2">
                    <DoughnutChart  data={caloryBurned}/>
                </div>
                <div className="h-32 w-32 px-2">
                    <DoughnutChart  data={caloryRemaining}/>
                </div>
            </div>
        </div>

        <div className='flex flex-wrap gap-10 mt-16'>
            <table className="table-auto border-collapse mx-10">
                <tbody className=''>
                <tr className="bg-gray-200">
                    <th className="border-gray-400 text-sm rounded-sm">overall</th>          
                </tr>
                
                    <tr className="bg-white">
                        <td className='flex justify-between gap-80 mt-2'>
                            <p className='text-sm'>Name</p>
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
                                (hdata as any)?.name
                            )}
                            
                            {(hdata as any)?.name === ''? "null": null}
                            </p> 
                        </td>
                    </tr>
                    <tr className="bg-white">
                        <td className='flex justify-between gap-80'>
                            <p className='text-sm'>Date of Birth</p> 
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
                                    (hdata as any)?.dob
                                )}
                                
                                {(hdata as any)?.dob === ''? "null": null}
                                </p>
                            </td>
                    </tr>
                    <tr className="bg-white">
                        <td className="flex justify-between gap-80">
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
                                className="ml-4"
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
                        <td className="flex justify-between gap-80">
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
                                className="ml-4"
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
                            <td className='flex justify-between gap-80'>
                                <p className='text-sm'>Phone</p> 
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
                                    (hdata as any)?.phone
                                )}
                                
                                {(hdata as any)?.phone === ''? "null": null}
                                </p>
                            </td>
                    </tr>
                    <tr className="bg-white">
                            <td className='flex justify-between gap-80'>
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
                            <td className='flex justify-between gap-80'>
                                <p className='text-sm'>Height</p> 
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
                                    (hdata as any)?.height
                                )}
                                
                                {(hdata as any)?.height === ''? "null": null}
                                </p>
                            </td>
                    </tr>
                    <tr className="bg-white">
                            <td className='flex justify-between gap-80'>
                                <p className='text-sm'>Blood Pressure</p> 
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
                                    (hdata as any)?.bloodpressure
                                )}
                                
                                {(hdata as any)?.bloodpressure === ''? "null": null}
                                </p>
                            </td>
                    </tr>
                    <tr className="bg-white">
                            <td className='flex justify-between gap-80'>
                                <p className='text-sm'>Pulse</p> 
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
                                    (hdata as any)?.pulse
                                )}
                                
                                {(hdata as any)?.pulse === ''? "null": null}
                                </p>
                            </td>
                    </tr>
                    <tr className="bg-white">
                            <td className='flex justify-between gap-80'>
                                <p className='text-sm'>Temperature</p> 
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
                                    (hdata as any)?.temperature
                                )}
                                
                                {(hdata as any)?.temperature === ''? "null": null}
                                </p>
                            </td>
                    </tr>
                    <tr className="bg-white">
                            <td className='flex justify-between gap-80'>
                                <p className='text-sm'>Oxygen Saturation</p> 
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
                                    (hdata as any)?.oxysaturation
                                )}
                                
                                {(hdata as any)?.oxysaturation === ''? "null": null}
                                </p>
                            </td>
                    </tr>                   
                    <tr className="bg-white">
                            <td className='flex justify-between gap-80'>
                                <p className='text-sm'>Steps</p> 
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
                                    (hdata as any)?.steps
                                )}
                                
                                {(hdata as any)?.steps === ''? "null": null}
                                </p>
                            </td>
                    </tr>
                    <tr className="bg-white">
                            <td className='flex justify-between gap-80'>
                                <p className='text-sm'>Active Minutes</p> 
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
                                    (hdata as any)?.activeminutes
                                )}
                                
                                {(hdata as any)?.activeminutes === ''? "null": null}
                                </p>
                            </td>
                    </tr>                    
                </tbody>
            </table>

            <table className="table-auto border-collapse mx-10 mb-10">
                    <tbody className=''>
                    <tr className="bg-gray-200">
                        <th className="border-gray-400 text-sm rounded-sm h-2 -mt-2">Sleep</th>          
                    </tr>                             
                        <tr className="bg-white">
                            <td className='flex justify-between gap-72 mt-2'>
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
                            <td className='flex justify-between gap-80'>
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
                            <td className='flex justify-between gap-80'>
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
                            <td className='flex justify-between gap-80'>
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

        <DairyForm  show={showModal} onClose={closeModal}/>
    </div>
  )
}

export default Dairy