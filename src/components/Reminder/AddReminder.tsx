import React, {useState} from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useSession } from 'next-auth/react';
import toast, { Toaster } from "react-hot-toast";

type Time = {
    value: string
  }

const AddReminder = () => {
    const router = useRouter();
    const [time, setTime] = useState<string[]>([]);
    const [timearr, setTimeArray] = useState<Time[]>([]);
    const [step, setStep] = useState(1);
    const { data: session } = useSession();
    const user = session?.user;

    let userId = user?.id;

    const [form, setForm] = useState({
        uid: userId, 
        type:'', 
        fullname: '', 
        medicinename:'', 
        description:'', 
        time: time, 
        phoneNumber: '', 
        dosage:'', 
        age:'', 
        days:'',
        startDate: '',
        endDate: ''
    });
 console.log("biggers", user?.id )   
        
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


    const checkErrors = async () => {
        let errors: { [key: string]: string } = {};
      
        if (step === 1) {
          if (!form.fullname) errors.fullname = "Name is required";
          if (!form.medicinename) errors.medicinename = "Medicine name is required";
          if (!form.phoneNumber) errors.phoneNumber = "Phone Number is required";
          if (!form.dosage) errors.dosage = "Dosage type is required"; 
          if (!form.age) errors.age = "Age is required"; 
        } else if (step === 2) {          
          if (!form.description) errors.description = "Description is required";
          if (!form.type) errors.type = "Notification type is required";
          if (!form.startDate) errors.startDate = "Start date is required";
          if (!form.endDate) errors.endDate = "End date is required";          
          if (!days) errors.days = "Atleast one checked day is required";
        } else if (step === 3) { 
            if (!form.time) errors.time = "Picking time is required"; 
            if (!subscribe) errors.endDate = "Confirmation is not checked";
        }
      
        return errors;
    };
    

    const setReminder = async (e:any) => {
        e.preventDefault();
        const errors = await checkErrors();

        // If there are any errors, stop the form submission
        if (Object.keys(errors).length > 0) {
          // Show a toast message for each error
          for (let error in errors) {
            toast.error(errors[error] as string);
          }
          return;
        }
    
        
        let boolValue = false;
        boolValue != days.Sunday;
        boolValue != days.Monday;
        boolValue != days.Tuesday;
        boolValue != days.Wednesday;
        boolValue != days.Thursday;
        boolValue != days.Friday;
        boolValue != days.Saturday;

        const zo = setdays();
        form.days = zo.days;
        

        toast("Submitting information...");
        try {

        const res = await axios.post('/api/reminders', 
        {
            userId: user?.id,                      
            medicinename: form.medicinename,    
            dosage: form.dosage,           
            days: form.days,            
            description: form.description,     
            age: parseInt(form.age),             
            phoneNumber: form.phoneNumber,     
            type: form.type,  
            //time: moment(form.dateTime).toISOString(),              
            timeArray: timearr,    
            fullname: form.fullname,
            startDate: form.startDate,
            endDate: form.endDate,
            // interval: form.interval,
            // difference: form.difference,    
            opted: subscribe, 
        })
        console.log('success', res.data);        
        if(res){
            toast("Successfully Submitted");
                form.type='', 
                form.fullname = '', 
                form.medicinename ='', 
                form.description = '', 
                form.phoneNumber = '', 
                form.dosage ='', 
                form.age ='', 
                form.days ='',
                //form.reason= ''
                form.startDate = '',
                form.endDate = ''

                router.push("/setreminder");
        } 
        } catch(error){
            toast("Submission Declined");
            console.log("error", error);
        }
    }

    const deleteModal = async () =>{        
        try{
         const val = await axios.post("/api/notification");        
         console.log("twiolio", val);
        }
        catch(error){
            console.log("error", error);
        }
        //e.target = display.none;
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
    };  
    
    // const handleTimeChange = (event:any) => {
    //     const date = new Date();
    //     date.setHours(parseInt(event.target.value.slice(0, 2)), parseInt(event.target.value.slice(3, 5)), 0);
    //     let pal = date.toLocaleTimeString('en-US', {hour12: true, hour: 'numeric', minute: 'numeric'})
    //     console.log("array", pal);
    //     setTime(date.toLocaleTimeString('en-US', {hour12: true, hour: 'numeric', minute: 'numeric'}));
    // }    
    

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
  const nextStep = async() => {
        const errors = await checkErrors();

        // If there are any errors, stop the form submission
        if (Object.keys(errors).length > 0) {
          // Show a toast message for each error
          for (let error in errors) {
            toast.error(errors[error] as string);
          }
          return;
        }
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  return (
    <>
    <div className="flex justify-center -mt-12 -ml-10 sm:ml-0 lg:ml-0 md:ml-0 xl:ml-0 2xl:ml-0">
            <div className="font-mono">
                <div className="container mx-auto">
                <div className="w-full flex justify-center sm:px-6 md:px-64 lg:px-64 xl:px-64 2xl:px-64">
                <div className="w-full -ml-6 sm:-ml-0 md:-ml-0 border-1 shadow-2xl bg-gradient-to-br via-white to-yellow-50 rounded-lg">                    
                    <h3 className="mt-10 mx-6 text-2xl font-bold text-[#f4f4f5] mb-5 text-center font-sans">Set Your Health Reminder!{form.days}</h3>
                    <form onSubmit={setReminder} className="bg-[#16151a] mx-1 sm:px-8 md:px-8 lg:px-8 xl:px-8 2xl:px-8 pt-6 pb-8 px-2 mb-4 rounded shadow-sm"> 
                        {/* <div className=''> */}
                            {/* <div className="mb-4 w-[27em]"> */}
                                {/* step 1 */}
                            {step === 1 && (
                                <div className='sm:w-[35rem] md:w-[35rem] lg:w-[35rem] xl:w-[35rem] 2xl:w-[50rem]'>
                                    <div className="relative z-0 mb-6 w-full">
                                        <label
                                        htmlFor="fullname"
                                        className="-z-1 origin-0 mb-16 absolute text-base text-[#f4f4f5] duration-200 transform capitalize"
                                        >
                                        Full Name
                                        </label>

                                        <input
                                        id="name"
                                        type='text'
                                        onChange={e => setForm({...form, fullname: e.target.value})} 
                                        value={form.fullname}
                                        className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-[#f4f4f5] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                                        />                                        
                                    </div>

                                    <div className="relative z-0 mb-6 w-full">
                                        <label
                                        htmlFor="fullname"
                                        className="-z-1 origin-0 mb-16 absolute text-base text-[#f4f4f5] duration-200 transform capitalize"
                                        >
                                        Phone
                                        </label>

                                        <input
                                        id="phone"
                                        type='text'
                                        onChange={e => setForm({...form, phoneNumber: e.target.value})} 
                                        value={form.phoneNumber}
                                        className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-[#f4f4f5] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                                        />                                        
                                    </div>

                                    <div className="relative z-0 mb-6 w-full">
                                        <label
                                        htmlFor="fullname"
                                        className="-z-1 origin-0 mb-16 absolute text-base text-[#f4f4f5] duration-200 transform capitalize"
                                        >
                                        Medicine Name
                                        </label>

                                        <input
                                        id="medicine name"
                                        type='text'
                                        onChange={e => setForm({...form, medicinename: e.target.value})} 
                                        value={form.medicinename}
                                        className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-[#f4f4f5] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                                        />                                        
                                    </div>

                                    <div className="relative z-0 mb-6 w-full">
                                        <label
                                        htmlFor="fullname"
                                        className="-z-1 origin-0 mb-16 absolute text-base text-[#f4f4f5] duration-200 transform capitalize"
                                        >
                                        Dosage Amount
                                        </label>

                                        <input
                                        id="medicine name"
                                        type='text'
                                        onChange={e => setForm({...form, dosage: e.target.value})} 
                                        value={form.dosage}
                                        className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-[#f4f4f5] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                                        />                                        
                                    </div>

                                    <div className="relative z-0 mb-6 w-full">
                                        <label
                                        htmlFor="age"
                                        className="-z-1 origin-0 mb-16 absolute text-base text-[#f4f4f5] duration-200 transform capitalize"
                                        >
                                        Age
                                        </label>

                                        <input
                                        id="medicine name"
                                        type='number'
                                        onChange={e => setForm({...form, age: e.target.value})} 
                                        value={form.age}
                                        className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-[#f4f4f5] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                                        />                                        
                                    </div> 

                                        <button type="button" className='text-gray-400 hover:text-gray-600 my-4 bg-gray-200 border-2 border-gray-100 rounded shadow-xl py-1 px-8' onClick={nextStep}>Next</button>
                                </div>
                            )}

                                {/* step 2 */}
                            {step === 2 && (
                                <div className='sm:w-[35rem] md:w-[35rem] lg:w-[35rem] xl:w-[35rem] 2xl:w-[50rem]'>
                                    <div className="relative z-0 mb-8 w-full">
                                        <label
                                        htmlFor="description"
                                        className="-z-1 origin-0 mb-16 absolute text-base text-[#f4f4f5] duration-200 transform capitalize"
                                        >
                                       Description
                                        </label>

                                        <input
                                        id="description"
                                        type='text'
                                        onChange={e => setForm({...form, description: e.target.value})} 
                                        value={form.description}
                                        className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-[#f4f4f5] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                                        />                                        
                                    </div> 

                                    <div className="mb-8">                                                        
                                    <label 
                                        className="ml-2 block text-sm font-bold text-[#f4f4f5]">
                                        Notification Type
                                    </label>
                                        <select id="type" 
                                            onChange={e => setForm({...form, type: e.target.value})} 
                                            className="mt-2 w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-[#f4f4f5] hover:bg-[#16151a] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm">
                                            <option defaultValue="true"></option>
                                            <option value="telegram">Telegram</option>
                                            <option value="whatsapp">Whatsapp</option>
                                            <option value="sms">SMS</option>
                                            <option value="email">Email</option>
                                        </select>
                                    </div>

                                    <div className="md:ml-2 mb-8">
                                        <label
                                            htmlFor="description"
                                            className="-z-1 origin-0 mb-16 absolute text-base text-[#f4f4f5] duration-200 transform capitalize"
                                            >
                                            Start Date
                                        </label>
                                        <input
                                            id="sleep date"
                                            type='datetime-local'
                                            onChange={e => setForm({...form, startDate: e.target.value})} 
                                            value={form.startDate}
                                            className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-white px-2 pb-2 pt-3 text-[#16151a] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                                            />
                                    </div>

                                    <div className="md:ml-2 mb-8 ">
                                        <label
                                            htmlFor="description"
                                            className="-z-1 origin-0 mb-16 absolute text-base text-[#f4f4f5] duration-200 transform capitalize"
                                            >
                                            End Date
                                        </label>
                                        <input
                                            id="end date"
                                            type='datetime-local'
                                            onChange={e => setForm({...form, endDate: e.target.value})} 
                                            value={form.endDate}
                                            className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-white px-2 pb-2 pt-3 text-[#16151a] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                                        />
                                    </div>
                                    {/* section2 */}                                    

                                    <div className="form-group">
                                        <label className='block mb-2 text-sm font-bold text-[#f4f4f5] ml-3'>Days:</label>
                                        <div className="flex gap-3 ml-3 flex-wrap mb-5">
                                            <div>
                                                <label htmlFor="Sunday"
                                                className='text-sm -mt-2 text-[#f4f4f5]'        
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
                                                className='text-sm text-[#f4f4f5]'>
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
                                                className='text-sm text-[#f4f4f5]'>
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
                                                className='text-sm text-[#f4f4f5]'>
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
                                                className='text-sm text-[#f4f4f5]'>
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
                                                className='text-sm text-[#f4f4f5]'>
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
                                                className='text-sm text-[#f4f4f5]'>
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
                                    </div> 
                            
                                    <div className='flex justify-between'>
                                        <button type="button" className='text-gray-400 hover:text-gray-600 my-4 bg-gray-200 border-2 border-gray-100 rounded shadow-xl py-1 px-8' onClick={nextStep}>Next</button>
                                        <button type="button" className='text-gray-400 hover:text-gray-600 my-4 bg-gray-200 border-2 border-gray-100 rounded shadow-xl py-1 px-2' onClick={previousStep}>Previous</button>
                                    </div>
                                </div>
                            )}

                               {/* step 3  */}
                            {step === 3 && (
                                <div className='sm:w-[35rem] md:w-[35rem] lg:w-[35rem] xl:w-[35rem] 2xl:w-[50rem]'>
                                    <div className="mb-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-400">
                                            Time to take:
                                        </label>
                                        <div className='flex flex-col'>
                                            <div className='text-gray-400 text'><small>24hr format</small></div>
                                            <br></br>

                                            {timearr.length == 0? <p className='text-sm '>
                                                pick a time</p>: null}
                                            <div className='flex gap-4 flex-wrap'>
                                                {timearr.map((time:any, i) => ( 
                                                <span className='bg-yellow-100 rounded p-1 shadow-2xl'>
                                                    <Item 
                                                    item={time}  
                                                    index={i}  
                                                    removeItem={removeItem} 
                                                    />  
                                                </span>
                                                ))}
                                            </div>
                                                <br/>
                                            <p className='text-gray-400'><small>12hr format</small></p> 
                                                <br></br>
                                            <div className='flex gap-4 flex-wrap'>
                                                {time.map((time:any) => {
                                                    return (
                                                    <span className='bg-yellow-100 rounded p-1 shadow-2xl'>
                                                        &nbsp; {time}  
                                                    </span> 
                                                    )
                                                })} 
                                            </div>
                                        </div>                                        
                                       
                                        <input
                                            id="time"
                                            type='time'
                                            required
                                            onChange={AddTimes} 
                                            className="mt-5 w-full appearance-none border-0 border-b-2 border-gray-200 bg-white px-2 pb-2 pt-3 text-[#16151a] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                                        />
                                    </div>

                                    <div className=''>
                                        <p className='py-3 text-sm text-[#f4f4f5]'>
                                            Please confirm for getting reminder notification, unless you confirm you won't recieve remider for your medications!
                                        </p>
                                        <div className='mb-4'>
                                            <label htmlFor="subscribe"
                                            className='text-sm text-gray-400 mr-2'>
                                                confirm
                                            </label>

                                            <input
                                            type="checkbox"
                                            id="Subscribe"
                                            name="Subscribe"
                                            checked={subscribe}
                                            onChange={handleChangeSubscribe}
                                            />
                                        </div>                                    
                                    </div>  

                                    <button type="button" className='text-gray-400 hover:text-gray-600 my-4 bg-gray-200 border-2 border-gray-100 rounded shadow-xl py-1 px-2' onClick={previousStep}>Previous</button>

                                    <div className="text-center mt-4">
                                        <button
                                           className="relative z-10 inline-flex w-full items-center justify-center rounded-xl border-2 border-transparent px-8 py-3 text-lg font-bold transition-all duration-200 bg-[#f4f4f5] text-[#16151a] hover:brightness-110 hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 sm:w-auto"
                                        >
                                            Set Reminder
                                        </button>
                                    </div> 
                                </div>
                            )}
                        </form>
                </div>
                </div>
                </div>
            </div>
            <Toaster />
        </div>
    </>
    
  )
}

export default AddReminder

  