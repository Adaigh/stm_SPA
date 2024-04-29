import { useEffect, useState } from "react"
import ScheduleDetails from "./ScheduleDetails"
import'./styles/ScheduleWeekly.css'

const ScheduleWeekly = ({date}) => {

    const [weekStart, setWeekStart] = useState(null)
    const [weekdays, setWeekdays] = useState([])

    useEffect(() => {
        const weekInit = () => {
            if(!weekStart) {
                if(date.getDay() !== 0){
                    setWeekStart(new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDate() - date.getDay()))
                } else {
                    setWeekStart(date)
                }
            } else {
                let days = []
                for(let i=0; i<7; i++){
                    days.push(new Date(
                        weekStart.getFullYear(),
                        weekStart.getMonth(),
                        weekStart.getDate() + i
                    ).toLocaleDateString())   
                }
                setWeekdays(days)
            }
        }
        weekInit()
    }, [date, weekStart])

    return (
        <>
        {weekdays.length>0 &&
        <div className='schedule-weekly'>
            <ScheduleDetails dow={'Mon'} date={weekdays[1]}/>
            <ScheduleDetails dow={'Tue'} date={weekdays[2]}/>
            <ScheduleDetails dow={'Wed'} date={weekdays[3]}/>
            <ScheduleDetails dow={'Thu'} date={weekdays[4]}/>
            <ScheduleDetails dow={'Fri'} date={weekdays[5]}/>
        </div>}
        </>
    )
}

export default ScheduleWeekly