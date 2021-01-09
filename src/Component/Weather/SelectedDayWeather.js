import React from 'react';
import {motion} from 'framer-motion';
import Temperature from './Temperature';
import { ReactComponent as CloseSVG } from '../../assets/close.svg';

import { windowAction } from '../../state/useWindow';

const DAYS = {
     Mon: 'Monday',
     Tue: 'Tuesday',
     Wed: 'Wednesday',
     Thu: 'Thursday',
     Fri: 'Friday',
     Sat: 'Saturday',
     Sun: 'Sunday'
}

const SelectedDayWeather = ({unit, state, dispatchForWindow}) => {

     const {date, data} = state;

     const handleClick = () => {
          dispatchForWindow(windowAction.setDayWeather(false))
          dispatchForWindow(windowAction.setDate(null))
          dispatchForWindow(windowAction.setData(null))
     }

     return (
          <motion.div className="float"
          style={{zIndex: 99}}
          initial={{ opacity: 0}} 
          animate={{ opacity: 1}}
          exit={{ opacity: 0}}
          transition={{type: 'spring', damping: 15, mass: 0.8, bounce: 0 }}>
               <motion.div className="window-model window-style"
                    initial={{ opacity: 0, scale: 0}} 
                    animate={{ opacity: 1, scale: 1}}
                    exit={{ opacity: 0, scale: 0}}
                    transition={{type: 'spring', damping: 15, mass: 0.8, bounce: 0 }}>
                    <div className="flex-row space-between" style={{marginTop: '0.2em'}}> 
                         <span style={{marginLeft: '1.2rem'}} className="center"> { DAYS[date.toDateString().slice(0, 3).toString()] }, {date.getUTCDate()} </span>
                         <span className="close-icon" onClick={handleClick}> <CloseSVG /> </span>
                    </div>
                    <div className="box">
                         <div className="box center" style={{paddingBottom: '0.5em'}}>
                              <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].main}/>
                              <span className="capitalize"> {data.weather[0].description} </span>
                         </div>
                    </div>
                    <div className="flex-row" style={{justifyContent:'space-around'}}>
                         <span>
                              <Temperature temp={data.temp.min} unit={unit}/>
                         </span>
                         <span style={{fontSize: '1.4rem'}}>
                              <Temperature temp={data.temp.day} unit={unit}/>
                         </span>
                         <span>
                              <Temperature temp={data.temp.max} unit={unit}/>
                         </span>
                    </div>
                    <div className="box desc-container">
                              <div>
                                   <span>Day</span>
                                   <span><Temperature temp={data.feels_like.day} unit={unit}/></span>
                              </div>
                              <div>
                                   <span>Night</span> 
                                   <span><Temperature temp={data.feels_like.night} unit={unit}/></span>
                              </div>
                              <div> 
                                   <span>Humidity</span> 
                                   <span>{data.humidity}%</span>
                              </div>
                              <div> 
                                   <span>Cloudiness</span> 
                                   <span>{data.clouds}%</span>
                              </div>
                              <div> 
                                   <span>Pressure</span> 
                                   <span>{data.pressure} hPa</span>
                              </div>
                              <div> 
                                   <span>UV</span> 
                                   <span>{data.uvi} UV</span>
                              </div>
                              <div> 
                                   <span>Precipitation / Rain</span> 
                                   <span>{data.rain? data.rain : '0'}mm</span>
                              </div>
                              <div> 
                                   <span>Wind</span> 
                                   <span>{data.wind_speed} metre/sec</span>
                              </div>
                              <div> 
                                   <span>Wind Direction</span> 
                                   <span>{data.wind_deg} deg</span>
                              </div>
                    </div>
               </motion.div>
          </motion.div>
     )
}

export default React.memo(SelectedDayWeather)
