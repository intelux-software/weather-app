import React, { useEffect, useState, useCallback } from 'react'
import '../index.css'
import WeatherCard from './WeatherCard';

const Weather = () => {
  const [city, setCity] = useState('Pune');
  const [tempInfo, setTempInfo] = useState({});
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const openWeatherAPI = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

  const getWetherInfo = useCallback(async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3446776c205096048c2758195650e664`;
      console.log('Request URL:', url);

      const response = await fetch(url);
      console.log(response);

      if (!response.ok) {
        if (response.status === 404) {
          setMessage(`Weather information is not available for ${city}`);
          setIsVisible(true);
        } else {
          setMessage("An unexpected error occurred. Please try again.");
          setIsVisible(true);
        }
        return;
      }

      const data = await response.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { speed } = data.wind;
      const { sunset, country } = data.sys;
      const { name: cityName } = data;

      const newWeatherInfo = {
        temp, humidity, pressure, weathermood, speed, sunset, country, cityName
      };

      setTempInfo(newWeatherInfo);

    } catch (error) {
      console.error("Error fetching weather data:", error);
      setMessage("An error occurred while fetching weather data.");
      setIsVisible(true);
    }
  }, [city,openWeatherAPI]);

  useEffect(() => {
    getWetherInfo();
  }, [getWetherInfo]);


  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && (<div
        className="absolute top-4 right-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        {message}
      </div>)}
      <div className='w-3/5	h-3/5  mt-24 m-auto rounded'>
        {/* <div className='w-3/5	  mt-24 m-auto rounded'> */}
        <h1 className='text-center text-white text-3xl font-sans'>Weather<span className='font-serif italic	text-orange-400 font-medium	'>Info</span></h1>
        <div>
          <input placeholder="Search a place" className="text-lg text-stone-800	px-16 py-4 my-4 rounded-tl-sm rounded-bl-sm w-9/12 focus:outline-none" value={city} onChange={(e) => setCity(e.target.value)} />
          <button className="text-lg text-white bg-orange-500	 px-16 py-4 my-4 rounded-tr-sm rounded-br-sm w-3/12	focus:outline-none" onClick={getWetherInfo} >Search</button>
        </div>
        <WeatherCard tempInfo={tempInfo} />
      </div>
    </>
  )
}

export default Weather
