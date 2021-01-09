import React from 'react'
import {motion} from 'framer-motion'
import '../../../App.css'

const Notification = (props) => {

     return (
          <motion.div className="notification-float"
          initial={{ y: '-200%'}} 
          animate={{ y: '0'}}
          exit={{ y: '-200%'}}
          transition={{type: 'spring', damping: 12, stiffness: 60, mass: 0.8, bounce: 0 }}>
               <div className="notification row space-between">
                    {props.message}
               </div>
          </motion.div>
     )
}

export default React.memo(Notification)
