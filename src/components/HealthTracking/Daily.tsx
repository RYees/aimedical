import React, {useState, useEffect} from 'react'
import BarChart from "./BarChart"
import Image from 'next/image'
import { useRouter } from 'next/router';
import { PencilIcon } from '@heroicons/react/solid';
import UpdateForm from '~/components/HealthTracking/UpdateForm';
import foot from "../../../public/foot.png";
import actmin from "../../../public/actmin.png";
import kcal from "../../../public/kcal.png";
import dis from "../../../public/dis.png";
import { UpdateSleep, UpdateSleepQuality, UpdateDailyData, UpdateNutrition, UpdateMood } from '~/components/HealthTracking/UpdateForm'
import ContentLoader from 'react-content-loader';

const Daily = (props:any) => {
    const hdata = props.hdata;

    const [currentdata, setCurrentData] = useState([{
        healthId: '',  fieldName: '', value: ''
    }]);
      const [showModal, setShowModal] = useState(false);
      const closeModal = () => setShowModal(false);
      //const openModal = () => setShowModal(true);
        const openModal = (data:any, fname:any) => {
            //console.log("section", data, hdata?.pulse);
            setShowModal(true);
            setCurrentData([{
                healthId: hdata?.id,
                fieldName: fname,
                value: data
            }])
        }

        
        const [currentsleepdurationdata, setCurrentDurationData] = useState([{
            healthId: '',  fieldName: '', value: ''
        }]);
        const [viewDurationModal, setDurationModal] = useState(false);
        const closeDurationModal = () => setDurationModal(false);
        const openDurationModal = (data:any, fname:any) => {
            setDurationModal(true);
            setCurrentDurationData([{
                healthId: hdata?.id,
                fieldName: fname,
                value: data
            }])
        }

        const [currentsleepqualitydata, setCurrentQualityData] = useState([{
            healthId: '',  fieldName: '', value: ''
        }]);
        const [viewQualityModal, setQualityModal] = useState(false);
        const closeQualityModal = () => setQualityModal(false);
        const openQualityModal = (data:any, fname:any) => {
            setQualityModal(true);
            setCurrentQualityData([{
                healthId: hdata?.id,
                fieldName: fname,
                value: data
            }])
        }

        const [currentmooddata, setCurrentMoodData] = useState([{
            healthId: '',  fieldName: ''
        }]);
        const [viewMoodModal, setMoodModal] = useState(false);
        const closeMoodModal = () => setMoodModal(false);
        const openMoodModal = (fieldname:any) => {
            setMoodModal(true);
            setCurrentMoodData([{
                healthId: hdata?.id,
                fieldName: fieldname 
            }])
        }
        
        const [currentgraphdata, setCurrentGraphData] = useState({
            healthId:'', steps:'', distance:'', activeminutes:'', calories:''
        });
        const [showGraphModal, setGraphModal] = useState(false);
        const closeGraphModal = () => setGraphModal(false);
        //const openModal = () => setShowModal(true);
        const openGraphModal = (steps:any, distance:any, activeminutes:any, calories:any) => {
            //console.log("section", data, hdata?.pulse);
            setGraphModal(true);
            setCurrentGraphData({
                healthId: hdata?.id,
                steps: steps, 
                distance: distance, 
                activeminutes: activeminutes,
                calories: calories
            })
        }
        let dist; let actm; let steps; let cal;
        if(hdata?.distance === 'Minimal (less than 5 miles)'){
            dist = 4
        } else if(hdata?.distance === 'Moderate (5-10 miles)'){
            dist = 6;
        } else if(hdata?.distance === 'Average (10-20 miles)'){
            dist = 11
        } else if(hdata?.distance === 'Long-distance (more than 50 miles)'){
            dist = 51
        } else if(hdata?.distance === 'Extensive (20-50 miles)'){
           dist = 21
        }

        if(hdata?.steps === 'Less than 1,000 steps'){
            steps = 900
        } else if(hdata?.steps === '1,000 - 5,000 steps'){
            steps = 2500;
        } else if(hdata?.steps ===  '5,000 - 10,000 steps'){
            steps = 7500
        } else if(hdata?.steps === '10,000 - 15,000 steps'){
            steps = 13500
        } else if(hdata?.steps === '15,000 - 20,000 steps'){
            steps = 17500        
        } else if(hdata?.steps === 'More than 20,000 steps'){
            steps = 30000
        }

        if(hdata?.activeminutes === 'Sedentary (less than 30 minutes)'){
            actm = 25
        } else if(hdata?.activeminutes === 'Lightly active (30-60 minutes)'){
            actm = 40;
        } else if(hdata?.activeminutes === 'Moderately active (60-90 minutes)'){
            actm = 70
        } else if(hdata?.activeminutes === 'Active (90-120 minutes)'){
            actm = 95
        } else if(hdata?.activeminutes === 'Very active (more than 120 minutes)'){
            actm = 130
        }

        if(hdata?.calories === 'Less than 1000 calories'){
            cal = 950
        } else if(hdata?.calories === '1000-1500 calories'){
            cal = 1200;
        } else if(hdata?.calories === '1500-2000 calories'){
            cal = 1700
        } else if(hdata?.calories === '2000-2500 calories'){
            cal = 2100
        } else if(hdata?.calories === 'More than 2500 calories'){
            cal = 3000
        }
        
        //console.log("ethiopian", hdata?.steps, hdata?.distance, hdata?.activeminutes, hdata?.calories)
  const dailydata = {
    labels: [hdata?.steps, hdata?.distance, hdata?.activeminutes, hdata?.calories],
    datasets: [
      {
        label: 'Values',
        data: [steps, dist, actm, cal], 
        backgroundColor: [
            "#a912db",
            "#db12c7",
            "#db124e",
            "#db9512"
          ],
      }
    ],
   };

  return (
    <>
     <div>
            <div className='flex justify-between mx-5'>
                <h1 className='mt-5 font-bold mb-10 text-2xl'>Today's Activity</h1>
                
                <div className='bg-green-500 bg-opacity-50 my-3 h-10 px-3 rounded-full py-1'>
                    <p className='text-white rounded-full text-sm flex gap-3'>
                        Todays' Mood &nbsp;
                        <strong className='text-xl text-black inline-block'>
                            {/* {hdata?.mood} */}
                            {(hdata as any)?.mood === null || (hdata as any)?.mood === undefined || (hdata as any)?.mood === ''? (
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
                            (hdata as any)?.mood
                            )}
                        </strong>
                        <button className="-mt-1 p-1 bg-opacity-0 relative font-bold rounded text-gray-100 text-opacity-10 flex justify-between hover:text-black ">
                        <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                        onClick={(e) => openMoodModal('mood')}
                        aria-hidden="true"/>                                   
                </button>
                    </p>
                </div>
            </div>
           
            <div className='flex gap-10'>
                
                <div className=' shadow-sm rounded'>
                   <div>
                    <div className='flex gap-2 justify-center rounded-t-3xl py-5 text-gray-400 mb-5'><hr></hr>
                        <div>    
                             <div className='px-3 py-2 h-16 w-32 rounded-tl-3xl shadow-sm rounded-br-3xl border bg-white'>
                                <div className='flex justify-center'>
                                    <p className='text-sm'>Birth</p>
                                    <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100 font-bold rounded text-gray-400 text-opacity-10 ml-3 flex justify-between hover:text-black ">
                                        <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                        onClick={(e) => openModal(hdata?.dob, 'dob')}
                                        aria-hidden="true"/>                                   
                                    </button>
                                </div>
                                <strong className='text-sm flex justify-center text-gray-900'>
                                    {/* {hdata?.dob} */}
                                    {(hdata as any)?.dob === null || (hdata as any)?.dob === undefined || (hdata as any)?.dob === '' ? (
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
                                        (hdata as any)?.dob
                                    )}
                                </strong>                          
                                </div>
                        </div>

                        <div>  
                         <div className='px-1 py-3 h-16 w-32 rounded-tl-3xl shadow-sm rounded-br-3xl border bg-white'>
                            <div className='flex justify-center'>
                                <p className='text-sm '>Blood Type</p>
                                <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100  font-bold rounded text-gray-400 text-opacity-10 ml-3 flex justify-between hover:text-black ">
                                    <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                    onClick={(e) => openModal(hdata?.bloodtype, 'bloodtype')}
                                    aria-hidden="true"/>                                   
                                </button>
                            </div>
                            <strong className='text-sm flex justify-center text-gray-900'>
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
                        </div>
                        </div>

                        <div>
                            <div className='px-1 py-3 h-16 w-32 rounded-tl-3xl shadow-sm rounded-br-3xl border bg-white'>
                                <div className='flex justify-center'>
                                   <p className='text-sm'>phone</p>
                                   <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100  font-bold rounded text-gray-300 text-opacity-10 ml-3 flex justify-between hover:text-black ">
                                    <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                    onClick={(e) => openModal(hdata?.phone, 'phone')}
                                    aria-hidden="true"/>                                   
                                    </button>
                                </div>
                                <strong className='text-sm flex justify-center text-gray-900'>
                                    {/* {hdata?.phone} */}
                                    {(hdata as any)?.phone === null || (hdata as any)?.phone === undefined || (hdata as any)?.phone === '' ? (
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
                                    (hdata as any)?.phone
                                )}
                                </strong>
                            </div>
                        </div>

                        <div>
                            <div className='px-1 py-3 h-16 w-32 rounded-tl-3xl shadow-sm rounded-br-3xl border bg-white'>
                                <div className='flex justify-center'>
                                    <p className='text-sm'>BMI</p>
                                    <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100  font-bold rounded text-gray-400 text-opacity-10 ml-3 flex justify-between hover:text-black ">
                                        <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                        onClick={(e) => openModal(hdata?.bmi, 'bmi')}
                                        aria-hidden="true"/>                                   
                                    </button>
                                </div>
                                   <strong className='text-sm flex justify-center text-gray-900'>
                                         {/* {hdata?.bmi} */}
                                         {(hdata as any)?.bmi === null || (hdata as any)?.bmi === undefined || (hdata as any)?.bmi === '' ? (
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
                                            (hdata as any)?.bmi
                                        )}
                                   </strong>                                
                            </div>
                        </div>

                        <div>
                            <div className='px-1 py-3 h-16 w-32 rounded-tl-3xl shadow-sm rounded-br-3xl border bg-white'>
                                <div className='flex justify-center'>
                                    <p className='text-sm'>Stress Level</p>
                                    <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100  font-bold rounded text-gray-400 text-opacity-10 ml-3 flex justify-between hover:text-black ">
                                        <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                        onClick={(e) => openModal(hdata?.stress, 'stress')}
                                        aria-hidden="true"/>                                   
                                    </button>
                                </div>
                                <strong className='text-sm flex justify-center text-gray-900'>
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
                            </div>
                        </div>   
                        
                        </div>   

                       
                    </div>
                    {/* <hr className='border-gray-900'/> */}
        
                    <div className='border shadow-2xl bg-gradient-to-tl from-white via-yellow-50 to-white rounded mb-10'>
                        <div className='mt-12 rounded-xl flex justify-center'>
                                <div className='my-5'>
                                    <div className='flex flex-row'>
                                    <span className='text-gray-500 font-bold text-xl inline-block'>
                                        {/* {hdata?.weight} */}
                                        {(hdata as any)?.weight === null || (hdata as any)?.weight === undefined || (hdata as any)?.weight === '' ? (
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
                                            (hdata as any)?.weight
                                        )}
                                    </span>
                                        <div className='flex justify-center'>
                                            <p className='text-sm font-serif transform lowercase'>Weight</p>
                                            <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100 font-bold rounded text-gray-100 flex justify-between hover:text-black ">
                                                    <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                                    onClick={(e) => openModal(hdata?.weight, 'weight')}
                                                    aria-hidden="true"/>                                   
                                            </button>
                                        </div>                                        
                                    </div>
                                
                                </div>

                                <div className='mx-10 my-5'>
                                    <div className='flex flex-row justify-center'>
                                    <span className='text-gray-500 font-bold text-xl inline-block'>
                                        {hdata?.height}
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
                                    </span>
                                    <div className='flex justify-center'>
                                        <p className='text-sm font-serif'>Height</p>
                                        <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100  font-bold rounded text-gray-100 flex justify-between hover:text-black ">
                                                <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                                onClick={(e) => openModal(hdata?.height, 'height')}
                                            aria-hidden="true"/>                                   
                                        </button>
                                    </div>                                    
                                    </div>                            
                                </div>

                                <div className='mx-1 my-5'>
                                    <div className='flex flex-row justify-center'>
                                    <span className='text-gray-500 font-bold text-xl inline-block'>
                                        {/* {hdata?.temperature} */}
                                        {(hdata as any)?.temperature === null || (hdata as any)?.temperature === undefined || (hdata as any)?.temperature === ''? (
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
                                            (hdata as any)?.temperature
                                        )}
                                    </span>
                                    <div className='flex justify-center'>
                                        <p className='text-sm font-serif'>Temperature</p>
                                        <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100  font-bold rounded text-gray-100 flex justify-between hover:text-black ">
                                                <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                                onClick={(e) => openModal(hdata?.temperature, 'temperature')}
                                                aria-hidden="true"/>                                   
                                        </button>
                                    </div>
                                    
                                    </div>
                                </div>
                        </div>
                        
                    </div>
                
                <div className='bg-white rounded-xl shadow-sm'>
                    <div className='mx-10 my-5 p-3'>
                            <div className='flex flex-row gap-1'>
                            <strong>Sleep Quality</strong>
                            <span className='text-black ml-10 text-sm inline-block'>
                                {/* {hdata?.sleepquality} */}
                                {(hdata as any)?.sleepquality === null || (hdata as any)?.sleepquality === undefined || (hdata as any)?.sleepquality === '' ? (
                                    <ContentLoader
                                    speed={2}
                                    width={180}
                                    height={15} // Adjust the height and make it equal to the width for a square box
                                    viewBox="0 0 180 15" // Adjust the viewBox accordingly
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                    className="ml-4 inline-block"
                                    >
                                    <rect x="0" y="0" rx="3" ry="3" width="180" height="15" /> 
                                    </ContentLoader>
                                    ):(
                                    (hdata as any)?.sleepquality
                                )}
                            </span>
                            <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100  font-bold rounded text-gray-100 flex justify-between hover:text-black ">
                                    <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                    onClick={(e) => openQualityModal(hdata?.sleepquality, 'sleepquality')}
                                    aria-hidden="true"/>                                   
                            </button>
                            </div>
                        </div>

                        <hr />
                         <div className='mx-10 my-5 p-3'>
                            <div className='flex flex-row gap-1'>
                            <strong>Sleep Duration</strong>
                            <span className='text-black ml-10 text-sm'>
                                {/* {hdata?.sleepduration} */}
                                {(hdata as any)?.sleepduration === null || (hdata as any)?.sleepduration === undefined || (hdata as any)?.sleepduration === '' ? (
                                    <ContentLoader
                                    speed={2}
                                    width={180}
                                    height={15} // Adjust the height and make it equal to the width for a square box
                                    viewBox="0 0 190 15" // Adjust the viewBox accordingly
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                    className="ml-4 inline-block"
                                    >
                                    <rect x="0" y="0" rx="3" ry="3" width="180" height="15" /> 
                                    </ContentLoader>
                                    ):(
                                    (hdata as any)?.sleepduration
                                )}
                            </span>
                            <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100  font-bold rounded text-gray-100 flex justify-between hover:text-black ">
                                    <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                    onClick={(e) => openDurationModal(hdata?.sleepduration, 'sleepduration')}
                                    aria-hidden="true"/>                                   
                                </button>
                            </div>
                        </div>
                    </div>

                </div> 
                
                             
                <div className='flex flex-col justify-center gap-5'>
                    <div className='flex flex-wrap gap-3'>
                        <div className='bg-gradient-to-r from-white via-yellow-200 to-white px-2 py-3 w-[11rem] h-52 rounded-lg'>
                            <div className='mx-auto text-center'>
                                <h1 className='text-2xl py-2'>Steps</h1>
                                <Image src={foot} alt="" className='mx-auto'  width={50} height={50}/>                            
                            </div>
                            <p className='py-2 text-center inline-block'>
                                {/* {hdata?.steps} */}
                                {(hdata as any)?.steps === null || (hdata as any)?.steps === undefined || (hdata as any)?.steps === '' ? (
                                    <ContentLoader
                                    speed={2}
                                    width={130}
                                    height={15} // Adjust the height and make it equal to the width for a square box
                                    viewBox="0 0 130 15" // Adjust the viewBox accordingly
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                    className="ml-4 inline-block"
                                    >
                                    <rect x="0" y="0" rx="3" ry="3" width="130" height="15" /> 
                                    </ContentLoader>
                                    ):(
                                    (hdata as any)?.steps
                                )}
                            </p>   
                        </div>    


                        <div className='bg-gradient-to-r from-white via-yellow-200 to-white px-2 py-3 w-[11rem] h-52  rounded-lg'>
                            <div className='mx-auto text-center'>
                                <h1 className='text-2xl py-2'>Distance</h1>
                                <Image src={dis} alt="" className='mx-auto'  width={50} height={50}/>                            
                            </div>
                            <p className='py-2 text-center inline-block'>
                                {/* {hdata?.distance} */}
                                {(hdata as any)?.distance === null || (hdata as any)?.distance === undefined || (hdata as any)?.distance === '' ? (
                                    <ContentLoader
                                    speed={2}
                                    width={130}
                                    height={15} // Adjust the height and make it equal to the width for a square box
                                    viewBox="0 0 130 15" // Adjust the viewBox accordingly
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                    className="ml-4 inline-block"
                                    >
                                    <rect x="0" y="0" rx="3" ry="3" width="130" height="15" /> 
                                    </ContentLoader>
                                    ):(
                                    (hdata as any)?.distance
                                )}
                            </p>   
                        </div>  
                    {/* </div>


                    <div className='flex gap-5'> */}
                        <div className='bg-gradient-to-r from-white via-yellow-200 to-white px-2 py-3 w-[11rem] h-52  rounded-lg'>
                            <div className='mx-auto text-center'>
                                <h1 className='text-2xl py-2'>Active Minutes</h1>
                                <Image src={actmin} alt="" className='mx-auto'  width={50} height={50}/>                            
                            </div>
                            <p className='py-2 text-center inline-block'>
                                {/* {hdata?.activeminutes} */}
                                {(hdata as any)?.activeminutes === null || (hdata as any)?.activeminutes === undefined || (hdata as any)?.activeminutes === '' ? (
                                    <ContentLoader
                                    speed={2}
                                    width={130}
                                    height={15} // Adjust the height and make it equal to the width for a square box
                                    viewBox="0 0 130 15" // Adjust the viewBox accordingly
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                    className="ml-4 inline-block"
                                    >
                                    <rect x="0" y="0" rx="3" ry="3" width="130" height="15" /> 
                                    </ContentLoader>
                                    ):(
                                    (hdata as any)?.activeminutes
                                )}
                            </p>   
                        </div>  

                        <div className='bg-gradient-to-r from-white via-yellow-200 to-white px-2 py-3 w-[11rem] h-52  rounded-lg'>
                            <div className='mx-auto text-center'>
                                <h1 className='text-2xl py-2'>Calories</h1>
                                <Image src={kcal} alt="" className='mx-auto'  width={50} height={50}/>                            
                            </div>
                            <p className='py-2 text-center inline-block'>
                                {/* {hdata?.calories} */}
                                {(hdata as any)?.calories === null || (hdata as any)?.calories === undefined || (hdata as any)?.calories === '' ? (
                                    <ContentLoader
                                    speed={2}
                                    width={130}
                                    height={15} // Adjust the height and make it equal to the width for a square box
                                    viewBox="0 0 130 15" // Adjust the viewBox accordingly
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
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
                        
                    
                        {/* <button className="p-1 relative font-bold rounded text-gray-100 hover:text-yellow-200">
                            <PencilIcon className="float-right h-4 w-4 inline-block"
                            onClick={(e) => openGraphModal(hdata?.steps, hdata?.distance, hdata?.activeminutes, hdata?.calories)}
                            aria-hidden="true"/>                                   
                        </button>

                        <div className='rounded w-[20rem] h-64'>
                            <BarChart                                      
                            chartData={dailydata}
                            options={{
                                marginLeft: 200,                               
                                scales: {
                                y: {
                                    beginAtZero: true
                                }
                                } 
                            }}
                            
                            />
                        </div> */}
                    
                   
                </div>            
                          

            </div>

             
        
        <UpdateForm data={currentdata} show={showModal} onClose={closeModal} />
        <UpdateDailyData data={currentgraphdata} show={showGraphModal} onClose={closeGraphModal} />
        <UpdateSleep data={currentsleepdurationdata} show={viewDurationModal} onClose={closeDurationModal} />
        <UpdateSleepQuality data={currentsleepqualitydata} show={viewQualityModal} onClose={closeQualityModal} />        
        <UpdateMood data={currentmooddata} show={viewMoodModal} onClose={closeMoodModal} />
       
    </div>
    </>
  )
}

export default Daily