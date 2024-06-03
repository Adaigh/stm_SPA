import { useAuthContext } from "../useAuthContext"
import { useScheduleContext } from "../useScheduleContext"
import { useCalendarContext } from "../useCalendarContext"

import { api_url } from "../../production_variables"

// Create a new appointment
export const useCreateAppointment = () => {

    const {schedule, dispatch} = useScheduleContext()
    const calendar = useCalendarContext().calendar
    const calendarDispatch = useCalendarContext().dispatch

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
            let newCal = {...calendar}
            newCal[updateDate] = newCal[updateDate] ? newCal[updateDate] + 1 : 1
            calendarDispatch({type: 'SET_CALENDAR', payload: newCal})
        }
        return {response, json}
    }

    return {submitApp}
}

// Request a new appointment
export const useRequestAppointment = () => {

    const requestApp = async (newAppt) => {
        // Fetch new appointment details
        const response = await fetch(`${api_url}/api/appointments`, {
            method: 'POST',
            body: JSON.stringify(newAppt),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const json = await response.json()

        return {response, json}
    }

    return {requestApp}
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
export const useUpdateAppointment = () => {
    
    const {user} = useAuthContext()
    const {schedule, dispatch} = useScheduleContext()
    const calendar = useCalendarContext().calendar
    const calendarDispatch = useCalendarContext().dispatch

    const updateApp = async function(app, newApp) {

        const response = await fetch(`${api_url}/api/appointments/` + app._id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.webToken}`},
            body: JSON.stringify(newApp)
        })

        const json = await response.json()

        if(response.ok){
            let updatedAppointments = [...schedule]
            updatedAppointments[updatedAppointments.indexOf(app)] = newApp
            dispatch({type: 'SET_SCHEDULE', payload: updatedAppointments})

            let updateDate = app.date
            let newCal = {...calendar}
            newCal[updateDate] -= 1
            if(newCal[updateDate] === 0) delete newCal[updateDate]
            updateDate = newApp.date
            newCal[updateDate] = newCal[updateDate] ? newCal[updateDate] + 1 : 1
            calendarDispatch({type: 'SET_CALENDAR', payload: newCal})
        }
        return {response, json}
    }
    return {updateApp}
}

// Approve an appointment request (minor update)
export const useApproveAppointment = () => {

    const {user} = useAuthContext();
    const {schedule, dispatch} = useScheduleContext()
    const calendar = useCalendarContext().calendar
    const calendarDispatch = useCalendarContext().dispatch

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
            let newCal = {...calendar}
            newCal[updateDate] = newCal[updateDate] ? newCal[updateDate] + 1 : 1
            calendarDispatch({type: 'SET_CALENDAR', payload: newCal})
        } else {
            window.alert(json.error)
        }
    }

    return {approveApp}
}

// Delete appointment
export const useDeleteAppointment = () => {

    const {user} = useAuthContext();
    const {schedule, dispatch} = useScheduleContext()
    const calendar = useCalendarContext().calendar
    const calendarDispatch = useCalendarContext().dispatch

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
            let updatedAppointments = schedule.filter((app)=> app !== appReq)
            dispatch({type: 'SET_SCHEDULE', payload: updatedAppointments})

            let updateDate = appReq.date
            let newCal = {...calendar}
            newCal[updateDate] -= 1
            if(newCal[updateDate] === 0) delete newCal[updateDate]
            calendarDispatch({type: 'SET_CALENDAR', payload: newCal})
        } else {
            window.alert(json.error)
        }
    }

    return {deleteApp}
}