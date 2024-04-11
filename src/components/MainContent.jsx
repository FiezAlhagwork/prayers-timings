/* eslint-disable no-unused-vars */

import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Prayer from './Prayer';
import { useEffect, useState } from 'react';
import moment from 'moment'




//data
import img_1 from '../assets/fajr-prayer.png';
import img_2 from '../assets/dhhr-prayer-mosque.png';
import img_3 from '../assets/asr-prayer-mosque.png';
import img_4 from '../assets/night-prayer-mosque.png';
import img_5 from '../assets/sunset-prayer-mosque.png';



import axios from 'axios'



const MainContent = () => {

    //usestate
    const [nextPrayerIndex, setNextPrayerIndex] = useState(2)
    const [city, setCity] = useState({
        display: "دمشق",
        apiName: 'damascus'
    });
    const [timings, setTimings] = useState({
        Fajr: "06:00",
        Dhuhr: "12:00",
        Asr: "15:22",
        Maghrib: "17:45",
        Isha: "19:11",
    });

    const [todoy, setTodoy] = useState('سمبتمبر 9 23  | 4:30');
    const [remaningTimes,setRemaningTimes] = useState()


    // useEffect 
    const date = moment().format('MMMM Do YYYY | h:mm:ss ');
    useEffect(() => {
        setTimeout(() => {
            setTodoy(date)
        }, 1000)

        // return () => {
        //     clearInterval(todoy)
        // }
    }, [todoy])


    useEffect(() => {
        let Interval = setInterval(() => {
            setupCountdownTimer()
        }, 1000)

        return () => {
            clearInterval(Interval)
        }

    }, [timings,city])

    useEffect(() => {
        axios.get(`https://api.aladhan.com/v1/timingsByCity?country=SY&city=${city.apiName}`,

        )
            .then(function (response) {
                // handle success
                // console.log(response);
                // الطريقة الاولى 
                // console.log(response.data.data.timings);
                // const Fajr = response.data.data.timings.Fajr
                // const Dhuhr = response.data.data.timings.Dhuhr
                // const Asr = response.data.data.timings.Asr
                // const Maghrib = response.data.data.timings.Maghrib
                // const Isha = response.data.data.timings.Isha
                // setTimings({ ...timings, Fajr: Fajr, Dhuhr: Dhuhr, Asr: Asr, Maghrib: Maghrib, Isha: Isha })

                //الطريقة الثانية
                setTimings(response.data.data.timings)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [city])

    const setupCountdownTimer = () => {
        const momentNow = moment() // الوقت الحالي 
        const Isha = timings['Isha']
        const IshaMoment = moment(Isha, "hh:mm") // تحويل الوقت الى moment مشان نقدر نقارن 
        // momentNow.isAfter(IshaMoment) // هل الوقت الحالي بعد صلاء العشاء
        // console.log(momentNow.isAfter(IshaMoment));
        let prayerTimeNext = 2

        if (momentNow.isAfter(moment(timings['Fajr'], 'hh:mm')) && momentNow.isBefore(moment(timings["Dhuhr"], 'hh:mm'))) {
            prayerTimeNext = 1

        }
        else if (momentNow.isAfter(moment(timings["Dhuhr"], 'hh:mm')) && momentNow.isBefore(moment(timings['Asr'], 'hh:mm'))) {
            prayerTimeNext = 2
        }
        else if (momentNow.isAfter(moment(timings['Asr'], 'hh:mm')) && momentNow.isBefore(moment(timings['Maghrib'], 'hh:mm'))) {
            prayerTimeNext = 3
        }
        else if (momentNow.isAfter(moment(timings['Maghrib'], 'hh:mm')) && momentNow.isBefore(moment(timings['Isha'], 'hh:mm'))) {
            prayerTimeNext = 4
        }
        else {
            prayerTimeNext = 0
        }

        setNextPrayerIndex(prayerTimeNext)



        const nextPrayerobject = prayerArray[prayerTimeNext] // {key : 'Fajer' , display :  "الظهر"}
        const nextPrayerTime = timings[nextPrayerobject.key] // timings['Fajer'] ==> 04:30
        const nextPrayerTimeMoment = moment(nextPrayerTime,"hh:mm")

                       //   12:45   11:58
        let remaningTime = moment(nextPrayerTime,'hh:mm').diff(momentNow)
        if(remaningTime < 0) {
            const midnightDiff = moment("23:59:59","hh:mm:ss").diff(momentNow)
            const fajerToMidnightDiff = nextPrayerTimeMoment.diff(moment("00:00:00","hh:mm:ss"))
            const totalDiffernce = midnightDiff + fajerToMidnightDiff

            remaningTime = totalDiffernce
        }


        const durationrRemaningTime = moment.duration(remaningTime) 
        setRemaningTimes(`${durationrRemaningTime.seconds()} : ${durationrRemaningTime.minutes() } : ${durationrRemaningTime.hours()} `) 



    }


    const PrayerData = [
        {
            id: "1",
            timing: timings.Fajr,
            image: img_1,
            titel: "الفجر",
        },
        {
            id: "2",
            timing: timings.Dhuhr,
            image: img_2,
            titel: "الظهر",
        },
        {
            id: "3",
            timing: timings.Asr,
            image: img_3,
            titel: "العصر",
        },
        {
            id: "4",
            timing: timings.Maghrib,
            image: img_4,
            titel: "المغرب",
        },
        {
            id: "5",
            timing: timings.Isha,
            image: img_5,
            titel: "العشاء",
        },
    ]


    const avilabelCities = [
        { display: "دمشق", apiName: 'damascus'},
        { display: "حلب", apiName: 'Ḩalab' },
        { display: "الحسكة", apiName: 'Al Ḩasakah' },
        { display: "دير الزور", apiName: 'Dayr az Zawr' },
        { display: "حماة", apiName: 'Ḩamāh' },
    ]
    const prayerArray = [
        { display: "الفجر", key: 'Fajr' },
        { display: "الظهر", key: 'Dhuhr' },
        { display: "العصر", key: 'Asr' },
        { display: " المغرب", key: 'Maghrib' },
        { display: "العشاء", key: 'Isha' },
    ]

    const handleChangeSelect = (even) => {
        const citeObject = avilabelCities.find((city) => {
            return city.apiName == even.target.value

        })
        console.log(citeObject);

        setCity(citeObject)
    }




    return (
        <div>

            <Grid container spacing={3} dir='rtl' className=' pt-12'  >
                <Grid xs={12} md={6} sx={{}} className=''>
                    <div className=' text-center lg:text-right mb-6  md:mb-0'>
                        <h4 className=' text-[#8a817c] text-2xl pb-3 font-medium'> {todoy}</h4>
                        <h2 className=' text-white text-5xl font-bold'>{city.display}</h2>
                    </div>
                </Grid>
                <Grid xs={12} md={6} sx={{}}>
                    <div className=' text-center lg:text-right '>
                        <h3 className=' text-[#8a817c] text-2xl pb-3 font-medium'>متبقى حتى صلاء {prayerArray[nextPrayerIndex].display}</h3>
                        <h2 className=' text-white text-4xl font-bold'>{remaningTimes}</h2>
                    </div>
                </Grid>
                <Grid xs={12}>
                    <Divider style={{ borderColor: "white", opacity: "0.1" }} />
                </Grid>
            </Grid>

            <div className=' flex justify-around pt-12 flex-wrap gap-3'>
                {PrayerData.map((preay) => {
                    return (
                        <Prayer key={preay.id} preays={preay} />
                    )
                })}
            </div>


            <div className=' text-center py-6 '>
                <select
                    name="HeadlineAct"
                    id="HeadlineAct"
                    className="mt-1.5 w-full sm:w-1/3 rounded-lg border-gray-300 border-2 border-solid text-gray-300 sm:text-sm py-4 px-1 bg-[#1b1b1f]"
                    onChange={handleChangeSelect}
                // value={city}e
                >e
                    {avilabelCities.map((city) => {
                        return (
                            <option key={city.display} value={city.apiName} className=' text-xl'>{city.display}</option>
                        )

                    })}
                </select>

            </div>
        </div >
    )
}

export default MainContent
