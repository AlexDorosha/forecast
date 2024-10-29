import React, { memo, useContext, useEffect } from 'react';
import { Link, useNavigate, useMatch } from 'react-router-dom';

import { GlobalContext } from '../App';
import { useWeather } from '../hooks/useWeather';
import '../App.css';

export const Card = memo(({ city, setCityCoord }) => {
    const data = useWeather(city);
    const navigate = useNavigate();
    const isHome = Boolean(useMatch('/home'));
    const { dispatch } = useContext(GlobalContext);
    useEffect(() => {
        if (data && data.coord.lat && data.coord.lon && setCityCoord) {
            setCityCoord({
                lat: data.coord.lat,
                lon: data.coord.lon,
            });
        }
    }, [data, setCityCoord])
    if (!data) return null;
    const { name, weather, main } = data;
    const { description, icon } = weather[0];
    const { temp, humidity, feels_like } = main;

    const handleOnDelete = () => {
        dispatch({
            type: 'DELETE_CITY',
            payload: city,
        })
    };

    const handleOnEdit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'EDIT_CITY',
            payload: city,
        })
        navigate('/home');
    };
    if (isHome) {
        return (
            <Link to={`/city/${city}`} className="Card">
                <div className="ActionButtonWrap">
                    <button className="ActionButton" onClick={handleOnEdit}>edit</button>
                    <button className="ActionButton" onClick={handleOnDelete}>X</button>
                </div>
                <div className="MainInfo">
                    <img className="Icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon" />
                    <div className="Title">{name}</div>
                    <div className="Description">{description}</div>
                    <div className="Temperature">{temp.toFixed()}</div>
                </div>
                <div className="Information">
                    <div>Humidity: {humidity}</div>
                    <div>Feels like: {feels_like}</div>
                </div>
            </Link>
        );
    }
    return (
        <div className="Card">
            <div className="ActionButtonWrap">
                <button className="ActionButton" onClick={handleOnEdit}>edit</button>
                <button className="ActionButton" onClick={handleOnDelete}>X</button>
            </div>
            <div className="MainInfo">
                <img className="Icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon" />
                <div className="Title">{name}</div>
                <div className="Description">{description}</div>
                <div className="Temperature">{temp.toFixed()}</div>
            </div>
            <div className="Information">
                <div>Humidity: {humidity}</div>
                <div>Feels like: {feels_like}</div>
            </div>
        </div>
    );
})