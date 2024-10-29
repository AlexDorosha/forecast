import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { Card } from '../Card'
import { useForecast } from '../hooks/useForecast';

import '../App.css';

export const SingleCity = () => {
    const location = useLocation();
    console.log('location', location)
    const [cityCoord, setCityCoord] = useState(null);
    const data = useForecast(cityCoord);
    console.log('data', data);
    const { city } = useParams();
    return (
        <Card city={city} setCityCoord={setCityCoord} />
    )
}