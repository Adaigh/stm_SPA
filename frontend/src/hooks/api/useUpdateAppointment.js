import { useState } from "react"
import { useAuthContext } from "../useAuthContext"
import { useScheduleContext } from "../useScheduleContext"

import { api_url } from "../../production_variables"

export const useUpdateAppointment = () => {
    
    const {user} = useAuthContext()
    const {schedule, dispatch} = useScheduleContext()

    const [error, setError] = useState(null)

    const updateApp = async function(app, newApp, closeForm) {

        const response = await fetch(`${api_url}/api/appointments/` + app._id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.webToken}`},
            body: JSON.stringify(newApp)
        })

        const json = response.json()

        if(response.ok){
            window.alert("Updates Successful!")
            let updatedAppointments = [...schedule]
            updatedAppointments[updatedAppointments.indexOf(app)] = newApp
            dispatch({type: 'SET_SCHEDULE', payload: updatedAppointments})
            setError('')
            closeForm()
            return
        } else {
            setError(json.error)
        }
    }
    return {updateApp, error, setError}
}