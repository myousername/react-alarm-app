import Clock from './components/clock/Clock';
import Ringalarm from './components/ringalarm/Ringalarm';
import Alarms from './components/alarms/Alarms';
import { useState,useEffect,useRef,useCallback } from 'react';
import alarm from './alarm';
import './App.css';
import { daysOfWeek } from './components/addAlarm/daysOfWeek';
import AddAlarm from './components/addAlarm/AddAlarm';

const convertObject = (objectList) => {
  let objectArray=[]
  for(let index=0; index<objectList.length; ++index){
    let alarmObject = Object.assign(new alarm(), objectList[index])
    objectArray.push(alarmObject)
  }
  return objectArray
}



function App() {


  const [alarmslist, setAlarmslist] = useState(JSON.parse(localStorage.getItem('alarmsList')) || []);
  const [alarmObjects,setAlarmObjects] = useState(convertObject(alarmslist))
  const [ringAlarmState, setRingAlarmState] = useState(false)
  const[currentTime,setCurrentTime]  = useState(new Date());
  const [checkedState, setCheckedState] = useState(new Array(7).fill(false));
  const [newAlarmTime,setNewAlarmTime] = useState('')




  const changeTime = () => {
    let d = new Date();
    setCurrentTime(d);
  }

  useEffect(()=> {
    setInterval(changeTime,500)
  },[]);
  

  useEffect(() => {
    localStorage.setItem('alarmsList', JSON.stringify(alarmslist));
  }, [alarmslist])

  const checkAlarmRing = useCallback(()=>{
    let d = new Date()
    let hours = d.getHours()
    let minutes = d.getMinutes()
    for(let index=0; index < (alarmslist.length); ++index){
      let numberList = (alarmslist[index].alarmTime.split(':')).map((item) => parseInt(item))
      if(numberList[0] === hours && numberList[1] === minutes){
        setRingAlarmState(true)
        setTimeout(()=>{
          setRingAlarmState(false)}
        ,60000)
      }
    }
  },[alarmslist])

  const ringID = useRef(null)


  const handleDelete = (id) => {
    let newAlarms = alarmslist.filter((item) => item.id !== id)
    for(let index=0; index<newAlarms.length; ++index){
      (newAlarms[index]).id=(index+1)
    }
    clearInterval(ringID.current)
    setAlarmslist(newAlarms)
    setAlarmObjects(convertObject(alarmslist))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newAlarmTime) return
    let thisAlarm = new alarm()
    const id = alarmslist.length ? alarmslist[alarmslist.length - 1].id + 1 : 1
    thisAlarm.adjustID(id)
    thisAlarm.adjustTime(newAlarmTime)
    for(let i=0; i<7; ++i){
      if(checkedState[i]){
        thisAlarm.days.push(daysOfWeek[i].name);
      }
    } 
    const newAlarmsList = [...alarmslist,thisAlarm]
    clearInterval(ringID.current)
    setAlarmslist(newAlarmsList)
    setAlarmObjects(convertObject(alarmslist))
    setCheckedState(new Array(7).fill(false));
    setNewAlarmTime('')
  }
  

  useEffect(() => {
    if(!ringAlarmState){
      ringID.current = setInterval(checkAlarmRing,2000)
    }else{
      clearInterval(ringID.current)
    }
    console.log('ONCE')

    return () => clearInterval(ringID.current)
    
  },[ringAlarmState,checkAlarmRing])
  
  
  return (
    <div className="App">
      <h1 id='heading'>Alarm App</h1>
      <Clock newTime={currentTime}/>
      <Ringalarm
        alarmslist={alarmslist}
        ringAlarmState={ringAlarmState}
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
