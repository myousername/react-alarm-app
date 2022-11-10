class alarm{
  constructor(alarmTime,days){
    this.alarmTime=''
    this.days=new Array()
  }

  adjustTime(newTime){
    this.alarmTime=newTime
  }
  adjustDays(newDay){
    this.days.push(newDay)
  }
}

export default alarm