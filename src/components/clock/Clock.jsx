import './clock.css'
import Time from '../time/Time';

import React from 'react'



const Clock = ({newTime}) => {
  let hours = newTime.getHours();
  let minutes = newTime.getMinutes();
  let seconds = newTime.getSeconds();
    
  return (
    
    <div id='clock'>
      <Time text={hours}/><p>:</p>
      <Time text={minutes}/><p>:</p>
      <Time text={seconds}/>
    </div>
  )
}

export default Clock