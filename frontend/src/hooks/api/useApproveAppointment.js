import { useAuthContext } from "../useAuthContext"
import { useScheduleContext } from "../useScheduleContext";
import { useCalendarContext } from "../useCalendarContext";

export const useApproveAppointment = () => {

    const {user} = useAuthContext();
    const {schedule, dispatch} = useScheduleContext()

    let calendar = useCalendarContext().calendar
    let calendarDispatch = useCalendarContext().dispatch

    const approveApp = async (appReq) => {
        let reviewedAppointment = {...appReq}
        reviewedAppointment.reviewed = true

        const response = await fetch('/api/appointments/' + appReq._id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.webToken}`},
            body: JSON.stringify(reviewedAppointment)
        })

        const json = response.json()

        if(response.ok){

            let updatedAppointments = [...schedule]
            updatedAppointments[updatedAppointments.indexOf(appReq)] = reviewedAppointment
            dispatch({type: 'SET_SCHEDULE', payload: updatedAppointments})
            
            let updateDate = reviewedAppointment.date
            calendar[updateDate] = calendar[updateDate] ? calendar[updateDate] + 1 : 1
            calendarDispatch({type: 'SET_CALENDAR', payload: calendar})
            return
        } else {
            window.alert(json.error)
        }
    }

    return {approveApp}
}