import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store';
import { fetchWeatherData } from '../../../api';
import { setCurrentCity } from '../../../features/weatherSlice';


import './MainCardDesk.css';
import TemperatureIcon from '../TemperatureIcon';



interface MainCardDeskProps {
  cityName: string;

}

const MainCardDesk: React.FC<MainCardDeskProps> = ({ cityName, }) => {
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
      <div className="card-desk">
        {currentCity ? (
          <>

            <div className='card-popup'>
              <TemperatureIcon />
            </div>

            <div >
              <h2 className='card-text'>{currentCity.name}</h2>
              <p className='card-text'>{currentCity.day}</p>
              <p className='card-text'>{currentCity.description}</p>
            </div>
          </>

        ) : (
          <p>Seleziona una città per visualizzare i dati meteo</p>
        )}


      </div>



    </>
  );
};

export default MainCardDesk;
