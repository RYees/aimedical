import { Listbox, Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import { Fragment, useState, useEffect } from 'react';
import axios from "axios";
import { useSession } from "next-auth/react";
import { CheckIcon} from '@heroicons/react/outline'


const usersteps = [
  { id: 1, name: 'Less than 1,000 steps', unavailable: false },
  { id: 2, name: '1,000 - 5,000 steps', unavailable: false },
  { id: 3, name: '5,000 - 10,000 steps', unavailable: false },
  { id: 4, name: '10,000 - 15,000 steps', unavailable: false },
  { id: 5, name: '15,000 - 20,000 steps', unavailable: false },
  { id: 6, name: 'More than 20,000 steps', unavailable: false },
]

const userdistance = [
  { id: 1, name: 'No travel', unavailable: false },
  { id: 2, name: 'Minimal (less than 5 miles)', unavailable: false },
  { id: 3, name: 'Moderate (5-10 miles)', unavailable: false },
  { id: 4, name: 'Average (10-20 miles)', unavailable: false },
  { id: 5, name: 'Extensive (20-50 miles)', unavailable: false },
  { id: 6, name: 'Long-distance (more than 50 miles)', unavailable: false },
]

const userminute = [
  { id: 1, name: 'Sedentary (less than 30 minutes)', unavailable: false },
  { id: 2, name: 'Lightly active (30-60 minutes)', unavailable: false },
  { id: 3, name: 'Moderately active (60-90 minutes)', unavailable: false },
  { id: 4, name: 'Active (90-120 minutes)', unavailable: false },
  { id: 5, name: 'Very active (more than 120 minutes)', unavailable: false },
]

const usercalories = [
  { id: 1, name: 'Less than 1000 calories', unavailable: false },
  { id: 2, name: '1000-1500 calories', unavailable: false },
  { id: 3, name: '1500-2000 calories', unavailable: false },
  { id: 4, name: '2000-2500 calories', unavailable: false },
  { id: 5, name: 'More than 2500 calories', unavailable: false }
] 

const sleepqualities = [
  { id: 1, name: 'Very Slight Sleep', unavailable: false },
  { id: 2, name: 'Slightly Deeper Sleep', unavailable: false },
  { id: 3, name: 'Deep Sleep', unavailable: false },
  { id: 4, name: 'Rapid Eye Movement Sleep', unavailable: false },
] 

const sleepdurations = [
  { id: 1, name: 'Less than 5 hours', unavailable: false },
  { id: 2, name: '5-6 hours', unavailable: false },
  { id: 3, name: '6-7 hours', unavailable: false },
  { id: 4, name: '7-8 hours', unavailable: false },
  { id: 5, name: '8-9 hours', unavailable: false },
  { id: 6, name: 'More than 9 hours', unavailable: false }
] 

const excercisetype = [
  { id: 1, name: 'Running/jogging', unavailable: false },
  { id: 2, name: 'Walking', unavailable: false },
  { id: 3, name: 'Cycling', unavailable: false },
  { id: 4, name: 'Swimming', unavailable: false },
  { id: 5, name: 'Aerobics', unavailable: false },
  { id: 6, name: 'Dancing', unavailable: false },
  { id: 7, name: 'Sports Activities', unavailable: false },
  { id: 8, name: 'Yoga', unavailable: false },
  { id: 9, name: 'Pilates', unavailable: false },
  { id: 10, name: 'Martial arts', unavailable: false }
]  

const dailycalory = [
  { id: 1, name: 'No calories', unavailable: false },
  { id: 2, name: 'Low calorie intake', unavailable: false },
  { id: 3, name: 'Moderate calorie intake', unavailable: false },
  { id: 4, name: 'Average calorie intake', unavailable: false },
  { id: 5, name: 'High calorie intake', unavailable: false }
]

const breakfasts = [
  { id: 1, name: 'Cereal and grains', unavailable: false },
  { id: 2, name: 'Dairy and alternatives foods', unavailable: false },
  { id: 3, name: 'Protein sources foods(eg. egg, bacon, nut butter...)', unavailable: false },
  { id: 4, name: 'Fruits and vegetables', unavailable: false },
  { id: 5, name: 'Baked goods', unavailable: false }
]

const lunchs = [
  { id: 1, name: 'Sandwiches and wraps', unavailable: false },
  { id: 2, name: 'Salads foods', unavailable: false },
  { id: 3, name: 'Soups', unavailable: false },
  { id: 4, name: 'Rice and grain bowls', unavailable: false },
  { id: 5, name: 'Pasta and noodles', unavailable: false },
  { id: 6, name: 'Protein sources foods(eg. meat, chicken, tuna...)', unavailable: false }
]

const dinners = [
  { id: 1, name: 'Meat and poultry', unavailable: false },
  { id: 2, name: 'Salads foods', unavailable: false },
  { id: 3, name: 'Soups', unavailable: false },
  { id: 4, name: 'Rice and grain bowls', unavailable: false },
  { id: 5, name: 'Pasta and noodles', unavailable: false },
  { id: 6, name: 'Protein sources foods(eg. meat, chicken, tuna...)', unavailable: false }
]

const snacks = [
  { id: 1, name: 'Fresh fruit', unavailable: false },
  { id: 2, name: 'Nuts and seeds', unavailable: false },
  { id: 3, name: 'Granola bars', unavailable: false },
  { id: 4, name: 'Yogurt or yogurt cups', unavailable: false },
  { id: 5, name: 'Cheese and crackers', unavailable: false },
  { id: 6, name: 'Popcorn', unavailable: false },
  { id: 7, name: 'Vegetable sticks with dip', unavailable: false },
  { id: 8, name: 'Protein bars', unavailable: false },
  { id: 9, name: 'Trail mix', unavailable: false },
  { id: 10, name: 'Chocolate or candy bars', unavailable: false }
]

const beverages = [
  { id: 1, name: 'Water', unavailable: false },
  { id: 2, name: 'Coffee', unavailable: false },
  { id: 3, name: 'Tea', unavailable: false },
  { id: 4, name: 'Soft drinks', unavailable: false },
  { id: 5, name: 'Fruit juices', unavailable: false },
  { id: 6, name: 'Milk', unavailable: false },
  { id: 7, name: 'Energy drinks', unavailable: false },
  { id: 8, name: 'Sports drinks', unavailable: false },
  { id: 9, name: 'Alcoholic beverages', unavailable: false },
  { id: 10, name: 'Smoothies or shakes', unavailable: false }
]

const moods = [
  { id: 1, name: 'Happy', unavailable: false },
  { id: 2, name: 'Excited', unavailable: false },
  { id: 3, name: 'Content', unavailable: false },
  { id: 4, name: 'Calm', unavailable: false },
  { id: 5, name: 'Neutral', unavailable: false },
  { id: 6, name: 'Sad', unavailable: false },
  { id: 7, name: 'Stressed', unavailable: false },
  { id: 8, name: 'Anxious', unavailable: false },
  { id: 9, name: 'Frustrated', unavailable: false },
  { id: 10, name: 'Angry', unavailable: false }
]

const goals = [
  { id: 1, name: 'Lose weight', unavailable: false },
  { id: 2, name: 'Gain weight', unavailable: false },
  { id: 3, name: 'Improve fitness and endurance', unavailable: false },
  { id: 4, name: 'Build muscle strength', unavailable: false },
  { id: 5, name: 'Improve flexibility', unavailable: false },
  { id: 6, name: 'Eat a balanced and nutritious diet', unavailable: false },
  { id: 7, name: 'Drink more water', unavailable: false },
  { id: 8, name: 'Reduce stress levels', unavailable: false },
  { id: 9, name: 'Improve sleep quality', unavailable: false },
  { id: 10, name: 'Quit smoking or reduce tobacco use', unavailable: false },
  { id: 11, name: 'Reduce alcohol consumption', unavailable: false },
  { id: 12, name: 'Improve mental well-being', unavailable: false },
  { id: 13, name: 'Manage chronic conditions', unavailable: false },
  { id: 14, name: 'Improve cardiovascular health', unavailable: false },
  { id: 15, name: 'Enhance overall wellness and self-care', unavailable: false }
]


export default function UpdateForm(props: any) {
    const show = props.show;
    const onClose = props.onClose;
    const { healthId, fieldName, value } = props?.data[0];
    
    // const healthId = props.healthId;
    const [message, setMessage] = useState('');
    const [form, setForm] = useState({
        singlevalue: ''
      });
    let [char, setChar] = useState({});
    // Retrieving data from local storage

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const myValueString = localStorage.getItem('myKey');
        if(myValueString !== null){
          char = JSON.parse(myValueString);
        }
        setChar(char);
      }
    });

  const { data: session } = useSession();
    const user = session?.user;
    
    const handleSubmit = async(e:any) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('form',form)
        try {
            const res = await axios.post('/api/updatehealthdata/one', 
            {
                healthId: healthId,
                field: fieldName,
                value: form.singlevalue                     
                
            })
            console.log('success', res.data);
            setMessage('Nice work!!!, you have updated your health data Successfully.');
            } catch(error){
                console.log("error", error);
            }
    };

    const closeModal = () => {
        if (typeof onClose === "function") {
        onClose();
        }
    };

    useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, singlevalue: value }));
    }, [value]);

  return (
    <>    
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative my-8 inline-block w-full max-w-2xl transform  overflow-hidden  bg-gray-200 text-left align-middle shadow-xl transition-all sm:rounded-md">
              {/* Close icon */}
              <button
                onClick={()=>closeModal}
                className="absolute right-2 top-2 shrink-0 rounded-md p-1 transition hover:bg-gray-100 focus:outline-none"
              >
                {/* <XIcon className="w-5 h-5" /> */}
              </button>

              <div className="py-12">
                <div className="px-4 sm:px-12">
                  <Dialog.Title
                    as="h3"                    
                  >
                      <div className="flex gap-3 text-lg mt-3">
                        <img src={(char as any)?.image} className="h-10 w-10 rounded-full" alt="" />
                        {message !== '' ?<p className="text-green-900 font-thin">{message}</p>: 
                        <p className="text-gray-900 font-thin">hey there, go on update your daily health data</p>}
                      </div>
                    
                     <br />
                    
                  </Dialog.Title>
                  <Dialog.Title
                    as="h3"
                    className="mt-2 bg-gradient-to-r from-orange-500  to-pink-500 bg-clip-text text-center text-lg font-bold text-transparent sm:text-4xl"
                  >
                     Daily Health Data Update
                    
                     <br />
                    
                  </Dialog.Title>

                    <Dialog.Description>
                        <div>
                            <form onSubmit={handleSubmit} className="">
                                <div>
                                {/* <label className="font-bold">Name</label>*/}
                                <input
                                type="text"
                                onChange={e => setForm({...form, singlevalue: e.target.value})} 
                                value={form.singlevalue}
                                className="p-4 mt-2 w-full rounded-full"/>
                                </div>
                                
                                <div className="mt-10">
                                    <button
                                        className="mx-auto flex h-[46px] w-full rounded-md items-center justify-center space-x-2  border bg-gray-50 p-2 text-gray-500 transition-colors hover:border-yellow-400 hover:bg-yellow-700 hover:text-black hover:font-bold focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                                        
                                    >
                                    
                                    <span>
                                            Submit
                                    </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                  </Dialog.Description>
             

                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    </>
  );
}

export function UpdateSleep(props: any) {
    const show = props.show;
    const onClose = props.onClose;
    const { healthId, fieldName, value } = props?.data[0];
    
    // const healthId = props.healthId;
    const [messagesleep, setSleepMessage] = useState('');
    const [form, setForm] = useState({
        singlevalue: ''
      });
    let [char, setChar] = useState({});
    // Retrieving data from local storage

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const myValueString = localStorage.getItem('myKey');
        if(myValueString !== null){
          char = JSON.parse(myValueString);
        }
        setChar(char);
      }
    });

    const { data: session } = useSession();
    const user = session?.user;
    
    const handleSubmit = async(e:any) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('form',form)
        try {
            const res = await axios.post('/api/updatehealthdata/one', 
            {
                healthId: healthId,
                field: fieldName,
                value: form.singlevalue                     
                
            })
            console.log('success', res.data);
            setSleepMessage('Nice work!!!, you have updated your current sleep duration data Successfully.');
            } catch(error){
                console.log("error", error);
            }
    };

    const closeModal = () => {
        if (typeof onClose === "function") {
        onClose();
        }
    };

    useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, singlevalue: value }));
    }, [value]);

  return (
    <>    
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative my-8 inline-block w-full max-w-2xl transform  overflow-hidden  bg-gray-200 text-left align-middle shadow-xl transition-all sm:rounded-md">
              {/* Close icon */}
              <button
                onClick={()=>closeModal}
                className="absolute right-2 top-2 shrink-0 rounded-md p-1 transition hover:bg-gray-100 focus:outline-none"
            >
                {/* <XIcon className="w-5 h-5" /> */}
              </button>

              <div className="py-12">
                <div className="px-4 sm:px-12">
                <Dialog.Title
                    as="h3"                    
                  >
                      <div className="flex gap-3 text-lg mt-3">
                        <img src={(char as any)?.image} className="h-10 w-10 rounded-full" alt="" />
                        {messagesleep !== '' ?<p className="text-green-900 font-thin">{messagesleep}</p>: 
                        <p className="text-gray-900 font-thin">hey there, go on update your daily health data</p>}
                      </div>
                    
                     <br />
                    
                  </Dialog.Title>
                  <Dialog.Title
                    as="h3"
                    className="mt-2 bg-gradient-to-r from-orange-500  to-pink-500 bg-clip-text text-center text-lg font-bold text-transparent sm:text-4xl"
                  >
                     Daily Health Data Update
                    
                     <br />
                    
                  </Dialog.Title>

                    <Dialog.Description>
                        <div>
                            <form onSubmit={handleSubmit} className="mt-14">
                                <div className="relative z-0 mb-6 w-full"> 
                                    <select id="sleepduration" 
                                        onChange={e => setForm({...form, singlevalue: e.target.value})} 
                                        value={form.singlevalue}
                                        className="mt-10 block w-full appearance-none border-0 border-b-2 border-gray-200 px-2 pb-2 pt-3 font-sans focus:border-indigo-600 focus:outline-none focus:ring-0 text-sm">
                                        <option defaultValue="true"></option>
                                        <option value="less than 4 hour">less than 4 hour</option>
                                        <option value="less than 6 hour">less than 6 hour</option>
                                        <option value="for 7 hours">for 7 hours</option>
                                        <option value="for 8 hours">for 8 hours</option>
                                        <option value="more than 8 hours">more than 8 hours</option>
                                    </select>                                     
                                </div>

                                
                                
                                <div className="mt-10">
                                    <button
                                        className="mx-auto flex h-[46px] w-full rounded-md items-center justify-center space-x-2  border bg-gray-50 p-2 text-gray-500 transition-colors hover:border-yellow-400 hover:bg-yellow-700 hover:text-black hover:font-bold focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                                        
                                    >
                                    
                                    <span>
                                            Submit
                                    </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                  </Dialog.Description>
             

                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    </>
  );
}

export function UpdateSleepQuality(props: any) {
    const show = props.show;
    const onClose = props.onClose;
    const { healthId, fieldName, value } = props?.data[0];
    
    // const healthId = props.healthId;
    const [messagequality, setQualityMessage] = useState('');
    const [form, setForm] = useState({
        singlevalue: ''
      });

      let [char, setChar] = useState({});
      // Retrieving data from local storage
  
      useEffect(() => {
        if (typeof window !== 'undefined') {
          const myValueString = localStorage.getItem('myKey');
          if(myValueString !== null) {
            char = JSON.parse(myValueString);
          }
          setChar(char);
        }
      });

    const { data: session } = useSession();
    const user = session?.user;
    
    const handleSubmit = async(e:any) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('form',form)
        try {
            const res = await axios.post('/api/updatehealthdata/one', 
            {
                healthId: healthId,
                field: fieldName,
                value: form.singlevalue                     
                
            })
            console.log('success', res.data);
            setQualityMessage('Nice work!!!, you have updated your current sleep quality data Successfully.')
            } catch(error){
                console.log("error", error);
            }
    };

    const closeModal = () => {
        if (typeof onClose === "function") {
        onClose();
        }
    };

    useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, singlevalue: value }));
    }, [value]);

  return (
    <>    
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative my-8 inline-block w-full max-w-2xl transform  overflow-hidden  bg-gray-200 text-left align-middle shadow-xl transition-all sm:rounded-md">
              {/* Close icon */}
              <button
                onClick={()=>closeModal}
                className="absolute right-2 top-2 shrink-0 rounded-md p-1 transition hover:bg-gray-100 focus:outline-none"
              >
                {/* <XIcon className="w-5 h-5" /> */}
              </button>

              <div className="py-12">
                <div className="px-4 sm:px-12">
                <Dialog.Title
                    as="h3"                    
                  >
                      <div className="flex gap-3 text-lg mt-3">
                        <img src={(char as any)?.image} className="h-10 w-10 rounded-full" alt="" />
                        {messagequality !== '' ?<p className="text-green-900 font-thin">{messagequality}</p>: 
                        <p className="text-gray-900 font-thin">hey there, go on update your daily health data</p>}
                      </div>
                    
                     <br />
                    
                  </Dialog.Title>
                  <Dialog.Title
                    as="h3"
                    className="mt-2 bg-gradient-to-r from-orange-500  to-pink-500 bg-clip-text text-center text-lg font-bold text-transparent sm:text-4xl"
                  >
                     Daily Health Data Update
                    
                     <br />
                    
                  </Dialog.Title>
                    <Dialog.Description>
                        <div>
                            <form onSubmit={handleSubmit} className="mt-14">
                                <div className="relative z-0 mb-6 w-full"> 
                                    <select id="sleepduration" 
                                        onChange={e => setForm({...form, singlevalue: e.target.value})} 
                                        value={form.singlevalue}
                                        className="mt-10 block w-full appearance-none border-0 border-b-2 border-gray-200 px-2 pb-2 pt-3 font-sans focus:border-indigo-600 focus:outline-none focus:ring-0 text-sm">
                                        <option defaultValue="true"></option>
                                        <option value="Very Slight Sleep">Very Slight Sleep</option>
                                        <option value="Slightly Deeper Sleep">Slightly Deeper Sleep</option>
                                        <option value="Deep Sleep">Deep Sleep</option>
                                        <option value="Rapid Eye Movement Sleep">Rapid Eye Movement Sleep</option> 
                                    </select>                                     
                                </div>

                                
                                
                                <div className="mt-10">
                                    <button
                                        className="mx-auto flex h-[46px] w-full rounded-md items-center justify-center space-x-2  border bg-gray-50 p-2 text-gray-500 transition-colors hover:border-yellow-400 hover:bg-yellow-700 hover:text-black hover:font-bold focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                                        
                                    >
                                    
                                    <span>
                                            Submit
                                    </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                  </Dialog.Description>
             

                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    </>
  );
}

export function UpdateNutrition(props: any) {
    const show = props.show;
    const onClose = props.onClose;
    const { healthId, fieldName, value } = props?.data[0];
    
    // const healthId = props.healthId;
    const [messagenutrition, setNutritionMessage] = useState('');
    const [form, setForm] = useState({
        singlevalue: ''
      });

    const [selectedBreakfast, setSelectedBreakfast] = useState(breakfasts[0])
    const [selectedLunch, setSelectedLunch] = useState(lunchs[0])
    const [selectedDinner, setSelectedDinner] = useState(dinners[0])
    const [selectedSnack, setSelectedSnack] = useState(snacks[0])
    const [selectedBeverage, setSelectedBeverage] = useState(beverages[0])
    let [char, setChar] = useState({});
    // Retrieving data from local storage

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const myValueString = localStorage.getItem('myKey');
        if(myValueString !== null){
         char = JSON.parse(myValueString);
        }
        setChar(char);
      }
    });

    const { data: session } = useSession();
    const user = session?.user;
    
    const handleSubmit = async(e:any) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('form',form)
        try {
            const res = await axios.post('/api/updatehealthdata/one', 
            {
                healthId: healthId,
                field: fieldName,
                value: form.singlevalue                     
                
            })
            console.log('success', res.data);
            setNutritionMessage('Nice work!!!, you have updated your nutrition health data Successfully.');
            } catch(error){
                console.log("error", error);
            }
    };

    const closeModal = () => {
        if (typeof onClose === "function") {
        onClose();
        }
    };

    useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, singlevalue: value }));
    }, [value]);

  return (
    <>    
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative my-8 inline-block w-full max-w-2xl transform  overflow-hidden  bg-gray-200 text-left align-middle shadow-xl transition-all sm:rounded-md">
              {/* Close icon */}
              <button
                onClick={()=>closeModal}
                className="absolute right-2 top-2 shrink-0 rounded-md p-1 transition hover:bg-gray-100 focus:outline-none"
              >
                {/* <XIcon className="w-5 h-5" /> */}
              </button>

              <div className="py-12">
                <div className="px-4 sm:px-12">
                <Dialog.Title
                    as="h3"                    
                  >
                      <div className="flex gap-3 text-lg mt-3">
                        <img src={(char as any)?.image} className="h-10 w-10 rounded-full" alt="" />
                        {messagenutrition !== '' ?<p className="text-green-900 font-thin">{messagenutrition}</p>: 
                        <p className="text-gray-900 font-thin">hey there, go on update your daily health data</p>}
                      </div>
                    
                     <br />
                    
                  </Dialog.Title>
                  <Dialog.Title
                    as="h3"
                    className="mt-2 bg-gradient-to-r from-orange-500  to-pink-500 bg-clip-text text-center text-lg font-bold text-transparent sm:text-4xl"
                  >
                     Daily Health Data Update
                    
                     <br />
                    
                  </Dialog.Title>

                    <Dialog.Description>
                        <div>
                            <form onSubmit={handleSubmit} className="mt-14">
                                <div className="z-10 mb-6 w-full">
                        <div
                          className="text-base text-gray-500 duration-200 transform capitalize"
                        >
                          Frequent Foods you eat for breakfast?
                        </div>
                        <div className="static z-10">
                            <Listbox value={selectedBreakfast} onChange={setSelectedBreakfast}>
                              <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                  <span className="block truncate text-black">{selectedBreakfast?.name}</span>
                          
                                </Listbox.Button>
                                <Transition
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {breakfasts.map((breakfast, personIdx) => (
                                      <Listbox.Option
                                        key={personIdx}
                                        className={({ active }) =>
                                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                          }`
                                        }
                                        value={breakfast}
                                      >
                                        {({ selected }) => (
                                          <>
                                            <span
                                              className={`block truncate ${
                                                selected ? 'font-medium' : 'font-normal'
                                              }`}
                                            >
                                              {breakfast.name}
                                            </span>
                                            {selectedBreakfast ? (
                                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </Listbox>
                        </div>     
                                </div>

                                <div className="z-10 mb-6 w-full">
                                    <div
                                      className="text-base text-gray-500 duration-200 transform capitalize"
                                    >
                                      Frequent Foods you eat for lunch?
                                    </div>
                                    <div className="static z-10">
                                        <Listbox value={selectedLunch} onChange={setSelectedLunch}>
                                          <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                              <span className="block truncate text-black">{selectedLunch?.name}</span>
                                      
                                            </Listbox.Button>
                                            <Transition
                                              as={Fragment}
                                              leave="transition ease-in duration-100"
                                              leaveFrom="opacity-100"
                                              leaveTo="opacity-0"
                                            >
                                              <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {lunchs.map((lunch, personIdx) => (
                                                  <Listbox.Option
                                                    key={personIdx}
                                                    className={({ active }) =>
                                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                      }`
                                                    }
                                                    value={lunch}
                                                  >
                                                    {({ selected }) => (
                                                      <>
                                                        <span
                                                          className={`block truncate ${
                                                            selected ? 'font-medium' : 'font-normal'
                                                          }`}
                                                        >
                                                          {lunch.name}
                                                        </span>
                                                        {selectedLunch ? (
                                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                          </span>
                                                        ) : null}
                                                      </>
                                                    )}
                                                  </Listbox.Option>
                                                ))}
                                              </Listbox.Options>
                                            </Transition>
                                          </div>
                                        </Listbox>
                                    </div>     
                                </div>

                                <div className="z-10 mb-6 w-full">
                                    <div
                                      className="text-base text-gray-500 duration-200 transform capitalize"
                                    >
                                      Frequent Foods you eat for dinner?
                                    </div>

                                    <div className="static z-10">
                                        <Listbox value={selectedDinner} onChange={setSelectedDinner}>
                                          <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                              <span className="block truncate text-black">{selectedDinner?.name}</span>
                                      
                                            </Listbox.Button>
                                            <Transition
                                              as={Fragment}
                                              leave="transition ease-in duration-100"
                                              leaveFrom="opacity-100"
                                              leaveTo="opacity-0"
                                            >
                                              <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {dinners.map((dinner, personIdx) => (
                                                  <Listbox.Option
                                                    key={personIdx}
                                                    className={({ active }) =>
                                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                      }`
                                                    }
                                                    value={dinner}
                                                  >
                                                    {({ selected }) => (
                                                      <>
                                                        <span
                                                          className={`block truncate ${
                                                            selected ? 'font-medium' : 'font-normal'
                                                          }`}
                                                        >
                                                          {dinner.name}
                                                        </span>
                                                        {selectedDinner ? (
                                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                          </span>
                                                        ) : null}
                                                      </>
                                                    )}
                                                  </Listbox.Option>
                                                ))}
                                              </Listbox.Options>
                                            </Transition>
                                          </div>
                                        </Listbox>
                                    </div>     
                                </div>

                                <div className="z-10 mb-6 w-full">                  
                                    <div
                                      className="text-base text-gray-500 duration-200 transform capitalize"
                                    >
                                      Your common snack food?
                                    </div>

                                    <div className="static z-10">
                                        <Listbox value={selectedSnack} onChange={setSelectedSnack}>
                                          <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                              <span className="block truncate text-black">{selectedSnack?.name}</span>
                                      
                                            </Listbox.Button>
                                            <Transition
                                              as={Fragment}
                                              leave="transition ease-in duration-100"
                                              leaveFrom="opacity-100"
                                              leaveTo="opacity-0"
                                            >
                                              <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {snacks.map((snack, personIdx) => (
                                                  <Listbox.Option
                                                    key={personIdx}
                                                    className={({ active }) =>
                                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                      }`
                                                    }
                                                    value={snack}
                                                  >
                                                    {({ selected }) => (
                                                      <>
                                                        <span
                                                          className={`block truncate ${
                                                            selected ? 'font-medium' : 'font-normal'
                                                          }`}
                                                        >
                                                          {snack.name}
                                                        </span>
                                                        {selectedSnack ? (
                                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                          </span>
                                                        ) : null}
                                                      </>
                                                    )}
                                                  </Listbox.Option>
                                                ))}
                                              </Listbox.Options>
                                            </Transition>
                                          </div>
                                        </Listbox>
                                    </div>     
                                </div>
                              
                                <div className="z-10 mb-6 w-full">
                                    <div
                                    className="text-base text-gray-500 duration-200 transform capitalize"
                                    >
                                    List your common beverage?
                                    </div>

                                    <div className="static z-10">
                                        <Listbox value={selectedBeverage} onChange={setSelectedBeverage}>
                                          <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                              <span className="block truncate text-black">{selectedBeverage?.name}</span>
                                      
                                            </Listbox.Button>
                                            <Transition
                                              as={Fragment}
                                              leave="transition ease-in duration-100"
                                              leaveFrom="opacity-100"
                                              leaveTo="opacity-0"
                                            >
                                              <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {beverages.map((beverage, personIdx) => (
                                                  <Listbox.Option
                                                    key={personIdx}
                                                    className={({ active }) =>
                                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                      }`
                                                    }
                                                    value={beverage}
                                                  >
                                                    {({ selected }) => (
                                                      <>
                                                        <span
                                                          className={`block truncate ${
                                                            selected ? 'font-medium' : 'font-normal'
                                                          }`}
                                                        >
                                                          {beverage.name}
                                                        </span>
                                                        {selectedBeverage ? (
                                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                          </span>
                                                        ) : null}
                                                      </>
                                                    )}
                                                  </Listbox.Option>
                                                ))}
                                              </Listbox.Options>
                                            </Transition>
                                          </div>
                                        </Listbox>
                                    </div>     
                                </div>
                               
                                
                                <div className="mt-10">
                                    <button
                                        className="mx-auto flex h-[46px] w-full rounded-md items-center justify-center space-x-2  border bg-gray-50 p-2 text-gray-500 transition-colors hover:border-yellow-400 hover:bg-yellow-700 hover:text-black hover:font-bold focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                                        
                                    >
                                    
                                    <span>
                                            Submit
                                    </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                  </Dialog.Description>
             

                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    </>
  );
}

export function UpdateDailyData(props: any) {
    const show = props.show;
    const onClose = props.onClose;
    const { healthId, steps, distance, activeminutes, calories } = props?.data;
   
    // const healthId = props.healthId;
    const [messagedaily, setDailyMessage] = useState('');
    const [form, setForm] = useState({
      steps: '', 
      distance: '', 
      activeminutes: '', 
      calories: ''
    });

    const [selectedStep, setSelectedStep] = useState(usersteps[0])
    const [selectedDistance, setSelectedDistance] = useState(userdistance[0])
    const [selectedMinute, setSelectedMinute] = useState(userminute[0])
    const [selectedCalory, setSelectedCalory] = useState(usercalories[0])
    let [char, setChar] = useState({});
    // Retrieving data from local storage

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const myValueString = localStorage.getItem('myKey');
        if(myValueString !== null){
          char = JSON.parse(myValueString);
        }
        setChar(char);
      }
    });
    const { data: session } = useSession();
    const user = session?.user;
    
    const handleSubmit = async(e:any) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('form',form)
        try {
            const res = await axios.post('/api/updatehealthdata/two', 
            {
              healthId: healthId,
              steps: selectedStep?.name, 
              distance: selectedDistance?.name, 
              activeminutes: selectedMinute?.name,
              calories: selectedCalory?.name                   
                
            })
            console.log('success', res.data);
            setDailyMessage('Nice work!!!, you have updated your daily health data Successfully.');
            } catch(error){
                console.log("error", error);
            }
    };

    const closeModal = () => {
        if (typeof onClose === "function") {
        onClose();
        }
    };

    useEffect(() => {
      setForm({
        steps,
        distance,
        activeminutes,
        calories
      });
    }, [props.data]);

  return (
    <>    
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative my-8 inline-block w-full max-w-2xl transform  overflow-hidden  bg-gray-200 text-left align-middle shadow-xl transition-all sm:rounded-md">
              {/* Close icon */}
              <button
                onClick={()=>closeModal}
                className="absolute right-2 top-2 shrink-0 rounded-md p-1 transition hover:bg-gray-100 focus:outline-none"
              >
                {/* <XIcon className="w-5 h-5" /> */}
              </button>

              <div className="py-12">
                <div className="px-4 sm:px-12">
                <Dialog.Title
                    as="h3"                    
                  >
                      <div className="flex gap-3 text-lg mt-3">
                        <img src={(char as any)?.image} className="h-10 w-10 rounded-full" alt="" />
                        {messagedaily !== '' ?<p className="text-green-900 font-thin">{messagedaily}</p>: 
                        <p className="text-gray-900 font-thin">hey there, go on update your daily health data</p>}
                      </div>
                    
                     <br />
                    
                  </Dialog.Title>
                  <Dialog.Title
                    as="h3"
                    className="mt-2 bg-gradient-to-r from-orange-500  to-pink-500 bg-clip-text text-center text-lg font-bold text-transparent sm:text-4xl"
                  >
                     Daily Health Data Update
                    
                     <br />
                    
                  </Dialog.Title>

                    <Dialog.Description>
                        <div>
                            <form onSubmit={handleSubmit} className="">
                                {/* <div>
                                <label className="font-bold">Steps</label>
                                <input
                                type="text"
                                onChange={e => setForm({...form, steps: e.target.value})} 
                                value={form.steps}
                                className="p-4 mt-2 w-full rounded-full"/>

                                <label className="font-bold">Distance</label>
                                <input
                                type="text"
                                onChange={e => setForm({...form, distance: e.target.value})} 
                                value={form.distance}
                                className="p-4 mt-2 w-full rounded-full"/>

                                <label className="font-bold">Active Minutes</label>
                                <input
                                type="text"
                                onChange={e => setForm({...form, activeminutes: e.target.value})} 
                                value={form.activeminutes}
                                className="p-4 mt-2 w-full rounded-full"/>
                               
                                <label className="font-bold">Calories</label>
                                <input
                                type="text"
                                onChange={e => setForm({...form, calories: e.target.value})} 
                                value={form.calories}
                                className="p-4 mt-2 w-full rounded-full"/>
                                </div> */}

                <div className="z-10 mb-6 w-full">
                    <div
                      className="text-base text-gray-600 mb-5 duration-200 transform capitalize"
                    >
                      What is your daily traveled distance?
                    </div>
                    <div className="static z-10">
                        <Listbox value={selectedDistance} onChange={setSelectedDistance}>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block truncate text-black">{selectedDistance?.name}</span>
                      
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {userdistance.map((distance, personIdx) => (
                                  <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                      }`
                                    }
                                    value={distance}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected ? 'font-medium' : 'font-normal'
                                          }`}
                                        >
                                          {distance.name}
                                        </span>
                                        {selectedStep ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                    </div>       
                    
                </div>

                <div className="z-10 mb-6 w-full">                   
                    <div
                      className="text-base text-gray-600 mb-5 duration-200 transform capitalize"
                    >
                      How many steps you make daily?
                    </div>

                    <div className="static z-10">
                        <Listbox value={selectedStep} onChange={setSelectedStep}>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block truncate text-black">{selectedStep?.name}</span>
                      
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {usersteps.map((step, personIdx) => (
                                  <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                      }`
                                    }
                                    value={step}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected ? 'font-medium' : 'font-normal'
                                          }`}
                                        >
                                          {step.name}
                                        </span>
                                        {selectedStep ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                    </div>                      
                </div>

                <div className="z-10 mb-6 w-full">
                    <div
                      className="text-base text-gray-500 duration-200 transform capitalize"
                    >
                      Daily Active Minutes?
                    </div>
                    <div className="static z-10">
                        <Listbox value={selectedMinute} onChange={setSelectedMinute}>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block truncate text-black">{selectedMinute?.name}</span>
                      
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {userminute.map((minute, personIdx) => (
                                  <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                      }`
                                    }
                                    value={minute}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected ? 'font-medium' : 'font-normal'
                                          }`}
                                        >
                                          {minute.name}
                                        </span>
                                        {selectedMinute ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                    </div>
                    
                </div>

                <div className="z-10 mb-6 w-full">                  
                    <div
                      className="text-base text-gray-500 duration-200 transform capitalize"
                    >
                      How many Claories you burn daily?
                    </div>
                    <div className="static z-10">
                        <Listbox value={selectedCalory} onChange={setSelectedCalory}>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block truncate text-black">{selectedCalory?.name}</span>
                      
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {usercalories.map((calory, personIdx) => (
                                  <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                      }`
                                    }
                                    value={calory}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected ? 'font-medium' : 'font-normal'
                                          }`}
                                        >
                                          {calory.name}
                                        </span>
                                        {selectedCalory ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                    </div>
                </div>

                                
                                <div className="mt-10">
                                    <button
                                        className="mx-auto flex h-[46px] w-full rounded-md items-center justify-center space-x-2  border bg-gray-50 p-2 text-gray-500 transition-colors hover:border-yellow-400 hover:bg-yellow-700 hover:text-black hover:font-bold focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                                    >
                                    
                                    <span>
                                            Submit
                                    </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                  </Dialog.Description>
             

                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    </>
  );
}

export function UpdateGoal(props: any) {
    const show = props.show;
    const onClose = props.onClose;
    const {healthId, fieldName} = props?.data[0];
    
    // const healthId = props.healthId;
    const [messagegoal, setGoalMessage] = useState('');
 
    const [selectedGoal, setSelectedGoal] = useState(goals[0])
    let [char, setChar] = useState({});
    // Retrieving data from local storage

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const myValueString = localStorage.getItem('myKey');
        if(myValueString !== null){
          char = JSON.parse(myValueString);
        }
        setChar(char);
      }
    });
    const { data: session } = useSession();
    const user = session?.user;
    
    const handleSubmit = async(e:any) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/updatehealthdata/one', 
            {
                healthId: healthId,
                field: fieldName,
                value: selectedGoal?.name
            })
            console.log('success', res.data);
            setGoalMessage('Nice work!!!, you have updated your goal Successfully.');
            } catch(error){
                console.log("error", error);
            }
    };

    const closeModal = () => {
        if (typeof onClose === "function") {
        onClose();
        }
    };

       
  return (
    <>    
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative my-8 inline-block w-full max-w-2xl transform  overflow-hidden  bg-gray-200 text-left align-middle shadow-xl transition-all sm:rounded-md">
              {/* Close icon */}
              <button
                onClick={()=>closeModal}
                className="absolute right-2 top-2 shrink-0 rounded-md p-1 transition hover:bg-gray-100 focus:outline-none"
              >
                {/* <XIcon className="w-5 h-5" /> */}
              </button>

              <div className="py-12">
                <div className="px-4 sm:px-12">
                <Dialog.Title
                    as="h3"                    
                  >
                      <div className="flex gap-3 text-lg mt-3">
                        <img src={(char as any)?.image} className="h-10 w-10 rounded-full" alt="" />
                        {messagegoal !== '' ?<p className="text-green-900 font-thin">{messagegoal}</p>: 
                        <p className="text-gray-900 font-thin">hey there, go on update your daily health data</p>}
                      </div>
                    
                     <br />
                    
                  </Dialog.Title>
                  <Dialog.Title
                    as="h3"
                    className="mt-2 bg-gradient-to-r from-orange-500  to-pink-500 bg-clip-text text-center text-lg font-bold text-transparent sm:text-4xl"
                  >
                     Daily Health Data Update
                    
                     <br />
                    
                  </Dialog.Title>

                    <Dialog.Description>
                        <div>
                            <form onSubmit={handleSubmit} className="">
                            <div className="relative z-0 mb-6 mt-8 w-full">                         
                            <div
                            className="text-base text-gray-500 duration-200 transform capitalize"
                            >
                            What is your daily goal to improve your health?
                            </div>
                            
                            <div className="static z-10">
                              <Listbox value={selectedGoal} onChange={setSelectedGoal}>
                                <div className="relative mt-1">
                                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate text-black">{selectedGoal?.name}</span>
                            
                                  </Listbox.Button>
                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {goals.map((goal, personIdx) => (
                                        <Listbox.Option
                                          key={personIdx}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                              active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                          }
                                          value={goal}
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected ? 'font-medium' : 'font-normal'
                                                }`}
                                              >
                                                {goal.name}
                                              </span>
                                              {selectedGoal ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                            </div>     

                        </div>

                                
                                <div className="mt-10">
                                    <button
                                        className="mx-auto flex h-[46px] w-full rounded-md items-center justify-center space-x-2  border bg-gray-50 p-2 text-gray-500 transition-colors hover:border-yellow-400 hover:bg-yellow-700 hover:text-black hover:font-bold focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                                    >
                                    
                                    <span>
                                            Submit
                                    </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                  </Dialog.Description>
             

                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    </>
  );
}

export function UpdateMood(props: any) {
  const show = props.show;
  const onClose = props.onClose;
  const {healthId, fieldName} = props?.data[0];
  
  // const healthId = props.healthId;
  const [messagemood, setMoodMessage] = useState('');

  const [selectedMood, setSelectedMood] = useState(moods[0])
  let [char, setChar] = useState({});
    // Retrieving data from local storage

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const myValueString = localStorage.getItem('myKey');
        if(myValueString !== null){
          char = JSON.parse(myValueString);
        }
        setChar(char);
      }
    });

  const { data: session } = useSession();
  const user = session?.user;
  
  const handleSubmit = async(e:any) => {
      e.preventDefault();
      try {
          const res = await axios.post('/api/updatehealthdata/one', 
          {
              healthId: healthId,
              field: fieldName,
              value: selectedMood?.name
          })
          console.log('success', res.data);
          setMoodMessage('Nice work!!!, you have updated your current mood Successfully.')
          } catch(error){
              console.log("error", error);
          }
  };

  const closeModal = () => {
      if (typeof onClose === "function") {
      onClose();
      }
  };

     
return (
  <>    
  <Transition appear show={show} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 z-50 overflow-y-auto"
      onClose={closeModal}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

      <div className="min-h-screen text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0" />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="inline-block h-screen align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative my-8 inline-block w-full max-w-2xl transform  overflow-hidden  bg-gray-200 text-left align-middle shadow-xl transition-all sm:rounded-md">
            {/* Close icon */}
            <button
              onClick={()=>closeModal}
              className="absolute right-2 top-2 shrink-0 rounded-md p-1 transition hover:bg-gray-100 focus:outline-none"
            >
              {/* <XIcon className="w-5 h-5" /> */}
            </button>

            <div className="py-12">
              <div className="px-4 sm:px-12">
              <Dialog.Title
                    as="h3"                    
                  >
                      <div className="flex gap-3 text-lg mt-3">
                        <img src={(char as any)?.image} className="h-10 w-10 rounded-full" alt="" />
                        {messagemood !== '' ?<p className="text-green-900 font-thin">{messagemood}</p>: 
                        <p className="text-gray-900 font-thin">hey there, go on update your daily health data</p>}
                      </div>
                    
                     <br />
                    
                  </Dialog.Title>
                  <Dialog.Title
                    as="h3"
                    className="mt-2 bg-gradient-to-r from-orange-500  to-pink-500 bg-clip-text text-center text-lg font-bold text-transparent sm:text-4xl"
                  >
                     Daily Health Data Update
                    
                     <br />
                    
                  </Dialog.Title>

                  <Dialog.Description>
                      <div>
                          <form onSubmit={handleSubmit} className="">
                            <div className="relative z-0 mb-6 w-full">
                            <div
                              className="text-base text-gray-500 duration-200 transform capitalize"
                            >
                              what is your mood like today?
                            
                              <Listbox value={selectedMood} onChange={setSelectedMood}>
                                <div className="relative mt-1">
                                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate text-black">{selectedMood?.name}</span>
                            
                                  </Listbox.Button>
                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {moods.map((mood, personIdx) => (
                                        <Listbox.Option
                                          key={personIdx}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                              active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                          }
                                          value={mood}
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected ? 'font-medium' : 'font-normal'
                                                }`}
                                              >
                                                {mood.name}
                                              </span>
                                              {selectedMood ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                            </div>  
                            </div>  

                              
                              <div className="mt-10">
                                  <button
                                      className="mx-auto flex h-[46px] w-full rounded-md items-center justify-center space-x-2  border bg-gray-50 p-2 text-gray-500 transition-colors hover:border-yellow-400 hover:bg-yellow-700 hover:text-black hover:font-bold focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                                  >
                                  
                                  <span>
                                          Submit
                                  </span>
                                  </button>
                              </div>
                          </form>
                      </div>
                </Dialog.Description>
           

              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
  </>
);
}

export function UpdateBiometric(props: any) {
    const show = props.show;
    const onClose = props.onClose;
    const { 
        healthId, 
        glucose,
        cholesterol,
        hemoglobin,
        carbohydrate,
        protiens,
        fats,
        ecg,
        vitamins,
        minerals} = props?.data[0];
    
    // const healthId = props.healthId;
    const [messagebio, setBioMessage] = useState('');
    const [form, setForm] = useState({
        glucose: ''    ,
        cholesterol: '',
        hemoglobin: '',
        carbohydrate: '',
        protiens: '',
        fats: '',
        ecg: '',
        vitamins: '',
        minerals: '',
    });
    let [char, setChar] = useState({});
    // Retrieving data from local storage

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const myValueString = localStorage.getItem('myKey');
        if(myValueString !== null){
          char = JSON.parse(myValueString);
        }
        setChar(char);
      }
    });

    const { data: session } = useSession();
    const user = session?.user;
    
    const handleSubmit = async(e:any) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('form',form)
        try {
            const res = await axios.post('/api/updatehealthdata/three', 
            {
                healthId: healthId,
                glucose: form.glucose     ,
                cholesterol: form.cholesterol  ,
                hemoglobin: form.hemoglobin   ,
                carbohydrate: form.carbohydrate ,
                protiens: form.protiens     ,
                fats: form.fats         ,
                ecg: form.ecg          ,
                vitamins: form.vitamins     ,
                minerals: form.minerals     ,                
                
            })
            console.log('success', res.data);
            setBioMessage('Nice work!!!, you have updated your biometric health data Successfully.');
            } catch(error){
                console.log("error", error);
            }
    };

    const closeModal = () => {
        if (typeof onClose === "function") {
        onClose();
        }
    };

    useEffect(() => {
      setForm({
        glucose,
        cholesterol,
        hemoglobin,
        carbohydrate,
        protiens,
        fats,
        ecg,
        vitamins,
        minerals
      });
    }, [props.data]);

  return (
    <>    
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative my-8 inline-block w-full max-w-2xl transform  overflow-hidden  bg-gray-200 text-left align-middle shadow-xl transition-all sm:rounded-md">
              {/* Close icon */}
              <button
                onClick={()=>closeModal}
                className="absolute right-2 top-2 shrink-0 rounded-md p-1 transition hover:bg-gray-100 focus:outline-none"
              >
                {/* <XIcon className="w-5 h-5" /> */}
              </button>

              <div className="py-12">
                <div className="px-4 sm:px-12">
                <Dialog.Title
                    as="h3"                    
                  >
                      <div className="flex gap-3 text-lg mt-3">
                        <img src={(char as any)?.image} className="h-10 w-10 rounded-full" alt="" />
                        {messagebio !== '' ?<p className="text-green-900 font-thin">{messagebio}</p>: 
                        <p className="text-gray-900 font-thin">hey there, go on update your daily health data</p>}
                      </div>
                    
                     <br />
                    
                  </Dialog.Title>
                  <Dialog.Title
                    as="h3"
                    className="mt-2 bg-gradient-to-r from-orange-500  to-pink-500 bg-clip-text text-center text-lg font-bold text-transparent sm:text-4xl"
                  >
                     Daily Health Data Update
                    
                     <br />
                    
                  </Dialog.Title>

                    <Dialog.Description>
                        <div>
                            <form onSubmit={handleSubmit} className="">
                                <div className="flex gap-1">
                                    <div>
                                        <label className="font-bold">Glucose</label>
                                        <input
                                        type="text"
                                        onChange={e => setForm({...form, glucose: e.target.value})} 
                                        value={form.glucose}
                                        className="p-4 mt-2 w-full rounded-full"/>
                                        <label className="font-bold">Cholesterol</label>
                                        <input
                                        type="text"
                                        onChange={e => setForm({...form, cholesterol: e.target.value})} 
                                        value={form.cholesterol}
                                        className="p-4 mt-2 w-full rounded-full"/>
                                        <label className="font-bold">Hemoglobin</label>
                                        <input
                                        type="text"
                                        onChange={e => setForm({...form, hemoglobin: e.target.value})} 
                                        value={form.hemoglobin}
                                        className="p-4 mt-2 w-full rounded-full"/>
                                        <label className="font-bold">Carbohydrate</label>
                                        <input
                                        type="text"
                                        onChange={e => setForm({...form, carbohydrate: e.target.value})} 
                                        value={form.carbohydrate}
                                        className="p-4 mt-2 w-full rounded-full"/>
                                        <label className="font-bold">Protiens</label>
                                        <input
                                        type="text"
                                        onChange={e => setForm({...form, protiens: e.target.value})} 
                                        value={form.protiens}
                                        className="p-4 mt-2 w-full rounded-full"/>
                                    </div>

                                    <div>
                                        <label className="font-bold">Fats</label>
                                        <input
                                        type="text"
                                        onChange={e => setForm({...form, fats: e.target.value})} 
                                        value={form.fats}
                                        className="p-4 mt-2 w-full rounded-full"/>
                                        <label className="font-bold">ECG</label>
                                        <input
                                        type="text"
                                        onChange={e => setForm({...form, ecg: e.target.value})} 
                                        value={form.ecg}
                                        className="p-4 mt-2 w-full rounded-full"/>
                                        <label className="font-bold">Vitamins</label>
                                        <input
                                        type="text"
                                        onChange={e => setForm({...form, vitamins: e.target.value})} 
                                        value={form.vitamins}
                                        className="p-4 mt-2 w-full rounded-full"/>
                                        <label className="font-bold">Minerals</label>
                                        <input
                                        type="text"
                                        onChange={e => setForm({...form, minerals: e.target.value})} 
                                        value={form.minerals}
                                        className="p-4 mt-2 w-full rounded-full"/>
                                    </div>
                                </div>
                                
                                <div className="mt-10">
                                    <button
                                        className="mx-auto flex h-[46px] w-full rounded-md items-center justify-center space-x-2  border bg-gray-50 p-2 text-gray-500 transition-colors hover:border-yellow-400 hover:bg-yellow-700 hover:text-black hover:font-bold focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                                    >
                                    
                                    <span>
                                            Submit
                                    </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                  </Dialog.Description>
             

                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    </>
  );
}