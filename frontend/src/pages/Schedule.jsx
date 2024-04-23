import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import ScheduleWeekly from '../components/ui/ScheduleWeekly'

const Schedule = () => {

    const [currentSchedule, setCurrentSchedule] = useState([])

    const {user} = useAuthContext()

    const [currentDate] = useState(new Date())
    const [monthly, setMonthly] = useState(false)

    useEffect(() => {

        const getSchedule = async () => {
            const response = await fetch ('/api/appointments/', {
                method: "GET",
                headers: {'Authorization': `Bearer ${user.webToken}`}
            })
    
            const json = await response.json()
            if(response.ok) setCurrentSchedule(json)
        }

        getSchedule()

    }, [user])

    const weekday = (num) => {
        const date = new Date()
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + num)
    }

    console.log(currentSchedule)

    return (
        <div className='schedule'>
            <h1>{currentDate.toLocaleDateString()}</h1>
            <button onClick={
                () => monthly ? setMonthly(false) : setMonthly(true)
            }>{monthly && <>Week</>}{!monthly && <>Month</>} View</button>
            <div className='scheduleDisplay'>
            {!monthly &&
                <>
                <ScheduleWeekly date={weekday(0)} schedule={currentSchedule}/>
                <ScheduleWeekly date={weekday(1)} schedule={currentSchedule}/>
                <ScheduleWeekly date={weekday(2)} schedule={currentSchedule}/>
                </>
            }
            {monthly &&
                <>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                </>
            }
            </div>
        </div>
    )
}

export default Schedule