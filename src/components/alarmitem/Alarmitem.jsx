import React from 'react'
import './alarmitem.css'
import {FaTrashAlt} from 'react-icons/fa'

const AlarmItem = ({item,handleDelete}) => {
  return (
    <>
      <li>
        <p>
          {item.alarmTime},
          {item.days}
        </p>
        <div>
          <FaTrashAlt
                  onClick={() => handleDelete(item.id)}
                  role="button"
                  id='trash-button'
                  tabIndex="0"
                  aria-label={`Delete ${item.id}`}
          />
        </div>
        
      </li>
    </>
  )
}

export default AlarmItem