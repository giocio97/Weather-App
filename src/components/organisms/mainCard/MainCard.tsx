import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store';
import { fetchWeatherData } from '../../../api';
import { setCurrentCity } from '../../../features/weatherSlice';
import { BsArrowLeft } from 'react-icons/bs';
import './MainCard.css';
import TemperatureIcon from '../../molecules/TemperatureIcon';
import AddCityIcon from '../../atoms/AddCityIcon';
import HourlyForecastDay from '../../molecules/DailyForecast/HourlyForecastDay';
import WeatherForecast from '../../molecules/Weekforecast/WeatherForecast';


interface MainCardProps {
  cityName: string;
  onHomeClick: () => void;
}

const MainCard: React.FC<MainCardProps> = ({ cityName, onHomeClick }) => {
  const currentCity = useAppSelector((state) => state.weather.currentCity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getDefaultCityWeather = async () => {
      try {
        const weatherData = await fetchWeatherData(cityName);
        dispatch(setCurrentCity(weatherData));
      } catch (error) {
        console.error('Errore durante il caricamento della città di default:', error);
      }
    };
    getDefaultCityWeather();
  }, [cityName, dispatch]);

  return (
    <>
      <div className="header-card">
        <BsArrowLeft className="icon" onClick={onHomeClick} />
        {currentCity ? (
          <div className="city-card">
            <h2>{currentCity.name}</h2>
            <p>{currentCity.day}</p>
            <p>{currentCity.description}</p>
          </div>
        ) : (
          <p>Seleziona una città per visualizzare i dati meteo</p>
        )}
        <AddCityIcon />
      </div>
      <TemperatureIcon />
      <HourlyForecastDay/>
      <WeatherForecast/>
      
      
    </>
  );
};

export default MainCard;
