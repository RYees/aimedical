import React, {useState, useEffect} from 'react'
import axios from 'axios';
import moment from 'moment';
import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react';
import { CheckIcon} from '@heroicons/react/outline'
import { ArrowRightIcon } from '@heroicons/react/outline';
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {TbArrowBigUpLinesFilled, TbArrowBigDownLinesFilled} from 'react-icons/tb'
import { divUp } from '@techstark/opencv-js';

const diet = [
    { id: 1, name: "vitamins", unavailable: false },
    { id: 2, name: "minerals", unavailable: false },
    { id: 3, name: "protiens", unavailable: false },
    { id: 4, name: "calories", unavailable: true },
  ];

const style = [
    { id: 1, name: "smoking", unavailable: false },
    { id: 2, name: "excercise", unavailable: false },
    { id: 3, name: "alcohol drinking", unavailable: false },
  ];

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

  const glucoseIntake = [
    { id: 1, name: '50-100 grams per day', unavailable: false },
    { id: 2, name: '100-150 grams per day', unavailable: false },
    { id: 3, name: '150-200 grams per day', unavailable: false },
    { id: 4, name: '200-250 grams per day', unavailable: false },
    { id: 5, name: '250-300 grams per day', unavailable: false }
  ]

  const cholestrolIntake = [
    { id: 1, name: 'Less than 200 milligrams per day', unavailable: false },
    { id: 2, name: '200-300 milligrams per day', unavailable: false },
    { id: 3, name: '300-400 milligrams per day', unavailable: false },
    { id: 4, name: '400-500 milligrams per day', unavailable: false },
    { id: 5, name: '500-600 milligrams per day', unavailable: false }
  ]

  const hemoglobinLevel = [
    { id: 1, name: 'Below normal range', unavailable: false },
    { id: 2, name: 'Normal range', unavailable: false },
    { id: 3, name: 'Slightly above normal range', unavailable: false },
    { id: 4, name: 'Moderately above normal range', unavailable: false },
    { id: 5, name: 'Significantly above normal range', unavailable: false }
  ]

  const carbohydrateIntake = [
    { id: 1, name: 'Less than 50 grams per day', unavailable: false },
    { id: 2, name: '50-100 grams per day', unavailable: false },
    { id: 3, name: '100-150 grams per day', unavailable: false },
    { id: 4, name: '150-200 grams per day', unavailable: false },
    { id: 5, name: '200-250 grams per day', unavailable: false }
  ]

  const fatIntake = [
    { id: 1, name: 'Less than 20 grams per day', unavailable: false },
    { id: 2, name: '20-40 grams per day', unavailable: false },
    { id: 3, name: '40-60 grams per day', unavailable: false },
    { id: 4, name: '60-80 grams per day', unavailable: false },
    { id: 5, name: '80-100 grams per day', unavailable: false }
  ]

  const proteinIntake = [
    { id: 1, name: 'Less than 50 grams per day', unavailable: false },
    { id: 2, name: '50-75 grams per day', unavailable: false },
    { id: 3, name: '75-100 grams per day', unavailable: false },
    { id: 4, name: '100-125 grams per day', unavailable: false },
    { id: 5, name: '125-150 grams per day', unavailable: false }
  ]

  const vitaminIntake = [
    { id: 1, name: 'Less than recommended intake', unavailable: false },
    { id: 2, name: 'Within the recommended intake range', unavailable: false },
    { id: 3, name: 'Slightly above the recommended intake range', unavailable: false },
    { id: 4, name: 'Moderately above the recommended intake range', unavailable: false },
    { id: 5, name: 'Significantly above the recommended intake range', unavailable: false }
  ]

  const mineralIntake = [
    { id: 1, name: 'Insufficient intake', unavailable: false },
    { id: 2, name: 'Below recommended intake', unavailable: false },
    { id: 3, name: 'Meeting recommended intake', unavailable: false },
    { id: 4, name: 'Above recommended intake', unavailable: false },
    { id: 5, name: 'Excessive intake', unavailable: false }
  ]

  const ecgIntake = [
    { id: 1, name: 'Normal ECG reading', unavailable: false },
    { id: 2, name: 'Abnormal ECG reading', unavailable: false },
    { id: 3, name: 'Borderline ECG reading', unavailable: false },
    { id: 4, name: 'Inconclusive ECG reading', unavailable: false },
  ]

const Form = (props:any) => {
    const data = props?.data;
    const onClose = props.onClose;
    const view = props.show;
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;
    const [medications, setMedication] = useState<string[]>([]);
    const [medinput, setMedInput] = useState('');
    // const [symptoms, setSymptom] = useState<string[]>([]);
    const [syminput, setSymInput] = useState('');
    const [lifestyle, setLifeStyle] = useState<string[]>([]);
    const [supplements, setSupplement] = useState<string[]>([]);
    const [supinput, setSupInput] = useState('');
    // const [beverages, setBeverage] = useState<string[]>([]);
    const [beverageinput, setBevInput] = useState('');
    // const [allergies, setAllergies] = useState<string[]>([]);
    const [allerinput, setAllergyInput] = useState('');
    //const [goals, setGoals] = useState<string[]>([]);
    const [goalinput, setGoalInput] = useState('');
    const [dailydiet, setDailyDiet] = useState<string[]>([]);
    const [step, setStep] = useState(1);
    const [selectedDiet, setDiet] = useState(diet[0]);
    const [selectedStyle, setStyle] = useState(style[0]);
    const [selectedStep, setSelectedStep] = useState(usersteps[0])
    const [selectedDistance, setSelectedDistance] = useState(userdistance[0])
    const [selectedMinute, setSelectedMinute] = useState(userminute[0])
    const [selectedCalory, setSelectedCalory] = useState(usercalories[0])
    const [selectedDuration, setSelectedDuration] = useState(sleepdurations[0])
    const [selectedQuality, setSelectedQuality] = useState(sleepqualities[0])
    const [selectedType, setSelectedType] = useState(excercisetype[0])
    const [selectedDailyCalory, setSelectedDailyCalory] = useState(dailycalory[0])
    const [selectedBreakfast, setSelectedBreakfast] = useState(breakfasts[0])
    const [selectedLunch, setSelectedLunch] = useState(lunchs[0])
    const [selectedDinner, setSelectedDinner] = useState(dinners[0])
    const [selectedSnack, setSelectedSnack] = useState(snacks[0])
    const [selectedBeverage, setSelectedBeverage] = useState(beverages[0])
    const [selectedMood, setSelectedMood] = useState(moods[0])
    const [selectedGoal, setSelectedGoal] = useState(goals[0])

    const [selectedGlucose, setSelectedGlucose] = useState(glucoseIntake[0])
    const [selectedCholestrol, setSelectedCholestrol] = useState(cholestrolIntake[0])
    const [selectedHemoglobin, setSelectedHemoglobin] = useState(hemoglobinLevel[0])
    const [selectedVitamin, setSelectedVitamin] = useState(vitaminIntake[0])
    const [selectedProtein, setSelectedProtein] = useState(proteinIntake[0])
    const [selectedMineral, setSelectedMineral] = useState(mineralIntake[0])
    const [selectedEcg, setSelectedEcg] = useState(ecgIntake[0])
    const [selectedFat, setSelectedFat] = useState(fatIntake[0])
    const [selectedCarbohydrate, setSelectedCarbohydrate] = useState(carbohydrateIntake[0])

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isLoading, setLoading] = useState();
    
    const [form, setForm] = useState({
        userId: user?.id,
        name: '',
        dob: '',
        gender: '',
        email: user?.email,
        phone: ''        ,
        weight: ''       ,
        height: ''       ,
        bloodpressure: '',
        pulse: ''        ,
        temperature:''  ,
        oxysaturation: '',
        bmi: ''          ,
        steps: ''       ,
        distance: ''     ,
        activeminutes: '',
        calories: ''     ,
        exercisetype: '' ,
        exeheartrate: '' ,
        sleepduration: '',
        sleepquality: '' ,
        sleepstart: ''   ,
        sleepend: ''     ,
        sleepinter: ''   ,
        dailycalorie: '' ,
        fbreakfast: ''   ,
        flunch: ''       ,
        fdinner: ''      ,
        fsnacks: ''      ,
        beverage: ''     , 
        macronutrient: '', 
        chronichcond: '' ,
        allergies: ''    ,
        symptoms: ''     , 
        hospitalize: ''  ,
        mood: ''         ,
        stress: ''       ,
        mentalsymptoms: '',
        notes: ''        ,
        glucose: ''     ,
        cholesterol: ''  ,
        hemoglobin: ''   ,
        carbohydrate: '' ,
        protiens: ''     ,
        fats: ''         ,
        sugar: ''        ,
        ecg: ''          ,
        vitamins: ''     ,
        minerals: ''     ,
        goals: ''        ,
        bloodtype: ''    ,
        famimedical: ''  ,
        vaccrecord: ''   ,
        lifeassess: ''           
    });

    useEffect(() => {
      const savedStep = localStorage.getItem("currentStep");
      console.log("Retrieved step from localStorage:", savedStep);
      if (savedStep) {
        setStep(parseInt(savedStep));
      }
    });

    const checkErrors = async () => {
      let errors: { [key: string]: string } = {};
    
      if (step === 1) {
        if (!form.name) errors.name = "Name is required";
        if (!form.dob) errors.name = "Date of birth is required";
        if (!form.gender) errors.gender = "Gender is required";
        if (!form.phone) errors.dosage = "Phone Number is required";        
      } else if (step === 2) {     
        if (!form.bmi) errors.age = "Body mass index is required";
        if (!form.weight) errors.weight = "Weight is required";
        if (!form.height) errors.type = "Height is required";
        if (!form.bloodpressure) errors.bloodpressure = "Blood pressure is required";
        if (!form.pulse) errors.pulse = "Pulse is required";          
        if (!form.temperature) errors.temperature = "Temperature is required";          
        if (!form.pulse) errors.pulse = "Pulse is required";          
        if (!form.oxysaturation) errors.oxysaturation = "Oxygen saturation is required"; 
      } else if (step === 3) { 
        if (!selectedDistance) errors.distance = "Distance is required"; 
        if (!selectedStep) errors.step = "Step is required";            
        if (!selectedMinute) errors.minute = "Active minute is required"; 
        if (!selectedCalory) errors.calories = "Calory is required";
        if (!selectedType) errors.type = "Type is required"; 
        if (!form.exeheartrate) errors.exeheartrate = "Exercise heart rate is required"; 
      } else if (step === 4) { 
        if (!selectedDuration) errors.duration = "Sleep duration is required"; 
        if (!selectedQuality) errors.quality = "Sleep quality is required";            
        if (!form.sleepstart) errors.sleepstart = "Sleep start time is required"; 
        if (!form.sleepend) errors.sleepend = "Sleep end time is required";
        if (!form.sleepinter) errors.type = "Sleep interuption is required"; 
        if (!form.exeheartrate) errors.exeheartrate = "Exercise heart rate is required"; 
      } else if (step === 5) { 
        if (!selectedDailyCalory) errors.dailycalory = "Daily calory is required"; 
        if (!selectedBreakfast) errors.breakfast = "Breakfast nutrition is required";            
        if (!selectedLunch) errors.lunch = "Lunch nutrition time is required"; 
        if (!selectedDinner) errors.dinner = "Dinner nutirition is required";
        if (!selectedSnack) errors.snack = "Snack nutirition is required";
        if (!selectedBeverage) errors.beverage = "Beverage is required"; 
        if (!selectedGoal) errors.goal = "Goal is required"; 
      } else if (step === 6) { 
        if (!form.chronichcond) errors.chronichcond = "Chronic condition is required"; 
        if (!form.hospitalize) errors.hospitalize = "Hospitalization Info is required";            
        if (!form.allergies) errors.allergies = "Allergies is required"; 
        if (!form.symptoms) errors.symptoms = "Symptoms is required";
      } else if (step === 7) { 
        if (!selectedMood) errors.mood = "Mood is required"; 
        if (!form.stress) errors.stress = "Stress is required";            
        if (!form.mentalsymptoms) errors.mentalsymptoms = "Mental Health Symptoms is required"; 
        if (!form.notes) errors.notes = "Notes is required";
      } else if (step === 8) { 
        if (!selectedGlucose) errors.glucose = "Glucose is required"; 
        if (!selectedCholestrol) errors.cholestrol = "Cholestrol is required";            
        if (!selectedHemoglobin) errors.hemoglobin = "Hemoglobin is required"; 
        if (!selectedCarbohydrate) errors.carbohydrate = "Carbohydrate is required";
        if (!selectedFat) errors.fat = "Fat is required";
        if (!selectedProtein) errors.protein = "Protein is required"; 
        if (!selectedVitamin) errors.vitamin = "Vitamin is required"; 
        if (!selectedMineral) errors.mineral = "Mineral is required"; 
      } 
      // else if (step === 9) { 
      //   if (!form.bloodtype) errors.bloodtype = "Blood type is required"; 
      //   if (!form.famimedical) errors.famimedical = "Family medical is required";            
      //   if (!form.vaccrecord) errors.vaccinationrecord = "Vaccination record is required"; 
      //   if (!form.lifeassess) errors.lifeassess = "Life Assessment is required";
      // }
        
      return errors;
  };
 
    // add medication
    const handleBeverage = (e:any) => {
      setBevInput(e.target.value);
    }

    // function AddBeverage(e:any) {
    //     e.preventDefault()
    //     // let value = e.target.value       
    //     setBeverage([
    //         ...beverages, 
    //           beverageinput
    //       ])
    //     setMedInput('');
    // }
    
    // function removeBeverage(index: number) {
    //     setBeverage(prevItems => {
    //       return [
    //         ...prevItems.slice(0, index), 
    //         ...prevItems.slice(index + 1)
    //       ]      
    //     })
    // }
    
    // add medication
    const handleInput = (e:any) => {
        setMedInput(e.target.value);
    }

    function AddMedication(e:any) {
        e.preventDefault()
        // let value = e.target.value       
        setMedication([
            ...medications, 
               medinput
          ])
        setMedInput('');
    }
    
    function removeMedication(index: number) {
        setMedication(prevItems => {
          return [
            ...prevItems.slice(0, index), 
            ...prevItems.slice(index + 1)
           ]      
        })
    }

    // add symptoms
    const handleSymptom = (e:any) => {
        setSymInput(e.target.value);
    }

    // function AddSymptoms(e:any) {
    //     e.preventDefault()
    //     //let value = e.target.value       
    //     setSymptom([
    //         ...symptoms, 
    //         syminput
    //       ]);
    //     setSymInput('');
    // }
    
    // function removeSymptoms(index: number) {
    //     setSymptom(prevItems => {
    //       return [
    //         ...prevItems.slice(0, index), 
    //         ...prevItems.slice(index + 1)
    //        ]      
    //     })
    // }
   
    // add allergies
    const handleAllergy = (e:any) => {
        setAllergyInput(e.target.value);
    }

    // function AddAllergies(e:any) {
    //     e.preventDefault()
    //     //let value = e.target.value       
    //     setAllergies([
    //         ...allergies, 
    //         allerinput
    //       ]);
    //     setAllergyInput('');
    // }
    
    // function removeAllergies(index: number) {
    //     setAllergies(prevItems => {
    //       return [
    //         ...prevItems.slice(0, index), 
    //         ...prevItems.slice(index + 1)
    //        ]      
    //     })
    // }

    // add supplements
    const handleSupple = (e:any) => {
        setSupInput(e.target.value);
    }

    function AddSupplements(e:any) {
        e.preventDefault()
        //let value = e.target.value       
        setSupplement([
            ...supplements, 
            supinput
          ]);
        setSupInput('');
    }
    
    function removeSupplements(index: number) {
        setSupplement(prevItems => {
          return [
            ...prevItems.slice(0, index), 
            ...prevItems.slice(index + 1)
           ]      
        })
    }
  
    if(data.length !== 0){
      onClose(false)
    }
   

    // add goals
    const handleGoal = (e:any) => {
        setGoalInput(e.target.value);
    }

    // function AddGoals(e:any) {
    //     e.preventDefault()
    //     //let value = e.target.value       
    //     setGoals([
    //         ...goals, 
    //         goalinput
    //       ])
    //     setGoalInput('');
    // }
    
    // function removeGoals(index: number) {
    //     setGoals(prevItems => {
    //       return [
    //         ...prevItems.slice(0, index), 
    //         ...prevItems.slice(index + 1)
    //        ]      
    //     })
    // }



    const handleSubmit = async (e:any) => {
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
        toast("Submitting information...");
        try {
        const res = await axios.post('/api/healthtracks', 
        {
          userId: user?.id,
          name: form.name,
          dob: form.dob,
          gender: form.gender,
          email: user?.email,
          phone: form.phone        ,
          weight: form.weight       ,
          height: form.height       ,
          bloodpressure: form.bloodpressure,
          pulse: form.pulse        ,
          temperature:form.temperature  ,
          oxysaturation: form.oxysaturation,
          bmi: form.bmi          ,
          steps: selectedStep?.name    ,
          distance: selectedDistance?.name  ,
          activeminutes: selectedMinute?.name,
          calories: selectedCalory?.name     ,
          exercisetype: selectedType?.name ,
          exeheartrate: form.exeheartrate ,
          sleepduration: selectedDuration?.name,
          sleepquality: selectedQuality?.name ,
          sleepstart: form.sleepstart   ,
          sleepend: form.sleepend     ,
          sleepinter: form.sleepinter  ,
          dailycalorie: selectedDailyCalory?.name ,
          fbreakfast: selectedBreakfast?.name  ,
          flunch: selectedLunch?.name,
          fdinner: selectedDinner?.name,
          fsnacks: selectedSnack?.name,
          beverage: selectedBeverage?.name,     
          chronichcond: form.chronichcond ,
          allergies: form.allergies,
          symptoms: form.symptoms, 
          hospitalize: form.hospitalize ,
          mood: selectedMood?.name,
          stress: form.stress ,
          mentalsymptoms: form.mentalsymptoms,
          notes: form.notes,
          glucose: selectedGlucose?.name,
          cholesterol: selectedCholestrol?.name  ,
          hemoglobin: selectedHemoglobin?.name   ,
          carbohydrate: selectedCarbohydrate?.name ,
          protiens: selectedProtein?.name,
          fats: selectedFat?.name,
          ecg: selectedEcg?.name,
          vitamins: selectedVitamin?.name,
          minerals: selectedMineral?.name,
          goals: selectedGoal?.name,
          bloodtype: form.bloodtype    ,
          famimedical: form.famimedical  ,
          vaccrecord: form.vaccrecord   ,
          lifeassess: form.lifeassess   ,
        })
        console.log('success', res.data);
        if(res.data){
          toast("Successfully Submitted...");
          router.push("/healthtrack")
        }
        } catch(error){
            toast("Submission Declined");
            console.log("error", error);
        }
    }

    
    const steps = [
      {
        label: "Personal Information",
        component: (           
          <div className='mt-16 rounded-xl '>
            <div className="-mt-16 mx-20">                 
              <div className="flex flex-col">   
                  <div className='my-10'>
                    <hr className='border-[#262a2d] mx-10'/>
                    <h1 className='text-5xl font-bold text-[#f4f4f5] text-center'>Personal Information</h1> 
                    <hr className='border-[#262a2d] mx-10'/>
                  </div>

        
                  <div className="relative z-0 mb-6 w-full">
                    <input
                      id="name"
                      type='text'
                      onChange={e => setForm({...form, name: e.target.value})} 
                      value={form.name}
                      className="mt-10 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-[#f4f4f5] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                    />
                    <label
                      htmlFor="phone"
                      className="-z-1 origin-0 absolute top-3 text-base text-[#f4f4f5] duration-200 transform capitalize"
                    >
                      Full Name
                    </label>
                  </div>

                  <div className="relative z-0 mb-6 w-full">
                    <label
                      htmlFor="dob"
                      className="-z-1 origin-0 absolute text-base text-[#f4f4f5] duration-200"
                    >
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      type='date'
                      onChange={e => setForm({...form, dob: e.target.value})} 
                      value={form.dob}
                      className="mt-7 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-[#f4f4f5] px-2 pb-2 pt-3 text-[#16151a] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                    />                    
                  </div>

                  <div className="relative z-0 mb-6 w-full">
                    <select id="gender" 
                        onChange={e => setForm({...form, gender: e.target.value})} 
                        className="mt-10 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm text-[#f4f4f5]">
                        <option defaultValue="true"></option>
                        <option className='text-[#16151a]' value="male">male</option>
                        <option className='text-[#16151a]' value="female">female</option>
                    </select>
                    <label
                      htmlFor="dob"
                      className="-z-1 origin-0 absolute top-3 text-base text-[#f4f4f5] duration-200 transform capitalize"
                    >
                      Gender
                    </label>
                  </div>

                  <div className="relative z-0 mb-6 w-full">
                    <input
                      id="phone"
                      type='text'
                      onChange={e => setForm({...form, phone: e.target.value})} 
                      value={form.phone}
                      className="mt-10 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 font-sans text-[#f4f4f5] focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                    />
                    <label
                      htmlFor="phone"
                      className="-z-1 origin-0 absolute top-3 text-base text-[#f4f4f5] duration-200 transform capitalize"
                    >
                      Phone
                    </label>
                  </div>                  
              </div>   
            </div>
          </div>       
        ),
      },
      {
          label: "Vital Signs Information",
          component: (
            <div className="mt-12 mx-20">           
                <div className="flex flex-col">  
                    <div className='mb-10'>
                        <hr className='border-[#262a2d] mx-10'/>
                        <h1 className='text-5xl font-bold text-[#f4f4f5] text-center'>Vital Signs Information</h1> 
                        <hr className='border-[#262a2d] mx-10'/>
                    </div> 

                    <div className="relative z-0 mb-6 w-full">
                          <input
                            id="bmi"
                            type='text'
                            onChange={e => setForm({...form, bmi: e.target.value})} 
                            value={form.bmi}
                            className="mt-10 text-[#f4f4f5] block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                          />
                          <label
                            htmlFor="dob"
                            className="-z-1 origin-0 absolute top-3 text-base text-[#f4f4f5] duration-200 transform capitalize"
                          >
                            BMI(body mass index)
                          </label>
                    </div>

                    <div className="flex space-x-4 mb-1">   
                      {/* vital signs */}   
                        <div className="relative z-0 w-full mb-6">
                          <input
                            type="text"
                            name="name"
                            placeholder=""
                            onChange={e => setForm({...form, weight: e.target.value})} 
                            value={form.weight ? form.weight : ""}
                            //value={form.weight}
                            className="mt-10 text-[#f4f4f5] text-sm block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0"
                          />
                          <label
                            htmlFor="name"
                            className="-z-1 origin-0 absolute top-3 text-base text-[#f4f4f5] duration-200 transform capitalize"
                          >
                            Weight
                          </label>
                        </div>
          
                        <div className="relative z-0 w-full">
                          <input
                            id="height"
                            type='text'
                            onChange={e => setForm({...form, height: e.target.value})} 
                            value={form.height ? form.height : ""}
                            //value={form.height}
                            className="mt-10 text-[#f4f4f5] block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                          />
                          <label
                            htmlFor="height"
                            className="-z-1 origin-0 absolute top-3 text-base text-[#f4f4f5] duration-200 transform capitalize"
                          >
                            Height
                          </label>
                        </div>  
                    </div>

                    <div className="flex space-x-4 mb-6">  
                      <div className="relative z-0 mb-6 w-full">
                        <input
                          id="bloodpressure"
                          type='text'
                          onChange={e => setForm({...form, bloodpressure: e.target.value})} 
                          value={form.bloodpressure}
                          className="mt-10 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 font-sans text-[#f4f4f5] focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                        />
                        <label
                          htmlFor="emgcontact"
                          className="-z-1 origin-0 absolute top-3 text-base text-[#f4f4f5] duration-200 transform capitalize"
                        >
                          Blood Pressure
                        </label>
                      </div>

                      <div className="relative z-0 mb-6 w-full">
                        <input
                          id="pulse"
                          type='text'
                          onChange={e => setForm({...form, pulse: e.target.value})} 
                          value={form.pulse}
                          className="mt-10 text-[#f4f4f5] block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                        />
                        <label
                          htmlFor="pulse"
                          className="-z-1 origin-0 absolute top-3 text-base text-[#f4f4f5] duration-200 transform capitalize"
                        >
                          Pluse
                        </label>
                      </div>
                    </div>

                    <div className="flex space-x-4 mb-6">  
                      <div className="relative z-0 mb-6 w-full">
                        <input
                          id="temperature"
                          type='text'
                          onChange={e => setForm({...form, temperature: e.target.value})} 
                          value={form.temperature}
                          className="mt-10 text-[#f4f4f5] block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                        />
                        <label
                          htmlFor="temperature"
                          className="-z-1 origin-0 absolute top-3 text-base text-[#f4f4f5] duration-200 transform capitalize"
                        >
                          Temperature
                        </label>
                      </div>
                      
                      <div className="relative z-0 mb-6 w-full">
                      <input
                        id="saturation"
                        type='text'
                        onChange={e => setForm({...form, oxysaturation: e.target.value})} 
                        value={form.oxysaturation}
                        className="mt-10 text-[#f4f4f5] block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                      />
                      <label
                        htmlFor="saturation"
                        className="-z-1 origin-0 absolute top-3 text-base text-[#f4f4f5] duration-200 transform capitalize"
                      >
                        Oxygen Saturation
                      </label>
                    </div>
                      
                    </div>
                </div> 
            </div>
          ),
      },
      {
        label: "Activity and Exercise",
        component: (  
              <div>
                  <div className="mt-12 mx-20">           
                    <div className="flex flex-col">  
                        <div className='mb-10'>
                            <hr className='border-[#262a2d] mx-10'/>
                            <h1 className='text-5xl font-bold text-[#f4f4f5] text-center'>Activity and Exercise</h1> 
                            <hr className='border-[#262a2d] mx-10'/>
                        </div>

                        <div className="z-10 mb-10 w-full">
                            <div
                              className="text-base text-[#f4f4f5] mb-5 duration-200 transform capitalize"
                            >
                              What is your daily traveled distance?
                            </div>
                            <div className="static z-10">
                                <Listbox value={selectedDistance} onChange={setSelectedDistance}>
                                  <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                      <span className="block truncate text-[#16151a]">{selectedDistance?.name}</span>
                              
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
                                                active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
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

                        <div className="z-10 mb-10 w-full">                   
                            <div
                              className="text-base text-[#f4f4f5] mb-5 duration-200 transform capitalize"
                            >
                              How many steps you make daily?
                            </div>

                            <div className="static z-10">
                                <Listbox value={selectedStep} onChange={setSelectedStep}>
                                  <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                      <span className="block truncate text-[#16151a]">{selectedStep?.name}</span>
                              
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
                                                active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
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

                        <div className="z-10 mb-10 w-full">
                            <div
                              className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                            >
                              Daily Active Minutes?
                            </div>
                            <div className="static z-10">
                                <Listbox value={selectedMinute} onChange={setSelectedMinute}>
                                  <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                      <span className="block truncate text-[#16151a]">{selectedMinute?.name}</span>
                              
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
                                                active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
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

                        <div className="z-10 mb-10 w-full">                  
                            <div
                              className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                            >
                              How many Calories you burn daily?
                            </div>
                            <div className="static z-10">
                                <Listbox value={selectedCalory} onChange={setSelectedCalory}>
                                  <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                      <span className="block truncate text-[#16151a]">{selectedCalory?.name}</span>
                              
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
                                                active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
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

                        <div className="z-10 mb-10 w-full">
                            <div
                              className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                            >
                              What kind of exercise you do?
                            </div>
                            <div className="static z-10">
                                <Listbox value={selectedType} onChange={setSelectedType}>
                                  <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                      <span className="block truncate text-[#16151a]">{selectedType?.name}</span>
                              
                                    </Listbox.Button>
                                    <Transition
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {excercisetype.map((type, personIdx) => (
                                          <Listbox.Option
                                            key={personIdx}
                                            className={({ active }) =>
                                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
                                              }`
                                            }
                                            value={type}
                                          >
                                            {({ selected }) => (
                                              <>
                                                <span
                                                  className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                  }`}
                                                >
                                                  {type.name}
                                                </span>
                                                {selectedType ? (
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

                        <div className="z-10 mb-10 w-full">
                            <label
                              htmlFor="exeheartrate"
                              className="top-3 text-base text-[#f4f4f5] duration-200 transform capitalize"
                            >
                              What is your health rate during exercise?
                            </label>
                            <input
                              id="exeheartrate"
                              type='text'
                              onChange={e => setForm({...form, exeheartrate: e.target.value})} 
                              value={form.exeheartrate}
                              className="mt-0 text-[#f4f4f5] block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                            />
                            
                        </div>
                    </div>
                  </div>
              </div>
        ),
      },
      {
      label: "Sleep Pattern",
      component: (                     
        <div className='mt-12 mx-20 '>
            <div className='mb-10'>
                <hr className='border-[#262a2d] mx-10'/>
                <h1 className='text-5xl font-bold text-[#f4f4f5] text-center'>Sleep Pattern</h1> 
                <hr className='border-[#262a2d] mx-10'/>
            </div>

            <div className="z-10 mb-6 w-full">
                  <div
                    className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                  >
                    Sleep duration?
                  </div>

                  <div className="static z-10">
                    <Listbox value={selectedDuration} onChange={setSelectedDuration}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedDuration?.name}</span>
                  
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {sleepdurations.map((duration, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
                                  }`
                                }
                                value={duration}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {duration.name}
                                    </span>
                                    {selectedDuration ? (
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
                    className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                  >
                    Sleep Quality?
                  </div>

                  <div className="static z-10">
                    <Listbox value={selectedQuality} onChange={setSelectedQuality}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedQuality?.name}</span>
                  
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {sleepqualities.map((quality, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
                                  }`
                                }
                                value={quality}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {quality.name}
                                    </span>
                                    {selectedQuality ? (
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

            <div className="relative z-0 mb-6 w-full">
                <input
                  id="sleep start"
                  type='time'
                  onChange={e => setForm({...form, sleepstart: e.target.value})} 
                  value={form.sleepstart}
                  className="mt-10 text-[#f4f4f5] block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-9 font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                />
                <label 
                  htmlFor="sleep start"
                  className="-z-1 origin-0 absolute top-0 text-base text-[#f4f4f5] duration-200 transform capitalize"
                >
                  At what time you start to sleep?
                </label>
            </div>

            <div className="relative z-0 mb-6 w-full">
                <input
                  id="sleep end"
                  type='time'
                  onChange={e => setForm({...form, sleepend: e.target.value})} 
                  value={form.sleepend}
                  className="mt-10 text-[#f4f4f5] block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-9 font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                />
                <label
                  htmlFor="sleep end"
                  className="-z-1 origin-0 absolute top-0 text-base text-[#f4f4f5] duration-200 transform capitalize"
                >
                  What is your sleeping end time?
                </label>
            </div>

            <div className="relative z-0 mb-10 w-full">
                <input
                  id="sleep interruption"
                  type='time'
                  onChange={e => setForm({...form, sleepinter: e.target.value})} 
                  value={form.sleepinter}
                  className="mt-10 text-[#f4f4f5] block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-9 font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                />
                <label
                  htmlFor="sleep end"
                  className="-z-1 origin-0 absolute top-0 text-base text-[#f4f4f5] duration-200 transform capitalize"
                >
                  At what time your sleep usually get interrupted?
                </label>
            </div>
        </div>
        ),
      },
      {
      label: "Nutrition Information",
      component: ( 
          <div className='mt-12 mx-20'>
                  <div className='mb-10'>
                      <hr className='border-[#262a2d] mx-10'/>
                      <h1 className='text-5xl font-bold text-[#f4f4f5] text-center'>Nutrition Information</h1> 
                      <hr className='border-[#262a2d] mx-10'/>
                  </div>  

            <div className="z-10 mb-10 w-full">
                <div
                  className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                >
                  Your daily calory intake?
                </div>
                <div className="static z-10">
                    <Listbox value={selectedDailyCalory} onChange={setSelectedDailyCalory}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate text-[#16151a]">{selectedDailyCalory?.name}</span>
                  
                  </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {dailycalory.map((daily, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
                                  }`
                                }
                                value={daily}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {daily.name}
                                    </span>
                                    {selectedDailyCalory? (
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

            <div className="z-10 mb-10 w-full">
                <div
                  className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                >
                  Frequent Foods you eat for breakfast?
                </div>
                <div className="static z-10">
                    <Listbox value={selectedBreakfast} onChange={setSelectedBreakfast}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedBreakfast?.name}</span>
                  
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
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
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

            <div className="z-10 mb-10 w-full">
                <div
                  className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                >
                  Frequent Foods you eat for lunch?
                </div>
                <div className="static z-10">
                    <Listbox value={selectedLunch} onChange={setSelectedLunch}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedLunch?.name}</span>
                  
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
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
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

            <div className="z-10 mb-10 w-full">
                <div
                  className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                >
                  Frequent Foods you eat for dinner?
                </div>

                <div className="static z-10">
                    <Listbox value={selectedDinner} onChange={setSelectedDinner}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedDinner?.name}</span>
                  
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
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
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

            <div className="z-10 mb-10 w-full">                  
                <div
                  className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                >
                  Your common snack food?
                </div>

                <div className="static z-10">
                    <Listbox value={selectedSnack} onChange={setSelectedSnack}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedSnack?.name}</span>
                  
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
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#f4f4f5]'
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
          
            <div className="z-10 mb-20 w-full">
                <div
                className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                >
                List your common beverage?
                </div>

                <div className="static z-10">
                    <Listbox value={selectedBeverage} onChange={setSelectedBeverage}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedBeverage?.name}</span>
                  
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
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
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

            <div className='my-10'>
                    <hr className='border-[#262a2d] mx-10'/>
                    <h1 className='text-5xl font-bold text-[#f4f4f5] text-center'>Fitness Goals</h1> 
                    <hr className='border-[#262a2d] mx-10'/>
            </div> 
                                
            <div className="relative z-0 mb-6 mt-8 w-full">                         
                <div
                className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                >
                What is your daily goal to improve your health?
                </div>
                
                <div className="static z-10">
                  <Listbox value={selectedGoal} onChange={setSelectedGoal}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate text-[#16151a]">{selectedGoal?.name}</span>
                
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
                                  active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
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
          </div>
      ),
      },
      {
      label: "Supplement and Condition",
      component: ( 
        <div className='mt-12 mx-20'>
            <div className='my-10'>
              <hr className='border-[#262a2d] mx-10'/>
              <h1 className='text-5xl font-bold text-[#f4f4f5] text-center'>Supplement and Condition</h1> 
              <hr className='border-[#262a2d] mx-10'/>
            </div>

            <div className="relative z-0 mb-10 w-full bg-[#16151a]">
              <input
                id="chronic"
                type='text'
                onChange={e => setForm({...form, chronichcond: e.target.value})} 
                value={form.chronichcond}
                className="mt-5 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-[#f4f4f5] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
              />
              <label
                htmlFor="chronic"
                className="-z-1 origin-0 absolute bottom-10 text-base text-[#f4f4f5] duration-200 transform capitalize"
              >
              Did you have any chronic medical condition?
              </label>
            </div>

            <div className="relative z-0 mb-10 w-full">
              <input
                id="hospitalize"
                type='text'
                onChange={e => setForm({...form, hospitalize: e.target.value})} 
                value={form.hospitalize}
                className="mt-5 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-[#f4f4f5] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
              />
              <label
                htmlFor="chronic"
                className="-z-1 origin-0 absolute bottom-10 text-base text-[#f4f4f5] duration-200 transform capitalize"
              >
              Have you ever been hospitalized?
              </label>
            </div>

            <div className="relative z-0 mb-10 w-full">
                  <input
                  id="allergies"
                  type='text'
                  onChange={e => setForm({...form, allergies: e.target.value})} 
                  value={form.allergies}                           
                  className="mt-5 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-[#f4f4f5] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                  />
                  <label
                  htmlFor="allergies"
                  className="-z-1 origin-0 absolute bottom-10 text-base text-[#f4f4f5] duration-200 transform capitalize"
                  >
                  Any Allergies?
                  </label>
            </div>                 
                                    
            <div className="relative z-0 mb-10 w-full">
                <input
                id="symptoms"
                type='text'
                onChange={e => setForm({...form, symptoms: e.target.value})} 
                value={form.symptoms}
                className="mt-5 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-[#f4f4f5] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                />
                <label
                htmlFor="symptoms"
                className="-z-1 origin-0 absolute bottom-10 text-base text-[#f4f4f5] duration-200 transform capitalize"
                >
                Any Symptoms
                </label>
            </div>
        </div>                
        ),
      },
      {
        label: "mental conditions",
        component: (
          <div className='mt-12'>
              <div className='my-10'>
                <hr className='border-[#262a2d] mx-10'/>
                <h1 className='text-5xl font-bold text-[#f4f4f5] text-center'>Mental and Emotional Information</h1> 
                <hr className='border-[#262a2d] mx-10'/>
            </div>

            <div className="mb-10 mx-20">           
                <div className="flex flex-col">

                  <div className="relative z-0 mb-5 w-full">
                      <div
                        className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                      >
                        what is your mood like today?
                      
                    <Listbox value={selectedMood} onChange={setSelectedMood}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedMood?.name}</span>
                  
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
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
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

                  <div className="relative z-0 mb-10 w-full">
                      <input
                        id="stress"
                        type='text'
                        onChange={e => setForm({...form, stress: e.target.value})} 
                        value={form.stress}
                        className="mt-5 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-[#f4f4f5] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                      />
                      <label
                        htmlFor="sleep start"
                        className="-z-1 origin-0 absolute bottom-10 text-base text-[#f4f4f5] duration-200 transform capitalize"
                      >
                        what is your stress level like today?
                      </label>
                  </div>

                  <div className="relative z-0 mb-10 w-full">
                      <input
                        id="mentalsymptoms"
                        type='text'
                        onChange={e => setForm({...form, mentalsymptoms: e.target.value})} 
                        value={form.mentalsymptoms}
                        className="mt-5 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-[#f4f4f5] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                      />
                      <label
                        htmlFor="sleep start"
                        className="-z-1 origin-0 absolute bottom-10 text-base text-[#f4f4f5] duration-200 transform capitalize"
                      >
                        Any mental health symptoms?
                      </label>
                  </div>

                  <div className="relative z-0 mb-10 w-full">
                      <input
                        id="notes"
                        type='text'
                        onChange={e => setForm({...form, notes: e.target.value})} 
                        value={form.notes}
                        className="mt-5 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 text-[#f4f4f5] font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                      />
                      <label
                        htmlFor="sleep start"
                        className="-z-1 origin-0 absolute bottom-10 text-base text-[#f4f4f5] duration-200 transform capitalize"
                      >
                        Any additional information you want to share?
                      </label>
                  </div>                  
                
                </div>
            </div> 
          </div>
        )
      },
      {
        label: "Biometric Measurements",
        component: (
            <div className='mt-12 mx-20'>
                <div className='my-10'>
                    <hr className='border-[#262a2d] mx-10'/>
                    <h1 className='text-5xl font-bold text-[#f4f4f5] text-center'>Biometric Measurements <small className='text-[#f4f4f5] text-sm'>(Optional)</small> </h1> 
                    <hr className='border-[#262a2d] mx-10'/>
                  </div>

                  <div className="relative z-0 mb-6 w-full">
                      <div
                        className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                      >
                        Daily Glucose Intake?
                      
                    <Listbox value={selectedGlucose} onChange={setSelectedGlucose}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedGlucose?.name}</span>
                  
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {glucoseIntake.map((glucose, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
                                  }`
                                }
                                value={glucose}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {glucose.name}
                                    </span>
                                    {selectedGlucose ? (
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
                  
                  <br></br>
                      
                  <div className="relative z-0 mb-6 w-full">
                      <div
                        className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                      >
                        Daily cholesterol intake?
                      
                    <Listbox value={selectedCholestrol} onChange={setSelectedCholestrol}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedCholestrol?.name}</span>
                  
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {cholestrolIntake.map((cholesterol, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
                                  }`
                                }
                                value={cholesterol}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {cholesterol.name}
                                    </span>
                                    {selectedCholestrol ? (
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
                  
                  <br></br>

                  <div className="relative z-0 mb-6 w-full">
                      <div
                        className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                      >
                        Daily Hemoglobin Level?
                      
                    <Listbox value={selectedHemoglobin} onChange={setSelectedHemoglobin}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedHemoglobin?.name}</span>
                  
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {hemoglobinLevel.map((hemoglobin, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
                                  }`
                                }
                                value={hemoglobin}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {hemoglobin.name}
                                    </span>
                                    {selectedHemoglobin ? (
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
                  
                  <br></br>

                  <div className="relative z-0 mb-6 w-full">
                      <div
                        className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                      >
                        Daily Carbohydrate Level?
                      
                    <Listbox value={selectedCarbohydrate} onChange={setSelectedCarbohydrate}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedCarbohydrate?.name}</span>
                  
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {carbohydrateIntake.map((carbohydrate, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
                                  }`
                                }
                                value={carbohydrate}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {carbohydrate.name}
                                    </span>
                                    {selectedCarbohydrate? (
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
                  
                  <br></br>    

                  <div className="relative z-0 mb-6 w-full">
                      <div
                        className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                      >
                        Daily Fat Intake?
                      
                    <Listbox value={selectedFat} onChange={setSelectedFat}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedFat?.name}</span>
                  
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {fatIntake.map((fat, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
                                  }`
                                }
                                value={fat}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {fat.name}
                                    </span>
                                    {selectedFat? (
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
                  
                  <br></br>    

                  <div className="relative z-0 mb-6 w-full">
                      <div
                        className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                      >
                        Daily Protein Intake?
                      
                    <Listbox value={selectedProtein} onChange={setSelectedProtein}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedProtein?.name}</span>
                  
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {proteinIntake.map((protein, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
                                  }`
                                }
                                value={protein}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {protein.name}
                                    </span>
                                    {selectedProtein? (
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
                  
                  <br></br>    

                  <div className="relative z-0 mb-6 w-full">
                      <div
                        className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                      >
                        Daily Vitamin Intake?
                      
                    <Listbox value={selectedVitamin} onChange={setSelectedVitamin}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedVitamin?.name}</span>
                  
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {vitaminIntake.map((vitamin, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
                                  }`
                                }
                                value={vitamin}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {vitamin.name}
                                    </span>
                                    {selectedVitamin? (
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
                  
                  <br></br>  

                  <div className="relative z-0 mb-6 w-full">
                      <div
                        className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                      >
                        Daily Mineral Intake?
                      
                    <Listbox value={selectedMineral} onChange={setSelectedMineral}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedMineral?.name}</span>
                  
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {mineralIntake.map((mineral, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
                                  }`
                                }
                                value={mineral}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {mineral.name}
                                    </span>
                                    {selectedMineral? (
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
                  
                  <br></br>  
                        
                  <div className="relative z-0 mb-6 w-full">
                      <div
                        className="text-base text-[#f4f4f5] duration-200 transform capitalize"
                      >
                        Daily Mineral Intake?
                      
                    <Listbox value={selectedEcg} onChange={setSelectedEcg}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-[#16151a]">{selectedEcg?.name}</span>
                  
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {ecgIntake.map((ecg, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-[#16151a]'
                                  }`
                                }
                                value={ecg}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {ecg.name}
                                    </span>
                                    {selectedEcg? (
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
                  
                  <br></br>            
              
            </div>
        )
      },
      {
        label: "addtional information",
        component: (          
          <div className='mt-5'>
                <div className="mb-10 mx-20">           
                      <div className="flex flex-col">                  
                <div className='my-10'>
                    <hr className='border-[#262a2d] mx-10'/>
                    <h1 className='text-5xl font-bold text-[#f4f4f5] text-center'>Additional Information <small className='text-[#f4f4f5] text-sm'>(optional)</small></h1> 
                    <hr className='border-[#262a2d] mx-10'/>
                </div> 
                
                <div className="relative z-0 mb-6 w-full">
                    <input
                      id="type"
                      type='text'
                      onChange={e => setForm({...form, bloodtype: e.target.value})} 
                      value={form.bloodtype}
                      className="mt-10 text-[#f4f4f5] block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                    />
                    <label
                      htmlFor="bloodtype"
                      className="-z-1 origin-0 absolute top-3 text-base text-[#f4f4f5] duration-200 transform capitalize"
                    >
                      What is your blood type?
                    </label>
                </div> 

                <div className="relative z-0 mb-6 w-full">
                    <input
                      id="familymedicalrecord"
                      type='text'
                      onChange={e => setForm({...form, famimedical: e.target.value})} 
                      value={form.famimedical}
                      className="mt-10 text-[#f4f4f5] block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-smfamilymedicalrecord"
                    />
                    <label
                      htmlFor="familymedicalrecord"
                      className="-z-1 origin-0 absolute top-3 text-base text-[#f4f4f5] duration-200 transform capitalize"
                    >
                      What is your family medical record?
                    </label>
                </div>  

                <div className="relative z-0 mb-6 w-full">
                    <input
                      id="vaccinationrecord"
                      type='text'
                      onChange={e => setForm({...form, vaccrecord: e.target.value})} 
                      value={form.vaccrecord}
                      className="mt-10 text-[#f4f4f5] block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                    />
                    <label
                      htmlFor="vaccinationrecord"
                      className="-z-1 origin-0 absolute top-3 text-base text-[#f4f4f5] duration-200 transform capitalize"
                    >
                      What is your vaccination record looks like?
                    </label>
                </div>  

                <div className="relative z-0 mb-6 w-full">
                    <input
                      id="qualityoflife"
                      type='text'
                      onChange={e => setForm({...form, lifeassess: e.target.value})} 
                      value={form.lifeassess}
                      className="mt-10 text-[#f4f4f5] block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-2 pb-2 pt-3 font-sans focus:border-[#262a2d] focus:outline-none focus:ring-0 text-sm"
                    />
                    <label
                      htmlFor="qualityoflife"
                      className="-z-1 origin-0 absolute top-3 text-base text-[#f4f4f5] duration-200 transform capitalize"
                    >
                      What is your overall quality of life assessment looks like?
                    </label>
                </div>

                </div>
                </div>   
          </div>
        )
      }
    ];

    
  const setStepAndPersist = (newStep:any) => {
    console.log("Setting step to", newStep);
    setStep(newStep);
    localStorage.setItem("currentStep", newStep.toString());
  };

  const handleNextStep = async () => {
        const errors = await checkErrors();

        // If there are any errors, stop the form submission
        if (Object.keys(errors).length > 0) {
          // Show a toast message for each error
          for (let error in errors) {
            toast.error(errors[error] as string);
          }
          return;
        }

    if (step < steps.length) {
      setStep((prevStep) => prevStep + 1);
      setStepAndPersist(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
      setStepAndPersist(step - 1);
    }
  };

  return (
    <> 
      <div className='relative h-[35.9rem] overflow-y-auto'>
        <div className='font-abc mr-20'>
          <Head>
            <title className='transform capitalize'>Get Started with miaamor health tracking</title>
          </Head>
          <div>
            <h1 className="mb-20 my-10 transform capitalize font-bold text-2xl text-center font-abc text-[#f4f4f5]">
                Let's track your health!
            </h1>          
          </div>
              {user ?( 
              <div className='flex gap-10'>                  
                  <div className="mx-5 flex flex-col gap-40 my-20">
                    {step > 1 && (
                      <div className="relative">
                        <div className="absolute -inset-5">
                          <div className="mx-auto h-full w-full max-w-smlg:mx-0"></div>
                        </div>
                        <button
                          onClick={handlePreviousStep}
                          title=""
                          className="font-pj relative z-10 inline-flex w-full items-center justify-center rounded-xl border-transparent bg-gray-200 shadow-2xl px-8 py-3 text-lg font-bold text-[#16151a] hover:text-white transition-all duration-200 hover:bg-black sm:w-auto"
                          role="button"
                        >
                          <TbArrowBigUpLinesFilled/>
                        </button>
                      </div>
                    )}
                    {step < steps.length && (
                      <div className="relative">
                        <div className="absolute -inset-5">
                          <div className="mx-auto h-full w-full max-w-sm lg:mx-0"></div>
                        </div>
                        <button
                          onClick={handleNextStep}
                          title=""
                          className="font-pj relative z-10 inline-flex w-full items-center justify-center rounded-xl border-transparent bg-gray-200 shadow-2xl px-8 py-3 text-lg font-bold text-[#16151a] hover:text-white transition-all duration-200 hover:bg-black sm:w-auto"
                          role="button"
                        >
                          <TbArrowBigDownLinesFilled/>
                        </button>
                      </div>
                    )}
                    {step === steps.length && (
                        <div className="relative md:ml-0">
                        <div className="absolute -inset-5">
                          <div className="mx-auto h-full w-full max-w-sm lg:mx-0"></div>
                        </div>
                        <button
                          // onClick={handleNextStep}
                          onClick={handleSubmit}
                          title=""
                          className="relative z-10 inline-flex w-full items-center justify-center rounded-xl border-2 border-transparent px-8 py-3 text-lg font-bold text-[#16151a] transition-all duration-200 bg-gradient-to-br from-[#f4f4f5] via-[#f4f4f5] to-[#f4f4f5] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 sm:w-auto"
                          role="button"
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                  <div className='w-[55rem] bg-[#16151a] rounded-lg -mt-10'>
                    { 
                      steps[step - 1]?.component
                    }     
                  </div>
              </div>
              ):(<div className='text-[#f4f4f5] text-center'>Must be loged in first.</div>)}
          <Toaster />
        </div>   
      </div>
      
    </>
  )
}

export default Form