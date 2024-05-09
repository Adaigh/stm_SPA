import { useCalendarContext } from "../useCalendarContext"
import { useScheduleContext } from "../useScheduleContext"
import { api_url } from "../../production_variables"

export const useCreateAppointment = () => {

    const {schedule, dispatch} = useScheduleContext()
    
    let calendar = useCalendarContext().calendar
    let calendarDispatch = useCalendarContext().dispatch

    const submitApp = async (newAppt) => {
        // Fetch new appointment details
        const response = await fetch(`${api_url}/api/appointments`, {
            method: 'POST',
            body: JSON.stringify(newAppt),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const json = await response.json()

        if(response.ok){
            let updatedAppointments = [...schedule]
            updatedAppointments.push(json)
            dispatch({type: 'SET_SCHEDULE', payload: updatedAppointments})

            let updateDate = newAppt.date
            calendar[updateDate] = calendar[updateDate] ? calendar[updateDate] + 1 : 1
            calendarDispatch({type: 'SET_CALENDAR', payload: calendar})
        }
        return {response, json}
    }

    return {submitApp}
}