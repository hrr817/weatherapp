import React, { useState, useEffect } from 'react'
import {AnimatePresence} from 'framer-motion'
import './App.css';
import './background-effects.css';
import Notification from './Component/Reusable/Model/Notification'
import DailyWeather from './Component/Weather/DailyWeather';
import CurrentWeather from './Component/Weather/CurrentWeather';
import HourlyWeather from './Component/Weather/HourlyWeather';
import Searchbar from './Component/Weather/Searchbar';

import SelectedTimeWeather from './Component/Weather/SelectedTimeWeather';
import SelectedDayWeather from './Component/Weather/SelectedDayWeather';

// States
import { useOptions } from './state/useOptions'
import { useData, action } from './state/useData'
import { useWindow } from './state/useWindow'

import { getLocationDB, getLocation, getCurrentWeather, setBackgroundAsWeather } from './Functions'

function App() {
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const [{unit}, dispatchForOptions] = useOptions()
  const [{locations, locationData, weatherData}, dispatchForData] = useData()
  const [windowState, dispatchForWindow] = useWindow();

  const setErrorCallback = React.useCallback(param => setError(param), [])

  // For errors
  useEffect(() => {
    let timeout; 
    if(error) {
      setNotification({
        message: error.message,
        duration: error.duration
      });

      timeout = setTimeout(() => {
        setNotification(null);
        setError(null);
      }, error.duration);
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [error])
  
  // For fetching location and data
  useEffect(() => { 
    if(!locationData && !weatherData){
      (async() => {
        try {
          let res = await getLocationDB();
          dispatchForData(action.setLocationData({place: res.city, country: res.country_name}));
          let { data } = await getCurrentWeather(res.latitude, res.longitude, 'metric'); 
          dispatchForData(action.setWeatherData(data));
          if(data) {
            // set background according to weather
            const { weather } = data.current;
            const id = weather[0].id;
            const icon = weather[0].icon;
            const time = icon.slice(icon.length - 1, icon.length);
            setBackgroundAsWeather(id, time);
          } 
        } catch(e) {
            setError({
              message: 'Something went wrong...',
              duration: 3000
            });
        }
      })();
    }
  }, [locationData, weatherData, dispatchForData])

  // If location is enabled or disabled
  useEffect(() => {
    if(locations) {
      // Check for permissions
      navigator.permissions.query({name: 'geolocation'}).then(
        res => {
          if(res.state === 'denied') {
            dispatchForData(action.setLocations(false));
            setError({
              message: "Enable locations!",
              duration: 3000
            });
            return;
          } else {
              // Get coordinates using Geolocation Web API
              navigator.geolocation.getCurrentPosition(
              // On success
              async({coords}) => { 
                try {
                  let res = await getLocation(coords.latitude, coords.longitude);
                  if(res) {
                    const { city, county, country } = res.results[0].components;
                    dispatchForData(action.setLocationData({place: city? city : county, country: country}));
                  }

                  let { data } = await getCurrentWeather(coords.latitude, coords.longitude, 'metric'); 
                  dispatchForData(action.setWeatherData(data));
                  if(data) {
                    // set background according to weather
                    const { weather } = data.current;
                    const id = weather[0].id;
                    const icon = weather[0].icon;
                    const time = icon.slice(icon.length - 1, icon.length);
                    setBackgroundAsWeather(id, time);
                  } 
                } catch(e) {
                  setError({
                    message: "Something went wrong while fetching data...",
                    duration: 3000
                  });
                }
              }, 
              // On fail
              () => { 
                    setError({
                      message: "Something went wrong with locations...",
                      duration: 3000
                    });
              }, 
              // Options
              { 
                enableHighAccuracy: true,
                maximumAge: 0
              })
          }
      });
    } else {
        // Fetch location geolocation-db
        (async() => {
          // fetch location data
          let res = await getLocationDB();
          dispatchForData(action.setLocationData({place: res.city? res.city : 'Somewhere', country: res.country_name}));
          // fetch weather data
          let { data } = await getCurrentWeather(res.latitude, res.longitude, 'metric'); 
          dispatchForData(action.setWeatherData(data));
          if(data) {
            // set background according to weather
            const { weather } = data.current;
            const id = weather[0].id;
            const icon = weather[0].icon;
            const time = icon.slice(icon.length - 1, icon.length);
            setBackgroundAsWeather(id, time);
          } 
        })();
    }
  }, [locations, dispatchForData])

  console.log(weatherData)

  if(!weatherData) return (
      <div className="float column">
          <p style={{fontSize: '1.2rem', marginTop: '-2em'}}>Weather App</p>
          <div>
            <div className="loading"></div>
          </div>
      </div>
  )

  return (
    <div className="App">
      <AnimatePresence>{ notification && <Notification message={notification.message} duration={notification.duration}/>}</AnimatePresence>
      <Searchbar unit={unit} locations={locations} dispatchForOptions={dispatchForOptions} dispatchForData={dispatchForData} setError={setErrorCallback}/>
      <CurrentWeather unit={unit} data={weatherData && weatherData.current} location={locationData} dispatchForOptions={dispatchForOptions}/>
      <HourlyWeather unit={unit} data={weatherData && weatherData.hourly} dispatchForWindow={dispatchForWindow}/>
      <DailyWeather unit={unit} data={weatherData && weatherData.daily} dispatchForWindow={dispatchForWindow}/>
      <br/><br/><br/><br/>
      
      {/* Conditionally Rendered */}
      <AnimatePresence>
      { windowState.showTimeWeather && <SelectedTimeWeather unit={unit} state={windowState} dispatchForWindow={dispatchForWindow}/> } 
      </AnimatePresence>

      {/* Conditionally Rendered */}
      <AnimatePresence>
      { windowState.showDayWeather && <SelectedDayWeather unit={unit} state={windowState} dispatchForWindow={dispatchForWindow}/> } 
      </AnimatePresence>
    </div> 
  )
  }

export default App;
