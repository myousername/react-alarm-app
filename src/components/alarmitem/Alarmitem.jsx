import React from 'react'
import './alarmitem.css'
import {FaTrashAlt} from 'react-icons/fa'

const AlarmItem = ({item,handleDelete}) => {
  return (
    <div>
      <li>
        <p>
          {item.alarmTime},
          {item.days}
        </p>
        <FaTrashAlt
                  onClick={() => handleDelete(item.id)}
                  role="button"
                  tabIndex="0"
                  aria-label={`Delete ${item.id}`}
        />
      </li>
    </div>
  )
}

export default AlarmItem