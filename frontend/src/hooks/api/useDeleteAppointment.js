import { useAuthContext } from "../useAuthContext"
import { useScheduleContext } from "../useScheduleContext";
import { api_url } from "../../production_variables";

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

        const response = await fetch(`${api_url}/api/appointments/` + appReq._id, request)
        const json = await response.json()

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