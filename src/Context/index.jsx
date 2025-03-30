// Context/index.jsx
import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({})
    const [values, setValues] = useState([])
    const [place, setPlace] = useState('Jaipur')
    const [thisLocation, setLocation] = useState('')
    const [searchHistory, setSearchHistory] = useState(() => {
        const savedHistory = localStorage.getItem('searchHistory')
        return savedHistory ? JSON.parse(savedHistory) : []
    })

    const API_KEY = import.meta.env.VITE_API_KEY

    // City suggestions function
    const fetchCitySuggestions = async (query) => {
        if (!query) return []
        
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
            )
            return response.data.map(city => ({
                name: city.name,
                country: city.country,
                state: city.state
            }))
        } catch (error) {
            console.error('Error fetching city suggestions:', error)
            return []
        }
    }

    const updateSearchHistory = (city) => {
        setSearchHistory(prevHistory => {
            const newHistory = [city, ...prevHistory.filter(item => 
                item.toLowerCase() !== city.toLowerCase()
            )].slice(0, 5)
            localStorage.setItem('searchHistory', JSON.stringify(newHistory))
            return newHistory
        })
    }

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${API_KEY}`
            );

            const forecastResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${API_KEY}`
            );

            updateSearchHistory(place)

            setLocation(response.data.name)
            setWeather({
                conditions: response.data.weather[0].main,
                temp: Math.round(response.data.main.temp),
                temp_min: Math.round(response.data.main.temp_min),
                temp_max: Math.round(response.data.main.temp_max),
                humidity: response.data.main.humidity,
                wind_speed: response.data.wind.speed,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon
            })

            const dailyForecasts = {};
            forecastResponse.data.list.forEach(item => {
                const date = new Date(item.dt_txt).toLocaleDateString();
                if (!dailyForecasts[date]) {
                    dailyForecasts[date] = {
                        datetime: item.dt_txt,
                        temp: Math.round(item.main.temp),
                        conditions: item.weather[0].main,
                        description: item.weather[0].description,
                        icon: item.weather[0].icon
                    };
                }
            });

            const today = new Date().toLocaleDateString();
            const processedForecast = Object.values(dailyForecasts)
                .filter(item => new Date(item.datetime).toLocaleDateString() !== today)
                .slice(0, 5);

            setValues(processedForecast);

        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('City not found. Please try another location.')
        }
    }

    useEffect(() => {
        fetchWeather()
    }, [place])

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place,
            searchHistory,
            fetchCitySuggestions
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)