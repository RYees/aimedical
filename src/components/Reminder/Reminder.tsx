import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import AddReminder from '~/components/Reminder/AddReminder';
import Table from './Table';
import { useRouter } from 'next/router';
import AiReminder from '~/components/AInotification/AiReminder';
import AuthModal from '../helper/AuthModal';
import { useSession } from "next-auth/react"

const Reminder = (props:any) => {
  const router = useRouter();
  const reminders = props.reminders
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);
  const [isTableOpen, setTableOpen] = useState(true);
  const { data: session, status } = useSession();
  const user = session?.user;

  const changeState = () => {
    if (reminders !== undefined) {
      if (reminders.length === 0) {
        setIsAddReminderOpen(true);
      }
    }
  }

  useEffect(() => {
    changeState()
  }, [reminders]);

  const handleToggleAddReminder = () => {
    setIsAddReminderOpen((prevIsOpen) => !prevIsOpen);
    setTableOpen((prevIsOpen) => !prevIsOpen);
  };

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      {reminders === undefined && !user && (
        <div className='text-center my-auto text-[#f4f4f5] mt-20+++++'>
          <AuthModal show={showModal} onClose={closeModal as (() => null)} />
        </div>
      )}
      
      {reminders !== undefined && user ?
          (
            <div>      
              <div className=" flex justify-end rounded-lg text-sm my-1">
                {!isAddReminderOpen && (
                  <button className="bg-[#16151a] cursor-pointer text-[#f4f4f5] font-abc hover:filter hover:brightness-110 px-4 m-5 p-2 rounded-full" 
                  onClick={handleToggleAddReminder}>
                    Set Reminder
                  </button>
                )}

                {isAddReminderOpen && (
                  // <Link href="/setreminder">
                    <button className="bg-[#16151a] cursor-pointer text-[#f4f4f5] m-5 font-abc hover:filter hover:brightness-110 px-4 p-2 rounded-full" 
                    onClick={handleToggleAddReminder}>
                      Close Reminder
                    </button>          
                )}
              </div>
              <AiReminder />
              {!isAddReminderOpen && <Table reminders={reminders}/>}
              {isAddReminderOpen && <AddReminder />}
          </div>
          )
        : (
          <div className='font-abc text-gray-400 text-center mt-10'>You don't have any data yet, set reminder if you had any.</div>
        )
      }
    </>
  );
};

export default Reminder;