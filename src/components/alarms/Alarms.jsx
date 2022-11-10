import React from 'react'
import './alarms.css'
import Alarmitem  from '../alarmitem/Alarmitem';
import AlarmItem from '../alarmitem/Alarmitem';

const Alarms = ({alarmslist,handleDelete}) => {
  return (
    <div>
      <ul>
        {alarmslist.map((item) => (
          <AlarmItem 
            key={item.id}
            item={item}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
      
    </div>
  )
}

export default Alarms