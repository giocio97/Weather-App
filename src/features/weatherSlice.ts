import {createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface WeatherData {
    name: string;
    day: string;
    description: string;
    temperature: number;
  }
  
  interface WeatherState {
    currentCity: WeatherData | null;
    cities: WeatherData[];
  }
  
  const initialState: WeatherState = {
    currentCity: null,
    cities: [],
  };
  
  export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
      setCurrentCity: (state, action: PayloadAction<WeatherData | null>) => {
        state.currentCity = action.payload;
      },
      addCity: (state, action: PayloadAction<WeatherData>) => {
        state.cities.push(action.payload);
      },
      removeCity: (state, action: PayloadAction<string>) => {
        state.cities = state.cities.filter(city => city.name !== action.payload);
      },
    },
  });
  
  export const { setCurrentCity, addCity, removeCity } = weatherSlice.actions;