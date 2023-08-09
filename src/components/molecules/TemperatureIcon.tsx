import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { fetchWeatherData } from '../../api';
import { setCurrentCity } from '../../features/weatherSlice';
import { getWeatherIcon } from '../../features/WeatherIcon';
import '../organisms/mainCard/MainCard.css';

const TemperatureIcon: React.FC = () => {
    const currentCity = useAppSelector((state) => state.weather.currentCity);
    const dispatch = useAppDispatch();


    useEffect(() => {
        const getDefaultCityWeather = async () => {
            try {
                const weatherData = await fetchWeatherData('Turin');
                dispatch(setCurrentCity(weatherData));
            } catch (error) {
                console.error('Errore durante il caricamento della città di default:', error);
            }
        };
        getDefaultCityWeather();
    }, [dispatch]);

    return (
        <>

            {currentCity ? (
                <div className='icon-temp'>

                    {getWeatherIcon(currentCity.description)}
                    <p className='temperature'>{currentCity.temperature} °C</p>

                </div>
            ) : (
                <p>Seleziona una città per visualizzare i dati meteo</p>
            )}
        </>

    );
};

export default TemperatureIcon;
