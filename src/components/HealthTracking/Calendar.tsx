import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import { Fragment, useEffect, useState } from 'react'
import { PrismaClient } from "@prisma/client";
import { useSession } from 'next-auth/react'
import axios from 'axios'

const meetings = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-05-11T13:00',
    endDatetime: '2022-05-11T14:30',
  },
  {
    id: 2,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-05-20T09:00',
    endDatetime: '2022-05-20T11:30',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-05-20T17:00',
    endDatetime: '2022-05-20T18:30',
  },
  {
    id: 4,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-06-09T13:00',
    endDatetime: '2022-06-09T14:30',
  },
  {
    id: 5,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-05-13T14:00',
    endDatetime: '2022-05-13T14:30',
  },
]

function classNames(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

interface Event {
  id: number;
  name: string;
  imageUrl: string;
  startDatetime: string;
  endDatetime: string;
}

export default function Calendar(props:any) {
  const { data: session } = useSession();
  const user = session?.user;
  let reminders;
  if(props.reminders !== null){
    reminders = props?.reminders?.reminders;   
  }

  //console.log("remiders", das)
  const [datedata, setData] = useState([]);
  const fetchReminder = async() => {
  const response = await axios.get(`/api/fetchreminder?id=${user?.id}`)
    //  console.log("response", user?.id)
    //  console.log("responsetaner", response?.data?.reminders)
     setData(response?.data?.reminders);
  }

  useEffect(()=> {
    const timer = setTimeout(() => {
    fetchReminder();
    },2000)
    return () => clearTimeout(timer);
  })


  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const [events, setEvents] = useState<Event[]>([]);
  useEffect(()=>{
    setEvents(meetings);
    
  },[meetings])

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })
  
  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  let selectedDayMeetings = datedata?.filter((meeting) =>
    isSameDay(parseISO((meeting as any)?.startDate), selectedDay)
  )
  // console.log("madeit", selectedDayMeetings)
  const rdays = ["Mon", "Tue", "Wed"];
  const start = parseISO("2023-09-06T00:00");
  const end = parseISO("2023-09-14T00:00");

  const daysName = "SMTWThFSa";
  const daysTitle = daysName.split(/(?=[A-Z])/); // Split the string at each uppercase letter
  const pal = "SMTW";
  const pas = pal.split(/(?=[A-Z])/); // Split the string at each uppercase letter

  const changeDaysToArray = async(days:any) => {
      const daysTitle = days.split(/(?=[A-Z])/);
      let transformedArray = await daysTitle.map((day:any) => {
        if (day === "S") {
          return "Sun";
        } else if (day === "M") {
          return "Mon";
        } else if (day === "T") {
          return "Tue";
        } else if (day === "W") {
          return "Wed";
        } else if (day === "Th") {
          return "Thu";
        } else if (day === "F") {
          return "Fri";
        } else if (day === "Sa") {
          return "Sat";
        } else {
          return day; // Keep the original value if it doesn't match any condition
        }
      });
      return transformedArray;
  }

  // useEffect(() => {
  //   const transformData = async () => {
  //     if (datedata?.length > 0) {
  //       const transformedData = await Promise.all(
  //         datedata.map(async obj => {
  //           const transformedArray = await changeDaysToArray(obj.days);
  //           obj.days = transformedArray; // Assign the transformed array directly
  //           return obj;
  //         })
  //       );
  
  //       console.log("dody", transformedData);
  //     }
  //   };
  
  //  // fetchReminder();
  //   transformData();
  // }, [datedata]); 

  // Your existing response array
//let response = [{ days: "SMWFSa" }, { days: "SMWF" }];


// (async () => {
//   // Modify the days array in the response
  
//   response = await Promise.all(datedata?.map(async obj => {
//     const transformedArray = await changeDaysToArray(obj.days);
//     obj.days = transformedArray;  // Join the array elements into a single string
//     return obj;
//   }));

//   console.log("dody",response);
// })();


  return (
    <div className="pt-16">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x 
        ">
          {/* md:divide-gray-200 */}
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-400">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 mt-10 text-xs leading-6 text-center text-gray-400">
                {daysTitle.map((day, index) =>(
                 <div key={index}>{day}</div>
                ))}
            </div>
        
            <div className="grid grid-cols-7 gap-2 mt-2 text-sm text-white">
            {days.map((day, dayIdx) => {
              const isInRange = isWithinInterval(day, { start, end });
              return(
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >   
                
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    //onClick={(e) => removeDate}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-gray-400',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-purple-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-purple-500',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'text-white hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>

                  <div className="w-1 h-1 text-white mx-auto ml-3">
                    {datedata?.some((meeting) =>
                      isSameDay(parseISO((meeting as any)?.startDate), day)
                    ) && (
                      <div className="rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"      stroke="currentColor" className="w-4 h-4 text-green-400">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* <div className="w-1 h-1 mx-auto mt-1">
                        {isInRange && rdays.includes(format(day, 'EEE')) && (
                          <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                        )}
                  </div> */}

                  {/* {datedata?.map((item,index)=>{
                    return(
                      <div className="w-1 h-1 mx-auto mt-1">
                        {isInRange && item?.days.includes(format(day, 'EEE')) && (
                          <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                        )}
                      </div>
                    )
                  })} */}
                  {/* {datedata?.map((item, index)=>(
                    mapDatedata(item,index)
                  ))} */}
                </div>
              )
            })}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-900">
              Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyy')}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayMeetings?.length > 0 ? (
                selectedDayMeetings?.map((meeting,index) => (
                  <Meeting meeting={meeting} key={index} />
                ))
              ) : (
                <p>No need to take a medicine for today.</p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}

function Meeting(props:any) {
  const meeting = props.meeting;
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(()=>{
    setEvents(meetings);
    console.log("evfe", events)
  },[meetings])

  const removeDate = (e:any) => {
      console.log("time", meeting.id)
      const indexToRemove = events.findIndex(item => item.id === meeting.id);

      if (indexToRemove !== -1) {
        events.splice(indexToRemove, 1);
      }

      console.log(events);
  }

  const editDate = (e:any) => {
      console.log("time", meeting)
      const updatedName = 'Janet Foster';
      const startDate = '2022-05-14T14:00';
      
      const itemToUpdate = events.find(item => item.id === meeting.id);

      if (itemToUpdate) {
        itemToUpdate.name = updatedName;
      }

      console.log(events);
  }


  let startDateTime = parseISO(meeting.startDate)
  let endDateTime = parseISO(meeting.endDate)

  return (
    <li className="flex items-center px-4 py-2 -ml-16 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
     <div className='bg-gray-900 p-3 mr-4 rounded-full'>
     <p className="text-white">{meeting.dosage}</p>
     </div>     
      
      <div className='flex-auto'>
        <p className="text-gray-900">{meeting.medicinename} | {meeting.days}</p>
        <p className="mt-0.5">
          <time dateTime={meeting?.startDate}>
            {format(startDateTime, 'h:mm a')}
          </time>{' '}
          -{' '}
          <time dateTime={meeting.endDate}>
            {format(endDateTime, 'h:mm a')}
          </time>
        </p>
      </div>     

      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <button onClick={(e) => editDate(e)}>
                       Edit
                    </button>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}                    
                  >
                    <button onClick={(e) => removeDate(e)}>
                      Cancel
                    </button>
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  )
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]


import { getSession } from 'next-auth/react';

export async function getServerSideProps(context:any) {
  const session = await getSession(context);
  const user = session?.user;
  

  const prisma = new PrismaClient();
  const userreminders = await prisma.user.findUnique(
    {
        where: {
            id: user?.id,
        },
        include: {
            reminders: true
        },
    }
  );
  return {
    props: {
      reminders: JSON.parse(JSON.stringify(userreminders))
    },
  };
}