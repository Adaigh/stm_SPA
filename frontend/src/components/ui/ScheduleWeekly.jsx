import ScheduleDetails from "./ScheduleDetails"

const ScheduleWeekly = ({date, schedule}) => {

    return (
        <div className='schedule-weekly'>
            {date && <ScheduleDetails day={date.toLocaleDateString()}/>}
            
        </div>
    )
}

export default ScheduleWeekly