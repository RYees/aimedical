import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createHealthTrack(req:any, res:any) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const {
                    userId, 
                    name,
                    dob,
                    gender,
                    email,
                    phone        ,
                    weight       ,
                    height       ,
                    bloodpressure,
                    pulse        ,
                    temperature  ,
                    oxysaturation,
                    bmi          ,
                    // dailyinfo
                    steps        ,
                    distance     ,
                    activeminutes,
                    calories     ,
                    exercisetype ,
                    exeheartrate ,
                    //
                    sleepduration,
                    sleepquality ,
                    sleepstart   ,
                    sleepend     ,
                    sleepinter   ,
                    dailycalorie ,
                    fbreakfast   ,
                    flunch       ,
                    fdinner      ,
                    fsnacks      ,
                    beverage     , 
                    chronichcond ,//poss
                    allergies    ,
                    symptoms     , 
                    hospitalize  ,//poss
                    mood         ,
                    stress       ,
                    mentalsymptoms, //next
                    notes        , //next
                    //graph
                    glucose      ,
                    cholesterol  ,
                    hemoglobin   ,
                    carbohydrate ,
                    protiens     ,
                    fats         ,
                    vitamins     ,
                    minerals     ,
                    ecg          ,
                    //graph
                    goals        ,
                    bloodtype    ,
                    famimedical  ,//poss
                    vaccrecord   ,//poss
                    //healthcare   ,
                    lifeassess   //poss
            } = req.body;

            const data = await prisma.healthTracking.create({
                data: {
                    userId,
                    name,
                    dob,
                    gender,
                    email,
                    phone        ,
                    weight       ,
                    height       ,
                    bloodpressure,
                    pulse        ,
                    temperature  ,
                    oxysaturation,
                    bmi          ,
                    steps        ,
                    distance     ,
                    activeminutes,
                    calories     ,
                    exercisetype ,
                    exeheartrate ,
                    sleepduration,
                    sleepquality ,
                    sleepstart   ,
                    sleepend     ,
                    sleepinter   ,
                    dailycalorie ,
                    fbreakfast   ,
                    flunch       ,
                    fdinner      ,
                    fsnacks      ,
                    beverage     ,  
                    chronichcond ,
                    allergies    ,
                    symptoms     , 
                    hospitalize  ,
                    mood         ,
                    stress       ,
                    mentalsymptoms,
                    notes        ,
                    glucose      ,
                    cholesterol  ,
                    hemoglobin   ,
                    carbohydrate ,
                    protiens     ,
                    fats         ,
                    vitamins     ,
                    minerals     ,
                    ecg          ,
                    goals        ,
                    bloodtype    ,
                    famimedical  ,
                    vaccrecord   ,
                    lifeassess   
                  },
            })
            res.status(201).json(data);
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}