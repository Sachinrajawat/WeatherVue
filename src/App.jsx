// App.jsx
import { useState, useEffect } from 'react'
import './App.css'
import search from './assets/icons/search.svg'
import { useStateContext } from './Context'
import { BackgroundLayout, WeatherCard, MiniCard } from './Components'

function App() {
    const [input, setInput] = useState('')
    const [showHistory, setShowHistory] = useState(false)
    const [citySuggestions, setCitySuggestions] = useState([])
    const { 
        weather, 
        thisLocation, 
        values, 
        setPlace, 
        searchHistory,
        fetchCitySuggestions 
    } = useStateContext()

    const submitCity = (cityName) => {
        setPlace(cityName)
        setInput('')
        setShowHistory(false)
        setCitySuggestions([])
    }

    const handleSearchClick = (city) => {
        setInput(city)
        submitCity(city)
    }

    // Handle input changes and fetch city suggestions
    const handleInputChange = async (e) => {
        const value = e.target.value
        setInput(value)
        
        if (value.length > 2) {
            const suggestions = await fetchCitySuggestions(value)
            setCitySuggestions(suggestions)
        } else {
            setCitySuggestions([])
        }
    }

    // Show history only when input is empty and search is focused
    const shouldShowHistory = showHistory && !input && searchHistory.length > 0
    // Show suggestions when we have input and suggestions
    const shouldShowSuggestions = input.length > 2 && citySuggestions.length > 0

    return (
        <div className='w-full h-screen text-white px-8'>
            <nav className='w-full p-3 flex justify-between items-center'>
            <h1 className="font-bold tracking-wide text-3xl text-white bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 p-2 rounded-lg shadow-lg">
  WeatherVue
</h1>


                <div className='relative'>
                    <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
                        <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
                        <input
                            onFocus={() => setShowHistory(true)}
                            onBlur={() => setTimeout(() => setShowHistory(false), 200)}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter' && input) {
                                    submitCity(input)
                                }
                            }}
                            type="text"
                            placeholder='Search city'
                            className='focus:outline-none w-full text-[#212121] text-lg'
                            value={input}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    {/* Search History Dropdown */}
                    {shouldShowHistory && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md 
                            rounded-lg shadow-lg overflow-hidden z-50 border border-white/20">
                            <div className="p-2">
                                <h3 className="text-gray-700 text-sm font-semibold px-2 pb-2 border-b border-gray-200">
                                    Recent Searches
                                </h3>
                                {searchHistory.map((city, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white 
                                            cursor-pointer transition-colors duration-200 flex items-center gap-2"
                                        onClick={() => handleSearchClick(city)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                            className="h-4 w-4" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor">
                                            <path strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {city}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* City Suggestions Dropdown */}
                    {shouldShowSuggestions && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md 
                            rounded-lg shadow-lg overflow-hidden z-50 border border-white/20">
                            <div className="p-2">
                                <h3 className="text-gray-700 text-sm font-semibold px-2 pb-2 border-b border-gray-200">
                                    Suggestions
                                </h3>
                                {citySuggestions.map((city, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white 
                                            cursor-pointer transition-colors duration-200"
                                        onClick={() => handleSearchClick(city.name)}
                                    >
                                        {city.name}, {city.country}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            <BackgroundLayout></BackgroundLayout>
            <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
                <WeatherCard
                    place={thisLocation}
                    windspeed={weather.wind_speed}
                    humidity={weather.humidity}
                    temperature={weather.temp}
                    iconString={weather.conditions}
                    conditions={weather.conditions}
                />

                <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
                    {values?.map((curr, index) => {
                        return (
                            <MiniCard
                                key={curr.datetime}
                                time={curr.datetime}
                                temp={curr.temp}
                                iconString={curr.conditions}
                                index={index}
                            />
                        )
                    })}
                </div>
            </main>
        </div>
    )
}

export default App