import React,{useState} from 'react'
import Image from 'next/image'
import symp from "../../../public/symp.png";
import aller from "../../../public/aller.png";
import { useRouter } from 'next/router';
import { AiFillCheckSquare, AiOutlineCheck } from 'react-icons/ai';
import { PencilIcon } from '@heroicons/react/solid';
import { UpdateNutrition 
} from '~/components/HealthTracking/UpdateForm'
import UpdateForm from '~/components/HealthTracking/UpdateForm';
import ContentLoader from 'react-content-loader';

const NutritionSym = (props:any) => {
    const hdata = props?.hdata;

    const [currentnutritiondata, setCurrentNutritionData] = useState([{
        healthId: '',  fbreakfast: '', flunch: '', fdinner: '', fsnacks: '', beverage: ''
    }]);
    const [viewNutritionModal, setNutritionModal] = useState(false);
    const closeNutritionModal = () => setNutritionModal(false);
    const openNutritionModal = (fbreakfast:any, flunch:any, fdinner:any, fsnacks:any, fbeverage:any) => {
        setNutritionModal(true);
        setCurrentNutritionData([{
            healthId: hdata?.id,
            fbreakfast: fbreakfast,
            flunch: flunch,
            fdinner: fdinner,
            fsnacks: fsnacks,
            beverage: fbeverage, 
        }])
    }

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

  return (
    <div>
        {/* sleep_running_calories */}
        <div className='mx-20'>
            <div className="">                                  
                <div className='flex flex-col gap-20'>    
                <div className=' bg-white my-5 rounded-xl'> 
                    <div className='flex gap-2 mb-5'>
                        <p className="bg-gradient-to-r from-gray-500 via-black to-gray-500 w-fit px-4 py-2 text-sm font-bold text-white rounded-tl-lg rounded-br-xl transform uppercase">Daily Nutrition</p>

                        <button className="p-1 my-2 bg-opacity-0 relative hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100  font-bold rounded text-gray-100 flex justify-between hover:text-black">
                            <PencilIcon className="float-right h-4 w-4"
                            onClick={(e) => openNutritionModal(hdata?.fbreakfast, hdata?.flunch, hdata?.fdinner, hdata?.fsnacks, hdata?.beverage)}
                            aria-hidden="true"/>                                   
                        </button>
                    </div>
                    

                        <div className='flex flex-wrap gap-10'>
                            <div className="ml-10 w-56 mb-2 shadow-xl bg-gray-300 bg-opacity-30 px-4">
                                <div>
                                    <p className="text-black bg-white px-2 rounded py-1 text-xl font-bold mt-3">
                                        Breakfast
                                    </p>               
                                </div>  
                                <hr className='text-gray-900'/>   
                                <div className='py-2'>
                                    <p className='transform lowercase flex text-center text-gray-900'>
                                    <AiOutlineCheck className='mt-2 ml-2 mr-2'/>
                                        {/* {hdata?.fbreakfast} */}
                                        {(hdata as any)?.fbreakfast === null || (hdata as any)?.fbreakfast === undefined || (hdata as any)?.fbreakfast === '' ? (
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
                                            (hdata as any)?.fbreakfast
                                        )}
                                    </p>
                                </div> 
                            </div>  

                                <div className="ml-10 w-56 mb-2 shadow-xl bg-gray-300 bg-opacity-30 px-4">
                                <div>
                                    <p className="text-black font-bold text-xl mt-3 bg-white px-2 rounded py-1">
                                        Lunch
                                    </p>
                                    <hr className='text-gray-900'/>  
                                    
                                    <div className='py-2'>                                        
                                    <p className='text-gray-900 transform lowercase flex'>
                                    <AiOutlineCheck className='mt-2 ml-2 mr-2'/>
                                        {/* {hdata?.flunch} */}
                                        {(hdata as any)?.flunch === null || (hdata as any)?.flunch === undefined || (hdata as any)?.flunch === '' ? (
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
                                            (hdata as any)?.flunch
                                        )}
                                    </p>
                                    </div>
                                </div>
                            </div>

                            <div className="ml-10 w-56 mb-2 shadow-xl bg-gray-300 bg-opacity-30 px-4">
                                <div>
                                    <p className="text-black font-bold text-xl mt-3 bg-white px-2 rounded py-1">Dinner
                                    </p>
                                    <hr className='text-gray-900'/>  

                                    <div className='py-2'>
                                        <p className='text-gray-900 transform lowercase flex'>
                                        <AiOutlineCheck className='mt-2 ml-2 mr-2'/> 
                                            {/* {hdata?.fdinner} */}
                                            {(hdata as any)?.fdinner === null || (hdata as any)?.fdinner === undefined || (hdata as any)?.fdinner === '' ? (
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
                                                (hdata as any)?.fdinner
                                            )}
                                        </p>
                                    </div>
                                </div>                             
                            </div>                                              
                        {/* </div>

                        <div> */}
                            
                            <div className="ml-10 w-56 mb-2 shadow-xl bg-gray-300 bg-opacity-30 px-4">
                                <div>
                                    <p className="text-black font-bold text-xl mt-3 bg-white px-2 rounded py-1">Snack
                                    </p>
                                    <hr className='text-gray-900'/>  

                                    <div className='py-2'>
                                        <p className='text-gray-900 transform lowercase flex'>
                                        <AiOutlineCheck className='mt-2 ml-2 mr-2'/>
                                            {/* {hdata?.fsnacks} */}
                                            {(hdata as any)?.fsnacks === null || (hdata as any)?.fsnacks === undefined || (hdata as any)?.fsnacks === '' ? (
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
                                                (hdata as any)?.fsnacks
                                            )}
                                        </p>
                                    </div>
                                </div>                               
                            </div>


                            <div className="ml-10 w-56 mb-2 shadow-xl bg-gray-300 bg-opacity-30 px-4">
                                <div>
                                    {/* {hdata?.beverage?.map((item:any,index:any) => ( */}
                                        <div>
                                            <p className="text-black font-bold text-xl mt-3 bg-white px-2 rounded py-1">Beverage</p>
                                            <hr className='text-gray-900'/>  
                                            <div className='py-2'>
                                                <p className='text-gray-900 transform lowercase flex'>
                                                <AiOutlineCheck className='mt-2 ml-2 mr-2'/>
                                                    {/* {hdata?.beverage} */}
                                                    {(hdata as any)?.beverage === null || (hdata as any)?.beverage === undefined || (hdata as any)?.beverage === '' ? (
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
                                                        (hdata as any)?.beverage
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    {/* ))} */}
                            
                                </div>   
                            </div>
                        </div>                                     
                    </div>        
                                                        
                        <div className='flex flex-wrap justify-between gap-20 font-serif mb-10'>

                            <div className="w-[25rem] bg-white border border-opacity-5 rounded-xl hover:bg-gray-50">
                                
                                <div className='flex justify-between'>
                                <p className="bg-gradient-to-r from-gray-500 via-black to-gray-500 w-fit px-4 py-1 text-sm font-bold text-white rounded-tl-lg rounded-br-xl transform uppercase">allergies</p>
                                <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100  font-bold rounded text-gray-100 flex justify-between hover:text-black">
                                <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                onClick={(e) => openModal(hdata?.allergies, 'allergies')}
                                aria-hidden="true"/>                                   
                                </button>
                                </div>
                                <div className="flex p-5">

                                <div className='bg-yellow-500 rounded-full h-20 w-20'>
                                    <Image src={aller} alt='steps' width={150} height={150} className="max-w-16 max-h-16 rounded-full mt-2 ml-1" />
                                </div>

                                <div>
                                    {/* {hdata?.allergies?.map((item:any,index:any) => ( */}
                                        <div className="ml-10 ">
                                            <p className="text-gray-500 font-bold text-sm mt-3">
                                                {/* {hdata?.allergies} */}
                                                {(hdata as any)?.allergies === null || (hdata as any)?.allergies === undefined || (hdata as any)?.allergies === '' ? (
                                                    <ContentLoader
                                                    speed={2}
                                                    width={200}
                                                    height={15} // Adjust the height and make it equal to the width for a square box
                                                    viewBox="0 0 200 15" // Adjust the viewBox accordingly
                                                    backgroundColor="#f3f3f3"
                                                    foregroundColor="#ecebeb"
                                                    className="ml-4 inline-block"
                                                    >
                                                    <rect x="0" y="0" rx="3" ry="3" width="200" height="15" /> 
                                                    </ContentLoader>
                                                    ):(
                                                    (hdata as any)?.allergies
                                                )}
                                            </p>
                                        </div>
                                    {/* ))} */}
                                </div>

                            </div>
                            </div>

                            <div  className="w-[25rem] bg-white border border-opacity-5 rounded-xl hover:bg-gray-50">
                                <div className='flex justify-between'>
                                <p className="bg-gradient-to-r from-gray-500 via-black to-gray-500 w-fit px-4 py-1 text-sm font-bold text-white rounded-tl-lg rounded-br-xl transform uppercase">symptoms</p>
                                <button className="p-1 bg-opacity-0 relative hover:bg-opacity-100 bg-gray-100 hover:bg-gray-100  font-bold rounded text-gray-100 flex justify-between hover:text-black ">
                                <PencilIcon className="float-right h-4 w-4 inline-block mr-1"
                                onClick={(e) => openModal(hdata?.symptoms, 'symptoms')}
                                aria-hidden="true"/>                                   
                                </button>
                                </div>
                                
                                <div className="flex p-5">

                                    <div className='bg-yellow-500 rounded-full h-20 w-20'>
                                        <Image src={symp} alt='steps' width={150} height={150} className="max-w-16 max-h-16 rounded-full mt-2 ml-1" />
                                    </div>

                                    <div>
                                        {/* {hdata?.symptoms?.map((item:any,index:any) => ( */}
                                            <div className="ml-10 ">
                                                <p className="text-gray-500 font-bold text-sm mt-3">
                                                    {/* {hdata?.symptoms} */}
                                                    {hdata.length === 0 || hdata.symptoms === '' || hdata.symptoms === undefined || hdata.symptoms === null? (
                                                        <ContentLoader
                                                        speed={2}
                                                        width={200}
                                                        height={15} // Adjust the height and make it equal to the width for a square box
                                                        viewBox="0 0 200 15" // Adjust the viewBox accordingly
                                                        backgroundColor="#f3f3f3"
                                                        foregroundColor="#ecebeb"
                                                        className="ml-4 inline-block"
                                                        >
                                                        <rect x="0" y="0" rx="3" ry="3" width="200" height="15" /> 
                                                        </ContentLoader>
                                                        ):(
                                                        (hdata as any)?.symptoms
                                                    )}
                                                </p>                                    
                                            </div>
                                        {/* ))} */}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                            
            </div>
        </div>

        <UpdateNutrition data={currentnutritiondata} show={viewNutritionModal} onClose={closeNutritionModal} />
        <UpdateForm data={currentdata} show={showModal} onClose={closeModal} />
    </div>
  )
}

export default NutritionSym