import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useMediaQuery } from 'react-responsive';
import MainCard from './components/organisms/mainCard/MainCard';
import CityList from './components/organisms/CityList/CityList';
import FooterBar from './components/molecules/footerbar/FooterBar';
import './App.css';
import DesktopApp from './components/templates/DesktopApp';


const App: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 721 });
  const [selectedCity, setSelectedCity,] = useState<string | null>(null);
  const [backgroundClass, setBackgroundClass] = useState<string>('city-list-bg');

  const handleCityClick = (cityName: string) => {
    setSelectedCity(cityName);
    setBackgroundClass('main-card-bg');
  };

  const handleHomeClick = () => {
    setSelectedCity(null);
    setBackgroundClass('city-list-bg');
  };

  return (
    <Provider store={store}>
      {isMobile ?
        (<div className={`App ${backgroundClass}`}>

          {selectedCity ? (
            <MainCard
              cityName={selectedCity}
              onHomeClick={handleHomeClick} />
          ) : (
            <CityList

              onCityClick={handleCityClick}
            />
          )}
          <FooterBar
            onHomeClick={handleHomeClick} />
        </div>): <DesktopApp/>}
    </Provider>
  );
};

export default App;
