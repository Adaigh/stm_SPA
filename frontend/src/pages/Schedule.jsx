import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useScheduleContext } from '../hooks/useScheduleContext'
import ScheduleWeekly from '../components/ui/ScheduleWeekly'
import CalendarDisplay from '../components/ui/CalendarDisplay'
import AppointmentRequest from '../components/ui/AppointmentRequest'
import './styles/Schedule.css'

const Schedule = () => {

    const {schedule,dispatch} = useScheduleContext()
    const {user} = useAuthContext()

    const [currentDate, setCurrentDate] = useState(new Date())
    const [monthly, setMonthly] = useState(false)

    useEffect(() => {

        const getSchedule = async () => {
            const response = await fetch ('/api/appointments/', {
                method: "GET",
                headers: {'Authorization': `Bearer ${user.webToken}`}
            })
    
            const json = await response.json()
            if(response.ok) dispatch({type: 'SET_SCHEDULE', payload: json})
        }

        getSchedule()

    }, [user, dispatch])

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