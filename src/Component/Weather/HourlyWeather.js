import React from 'react'
import { motion } from 'framer-motion'
import Temperature from './Temperature'
import { windowAction } from '../../state/useWindow'
import { toTwelveHourClock, convertUTCTimestamp } from '../../Functions';

const HourlyWeather = ({unit, data, dispatchForWindow}) => {

     const handleClick = (date, data) => {
          dispatchForWindow(windowAction.setDate(date))
          dispatchForWindow(windowAction.setData(data))
          dispatchForWindow(windowAction.setTimeWeather(true))
     }

     const createHourElements = () => {
          const DOM = [];
          for(let i = 0; i < 24; i++){
               let date = convertUTCTimestamp(data[i].dt);
               DOM.push(
                    <div className="box card" key={data[i].dt} style={{cursor: 'pointer'}} onClick={() => handleClick(date, data[i])}>
                         <span className="sm"> {toTwelveHourClock(date.getHours()) + ':' + date.getMinutes()} {date.getHours() <= 12? 'AM' : 'PM'}</span>
                         <div className="box center" style={{padding: '0.4em 1em'}}>
                              <img src={`https://openweathermap.org/img/wn/${data[i].weather[0].icon}.png`} alt={data[i].weather[0].main}/>
                              <span className="capitalize sm"> {data[i].weather[0].description} </span>
                         </div>
                         <span className="sm"> <Temperature temp={data[i].temp} unit={unit}/> </span>
                    </div>
               )
          }
          return DOM
     }
     
     return (
          <motion.div className="column card" style={{padding: '0 0.5em'}}
          initial={{opacity: 0, scale: 0}}
          animate={{opacity: 1, scale: 1}}
          transition={{type: 'spring', damping: 15, mass: 0.8, bounce: 0 }}>
               <span className="_title"> Today </span>
               <div className="row scrollbar" style={{overflowX: 'auto', padding: '0.5rem 0'}}>
                    {
                         [...createHourElements()]
                    }
               </div>
          </motion.div>
     )
}

export default React.memo(HourlyWeather)
