import React, {useState, useEffect, createContext, useContext} from 'react'
import axios from 'axios';
import Form from '~/components/HealthTracking/Form';
import {UserData} from '../components/Data'
import BarChart from "../components/HealthTracking/BarChart"
import PolarAreaChart from "../components/HealthTracking/PolarAreaChart"
import PieChart from '~/components/HealthTracking/PieChart';
import Calendar from '../components/HealthTracking/Calendar';
import { useRouter } from 'next/router';
import { AiFillCheckSquare, AiOutlineDoubleLeft } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import Daily from '~/components/HealthTracking/Daily';
import Detail from '~/components/HealthTracking/Detail';
import NutritionSym from '~/components/HealthTracking/NutritionSym';
import black from '../../public/black.jpg';
import UpdateForm from '~/components/HealthTracking/UpdateForm';
import { PencilIcon } from '@heroicons/react/solid';
import AiHealth from '~/components/AInotification/AiHealth';
import ContentLoader from "react-content-loader"
import Image from 'next/image';
import foot from "../../public/foot.png";
import actmin from "../../public/actmin.png";
import kcal from "../../public/kcal.png";
import dis from "../../public/dis.png";
import { AiFillAppstore } from 'react-icons/ai';
import { FaArrowTrendUp } from 'react-icons/fa6';
import AreaChart from '~/components/HealthTracking/AreaChart';
import ConnectApps from '~/components/HealthTracking/ConnectApps';
import AuthModal from '~/components/helper/AuthModal';

import { UpdateSleep, UpdateSleepQuality, UpdateDailyData, UpdateNutrition, UpdateMood } from '~/components/HealthTracking/UpdateForm'


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Horizontal Bar Chart',
      },
    },
  };
  

const dashboard = () => {
    const router = useRouter();
    const [hdata, setData] = useState([])
    const [datanotexist, setExist] = useState(false)    
    const [code, setCode] = useState('');
    const [view, setView] = useState(false);
    const [detail, setDetail] = useState(false);
    const [daily, setDaily] = useState(false); 
    const [nutrition, setNutrition] = useState(false); 
    const [menu, setMenu] = useState(false); 
    const [dash, setDash] = useState(true);
    const [healthdata, setHealthData] = useState("");
    const [isloading, setLoading] = useState(true);
    const [dataloading, fetchLoading] = useState(true);
    const [show, setShow] = useState(true);
    const [value, onChange] = useState<Value>(new Date());
    const [activeItem, setActiveItem] = useState(null);
    
    const { data: session } = useSession();
    const user = session?.user;
    console.log("credential session", user?.id)
    const [currentdata, setCurrentData] = useState([{
        healthId: '',  fieldName: '', value: ''
    }]);

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);

    const openModal = (data:any, fname:any) => {
        //console.log("section", data, hdata?.pulse);
        setShowModal(true);
        setCurrentData([{
            healthId: (hdata as any)?.id,
            fieldName: fname,
            value: data
        }])
    }

    const [waterData, setWater] = useState({
        labels: ['Water intake'],
        datasets: [
          {
            data: [60, 50], 
            backgroundColor: ['#fffffff1', '#daedf8f1'],      
          }
        ]
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
                fetchLoading(false);
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

      const data = {
        labels: ['Weight', 'Height', 'Temperature', 'Bmi'],
        datasets: [
          {
            label: 'Values',
            //data: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], 
            data: [(hdata as any)?.weight, (hdata as any)?.height, (hdata as any)?.temperature, (hdata as any)?.bmi], 
            backgroundColor: [
                "#f4f4f5",
                "#f4f4f5",
                "#f4f4f5",
                "#f4f4f5",                
              ],
              borderColor: "black",
              borderWidth: 2,
          }
        ]
      };
   

      const [pulseData, setPulse] = useState({
        labels: ['Pulse bpm'],
        datasets: [
          {
            data: [(hdata as any)?.pulse],        
            backgroundColor: [
                "rgb(225, 209, 39,0.5)"           
              ],
          }
        ]
      });

      useEffect(()=>{
        const timer = setTimeout(() => {
            setPulse({
            labels: ['Pulse bpm'],
            datasets: [{
              data: [healthdata] ,
              backgroundColor: [
                "rgb(255, 255, 255, 0.5)"           
              ],
            }]
          });
          
        }, 5000);
    
        return () => clearTimeout(timer);
      },[tracking]);

    
    
          
  return (
    <>
        <div className='relative h-[35.9rem] overflow-y-auto'>
            <div className='mr-20'>
                {hdata.length !== 0 ?(
                    <div className='-ml-24 mx-3 sm:mx-0 lg:mx-0 md:mx-0 xl:mx-0 2xl:mx-0 sm:ml-0 lg:ml-0 md:ml-0 xl:ml-0 2xl:ml-0'>
                        <AiHealth/>
                        <div className='text-[#f4f4f5] mb-3 mr-4 font-abc flex justify-end m-1 mx-3 gap-3'>
                            <ConnectApps/>
                        </div>

                        <div className='flex flex-col sm:flex-row lg:flex-row md:flex-row xl:flex-row 2xl:flex-row gap-8 mx-10 mb-10'>
                            <div className='hidden sm:block lg:block md:block xl:block 2xl:block w-[30rem] shadow-2xl border-gray-500 border-2 bg-[#16151a] rounded-[30px]'>
                                    <div className='rounded w-[30rem] h-56 px-2 mt-12'>
                                        <BarChart                                         
                                            chartData={data}
                                            options={options}
                                        />
                                    </div>
                                    {/* <AreaChart chartData={chartData} /> */}
                            </div>

                            <div className=''>
                                <div className='flex gap-5 mb-5'>
                                    <div className='w-64 h-40 bg-[#16151a] text-[#f4f4f5] border-2 border-gray-500 rounded-[30px]'>
                                            <div className='mx-auto text-center'>
                                                <h1 className='text-md font-abc text-[#f4f4f5] py-2'>Steps</h1>
                                                <Image src={foot} alt="" className='mx-auto bg-gray-50 rounded'  width={50} height={50}/>                            
                                            </div>
                                            <p className='py-2 text-center text-[#f4f4f5] mx-auto'>
                                                {/* {hdata?.steps} */}
                                                {(hdata as any)?.steps === null || (hdata as any)?.steps === undefined || (hdata as any)?.steps === '' ? (
                                                    <ContentLoader
                                                    speed={2}
                                                    width={130}
                                                    height={15} // Adjust the height and make it equal to the width for a square box
                                                    viewBox="0 0 130 15" // Adjust the viewBox accordingly
                                                    backgroundColor="#f3f3f3"
                                                    foregroundColor="#aaa6a6f1"
                                                    className="ml-4 inline-block"
                                                    >
                                                    <rect x="0" y="0" rx="3" ry="3" width="130" height="15" /> 
                                                    </ContentLoader>
                                                    ):(
                                                    (hdata as any)?.steps
                                                )}
                                            </p>          
                                    </div> 

                                    <div className='w-64 h-40 bg-[#16151a] border-2 border-gray-500 rounded-[30px] shadow-xl'>
                                            <div className='mx-auto text-[#f4f4f5] text-center'>
                                                <h1 className='text-md font-abc py-2'>Distance</h1>
                                                <Image src={dis} alt="" className='mx-auto p-2 rounded bg-gray-50'  width={50} height={50}/>                            
                                            </div>
                                            <p className='py-2 text-[#f4f4f5] text-center mx-auto'>
                                                {/* {hdata?.distance} */}
                                                {(hdata as any)?.distance === null || (hdata as any)?.distance === undefined || (hdata as any)?.distance === '' ? (
                                                    <ContentLoader
                                                    speed={2}
                                                    width={130}
                                                    height={15} // Adjust the height and make it equal to the width for a square box
                                                    viewBox="0 0 130 15" // Adjust the viewBox accordingly
                                                    backgroundColor="#f3f3f3"
                                                    foregroundColor="#aaa6a6f1"
                                                    className="ml-4 inline-block"
                                                    >
                                                    <rect x="0" y="0" rx="3" ry="3" width="130" height="15" /> 
                                                    </ContentLoader>
                                                    ):(
                                                    (hdata as any)?.distance
                                                )}
                                            </p>   
                                    </div>
                                </div>

                                <div className='flex gap-5'>
                                    <div className='w-64 h-40 bg-[#16151a] border-2 border-gray-500 rounded-[30px]'>
                                            <div className='mx-auto text-center text-[#f4f4f5]'>
                                                <h1 className='text-md font-abc py-2'>Active Minutes</h1>
                                                <Image src={actmin} alt="" className='mx-auto p-2 rounded bg-gray-50'  width={50} height={50}/>                            
                                            </div>
                                            <p className='py-2 text-center text-[#f4f4f5] mx-auto'>
                                                {/* {hdata?.activeminutes} */}
                                                {(hdata as any)?.activeminutes === null || (hdata as any)?.activeminutes === undefined || (hdata as any)?.activeminutes === '' ? (
                                                    <ContentLoader
                                                    speed={2}
                                                    width={130}
                                                    height={15} // Adjust the height and make it equal to the width for a square box
                                                    viewBox="0 0 130 15" // Adjust the viewBox accordingly
                                                    backgroundColor="#f3f3f3"
                                                    foregroundColor="#aaa6a6f1"
                                                    className="ml-4 inline-block"
                                                    >
                                                    <rect x="0" y="0" rx="3" ry="3" width="130" height="15" /> 
                                                    </ContentLoader>
                                                    ):(
                                                    (hdata as any)?.activeminutes
                                                )}
                                            </p>   
                                    </div>
                                    <div className='w-64 h-40 bg-[#16151a] border-2 border-gray-500 rounded-[30px]'>
                                            <div className='mx-auto text-[#f4f4f5] text-center'>
                                                <h1 className='text-md py-2'>Calories</h1>
                                                <Image src={kcal} alt="" className='mx-auto p-2 rounded bg-gray-50'  width={50} height={50}/>                            
                                            </div>
                                            <p className='py-2 text-center text-[#f4f4f5] mx-auto'>
                                                {/* {hdata?.calories} */}
                                                {(hdata as any)?.calories === null || (hdata as any)?.calories === undefined || (hdata as any)?.calories === '' ? (
                                                    <ContentLoader
                                                    speed={2}
                                                    width={130}
                                                    height={15} // Adjust the height and make it equal to the width for a square box
                                                    viewBox="0 0 130 15" // Adjust the viewBox accordingly
                                                    backgroundColor="#f3f3f3"
                                                    foregroundColor="#aaa6a6f1"
                                                    className="ml-4 inline-block"
                                                    >
                                                    <rect x="0" y="0" rx="3" ry="3" width="130" height="15" /> 
                                                    </ContentLoader>
                                                    ):(
                                                    (hdata as any)?.calories
                                                )}
                                            </p>   
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='flex flex-col sm:flex-row lg:flex-row md:flex-row xl:flex-row 2xl:flex-row gap-8 mx-10 font-sans w-full'>
                            <div className='flex flex-col w-[30rem] sm:flex-row md:flex-row xl:flex-row 2xl:flex-row bg-[#16151a] border-2 border-gray-500 rounded-[30px] '>
                                    <div style={{width:250, height:150}}>
                                        <PolarAreaChart
                                            pulseData={pulseData}        
                                        />
                                    </div> 

                                    <ul className='my-4 mx-10 sm:mx-0 lg:mx-0 md:mx-0 xl:mx-0 2xl:mx-0'>
                                        {/* <div className='flex flex-col'>  */}
                                        <li className='mb-2'> 
                                            <div className='flex gap-1 font-sans'>
                                                <p className='h-5 w-5 rounded-full bg-red-200'></p>
                                                <p className='text-sm text-[#f4f4f5]'>Blood Type</p>

                                                <strong className='text-sm flex justify-center text-[#f4f4f5]'>
                                                {/* {hdata?.bloodtype} */}
                                                {(hdata as any)?.bloodtype === null || (hdata as any)?.bloodtype === undefined || (hdata as any)?.bloodtype === '' ? (
                                                    <ContentLoader
                                                    speed={2}
                                                    width={70}
                                                    height={15} // Adjust the height and make it equal to the width for a square box
                                                    viewBox="0 0 70 15" // Adjust the viewBox accordingly
                                                    backgroundColor="#f3f3f3"
                                                    foregroundColor="#ecebeb"
                                                    className="ml-4 inline-block"
                                                    >
                                                    <rect x="0" y="0" rx="3" ry="3" width="70" height="15" /> 
                                                    </ContentLoader>
                                                    ):(
                                                    (hdata as any)?.bloodtype
                                                )}
                                                </strong>

                                                <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 hover:text-[#f4f4f5] font-bold rounded text-[#f4f4f5] text-opacity-10 ml-3 flex justify-between">
                                                    <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                                    onClick={(e) => openModal((hdata as any)?.bloodtype, 'bloodtype')}
                                                    aria-hidden="true"/>                                   
                                                </button>
                                            </div>
                                        </li> 
                                        <li className='mb-2'> 
                                            <div className='flex gap-1'>
                                            <p className='h-5 w-5 rounded-full bg-blue-200'></p>
                                                <p className='text-sm text-[#f4f4f5]'>Blood Pressure</p>
                                                <strong className='text-sm flex justify-center text-[#f4f4f5]'>
                                                {/* {hdata?.dob} */}
                                                {(hdata as any)?.bloodpressure === null || (hdata as any)?.bloodpressure === undefined || (hdata as any)?.bloodpressure === '' ? (
                                                    <ContentLoader
                                                    speed={2}
                                                    width={70}
                                                    height={15} // Adjust the height and make it equal to the width for a square box
                                                    viewBox="0 0 70 15" // Adjust the viewBox accordingly
                                                    backgroundColor="#f3f3f3"
                                                    foregroundColor="#ecebeb"
                                                    className="ml-4 inline-block"
                                                    >
                                                    <rect x="0" y="0" rx="3" ry="3" width="70" height="15" /> 
                                                    </ContentLoader>
                                                    ):(
                                                    (hdata as any)?.bloodpressure
                                                )}
                                            </strong> 
                                                <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 font-bold rounded text-[#f4f4f5] text-opacity-10 ml-3 flex justify-between hover:text-[#f4f4f5]">
                                                    <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                                    onClick={(e) => openModal((hdata as any)?.bloodpressure, 'bloodpressure')}
                                                    aria-hidden="true"/>                                   
                                                </button>
                                            </div>                           
                                        </li>
                                        <li className='mb-2'> 
                                            <div className='flex gap-1'>
                                            <p className='h-5 w-5 rounded-full bg-white'></p>
                                                <p className='text-sm text-[#f4f4f5]'>Glucose</p>
                                                <strong className='text-sm flex justify-center text-[#f4f4f5]'>
                                                    {/* {hdata?.bmi} */}
                                                    {(hdata as any)?.glucose === null || (hdata as any)?.glucose === undefined || (hdata as any)?.glucose === '' ? (
                                                        <ContentLoader
                                                        speed={2}
                                                        width={70}
                                                        height={15} // Adjust the height and make it equal to the width for a square box
                                                        viewBox="0 0 70 15" // Adjust the viewBox accordingly
                                                        backgroundColor="#f3f3f3"
                                                        foregroundColor="#ecebeb"
                                                        className="ml-4 inline-block"
                                                        >
                                                        <rect x="0" y="0" rx="3" ry="3" width="70" height="15" /> 
                                                        </ContentLoader>
                                                        ):(
                                                        (hdata as any)?.glucose
                                                    )}
                                            </strong>   
                                                <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 font-bold rounded text-[#f4f4f5] text-opacity-10 ml-3 flex justify-between hover:text-[#f4f4f5]">
                                                    <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                                    onClick={(e) => openModal((hdata as any)?.glucose, 'glucose')}
                                                    aria-hidden="true"/>                                   
                                                </button>
                                            </div>
                                        </li>
                                        <li className='mb-2'>
                                            <div className='flex gap-1'>
                                            <p className='h-5 w-5 rounded-full bg-gray-200'></p>
                                                <p className='text-sm text-[#f4f4f5]'>Stress Level</p>
                                                <strong className='text-sm flex justify-center text-[#f4f4f5]'>
                                                {/* {hdata?.stress} */}
                                                {(hdata as any)?.stress === null || (hdata as any)?.stress === undefined || (hdata as any)?.stress === '' ? (
                                                <ContentLoader
                                                speed={2}
                                                width={70}
                                                height={15} // Adjust the height and make it equal to the width for a square box
                                                viewBox="0 0 70 15" // Adjust the viewBox accordingly
                                                backgroundColor="#f3f3f3"
                                                foregroundColor="#ecebeb"
                                                className="ml-4 inline-block"
                                                >
                                                <rect x="0" y="0" rx="3" ry="3" width="70" height="15" /> 
                                                </ContentLoader>
                                                ):(
                                                (hdata as any)?.stress
                                                )}
                                            </strong>
                                                <button className="p-1 relative hover:bg-opacity-100 font-bold hover:text-[#f4f4f5] rounded text-[#f4f4f5] text-opacity-10 ml-3 flex justify-between">
                                                    <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                                    onClick={(e) => openModal((hdata as any)?.stress, 'stress')}
                                                    aria-hidden="true"/>                                   
                                                </button>
                                            </div>
                                        </li> 
                                            
                                        {/* </div> */}
                
                                    </ul> 
                            </div>

                            <div className='bg-[#16151a] w-[22rem] border-2 border-gray-500 rounded-[30px] h-20 flex flex-col sm:flex-row md:flex-row xl:flex-row 2xl:flex-row my-4 justify-between flex-1'>                                        
                                      <div className="px-2">
                                        <h1 className='transform capitalize font-bold text-xl text-[#f4f4f5] font-abc'>Energy Summary</h1>
                                    </div>
                                    
                                    <div className='flex'>
                                        <div className="h-32 w-32 px-2">
                                        <PieChart  data={waterData}/>
                                        {/* <ContentLoader 
                                            speed={2}
                                            width={400}
                                            height={400}
                                            viewBox="0 0 400 400"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"                                                   
                                        >
                                            <circle cx="60" cy="70" r="40" />
                                        </ContentLoader> */}
                                        </div>  

                                        <div className="h-32 w-32 px-2">
                                        <PieChart  data={waterData}/>
                                        {/* <ContentLoader 
                                            speed={2}
                                            width={400}
                                            height={400}
                                            viewBox="0 0 400 400"
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"                                                   
                                        >
                                            <circle cx="60" cy="70" r="40" />
                                        </ContentLoader> */}
                                        </div>                                                       
                                </div>                    
                            </div>
                        </div>
                    
                    </div>
                )
                :
                (
                    <div className='mx-1 md:mx-4 md:w-full flex justify-center my-auto'>
                        <div>                  
                            {view?
                            <Form data={hdata} show={view} onClose={setView}/> 
                            :
                            <div className='mt-10'>
                                <p className='text-gray-400'>No data yet, if you already registered your health data wait a bit longer for the data to load...</p>
                                <p className='text-center text-gray-400'>If not, register your health data to continute tracking your health</p>
                                <div className='flex justify-center my-5'>                       
                                    <p 
                                    onClick={(e) => setView(!view)}
                                    className='text-xl px-3 py-2 w-36 bg-white border rounded-full cursor-pointer hover:brightness-110'>
                                    <strong className='-mt-40'>Track Health</strong>
                                    </p>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
</>
  )
}

export default dashboard