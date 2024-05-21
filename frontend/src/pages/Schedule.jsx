import { useEffect, useState } from 'react'

import ScheduleWeekly from '../components/ui/ScheduleWeekly'
import CalendarDisplay from '../components/ui/CalendarDisplay'
import AppointmentRequest from '../components/ui/AppointmentRequest'

import { useScheduleContext } from '../hooks/useScheduleContext'
import { useGetSchedule } from '../hooks/api/useAppointmentsApi'

import './styles/Schedule.css'


const Schedule = () => {

    const {schedule} = useScheduleContext()

    const [currentDate, setCurrentDate] = useState(new Date())
    const [monthly, setMonthly] = useState(false)

    const {getSchedule} = useGetSchedule()

    useEffect(() => {
        if(!schedule) getSchedule()
        // eslint-disable-next-line
    }, [schedule])

    const changeDate = (date) => {
        setCurrentDate(date)
        setMonthly(false)
    }

    return (
        <div className='schedule'>
            
            <div className='scheduleDisplay'>
                <h2>Schedule</h2>
                <hr/>
                <button className='view-button' onClick={
                    () => monthly ? setMonthly(false) : setMonthly(true)
                }>{monthly && <>Week</>}{!monthly && <>Month</>} View</button>
                {!monthly &&
                    <ScheduleWeekly date={currentDate}/>
                }
                {monthly &&
                    <>
                        <CalendarDisplay
                            today={new Date()}
                            selectedDate={currentDate}
                            showNeigors={true}
                            decorated={false}
                            limited={false}
                            setSelectedDate={changeDate}/>
                    </>
                }
            </div>
            <div>
                <h2>Appointment Requests</h2>
                {schedule && schedule.filter((app) => {
                        return app.reviewed === false
                    }).length === 0 && <>No new requests</>}
                <hr/>
                <div className='requests'>
                    {schedule && schedule.filter((app) => {
                        return app.reviewed === false
                    }).map((appReq)=> {
                        return(
                            <AppointmentRequest key={appReq._id} appReq={appReq}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Schedule