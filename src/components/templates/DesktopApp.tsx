import React, { useState } from 'react';
import MainCardDesk from '../molecules/MainCardDesk/MainCardDesk';
import CityList from '../organisms/CityList/CityList';
import './DesktopApp.css';
import SearchBar from '../molecules/Searchbar/SearchBar';
import AddLocalization from '../atoms/AddLocalization';
import HourlyForecastDay from '../molecules/DailyForecast/HourlyForecastDay';
import WeatherForecast from '../molecules/Weekforecast/WeatherForecast';
import WeatherMonthForecast from '../molecules/monthForecast/MonthForecast';



const DesktopApp: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<string>('Turin');
    const [activeTab, setActiveTab] = useState<'daily' | 'monthly'>('daily');

    const handleCityClick = (cityName: string) => {
        setSelectedCity(cityName);
    };

    const handleTabClick = (tab: 'daily' | 'monthly') => {
        setActiveTab(tab);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-9">
                    <div className="col-12 box">
                        <MainCardDesk cityName={selectedCity} />
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-4">
                                <h4 className='sez-title'>Today</h4>
                                <div>
                                    <HourlyForecastDay />

                                </div>
                            </div>
                            <div className="col-8">
                                <div
                                    className={`tab-button ${activeTab === 'daily' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('daily')}
                                >
                                    This Week
                                </div>
                                <div
                                    className={`tab-button ${activeTab === 'monthly' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('monthly')}
                                >
                                    This Month
                                </div>
                                <div className='card-small'>
                                    {activeTab === 'daily' ? (
                                        <WeatherForecast />
                                    ) : (
                                        <WeatherMonthForecast />
                                    )}
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-3">
                    <CityList onCityClick={handleCityClick} />

                    <h4 className='sez-title'>Search</h4>
                    <div className='sez-search'>

                        <SearchBar />
                    </div>
                    <h4 className='sez-title'>Localization</h4>
                    <div className='local'>

                        <AddLocalization />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopApp;
