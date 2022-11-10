import React from 'react'
import './ringalarm.css'

const Ringalarm = ({alarmslist,ringalarmState,setRingAlarmState}) => {
  
  let currentAlarm = null,currentTime=null
  if(ringalarmState){
   currentAlarm= (alarmslist.filter((index) => (index === ringalarmState)))[0];
   currentTime = currentAlarm.alarmTime;
  }
  
  return(
    <div>
      {ringalarmState? (
        <div id="ring-screen">
          <h1>ALARM!!</h1>
          <h4>Alarm {ringalarmState+1}</h4>
          <h3>{currentTime}</h3>
        </div>
      ) : (
        <></>
      )} 
    </div>
    
  )
}

export default Ringalarm