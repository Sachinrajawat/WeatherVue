import React, { useEffect, useState } from 'react'
import { useDate } from '../Utils/useDate'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'
import '../index.css'

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  iconString,
  conditions,
}) => {

  const [icon, setIcon] = useState(sun)
  const { time } = useDate()

  // Format the date as required
  const formatDate = () => {
    const date = new Date();
    return date.toDateString();
  }

  // Format time to show only time part
  const formatTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true 
    });
  }

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud)
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain)
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun)
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm)
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog)
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow)
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind)
      }
    }
  }, [iconString])

  return (
    <div className='weather-card w-[22rem] min-w-[22rem] h-[30rem] 
      bg-gradient-to-br from-[#1E293B]/80 to-[#334155]/80
      backdrop-blur-lg rounded-3xl p-4
      border border-white/20 shadow-lg
      transition-transform duration-300 ease-in-out
      hover:scale-[1.02] hover:shadow-2xl hover:border-white/30'>
      
      {/* Temperature and Icon Section */}
      <div className='flex w-full justify-center items-center gap-4 mt-8 mb-4 
        transition-transform duration-300 hover:scale-105'>
        <img src={icon} alt="weather_icon" 
          className='w-[4rem] h-[4rem] weather-icon drop-shadow-lg' />
        <p className='font-bold text-5xl flex justify-center items-center 
          text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 
          hover:from-cyan-200 hover:to-blue-200 transition-colors duration-300'>
          {temperature}&deg;C
        </p>
      </div>

      {/* Location Name */}
      <div className='font-bold text-center text-2xl mb-4
        text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300
        transition-transform duration-300 hover:scale-105'>
        {place}
      </div>

      {/* Date and Time */}
      <div className='flex flex-col items-center gap-1'>
        <p className='font-semibold text-lg text-amber-200'>
          {formatDate()}
        </p>
        <p className='font-semibold text-md text-orange-200'>
          {formatTime()}
        </p>
      </div>

      {/* Wind Speed and Humidity */}
      <div className='w-full flex justify-between items-center mt-6 gap-4
        transition-transform duration-300 hover:scale-105'>
        <p className='flex-1 text-center p-2 rounded-xl font-bold
          bg-gradient-to-r from-cyan-500/50 to-blue-500/50
          hover:from-cyan-500/60 hover:to-blue-500/60
          transition-colors duration-300 cursor-pointer
          border border-white/20 hover:border-white/40 shadow-lg'>
          Wind Speed
          <p className='font-normal text-cyan-100'>{windspeed} km/h</p>
        </p>
        <p className='flex-1 text-center p-2 rounded-xl font-bold
          bg-gradient-to-r from-purple-500/50 to-pink-500/50
          hover:from-purple-500/60 hover:to-pink-500/60
          transition-colors duration-300 cursor-pointer
          border border-white/20 hover:border-white/40 shadow-lg'>
          Humidity
          <p className='font-normal text-pink-100'>{humidity} %</p>
        </p>
      </div>

      {/* Conditions */}
      <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold mt-6
        text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-300
        transition-transform duration-300 hover:scale-105'>
        {conditions}
      </div>
    </div>
  )
}

export default WeatherCard