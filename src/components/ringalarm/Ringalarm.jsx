import React from 'react'
import './ringalarm.css'

const Ringalarm = ({alarmslist,ringAlarmState,setRingAlarmState}) => {
  
  
  
  return(
    <div>
      {ringAlarmState? (
        <div id="ring-screen">
          <h1>ALARM!!</h1>
          <h4>Alarm</h4>
        </div>
      ) : (
        <></>
      )} 
    </div>
    
  )
}

export default Ringalarm