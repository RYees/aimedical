import React, {useState} from 'react'
import BarChart from "./BarChart"
import { AiFillCheckSquare } from 'react-icons/ai';
import { PencilIcon } from '@heroicons/react/solid';
import UpdateForm from '~/components/HealthTracking/UpdateForm';
import { UpdateBiometric, UpdateGoal } from '~/components/HealthTracking/UpdateForm';
import { min } from 'date-fns';
import ContentLoader from 'react-content-loader';

const Detail = (props:any) => {
    const hdata = props.hdata;
    
    const data = {
        labels: ['Glucose (mg/dL)', 'Cholesterol (mg/dL)', 'Hemoglobin (g/dL)', 'Carbohydrate (g)', 'Protiens (g)', 'Fats (glycerol)', 'Vitamins (IU)', 'Minerals (IU)', 'ECG (ms)'],
        datasets: [
          {
            label: 'Values',
            data: [hdata?.glucose, hdata?.cholesterol, hdata?.hemoglobin, hdata?.carbohydrate, hdata?.protiens, hdata?.fats, hdata?.vitamins, hdata?.minerals, hdata?.ecg], 
            backgroundColor: [
                "#f6efa7",
                "#f2bc09",
                "#f6efa7",
                "#f2bc09",
                "#f6efa7",
                "#f2bc09",
                "#f6efa7",
                "#f2bc09",
                "#f6efa7"
              ],
              borderColor: "black",
              borderWidth: 2,
          }
        ]
      };

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

      const [currentbiodata, setCurrentBioData] = useState([{
        healthId: '',  
        glucose: '',
        cholesterol: '',
        hemoglobin: '',
        carbohydrate: '',
        protiens: '',
        fats: '',
        ecg: '',
        vitamins: '',
        minerals: ''
      }]);
      const [biometricModal, setBioModal] = useState(false);
      const closeBioModal = () => setBioModal(false);
      //const openModal = () => setShowModal(true);
        const openBioModal = (glucose:any, cholesterol:any, hemoglobin:any, carbohydrate:any, protiens:any,
            fats:any, vitamins:any, minerals:any, ecg:any) => {
            setBioModal(true);
            setCurrentBioData([{
                healthId: hdata?.id,
                glucose: glucose,
                cholesterol: cholesterol,
                hemoglobin: hemoglobin,
                carbohydrate: carbohydrate,
                protiens: protiens,
                fats: fats,
                ecg: ecg,
                vitamins: vitamins,
                minerals: minerals
            }])
        }

        const [currentgoaldata, setCurrentGoalData] = useState([{
            healthId: '',  fieldName: '',
          }]);
        const [goalModal, setGoalModal] = useState(false);
        const closeGoalModal = () => setGoalModal(false);        
        const openGoalModal = (fieldname:any) => {
            setGoalModal(true);
            setCurrentGoalData([{
                healthId: hdata?.id,
                fieldName: fieldname
            }])
        }
    
  return (
    <>  
         {/* Biometric Measurments  */}
        <div className='mb-20 flex gap-20 mx-10 mt-10'>
            <div>
                    <div className='flex mr-2 mb-8'>
                        <h1 className='text-2xl font-bold'>Your Biometric Measurments</h1>
                        {/* <div className='flex justify-center my-5' style={{height: 400, width: 600}}> */}
                        <button className="p-1 mt-2 bg-opacity-0 relative hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100  font-bold rounded text-gray-100 flex justify-between hover:text-black ">
                            <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                            onClick={(e) => openBioModal(hdata?.glucose, hdata?.cholesterol, hdata?.hemoglobin, hdata?.carbohydrate, hdata?.protiens, hdata?.fats, hdata?.vitamins, hdata?.minerals, hdata?.ecg)}
                            aria-hidden="true"/>                                   
                        </button>
                   </div>
                        <div className='rounded w-[38rem] h-96'>
                        <BarChart                                         
                            chartData={data}
                            options={{
                                marginLeft: 200,
                                scales: {
                                y: {
                                    beginAtZero: true
                                }
                                } 
                            }}
                        />
                    </div>
                </div>

                <div className='text-center bg-gradient-to-b from-white via-yellow-300 to-white w-full rounded-3xl my-3'>                   
                    <h1 className='text-6xl text-black italic'>Goals</h1>
                    <div className='flex flex-col font-serif my-5'>
                        {/* {hdata?.goals?.map((item:any, index:any) => ( */}
                            <ul className='flex justify-center'>
                                <li className='flex justify-center text-gray-900'>
                                    <AiFillCheckSquare className='mt-1 mr-2'/>
                                        {/* {hdata?.goals} */}
                                        {(hdata as any)?.goals === null || (hdata as any)?.goals === undefined || (hdata as any)?.goals === '' ? (
                                            <ContentLoader
                                            speed={2}
                                            width={230}
                                            height={15} // Adjust the height and make it equal to the width for a square box
                                            viewBox="0 0 230 15" // Adjust the viewBox accordingly
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className="ml-4 inline-block"
                                            >
                                            <rect x="0" y="0" rx="3" ry="3" width="230" height="15" /> 
                                            </ContentLoader>
                                            ):(
                                            (hdata as any)?.goals
                                        )}
                                </li>
                                <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100  font-bold rounded text-gray-700 flex justify-between hover:text-black ">
                                <PencilIcon className="float-right h-4 ml-2 w-4 inline-block mr-1"
                                onClick={(e) => openGoalModal('goals')}
                                aria-hidden="true"/>                                   
                                </button>
                            </ul>
                        {/* ))} */}
                    </div>
               </div>

            {/* <div className='bg-black text-yellow-400 rounded-lg'>
                                <div className='flex flex-col justify-center align-middle text-center p-10 mb-10 gap-5'>
                                <div className='flex flex-col'>
                                        <h1 className='font-bold text-2xl transform capitalize'>Your Mental Health</h1>
                                        <p>{hdata?.mentalsymptoms}</p>
                                    </div><hr className='mx-20'/>
                                    {hdata?.notes?
                                    <div>
                                    <div className='flex flex-col'>
                                        <h1 className='font-bold text-2xl transform capitalize'>Details on your Mental health</h1>
                                        <p>{hdata?.notes}</p>

                                    </div><hr className='mx-20'/></div>: null}
                                    <div className='flex flex-col'>
                                        <h1 className='font-bold text-2xl'>Chronic Condition</h1>
                                        <p>{hdata?.chronichcond}</p>
                                    </div><hr className='mx-20'/>
                                    <div className='flex flex-col'>
                                        <h1 className='font-bold text-2xl'>Hospitalized</h1>
                                        <p>{hdata?.hospitalize}</p>
                                    </div><hr className='mx-20'/>
                                    {hdata?.famimedical?
                                    <div>
                                    <div className='flex flex-col'>
                                        <h1 className='font-bold text-2xl'>Family Medical Details</h1>
                                        <p>{hdata?.famimedical}</p>
                                    </div><hr className='mx-20'/></div>: null}
                                    {hdata?.vaccrecord?
                                    <div>
                                    <div className='flex flex-col'>
                                        <h1 className='font-bold text-2xl'>Vaccination Record</h1>
                                        <p>{hdata?.vaccrecord}</p>
                                    </div><hr className='mx-20'/></div>:null}
                                    {hdata?.lifeassess?
                                    <div className='flex flex-col'>
                                        <h1 className='font-bold text-2xl'>Quality of Life Assessment</h1>
                                        <p>{hdata?.lifeassess}</p>
                                    </div>:null}
                                </div>
            </div> */}
            <UpdateForm data={currentdata} show={showModal} onClose={closeModal} />
            <UpdateBiometric data={currentbiodata} show={biometricModal} onClose={closeBioModal} />
            <UpdateGoal data={currentgoaldata} show={goalModal} onClose={closeGoalModal} />
        </div>
    </>
  )
}

export default Detail