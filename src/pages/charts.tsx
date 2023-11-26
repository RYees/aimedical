import React from 'react'
import { IoFastFoodOutline } from 'react-icons/io5';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { BiNote } from 'react-icons/bi';
import { FcSportsMode } from 'react-icons/fc';
import { PiBowlFoodFill } from 'react-icons/pi';
import { TbTrendingUp2 } from 'react-icons/tb';
import PieChart from '~/components/HealthTracking/PieChart';
import { useState, useEffect } from 'react';
import BarChart from '~/components/HealthTracking/BarChart';
import axios from 'axios';
import { useSession } from 'next-auth/react';


const Charts = (props:any) => {
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
        labels: ['Glucose (mg/dL)', 'Cholesterol (mg/dL)', 'Hemoglobin (g/dL)', 'Carbohydrate (g)', 'Protiens (g)', 'Fats (glycerol)', 'Vitamins (IU)', 'Minerals (IU)', 'ECG (ms)'],
        datasets: [
          {
            label: 'Values',
            data: [(hdata as any)?.glucose, (hdata as any)?.cholesterol, (hdata as any)?.hemoglobin, (hdata as any)?.carbohydrate, (hdata as any)?.protiens, (hdata as any)?.fats, (hdata as any)?.vitamins, (hdata as any)?.minerals, (hdata as any)?.ecg], 
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

    const datanutrition = {
        labels: ['Glucose (mg/dL)', 'Cholesterol (mg/dL)', 'Hemoglobin (g/dL)', 'Carbohydrate (g)', 'Protiens (g)', 'Fats (glycerol)', 'Vitamins (IU)', 'Minerals (IU)', 'ECG (ms)'],
        datasets: [
          {
            label: 'Values',
            data: ['100', '200', '250', '300', '400', '450', '500', '690', '280'], 
            backgroundColor: [
                "#e5efd2f1",
                "#90d812f1",
                "#e5efd2f1",
                "#90d812f1",
                "#e5efd2f1",
                "#90d812f1",
                "#e5efd2f1",
                "#90d812f1",
                "#e5efd2f1"
              ],
              borderColor: "black",
              borderWidth: 2,
          }
        ]
      };

      

      
  return (
    <div>
        <div className='bg-gray-50 m-3 p-5'>
            <h1>Biomertircs Chart</h1>
            <div className='rounded h-96 w-[26rem] md:w-full flex flex-col md:flex-row gap-0 md:gap-20'>
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

                <div className='m-10 p-10 px-30'>
                    <FaArrowTrendUp size={200}/>
                </div>
            </div>
        </div>

        <div className='bg-gray-50 m-3 p-5'>
            <h1>Nutrition Chart</h1>
            <div className='rounded h-96 w-[26rem] md:w-full flex flex-col md:flex-row gap-0 md:gap-20'>
                <BarChart                                         
                    chartData={datanutrition}
                    options={{
                        marginLeft: 200,
                        scales: {
                        y: {
                            beginAtZero: true
                        }
                        } 
                    }}
                />

                <div className=' m-10 p-10 px-30'>
                    <TbTrendingUp2 size={200}/>
                </div>
            </div>
        </div>
</div>
  )
}

export default Charts