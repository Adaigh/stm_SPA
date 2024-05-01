import './styles/ScheduleDetails.css'
import {formatPhone} from '../../hooks/useUtils'
import { useScheduleContext } from '../../hooks/useScheduleContext'
import { useEffect, useState } from 'react'

const ScheduleDetails = ({dow, date}) => {

    const {schedule} = useScheduleContext()
    const [day, setDay] = useState(null)

    useEffect(() => {
        if(schedule) setDay(
                schedule.filter((x)=> x.date === date)
                .filter((x) => x.reviewed === true))
    },[schedule, date])

    return (
        <div className='schedule-day'>
            {day && 
            <>
            <h2>{dow}, {new Date(date).toLocaleString({}, {month: 'short', day: 'numeric'})}</h2>
            <hr/>
            {day.length === 0 && <div>No Appointments</div>}
            {day.map((app) => {
                return (
                    <div key={app._id} className='appointment'>
                        {app.firstName} {app.lastName} <span className='material-symbols-outlined delete' >delete</span>
                        <br/>
                        {formatPhone(app.phoneNumber)}
                        <br/>
                        {app.vehicle.vehicleYear}&nbsp;
                        {app.vehicle.vehicleMake}&nbsp;
                        {app.vehicle.vehicleModel}&emsp;
                        VIN: {app.vehicle.vehicleVIN}
                        <br/>
                        {app.description}
                        <hr/>
                    </div>
                )
            })}
            </>
            }
        </div>
    )
}

export default ScheduleDetails