import { useEffect, useState } from 'react'

import ScheduleWeekly from '../components/ui/ScheduleWeekly'
import CalendarDisplay from '../components/ui/CalendarDisplay'
import AppointmentRequest from '../components/ui/AppointmentRequest'
import AboutPane from '../components/ui/AboutPane'

import { useScheduleContext } from '../hooks/useScheduleContext'
import { useGetSchedule } from '../hooks/api/useAppointmentsApi'

import './styles/Schedule.css'

const Schedule = () => {

    const { schedule } = useScheduleContext()

    const [currentDate, setCurrentDate] = useState(new Date())
    const [monthly, setMonthly] = useState(false)

    const { getSchedule } = useGetSchedule()

    useEffect(() => {
        if (!schedule) getSchedule()
        // eslint-disable-next-line
    }, [schedule])

    const changeDate = (date) => {
        setCurrentDate(date)
        setMonthly(false)
    }

    const nextWeek = (e) => {
        e.preventDefault()
        const msPerWeek = 604800000  // 7d * 24h * 60m * 60s * 1000ms
        const newDT = currentDate.getTime() + msPerWeek
        setCurrentDate(new Date(newDT))
    }

    const prevWeek = (e) => {
        e.preventDefault()
        const msPerWeek = 604800000  // 7d * 24h * 60m * 60s * 1000ms
        const newDT = currentDate.getTime() - msPerWeek
        setCurrentDate(new Date(newDT))
    }

    const goToToday = (e) => {
        e.preventDefault()
        setCurrentDate(new Date())
    }

    const toggleMonthly = (e) => {
        e.preventDefault()
        setMonthly(!monthly)
    }

    // Fetch updates every 15 minutes
    const msInterval = 900000 // 15m * 60s * 1000ms
    setInterval(() => getSchedule(), msInterval)

    return (
        <>
            <AboutPane header="Shop Schedule" >
                <ul>
                    <li>This page allows you to view and manage shop appointments.</li>
                    <li>New appointment requests are updated every 15 minutes while the window is open.</li>
                </ul>
            </AboutPane>

            <div className='schedule'>
                <div className='scheduleDisplay'>
                    <div className='button-bar'>
                        {!monthly && <button className='view-button' onClick={e => prevWeek(e)}>
                            &lt;
                        </button>}
                        <button className='view-button monthly' onClick={(e) => toggleMonthly(e)}>
                            {monthly && <>Week</>}{!monthly && <>Month</>} View
                        </button>
                        {!monthly && <button className='view-button' onClick={e => goToToday(e)}>
                            This Week
                        </button>}
                        {!monthly && <button className='view-button' onClick={e => nextWeek(e)}>
                            &gt;
                        </button>}
                    </div>
                    {!monthly &&
                        <ScheduleWeekly date={currentDate} />
                    }
                    {monthly &&
                        <>
                            <CalendarDisplay
                                today={new Date()}
                                selectedDate={currentDate}
                                showNeighbors={true}
                                decorated={false}
                                limited={false}
                                setSelectedDate={changeDate} />
                        </>
                    }
                </div>
                <div className='schedule-requests'>
                    <h2>Appointment Requests</h2>
                    {schedule && schedule.filter((app) => {
                        return app.reviewed === false
                    }).length === 0 && <>No new requests</>}
                    <hr />
                    <div className='requests'>
                        {schedule && schedule.filter((app) => {
                            return app.reviewed === false
                        }).map((appReq) => {
                            return (
                                <AppointmentRequest key={appReq._id} appReq={appReq} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Schedule