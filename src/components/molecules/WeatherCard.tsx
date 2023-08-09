
import React from 'react';
import { getWeatherIcon } from '../../features/WeatherIcon';


interface WeatherCardProps {
  city: {
    name: string;
    day: string;
    temperature: number;
    description: string;
  

  };

  onClick: () => void;



}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, onClick }) => {


  return (
    <div className="city-item" onClick={onClick} >
      <div>
        <h3 >{city.name}</h3>
        <p>{city.day}</p>
        
        
        

      </div>

      {getWeatherIcon(city.description)}
      <p className='temp-item'>{city.temperature}°C</p>


    </div>
  );
};

export default WeatherCard;




