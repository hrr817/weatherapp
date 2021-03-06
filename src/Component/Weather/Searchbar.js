import React, { useState, useEffect, useRef } from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import { toggleUnit } from '../../state/useOptions'
import { action } from '../../state/useData'

import { getLocationCoord, getCurrentWeather, setBackgroundAsWeather } from '../../Functions'

import {ReactComponent as SearchIcon} from '../../assets/search.svg'
import {ReactComponent as SettingIcon} from '../../assets/settings.svg'

const toggleTheme = () => {
     let body = document.getElementsByTagName('body')[0];
     let theme = body.getAttribute('data-theme');
     let newTheme = theme === 'light'? 'dark' : 'light';
     body.setAttribute('data-theme', newTheme);
     localStorage.setItem('weatherapp-theme', newTheme);
     return newTheme;
}

const Modal = ({ unit, locations, dispatchForOptions, dispatchForData}) => {

     const [theme, setTheme] = useState(() => document.getElementsByTagName('body')[0].getAttribute('data-theme'))
     const [backgroundEffect, setBackgroundEffect] = useState({effect: document.getElementsByTagName('body')[0].getAttribute('data-weather'), on: true});

     const changeTheme = () => {
          setTheme(toggleTheme())
     }

     const toggleEffect = () => {
          setBackgroundEffect(state => ({...state, on: !state.on}));
     }

     useEffect(() => {
          if(backgroundEffect.on){
               document.getElementsByTagName('body')[0].setAttribute('data-weather', backgroundEffect.effect);
          } else {
               document.getElementsByTagName('body')[0].setAttribute('data-weather', 'no-weather-background');
          }
     }, [backgroundEffect]);

     return (
          <motion.div className="modal-container"
          initial={{ y: '200%'}} 
          animate={{ y: '0'}}
          exit={{ y: '200%'}}
          transition={{type: 'spring', damping: 12, stiffness: 60, mass: 0.8, bounce: 0 }}>
               <motion.div className="modal column">
                    <div className="row space-between p-02" style={{alignItems: 'center'}}>
                         <span>Dark Mode</span>
                         <span className="toggle-btn" onClick={changeTheme} style={{textTransform: 'capitalize'}}> {theme} </span>
                    </div>
                    <div className="row space-between p-02" style={{alignItems: 'center'}}>
                         <span>Locations</span>
                         <span onClick={() =>  dispatchForData(action.toggleLocations())} className="toggle-btn">
                              {locations? 'On' : 'Off'}
                         </span>
                    </div>
                    <div className="row space-between p-02" style={{alignItems: 'center'}}>
                         <span>Temperature (Unit)</span>
                         <span onClick={() => dispatchForOptions(toggleUnit()) } className="toggle-btn"> {unit} </span>
                    </div>
                    <div className="row space-between p-02" style={{alignItems: 'center'}}>
                         <span>Background Effect</span>
                         <span onClick={toggleEffect} className="toggle-btn"> {backgroundEffect.on? 'On' : 'Off'} </span>
                    </div>
               </motion.div>
          </motion.div>
     )
}

const Searchbar = ({ unit, locations, dispatchForOptions, dispatchForData, setError }) => {

     const query = useRef(null)
     const [showModal, setModal] = useState(false);
     const [searching, setSearching] = useState(false);
     const [updating, setUpdating] = useState(null);
     const toggleModal = () => { setModal(!showModal) }

     useEffect(() => {
          if(query.current.focus === true) {
               setSearching(true);
          } 
     }, [query]);

     const handleSearch = () => {
          let place = query.current.value;
          setSearching(true);
          if(place === '') return

          (async() => {
               try {
                    setUpdating({
                         update: 'Finding location...'
                    });
                    let res = await getLocationCoord(place);
                    if(res.data.results.length) { // Location found
                         const { formatted, geometry: {lat, lng} } = res.data.results[0];
                         dispatchForData(action.setLocationData({formatted: formatted}));

                         setUpdating({
                              update: 'Getting weather updates...'
                         });
                         let {data} = await getCurrentWeather(lat, lng, 'metric');
                         dispatchForData(action.setWeatherData(data));
                         if(data) {
                              // set background according to weather
                              const { weather } = data.current;
                              const id = weather[0].id;
                              const icon = weather[0].icon;
                              const time = icon.slice(icon.length - 1, icon.length);
                              setBackgroundAsWeather(id, time);
                         } 
                         setUpdating(null);
                         setSearching(false);
                    } else { // No such location found
                         setUpdating(null);
                         setSearching(false);
                         setError({
                              message: `Sorry, we could not find ${place}.`,
                              duration: 3000
                         });
                    }
               } catch(e){ 
                    setUpdating(null);
                    setError({
                         message: `Something went wrong...`,
                         duration: 3000
                    });
                    setSearching(false);
               }
          })();
     }

     return (
          <>
          { updating && <motion.div className="float column" style={{zIndex: '999'}}
                         initial={{ opacity: 0}} 
                         animate={{ opacity: 1}}
                         exit={{ opacity: 0}}
                         transition={{type: 'spring', damping: 15, mass: 0.8, bounce: 0 }}>
               <p style={{fontSize: '1.2rem', marginTop: '-2em'}}>{updating.update}</p>
               <div>
                    <div className="loading"></div>
               </div>
          </motion.div> }
          <motion.div className="bar-container"
          initial={{opacity: 0, y: '200%'}}
          animate={{opacity: 1, y: 0}}
          transition={{type: 'spring', damping: 20, mass: 0.8, bounce: 0 }}>
               <AnimatePresence>
               {showModal && <Modal unit={unit} locations={locations} dispatchForOptions={dispatchForOptions} dispatchForData={dispatchForData}/>}
               </AnimatePresence>
               <span className="bar row">
                    <input ref={query} type="text" placeholder={'...'} className="search-input" 
                         onFocus={() => setSearching(true)} 
                         onBlur={() => setSearching(false)} 
                         autoComplete="true"/>
                    <span className="contain">
                         <AnimatePresence>
                         { !searching && 
                              <motion.span onClick={toggleModal} className="btn"
                              initial={{ opacity: 0, scale: 0}} 
                              animate={{ opacity: 1, scale: 1}}
                              exit={{ opacity: 0, scale: 0}}
                              whileTap={{scale: 0.95}}
                              transition={{type: 'spring', damping: 15, mass: 0.8, bounce: 0 }}>
                              <SettingIcon />
                              </motion.span> 
                         }
                         </AnimatePresence>
                         
                         <AnimatePresence>
                         { searching && 
                              <motion.span onClick={handleSearch} className="btn"
                              initial={{ opacity: 0, scale: 0}} 
                              animate={{ opacity: 1, scale: 1}}
                              exit={{ opacity: 0, scale: 0}}
                              whileTap={{scale: 0.95}}
                              transition={{type: 'spring', damping: 15, mass: 0.8, bounce: 0 }}>
                              <SearchIcon/>
                         </motion.span> }
                         </AnimatePresence>
                    </span>
               </span>
          </motion.div> 
          </>
     )
}

export default React.memo(Searchbar)
