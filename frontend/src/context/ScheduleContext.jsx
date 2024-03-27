import { createContext, useReducer } from "react";
import { useEffect } from "react";

export const ScheduleContext = createContext();

export const scheduleReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SCHEDULE':
            let formattedSchedule = {}
            for (let item of action.payload){
                console.log(item)
                formattedSchedule[item.day] = item.count
            }
            return {
                schedule: formattedSchedule
            }

        default:
            return state
    }
}

export const ScheduleContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(scheduleReducer, {
        schedule: null
    })

    useEffect(() => {
        const getAppt = async () => {
            const response = await fetch('/api/appointments/counts')
            const json = await response.json()
            if(response.ok) dispatch({type: 'SET_SCHEDULE', payload: json})
            return "error"
        }
        console.log("Fetch schedule here on load")
        getAppt()
    }, [])

    console.log(state)

    return (
        <ScheduleContext.Provider value={{...state, dispatch}}>
            {children}
        </ScheduleContext.Provider>
    )
}