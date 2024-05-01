import { useAuthContext } from "../useAuthContext"
import { useScheduleContext } from "../useScheduleContext";

export const useDeleteAppointment = () => {

    const {user} = useAuthContext();
    const {schedule, dispatch} = useScheduleContext()

    const deleteApp = async (appReq) => {

        const request = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.webToken}`
            }
        }

        const response = await fetch('/api/appointments/' + appReq._id, request)
        const json = response.json()

        let message = ''
        if(response.ok){
            message = "Appointment removed successfully"

            let updatedAppointments = schedule.filter((app)=> {
                return app !== appReq
            })

            dispatch({type: 'SET_SCHEDULE', payload: updatedAppointments})

        } else {
            message = json.error
        }
        return message
    }

    return {deleteApp}
}