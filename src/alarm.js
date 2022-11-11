class alarm{
  constructor(id,alarmTime,days){
    this.id='';
    this.alarmTime=''
    this.days=new Array()
  }

  adjustTime(newTime){
    this.alarmTime=newTime
  }
  adjustDays(newDay){
    this.days.push(newDay)
  }
  adjustID(newID){
    this.id=newID
  }
  get getAlarmTime(){
    return this.alarmTime
  }
  get getDays(){
    return this.days
  }
  get getID(){
    return this.id
  }
}

export default alarm