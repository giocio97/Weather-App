import React, { useState } from 'react';
import { useAppDispatch } from '../../../store';
import { fetchWeatherData } from '../../../api';
import { setCurrentCity } from '../../../features/weatherSlice';
import { CgSearch } from "react-icons/cg";
import './searchbar.css'

const SearchBar: React.FC = () => {
  const [city, setCity] = useState('');
  const dispatch = useAppDispatch();
  // const currentCity = useAppSelector((state) => state.weather.currentCity);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const weatherData = await fetchWeatherData(city);
      dispatch(setCurrentCity(weatherData));
    } catch (error) {
      console.error('Errore durante la ricerca della città:', error);
    }
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleChange} placeholder="ex: Miami" />
        <button type="submit"> <CgSearch/></button>
      </form>

    </div>
  );
};

export default SearchBar;
