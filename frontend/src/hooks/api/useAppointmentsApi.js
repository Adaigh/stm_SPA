import { useState } from "react"
import { useAuthContext } from "../useAuthContext"
import { useScheduleContext } from "../useScheduleContext"
import { useCalendarContext } from "../useCalendarContext"

import { api_url } from "../../production_variables"

// Create a new appointment
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

// Fetch detailed schedule
export const useGetSchedule = () => {

    const {user} = useAuthContext()
    const {dispatch} = useScheduleContext()

    const getSchedule = async () => {
        const response = await fetch (`${api_url}/api/appointments/`, {
            method: "GET",
            headers: {'Authorization': `Bearer ${user.webToken}`}
        })
        const json = await response.json()
        if(response.ok) {
            dispatch({type: 'SET_SCHEDULE', payload: json})
        }
    }
    return {getSchedule}
}

// Update appointment request
// TODO: verify calendar is updated if date changes
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

        const json = await response.json()

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

// Approve an appointment request (minor update)
export const useApproveAppointment = () => {

    const {user} = useAuthContext();
    const {schedule, dispatch} = useScheduleContext()

    let calendar = useCalendarContext().calendar
    let calendarDispatch = useCalendarContext().dispatch

    const approveApp = async (appReq) => {
        let reviewedAppointment = {...appReq}
        reviewedAppointment.reviewed = true

        const response = await fetch(`${api_url}/api/appointments/` + appReq._id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.webToken}`},
            body: JSON.stringify(reviewedAppointment)
        })

        const json = await response.json()

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

// Delete appointment
// TODO: verify calendar is updated after delete
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