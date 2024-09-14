import React,{useEffect, useState} from 'react'
function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
}

const WeatherCard = ({tempInfo}) => {
  const [todayDate, setTodayDate] = useState(getDate);
  const [weatherState,setWeatherState] = useState("");
  const {temp,humidity,pressure,weathermood,speed,sunset,country,cityName} = tempInfo;

  useEffect(() => {
      if (weathermood){
        switch (weathermood) {    
            case "Clouds":
                setWeatherState('wi-day-cloudy');
                break;
            case "Mist":
                setWeatherState('wi-fog');
                break;
            case "Rain":
                setWeatherState('wi-rain');
                break;
            case "Haze":
                setWeatherState('wi-dust');
                break;
            case "Snow":
                setWeatherState('wi-snow');
                break;
            case "Sunny":
                setWeatherState('wi-day-sunny');
                break;
            case "Windy":
                setWeatherState('wi-windy');
                break;
            case "Stormy":
                setWeatherState('wi-storm-showers');
                break;
            default:
                setWeatherState('wi-day-sunny');
                break;
        }
    }
  },[weathermood])

//   #converting the sec to date 
  let sec = sunset;
  let dateSunset = new Date(sec * 1000);
  let hours = dateSunset.getUTCHours().toString().padStart(2, '0');
  let minutes = dateSunset.getUTCMinutes().toString().padStart(2, '0');
  let dateStr = `${hours}:${minutes}`;

  return (
   <>
   <div className='bg-zinc-50  mt-2 rounded'>
                    {/* <h1 className="text-orange-300">Hello React</h1> */}
                    <div className="text-center text-8xl  pt-16 mt-2 pb-12 text-state-100">
                        <i className={`wi ${weatherState} text-center`}></i>
                    </div>
                    <div className="flex justify-between text-center text-white  bg-slate-900">
                        <div className="flex justify-between text-center px-8 py-6 text-white">

                            <p className='text-6xl mr-2'> {temp}&deg;</p>
                            <div className="text-xl px-2 pt-2 text-center">
                                <p className='font-serif text-2xl text-start'>{weathermood}</p>
                                <p className='text-start text-sm'>{cityName},<span>{country}</span></p>
                            </div>
                        </div>
                        <div className="flex flex-col bg-orange-500 px-16 py-6  w-3/12 text-2xl ">
                            {todayDate}
                            <span>
                                {new Date().toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                    <div className='flex justify-center justify-items-center px-2 py-6 bg-slate-200 '>
                            <i  className="wi wi-sunset text-4xl pt-1 mr-4 text-orange-400	"></i>
                            <div>
                                <p className='text-center'>{dateStr}</p>
                                <p className='text-start'>Sunset</p>
                            </div>
                        </div>
                        <div className='flex justify-center justify-items-center px-2 py-6 bg-slate-200 '>
                            <i  className="wi wi-humidity text-4xl pt-1 mr-4 text-orange-400	"></i>
                            <div>
                                <p className='text-center'>{humidity}</p>
                                <p className='text-start'>Humidity</p>
                            </div>
                        </div>
                        <div className='flex justify-center justify-items-center px-2 py-6 bg-slate-200 '>
                            <i  className="wi wi-rain text-4xl pt-1 mr-4 text-orange-400	"></i>
                            <div>
                                <p className='text-center'> {pressure}</p>
                                <p className='text-start'>Pressure</p>
                            </div>
                        </div>
                        <div className='flex justify-center justify-items-center px-2 py-6 bg-slate-200 '>
                            <i  className="wi wi-strong-wind text-4xl pt-1 mr-4 text-orange-400	"></i>
                            <div>
                                <p className='text-center'>{speed}</p>
                                <p className='text-start'>speed</p>
                            </div>
                        </div>
                    </div>
                </div>
   </>
  )
}

export default WeatherCard
