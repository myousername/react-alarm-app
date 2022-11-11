import React from 'react'
import { daysOfWeek } from './daysOfWeek'
import './addAlarm.css'
import alarm from '../../alarm'
import {FaPlus} from 'react-icons/fa'
import { useRef } from 'react';

const AddAlarm = ({newAlarmTime,setNewAlarmTime,checkedState,setCheckedState,handleSubmit}) => {

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  const inputRef = useRef();

  return (
    <div className='addAlarm'>
      <form className='addForm' onSubmit={handleSubmit}>
        <input
          autoFocus
          ref={inputRef}
          type='text'
          placeholder='Add Alarm'
          required
          value={newAlarmTime}
          onChange={(e) => setNewAlarmTime(e.target.value)}
        />
        <ul>
          {daysOfWeek.map(({ name }, index) => {
            return (
              <li key={index}>
                <div className="daysList">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
              </li>
            );
          })}
        </ul>
        <button
          type='submit'
          aria-label='Add Alarm'
          onClick={() => inputRef.current.focus()}
        >
          <FaPlus />
        </button>
      </form>
      

    </div>
  )
}

export default AddAlarm