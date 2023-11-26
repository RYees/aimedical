import React, {useState} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from "next/router";
import Link from 'next/link';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import toast, { Toaster } from "react-hot-toast";

type Time = {
    value: string
  }

const UpdateReminder = (props:any) => {
    const [time, setTime] = useState<string[]>([]);
    const [timearr, setTimeArray] = useState<Time[]>([])
    const router = useRouter();
    const data = props.datalist;
    console.log("tanzi", props.datalist);
    const [form, setForm] = useState({
        userId:'0907474a-8430-492f-8856-477fc2ace172', type: '' , medicinename: data.medicinename, description: data.description, dateTime: '', phoneNumber: data.phoneNumber, dosage: data.dosage, age: data.age, days:''
    });
    const [msg, setMessage] = useState('Update Your Health Reminder!');
    const [show, setShow] = useState(false);
    const [subscribe, setSubscribe] = useState(Boolean);
    const [days, setDays] = useState({
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
    });

    const setdays = () => {
        let dayString = "";
            if(days.Sunday == true) dayString +="S";
            if(days.Monday == true) dayString +="M";
            if(days.Tuesday == true) dayString +="T";
            if(days.Wednesday == true) dayString +="W";
            if(days.Thursday == true) dayString +="Th";
            if(days.Friday == true) dayString +="F";
            if(days.Saturday == true) dayString +="Sa";
            return { days : dayString};
    }

    const updateReminder = async (e:any) => {
        e.preventDefault();
        let boolValue = false;
        boolValue != days.Sunday;
        boolValue != days.Monday;
        boolValue != days.Tuesday;
        boolValue != days.Wednesday;
        boolValue != days.Thursday;
        boolValue != days.Friday;
        boolValue != days.Saturday;

        console.log("ozo", form);

        const zo = setdays();
        form.days = zo.days;     

        moment(form.dateTime).toISOString()
        toast("Updating...");
        try {
        const res = await axios.post(`/api/updatereminder/1`, 
        {
            userId: form.userId,                      
            medicinename: form.medicinename,    
            dosage: form.dosage,           
            days: form.days,            
            description: form.description,     
            age: parseInt(form.age),             
            phoneNumber: form.phoneNumber,     
            type: form.type,            
            timeArray: timearr,        
            opted: subscribe, 
        })
        if(res){
        console.log('success', res.data);
        // setMessage('Successfully updated!');
        toast("Successfully updated");
        }
        } catch(error){
            toast("Update failure!");
            console.log("error", error);
        }
    }

    const handleChangeDays = (event:any) => {
        const { name, checked } = event.target;
        setDays((prevDays) => ({
          ...prevDays,
          [name]: checked,
        }));
    };

    const handleChangeSubscribe = (event:any) => {
        setSubscribe(event.target.checked);
        //console.log("gold", event.target.checked);
    };

    
  function AddTimes(e:any) {
    e.preventDefault()
    let value = e.target.value
    const date = new Date();
    date.setHours(parseInt(e.target.value.slice(0, 2)), parseInt(e.target.value.slice(3, 5)), 0);
    let pal = date.toLocaleTimeString('en-US', {hour12: true, hour: 'numeric', minute: 'numeric'})
    setTime([
        ...time, 
        pal
      ])
      console.log("yoy", pal, time);
    value = value.split(',');

      console.log("mot", value, timearr);
    setTimeArray([
      ...timearr, 
      ...value
    ])
  }

function removeItem(index: number) {
    setTimeArray(prevItems => {
      return [
        ...prevItems.slice(0, index), 
        ...prevItems.slice(index + 1)
       ]      
    })

    setTime(prevItems => {
        return [
          ...prevItems.slice(0, index), 
          ...prevItems.slice(index + 1)
         ]      
      })
  }

  function Item<T>({ item, index, removeItem }: {  
    item: T;    
    index: number;  
    removeItem: (index: number) => void;    
  }) {
    return (
      <div className='mb-1'>
        {String(item)} 
        <RemoveCircleIcon 
        fontSize='small'
        className='text-red-600 -mt-1 ml-1'
       
        onClick={() => removeItem(index)}/>        
      </div>   
    )
  }

  return (
    <>
  
   {/* {show ? */}
        {/* <div className="fixed inset-0 z-10 bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col"
        onClick={(e)=>{deleteModal(e)}}
        > */}
            <div className="font-mono my-10 mx-12">
                <div className="container">
                <div className="w-full flex justify-center px-6 ">
                <div className="w-full h-[36rem] border-2 border-gray-100 rounded shadow-2xl">
                               
                    <h3 className="pt-4 text-2xl text-center text-[#f4f4f5]">{msg}</h3>
                    <form onSubmit={updateReminder} className="px-8 pt-6 pb-8 mb-4 bg-white ">
                        <div className='flex flex-wrap gap-6'>
                            <div className="mb-4 w-[27em]">
                                    <div className="relative z-0 mb-6 w-full">
                                        <label
                                        htmlFor="phone"
                                        className="-z-1 origin-0 mb-16 absolute text-base text-gray-500 duration-200 transform capitalize"
                                        >
                                        Phone
                                        </label>

                                        <input
                                        id="phone"
                                        type='text'
                                        onChange={e => setForm({...form, phoneNumber: e.target.value})} 
                                        value={form.phoneNumber}
                                        className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-black font-sans focus:border-indigo-600 focus:outline-none focus:ring-0 text-sm"
                                        />                                        
                                    </div>

                                    <div className="relative z-0 mb-6 w-full">
                                        <label
                                        htmlFor="Medicine Name"
                                        className="-z-1 origin-0 mb-16 absolute text-base text-gray-500 duration-200 transform capitalize"
                                        >
                                        Medicine Name
                                        </label>

                                        <input
                                        id="Medicine Name"
                                        type='text'
                                        onChange={e => setForm({...form, medicinename: e.target.value})} 
                                        value={form.medicinename}
                                        className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-black font-sans focus:border-indigo-600 focus:outline-none focus:ring-0 text-sm"
                                        />                                        
                                    </div>

                                    <div className="relative z-0 mb-6 w-full">
                                        <label
                                        htmlFor="Dosage"
                                        className="-z-1 origin-0 mb-16 absolute text-base text-gray-500 duration-200 transform capitalize"
                                        >
                                        Dosage
                                        </label>

                                        <input
                                        id="dosage"
                                        type='text'
                                        onChange={e => setForm({...form, dosage: e.target.value})} 
                                        value={form.dosage}
                                        className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-black font-sans focus:border-indigo-600 focus:outline-none focus:ring-0 text-sm"
                                        />                                        
                                    </div>

                                    <div className="relative z-0 mb-6 w-full">
                                        <label
                                        htmlFor="Age"
                                        className="-z-1 origin-0 mb-16 absolute text-base text-gray-500 duration-200 transform capitalize"
                                        >
                                        Age
                                        </label>

                                        <input
                                        id="dosage"
                                        type='text'
                                        onChange={e => setForm({...form, age: e.target.value})} 
                                        value={form.age}
                                        className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-black font-sans focus:border-indigo-600 focus:outline-none focus:ring-0 text-sm"
                                        />                                        
                                    </div>

                                    <div className="relative z-0 mb-6 w-full">
                                        <label
                                        htmlFor="Age"
                                        className="-z-1 origin-0 mb-16 absolute text-base text-gray-500 duration-200 transform capitalize"
                                        >
                                        Age
                                        </label>

                                        <input
                                        id="dosage"
                                        type='text'
                                        onChange={e => setForm({...form, age: e.target.value})} 
                                        value={form.age}
                                        className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-black font-sans focus:border-indigo-600 focus:outline-none focus:ring-0 text-sm"
                                        />                                        
                                    </div>

                                    <div className="mb-4 md:mr-2 md:mb-0">                                                        
                                        <label 
                                            className="-z-1 origin-0 mb-16 absolute text-base text-gray-500 duration-200 transform capitalize">
                                            Notification Type
                                        </label>
                                        <select id="type" 
                                            onChange={e => setForm({...form, type: e.target.value})} 
                                            className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-black font-sans focus:border-indigo-600 focus:outline-none focus:ring-0 text-sm">
                                            <option defaultValue={'sms'}></option>
                                            <option value="telegram">Telegram</option>
                                            <option value="whatsapp">Whatsapp</option>
                                            <option value="sms">SMS</option>
                                        </select>
                                    </div>
                                    
                                    <div className="relative z-0 mb-6 w-full">
                                        <label
                                        htmlFor="Description"
                                        className="-z-1 origin-0 mb-16 absolute text-base text-gray-500 duration-200 transform capitalize"
                                        >
                                        Description
                                        </label>

                                        <input
                                        id="Description"
                                        type='text'
                                        onChange={e => setForm({...form, description: e.target.value})} 
                                        value={form.description}
                                        className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-black font-sans focus:border-indigo-600 focus:outline-none focus:ring-0 text-sm"
                                        />                                        
                                    </div>                                
                            </div>
                            
                            <hr className="border-b" />

                            {/* section2 */}

                            <div className='w-[26rem]'>
                                {/* <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Date
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="date"
                                        type="datetime-local"
                                        onChange={e => setForm({...form, dateTime: e.target.value})} 
                                        value={form.dateTime}
                                        placeholder="Date time"
                                    />
                                </div> */}

                                <div className="form-group">
                                <label className='block mb-2 text-sm font-bold text-gray-700'>Days:</label>
                                <div className="flex flex-wrap gap-3 mb-5">
                                <div>
                                    <label htmlFor="Sunday"
                                    className='text-sm text-gray-700'        
                                    >Sunday</label>
                                    <input
                                    type="checkbox"
                                    id="Sunday"
                                    name="Sunday"
                                    checked={days.Sunday}
                                    onChange={handleChangeDays}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Monday"
                                    className='text-sm text-gray-700'>
                                    Monday</label>
                                    <input
                                    type="checkbox"
                                    id="Monday"
                                    name="Monday"
                                    checked={days.Monday}
                                    onChange={handleChangeDays}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Tuesday"
                                    className='text-sm text-gray-700'>
                                        Tuesday</label>
                                    <input
                                    type="checkbox"
                                    id="Tuesday"
                                    name="Tuesday"
                                    checked={days.Tuesday}
                                    onChange={handleChangeDays}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Wednesday"
                                    className='text-sm text-gray-700'>
                                        Wednesday</label>
                                    <input
                                    type="checkbox"
                                    id="Wednesday"
                                    name="Wednesday"
                                    checked={days.Wednesday}
                                    onChange={handleChangeDays}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Thursday"
                                    className='text-sm text-gray-700'>
                                        Thursday</label>
                                    <input
                                    type="checkbox"
                                    id="Thursday"
                                    name="Thursday"
                                    checked={days.Thursday}
                                    onChange={handleChangeDays}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Friday"
                                    className='text-sm text-gray-700'>
                                        Friday</label>
                                    <input
                                    type="checkbox"
                                    id="Friday"
                                    name="Friday"
                                    checked={days.Friday}
                                    onChange={handleChangeDays}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Saturday"
                                    className='text-sm text-gray-700'>
                                        Saturday</label>
                                    <input
                                    type="checkbox"
                                    id="Saturday"
                                    name="Saturday"
                                    checked={days.Saturday}
                                    onChange={handleChangeDays}
                                    />
                                </div>
                                </div>

                                <div className="md:ml-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Time to take:
                                    </label>
                                    <p className='text-gray-400'>24hr format</p><br></br>
                                    {timearr.map((time:any, i) => ( 
                                        <Item 
                                        item={time}  
                                        index={i}  
                                        removeItem={removeItem} 
                                      />  
                                    ))}
                                    <br />
                                    <p className='text-gray-400 mt-4'>12hr format</p> <br></br>
                                    {time.map((time:any) => {
                                        return (
                                        <span>
                                             &nbsp; {time}  
                                        </span> 
                                        )
                                    })} 
                                    
                                    <input
                                        id="time"
                                        type='time'
                                        onChange={AddTimes} 
                                        className=" w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-9 font-sans focus:border-indigo-600 focus:outline-none focus:ring-0 text-sm"
                                    />
                               </div>
                                
                            </div>

                            <div className='mt-20 mb-16'>
                                <p className='text-sm text-gray-900'>
                                    Please confirm for getting reminder notification, unless you confirm you won't recieve remider for your medications!</p>
                                <div>
                                    <label htmlFor="subscribe"
                                    className='text-sm text-gray-700 mr-2'>
                                        confirm</label>
                                    <input
                                    type="checkbox"
                                    id="Subscribe"
                                    name="Subscribe"
                                    checked={subscribe}
                                    onChange={handleChangeSubscribe}
                                    />
                                </div>
                            </div>
        
                            <div className="mb-6 text-center">
                                    <button
                                           className="relative text-[#f4f4f5] z-10 inline-flex w-full items-center justify-center rounded-xl border-2 border-transparent px-8 py-3 text-lg font-bold transition-all duration-200 bg-gradient-to-br from-[#262a2d] via-[#262a2d] to-[#262a2d] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 sm:w-auto"
                                        >
                                        Update Reminder
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                            </div>                            
                        </div>

                    </form>
                    </div>
                  </div>
                </div>
                <Toaster />
            </div>
        {/* </div> */}
        {/* : null} */}
    </>
    
  )
}

export default UpdateReminder
  