import React from 'react';
import {motion} from 'framer-motion'
import { convertUTCTimestamp } from '../../Functions';
import { windowAction } from '../../state/useWindow'

const DailyWeather = ({data, dispatchForWindow}) => {

     const handleClick = (date, data) => {
          dispatchForWindow(windowAction.setDate(date))
          dispatchForWindow(windowAction.setData(data))
          dispatchForWindow(windowAction.setDayWeather(true))
     }
     
     const createDayElementArray = () => {

          const arr = [];

          for(let i = 0; i < 7; i++) {
               let date = convertUTCTimestamp(data[i].dt)
               let day = date.toDateString().slice(0, 3).toString();
               arr.push(
                    <motion.div className="box card" key={data[i].dt} style={{cursor: 'pointer'}} onClick={() => handleClick(date, data[i])}
                    whileHover={{scale: 1.2}}
                    transition={{type: 'spring', damping: 15, mass: 0.8, bounce: 0 }}>
                         <span className="sm" style={{fontWeight: 'bold'}}> { day } </span>
                         <div className="box center" style={{padding: '0.4em 1em'}}>
                              <img src={`https://openweathermap.org/img/wn/${data[i].weather[0].icon}.png`} alt={data[i].weather[0].main}/>
                              <span className="capitalize sm"> {data[i].weather[0].description} </span>
                         </div>
                    </motion.div>
               )

          }
          return arr;
     }

     return (
          <motion.div className="column card" style={{padding: '0 0.5em'}}
          initial={{opacity: 0, scale: 0}}
          animate={{opacity: 1, scale: 1}}
          transition={{type: 'spring', damping: 20, mass: 0.8, bounce: 0 }}>
               <span className="_title"> <span> This Week</span> </span>
               <div className="row scrollbar" style={{overflowX: 'scroll', padding: '0.5rem 0'}}>
                    {
                         [...createDayElementArray()]
                    }
               </div>
          </motion.div>
     )
}

export default React.memo(DailyWeather)
