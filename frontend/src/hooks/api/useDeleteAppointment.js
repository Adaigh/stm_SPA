import { useAuthContext } from "../useAuthContext"
import { useScheduleContext } from "../useScheduleContext";

export const useDeleteAppointment = () => {

    const {user} = useAuthContext();
    const {schedule, dispatch} = useScheduleContext()

    const deleteApp = async (appReq) => {

        if(!window.confirm("Are you sure you want to delete this appointment?")) {
            return
        }

        const request = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.webToken}`
            }
        }

        const response = await fetch('/api/appointments/' + appReq._id, request)
        const json = response.json()

        if(response.ok){

            let updatedAppointments = schedule.filter((app)=> {
                return app !== appReq
            })

            dispatch({type: 'SET_SCHEDULE', payload: updatedAppointments})

        } else {
            window.alert(json.error)
        }
    }

    return {deleteApp}
}