
import React from 'react'

const SearchHistory = ({ history, onSelect, visible }) => {
    if (!visible || history.length === 0) return null;

    return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md 
            rounded-lg shadow-lg overflow-hidden z-50 border border-white/20">
            <div className="p-2">
                <h3 className="text-gray-700 text-sm font-semibold px-2 pb-2 border-b border-gray-200">
                    Recent Searches
                </h3>
                {history.map((city, index) => (
                    <div
                        key={index}
                        className="px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white 
                            cursor-pointer transition-colors duration-200 flex items-center gap-2"
                        onClick={() => onSelect(city)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {city}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchHistory