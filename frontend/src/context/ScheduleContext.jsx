import { createContext, useReducer } from "react";
import { useEffect } from "react";

export const ScheduleContext = createContext();

export const scheduleReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SCHEDULE':
            return {
                schedule: action.payload
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
        getAppt()
    }, [])

    return (
        <ScheduleContext.Provider value={{...state, dispatch}}>
            {children}
        </ScheduleContext.Provider>
    )
}