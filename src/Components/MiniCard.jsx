import React, { useEffect, useState } from 'react'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'

const MiniCard = ({ time, temp, iconString, index }) => {
    const [icon, setIcon] = useState()

    const cardColors = [
        'bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300',
        'bg-gradient-to-br from-rose-500 via-pink-400 to-rose-300',
        'bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-300',
        'bg-gradient-to-br from-emerald-500 via-green-400 to-emerald-300',
        'bg-gradient-to-br from-purple-500 via-violet-400 to-purple-300'
    ];

    const textColors = [
        {
            day: 'text-cyan-100 drop-shadow-lg',
            date: 'text-blue-100',
            temp: 'text-cyan-50 text-shadow'
        },
        {
            day: 'text-pink-100 drop-shadow-lg',
            date: 'text-rose-100',
            temp: 'text-pink-50 text-shadow'
        },
        {
            day: 'text-yellow-100 drop-shadow-lg',
            date: 'text-amber-100',
            temp: 'text-yellow-50 text-shadow'
        },
        {
            day: 'text-green-100 drop-shadow-lg',
            date: 'text-emerald-100',
            temp: 'text-green-50 text-shadow'
        },
        {
            day: 'text-violet-100 drop-shadow-lg',
            date: 'text-purple-100',
            temp: 'text-violet-50 text-shadow'
        }
    ];

    const animationDelay = `${index * 0.1}s`;

    const getDayName = (dateStr) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateStr);
        return days[date.getDay()];
    };

    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    };

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
        <div 
            className={`mini-card w-[10rem] h-[10rem] p-2 flex flex-col rounded-xl 
                ${cardColors[index]} backdrop-blur-lg 
                border border-white/20 shadow-lg
                hover:shadow-2xl hover:border-white/40
                cursor-pointer transform transition-all duration-500 ease-in-out
                hover:translate-y-[-10px] overflow-hidden`}
            style={{
                animation: `float 3s ease-in-out infinite`,
                animationDelay: animationDelay,
                transform: 'translateY(0)',
            }}
        >
            {/* Day and Date - Reduced top margin */}
            <div className="text-center transform transition-all duration-300 hover:scale-105 mt-1">
                <p className={`font-bold text-lg tracking-wide ${textColors[index].day}`}>
                    {getDayName(time)}
                </p>
                <p className={`text-sm font-medium ${textColors[index].date}`}>
                    {getFormattedDate(time)}
                </p>
            </div>
            
            {/* Reduced margin for divider */}
            <hr className="border-white/20 my-1 transition-all duration-300 hover:border-white/40" />
            
            {/* Weather Icon - Adjusted size and margins */}
            <div className='w-full flex justify-center items-center transform transition-all duration-300 my-1'>
                <img 
                    src={icon} 
                    alt="forecast not available" 
                    className='weather-icon w-[3rem] h-[3rem] drop-shadow-lg hover:drop-shadow-2xl'
                />
            </div>
            
            {/* Temperature - Adjusted padding and margin */}
            <div className={`text-center transform transition-all duration-300 hover:scale-105 
                ${textColors[index].temp} px-2 mb-1 rounded-lg`}>
                <span className='font-bold tracking-wider text-lg'>
                    {temp}&deg;C
                </span>
            </div>
        </div>
    )
}

export default MiniCard