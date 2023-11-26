"use client";
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
import { createHash, randomFillSync } from 'crypto';
import { SHA256 } from 'crypto-js';
import GetApiData from '~/components/HealthTracking/GetApiData';
import Callback from './callback';
import SideBar from '~/components/HealthTracking/SideBar';
import ContentLoader from "react-content-loader"

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];



const HealthTrack = () => {

  const router = useRouter();
  const [code, setCode] = useState('');
  const [view, setView] = useState(false);
  const [detail, setDetail] = useState(false);
  const [daily, setDaily] = useState(false); 
  const [nutrition, setNutrition] = useState(false); 
  const [dash, setDash] = useState(true);
  const [healthdata, setHealthData] = useState("");
  const [isloading, setLoading] = useState(true);
  const [dataloading, fetchLoading] = useState(true);
  const [show, setShow] = useState(true);
  const [value, onChange] = useState<Value>(new Date());
  const [activeItem, setActiveItem] = useState(null);
  
  const { data: session } = useSession();
  const user = session?.user;
  //console.log("credential session", user?.id)
  const [currentdata, setCurrentData] = useState([{
    healthId: '',  fieldName: '', value: ''
  }]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codes = urlParams.get('code');
    if(codes !== null){
      setCode(codes);
    }
  });
  
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  //const openModal = () => setShowModal(true);
    const openModal = (data:any, fname:any) => {
        //console.log("section", data, hdata?.pulse);
        setShowModal(true);
        setCurrentData([{
            healthId: (hdata as any)?.id,
            fieldName: fname,
            value: data
        }])
    }

    
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        //borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

 
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

 
  const [hdata, setData] = useState([])
  const [datanotexist, setExist] = useState(false)
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

  const barData = {
    labels: ['Glucose (mg/dL)'],
    datasets: [
      {
        label: 'Values',
        data: [(hdata as any)?.glucose], 
        backgroundColor: [
            "rgb(225, 209, 39,0.5)"           
          ],
      }
    ]
  };

  useEffect(()=>{
    setLoading(true)
  },[])

  useEffect(()=>{
    const timer = setTimeout(() => {
      tracking();
      setPulse({
        labels: ['Pulse bpm'],
        datasets: [{
          data: [healthdata] ,
          backgroundColor: [
            "rgb(225, 209, 39,0.5)"           
          ],
        }]
      });
      
    }, 5000);

    return () => clearTimeout(timer);
  },[tracking]);

  

// useEffect(() => {
//   router.push(
//     `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23RD4H&scope=activity%20heartrate%20location%20nutrition%20oxygen_saturation%20profile
//     %20respiratory_rate%20settings%20sleep%20social%20temperature%20weight&redirect_uri=http://localhost:3000/callback&code_challenge_method=S256&code_challenge=${encodeURIComponent(
//       codeChallenge
//     )}&code_verifier=${encodeURIComponent(
//       codeVerifier
//     )}
    
//     `
//   );
// }, []);

//console.log("you those", codeChallenge, "verifier", codeVerifier);

// const authorizeFitbit = () => {
//     const clientId = '23RD4H';
//     const redirectUri = 'http://localhost:3000/callback';
//     const scopes = [
//       'activity',
//       'heartrate',
//       'location',
//       'nutrition',
//       'oxygen_saturation',
//       'profile',
//       'respiratory_rate',
//       'settings',
//       'sleep',
//       'social',
//       'temperature',
//       'weight',
//     ];
//     const codeChallengeMethod = 'S256';

//      // Construct the authorization URL
//     const authorizationUrl = new URL('https://www.fitbit.com/oauth2/authorize');
//     authorizationUrl.searchParams.append('response_type', 'code');
//     authorizationUrl.searchParams.append('client_id', clientId);
//     authorizationUrl.searchParams.append('scope', scopes.join(' '));
//     authorizationUrl.searchParams.append('redirect_uri', redirectUri);
//     authorizationUrl.searchParams.append('code_challenge_method', codeChallengeMethod);
//     authorizationUrl.searchParams.append('code_challenge', codeChallenge);
//     router.push(authorizationUrl.href);
// };




    const changeDashboard = async(e:any, index:any) => {
       setActiveItem(index);
        setDaily(false)
        setNutrition(false)
        setDetail(false)
        setDash(true)
    }

    const changeDaily = async(e:any, index:any) => {
      setActiveItem(index);
        setDaily(true) 
        setNutrition(false) 
        setDetail(false)
        setDash(false)
    }

    const changeNutrition = async(e:any, index:any) => {
      setActiveItem(index);
        setDaily(false)
        setNutrition(true)
        setDetail(false)
        setDash(false)
    }

    const changeDetail = async(e:any, index:any) => {
      setActiveItem(index);
        setDaily(false) 
        setNutrition(false) 
        setDetail(true)
        setDash(false)
    }
  


  return (
    <>
    {/*     
     <DataProvider data={codeVerifier}>
      <Callback/>
     </DataProvider> */}
     <AiHealth/>
     <div className='bg-gray-100'>
       {/* <GetApiData code={code} codeChallenge={codeChallenge} codeVerifier={codeVerifier}/> */}
        <div className='relative flex flex-col-reverse md:flex-row'>
          {hdata.length !== 0 ?
            <div className='mx-1 md:mx-4 md:w-full my-5'>
                    <div 
                    className="relative z-10 rounded-full flex w-full flex-col justify-center p-1 mb-3 bg-white shadow-lg h-10 py-6"
                    >
                    {/* <Image src={black} alt='loader' className='object-cover -z-10 absolute rounded-full h-10 mb-5'/>     */}

                            <div className='flex justify-between'>            
                                <ul className='flex gap-5 md:gap-10 px-1 md:px-10 mt-3'>
                                    <li onClick={(e) => changeDashboard(e, 0)} className={`-mt-5 text-gray-900 cursor-pointer ${
                                      activeItem === 0 ? 'text-gray-800 underline' : 'hover:text-gray-500 hover:underline'
                                    }`}>Dashboard</li>
                                    <li onClick={(e) => changeDaily(e, 1)} className={`-mt-5 text-gray-900 cursor-pointer ${
                                      activeItem === 1 ? 'text-gray-800 underline' : 'hover:text-gray-500 hover:underline'
                                    }`}>Daily</li>
                                    <li onClick={(e) => changeNutrition(e, 2)}className={`-mt-5 text-gray-900 cursor-pointer ${
                                      activeItem === 2 ? 'text-gray-800 underline' : 'hover:text-gray-500 hover:underline'
                                    }`}>Nutrition&Symptoms</li>
                                    <li onClick={(e) => changeDetail(e, 3)} className={`-mt-5 text-gray-900 cursor-pointer ${
                                      activeItem === 3 ? 'text-gray-800 underline' : 'hover:text-gray-500 hover:underline'
                                    }`}>Details</li> 
                                    {/* <li><button onClick={result}>test</button></li>    */}
                                </ul>
                                {/* <div className='-mt-5 bg-yellow-200 bg-opacity-30 font-bold p-2 font-serif italic text-white rounded-full'>update your daily data</div> */}
                            </div>
                    </div>
                
               <div>
                {view?
                   <Form data={hdata} show={view} onClose={setView}/> 
                   :
                <div>                      
                  <div className='border-t-[2px] border-[#606465]'>
              
                      {dash ?
                          <div>
                          
                          <div className='flex flex-col md:flex-row gap-5 justify-between'>
                              <div className='mx-5'>
                                {/* <div className='my-2'> */}
                                    <div className='flex gap-10  my-4'>
                                        <h1 className='text-4xl inline-block w-52'>
                                          Hey, <strong>{(hdata as any)?.name === null || (hdata as any)?.name === undefined || (hdata as any)?.name === '' ? (
                                              <ContentLoader
                                              speed={2}
                                              width={100}
                                              height={30} // Adjust the height and make it equal to the width for a square box
                                              viewBox="0 0 100 30" // Adjust the viewBox accordingly
                                              backgroundColor="#f3f3f3"
                                              foregroundColor="#ecebeb"
                                              className="ml-4 inline-block"
                                              >
                                              <rect x="0" y="0" rx="3" ry="3" width="100" height="30" /> 
                                              </ContentLoader>
                                              ) : (
                                                (hdata as any)?.name
                                              )}
                                              {/* {(hdata as any)?.name} */}
                                          </strong> Check your Health!</h1>
                                        {/* <p className='text-gray-400 mb-10'>Check your Health!</p> */}
                                        <div className='my-auto text-gray-500'>
                                            <p>Daily Health Rate</p>
                                            <p className='bg-white p-1 text-center rounded inline-block'>🧡</p>
                                            
                                          
                                              <p className='inline-block p-2 rounded-xl'>
                                                {/* {(hdata as any)?.exeheartrate}  */}
                                                {(hdata as any)?.exeheartrate === null || (hdata as any)?.exeheartrate === undefined || (hdata as any)?.exeheartrate === '' ? (
                                                <ContentLoader
                                                  speed={2}
                                                  width={100}
                                                  height={30} // Adjust the height and make it equal to the width for a square box
                                                  viewBox="0 0 100 30" // Adjust the viewBox accordingly
                                                  backgroundColor="#f3f3f3"
                                                  foregroundColor="#ecebeb"
                                                  className="ml-4 inline-block"
                                                  >
                                                  <rect x="0" y="0" rx="3" ry="3" width="100" height="30" /> 
                                                </ContentLoader>
                                                ):(
                                                  (hdata as any)?.exeheartrate
                                                )}
                                                <span className='inline-block'>bpm</span> 
                                              </p>

                                              <button className="inline-block p-1 bg-opacity-0 relative w-full hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100 font-bold rounded text-gray-100  hover:text-black">
                                                <PencilIcon className="h-5"
                                                onClick={(e) => openModal((hdata as any)?.exeheartrate, 'exeheartrate')}
                                                aria-hidden="true"/>                                   
                                              </button>
                                            
                                        </div>
                                    </div>

                                    {hdata?.length== 0 ?
                                    <div className=''>                       
                                        <p 
                                        onClick={(e) => setView(!view)}
                                        className='text-xl px-3 py-2 w-36 bg-white border rounded-full cursor-pointer hover:brightness-110'>
                                        <strong className='-mt-40'>Track Health</strong>
                                        </p>
                                    </div> 
                                    :null}
                                {/* </div> */}

                                  <div className='flex flex-col md:flex-row mx-20 md:mx-0 gap-5 my-10'>

                                      <div className='bg-white rounded-xl h-56 w-56 px-4 text-center flex justify-center'>
                                          <button className="bg-gray-50 p-1 bg-opacity-0 relative w-full font-bold rounded text-gray-500 flex justify-between hover:text-black ">
                                              {/* <p className=''>Edit Daily Pulse</p>
                                          <PencilIcon className="float-right h-4 inline-block mr-1"
                                          onClick={(e) => openModal(hdata?.pulse, 'pulse')}
                                          aria-hidden="true"/>  */}
                                          </button>

                                          <div style={{width:250, height:200}}>
                                              <PolarAreaChart
                                                  pulseData={pulseData}        
                                              />
                                          </div>
                                      </div>

                                      <div className='bg-white rounded-xl h-56 w-56 px-4 text-center flex justify-center'>
                                          <button className="bg-gray-50 p-1 bg-opacity-0 relative w-full font-bold rounded text-gray-500 flex justify-between hover:text-black ">
                                              {/* <p className=''>Edit Daily Pulse</p>
                                          <PencilIcon className="float-right h-4 inline-block mr-1"
                                          onClick={(e) => openModal(hdata?.pulse, 'pulse')}
                                          aria-hidden="true"/>  */}
                                          </button>

                                          <div style={{width:250, height:200}}>
                                              <PolarAreaChart
                                                  pulseData={barData}                        
                                              />
                                          </div>
                                      </div>                                            
                                    
                                  </div>

                                  <div className='bg-white md:w-[29.5rem] p-2 rounded-xl -ml-5 md:-ml-0'>  
                                      <h1 className='text-black transform capitalize font-bold text-xl'>Your Today&apos;s Exercise Type</h1>

                                      <button className="p-1 bg-opacity-0 relative w-full hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100  font-bold rounded text-white flex justify-between hover:text-black ">
                                      <p className=''>Edit Daily Exercise type</p>
                                      <PencilIcon className="float-right h-6 inline-block mr-1"
                                      onClick={(e) => openModal((hdata as any)?.exercisetype, 'exercisetype')}
                                      aria-hidden="true"/>                                   
                                      </button>

                                      <p className='flex'>
                                        <AiFillCheckSquare className='mt-1 mr-2'/>
                                        {/* {(hdata as any)?.exercisetype} */}
                                        {(hdata as any)?.exercisetype === null || (hdata as any)?.exercisetype === undefined || (hdata as any)?.exercisetype === '' ? (
                                              <ContentLoader
                                              speed={2}
                                              width={290}
                                              height={20} // Adjust the height and make it equal to the width for a square box
                                              viewBox="0 0 290 20" // Adjust the viewBox accordingly
                                              backgroundColor="#f3f3f3"
                                              foregroundColor="#ecebeb"
                                              className="ml-4 inline-block"
                                              >
                                              <rect x="0" y="0" rx="3" ry="3" width="290" height="20" /> 
                                              </ContentLoader>
                                              ) : (
                                                (hdata as any)?.exercisetype
                                              )}
                                      </p>
                                  </div>
                              </div>
                              <div className='bg-white rounded-xl my-2 mt-1 h-[24.6rem] shadow-sm w-[28rem] md:w-full'>
                                  <div className=''><Calendar/></div>

                                  {/*  <div className='bg-white mt-[2.2rem] rounded-2xl'>
                                      <div className='p-2 rounded-xl'>  
                                          <h1 className='text-black transform capitalize font-bold text-xl'>Connect</h1> 
                                      </div>
                                      <div className='flex flex-row text-center gap-4 mt-2 ml-5 bg-white p-4'>
                                            <button 
                                            onClick={fitbit}
                                            className='rounded-xl shadow-sm hover:brightness-110 py-4 px-8 w-[10rem] bg-gradient-to-tl from-yellow-200 via-white to-yellow-100 border-2 border-gray-200 text-gray-600 font-sans transform lowercase text-lg'>
                                                FitBit
                                            </button>

                                            <button 
                                            onClick={googlefitHandle}
                                            className='rounded-full shadow-sm hover:brightness-110 py-4 px-8 w-[10rem] bg-gradient-to-tl from-yellow-200 via-white to-yellow-100 border-4 border-gray-200 text-gray-600 font-sans transform lowercase text-lg'>
                                                GoogleFit
                                            </button>

                                            <button 
                                            onClick={withingsApiHandle}
                                            className='rounded-xl shadow-sm hover:brightness-110 py-4 px-8 w-[10rem] bg-gradient-to-tl from-yellow-200 via-white to-yellow-100 border-2 border-gray-200 text-gray-600 font-sans transform lowercase text-lg'>
                                                WithingsApi
                                            </button>
                                      </div>
                                  </div> */}

                                  <div className='bg-white mt-[2.2rem] rounded-2xl'>
                                      <div className='p-2 rounded-xl'>  
                                          <h1 className='text-black transform capitalize font-bold text-xl'>Energy Summary</h1> 
                                      </div>

                                      <div className='flex flex-wrap gap-3'>
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
                                            <PieChart  data={caloryConsumed}/>
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
                                            <PieChart  data={caloryBurned}/>
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
                                            <PieChart  data={caloryRemaining}/>
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

                          </div>
                      : null}                
                  
                      {daily ?
                      <Daily hdata={hdata}/>
                      :null}
                      
                      {detail ?
                          <Detail hdata={hdata}/>
                      : null}

                      {nutrition ?
                          <NutritionSym hdata={hdata}/>
                      : null}
                  </div>
                
                </div>}
                </div>
                
            </div>
          : <div className='mt-20 mx-1 md:mx-4 md:w-full flex justify-center my-auto'>
                <div>                  
                  {view?
                   <Form data={hdata} show={view} onClose={setView}/> 
                  :
                  <div>
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
            </div>} 
            
              <div className=''>
                <AiOutlineDoubleLeft onClick={()=>setShow(!show)} size={20} className='-ml-7 hover:text-gray-400 hover:bg-gray-100 cursor-pointer'/>
              </div>


          {show? 
            <SideBar hdata={hdata}/>
          :null}
        </div>

  
        <div 
        className='fixed top-0 text-5xl ml-[30rem]'>
          {/* <AiHealth/> */}
        </div>

       
        <UpdateForm data={currentdata} show={showModal} onClose={closeModal} />
     </div>   
    </>
    
  )
}

export default HealthTrack