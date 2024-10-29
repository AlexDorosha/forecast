import { useState, useEffect } from 'react';

import { API_KEY } from '../settings';

export const useWeather = (city) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(setData)
            .catch(err => console.error("Error fetching weather data:", err));
    }, [city]);
    return data;
}
// useEffect(() => {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
//         .then(res => res.json())
//         .then(setData);
// }, [city]);