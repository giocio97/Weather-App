import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store';
import DefaultCityCard from '../../molecules/DefaultCityCard';
import WeatherCard from '../../molecules/WeatherCard';
import AddCityIcon from '../../atoms/AddCityIcon';
import { fetchWeatherData, WeatherData } from '../../../api';

interface CityListProps {
  onCityClick: (cityName: string) => void;
}

const CityList: React.FC<CityListProps> = ({ onCityClick }) => {
  const cities = useAppSelector((state) => state.weather.cities);
  const [defaultCitiesData, setDefaultCitiesData] = useState<{
    [cityName: string]: WeatherData;
  }>({});



  const defaultCities = ['Rome', 'Milan', 'Turin'];
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);
  const requestInterval = 2000; // 2 secondi

  useEffect(() => {
    const fetchDefaultCitiesData = async () => {
      for (const cityName of defaultCities) {
        const currentTime = Date.now();
        if (currentTime - lastRequestTime < requestInterval) {
          await new Promise((resolve) => setTimeout(resolve, requestInterval - (currentTime - lastRequestTime)));
        }
    
        try {
          if (!defaultCitiesData[cityName]) {
            const weatherData = await fetchWeatherData(cityName);
            setDefaultCitiesData((prevData) => ({
              ...prevData,
              [cityName]: {
                ...prevData[cityName],
                temperature: Math.round(weatherData.temperature),
                description: weatherData.description,
                day: weatherData.day,
                currentTime: weatherData.currentTime,
                currentTimeApi: weatherData.currentTimeApi
              }
            }));
            setLastRequestTime(Date.now());
          }
        } catch (error) {
          console.error(`Errore nel recupero dei dati meteo per la città ${cityName}:`, error);
        }
      }
    };

    fetchDefaultCitiesData();
  }, [defaultCities, lastRequestTime, requestInterval, defaultCitiesData]);

  return (
    <div className="city-list">
      <h2>Good Morning! <br /> Mario </h2>
      <h4 className="addCity">
        <AddCityIcon /> Aggiungi Città
      </h4>

      {defaultCities.map((cityName) => (
        <DefaultCityCard
          key={cityName}
          cityName={cityName}
          temperature={defaultCitiesData[cityName]?.temperature ?? 0}
          description={defaultCitiesData[cityName]?.description ?? ''}
          day={defaultCitiesData[cityName]?.day ?? ''}
          currentTime={defaultCitiesData[cityName]?.currentTime ?? ''}
          onClick={() => onCityClick(cityName)}
        />
      ))}

      {cities.map((city) => (
        <WeatherCard key={city.name} city={city} onClick={() => onCityClick(city.name)} />
      ))}
    </div>
  );
};

export default CityList;
