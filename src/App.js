import Clock from './components/clock/Clock';
import Ringalarm from './components/ringalarm/Ringalarm';
import Alarms from './components/alarms/Alarms';
import { useState,useEffect } from 'react';
import alarm from './alarm';
import './App.css';
import { daysOfWeek } from './components/addAlarm/daysOfWeek';
import AddAlarm from './components/addAlarm/AddAlarm';

const convertObject = (objectList) => {
  let objectArray=new Array()
  for(let index=0; index<objectList.length; ++index){
    let alarmObject = Object.assign(new alarm, objectList[index])
    objectArray.push(alarmObject)
  }
  return objectArray
}



function App() {


  let ring = false;
  const [alarmslist, setAlarmslist] = useState(JSON.parse(localStorage.getItem('alarmsList')) || []);
  const [alarmObjects,setAlarmObjects] = useState(convertObject(alarmslist))
  const [ringalarmState, setRingAlarmState] = useState(false)
  const[currentTime,setCurrentTime]  = useState(new Date());
  const [checkedState, setCheckedState] = useState(new Array(7).fill(false));
  const [newAlarmTime,setNewAlarmTime] = useState('')

  const getTime = () => {
    let d = new Date();
    setCurrentTime(d);
  }

  

  const checkAlarmRing = () => {
    let currentHour = currentTime.getHours();
    let currentMinute = currentTime.getMinutes();

    for(let index=0; index<alarmObjects.length; ++index){
      let numberList = (alarmObjects[index].alarmTime.split(':')).
        map((item) => parseInt(item))
      if(currentHour == numberList[0] && currentMinute == numberList[1]){
        setRingAlarmState(index);
        setInterval(setRingAlarmState(false),60000)
      }
    }
  }

  setInterval(getTime,500);



  useEffect(() => {
    localStorage.setItem('alarmsList', JSON.stringify(alarmslist));
  }, [alarmslist])


  const handleDelete = (id) => {
    const newAlarms = alarmslist.filter((item) => item.id !== id)
    setAlarmslist(newAlarms)
    setAlarmObjects(convertObject(alarmslist))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newAlarmTime) return
    let thisAlarm = new alarm()
    thisAlarm.adjustTime(newAlarmTime)
    for(let i=0; i<7; ++i){
      if(checkedState[i]){
        thisAlarm.days.push(daysOfWeek[i].name);
      }
    } 

    addAlarm(thisAlarm)
    setAlarmObjects(convertObject(alarmslist))
    setCheckedState(new Array(7).fill(false));
    setNewAlarmTime('')
  }

  const addAlarm = (myNewAlarm) => {
    const newAlarmsList = [...alarmslist,myNewAlarm]
    setAlarmslist(newAlarmsList)
  }

  return (
    <div className="App">
      <h1 id='heading'>Alarm App</h1>
      <Clock newTime={currentTime}/>
      <Ringalarm
        alarmslist={alarmslist}
        ringalarmState={ringalarmState}
        setRingAlarmState={setRingAlarmState} 
      />
      <AddAlarm 
        newAlarmTime={newAlarmTime}
        setNewAlarmTime={setNewAlarmTime}
        checkedState={checkedState}
        setCheckedState={setCheckedState}
        handleSubmit={handleSubmit}
      />
      <Alarms
        alarmslist={alarmslist}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
