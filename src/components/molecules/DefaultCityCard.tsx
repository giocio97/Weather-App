import React from 'react';
import { getWeatherIcon } from '../../features/WeatherIcon';

interface DefaultCityCardProps {
  cityName: string;
  temperature: number;
  description: string;
  currentTime: string; 
  day: string;
  onClick: () => void;
}

const DefaultCityCard: React.FC<DefaultCityCardProps> = ({ cityName, temperature, description, day, currentTime, onClick }) => {
  return (
    <div className="city-item" onClick={onClick}>
      <div>
        <h3>{cityName}</h3>
        <p>{day}</p>
        <p>{currentTime}</p>
        
      </div>
      {getWeatherIcon(description)}
      <p className='temp-item'>{temperature} °C</p>
    </div>
  );
};

export default DefaultCityCard;
