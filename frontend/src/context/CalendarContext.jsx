import { createContext, useReducer } from "react";
import { useEffect } from "react";

export const CalendarContext = createContext();

export const calendarReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CALENDAR':
            return {
                calendar: action.payload
            }

        default:
            return state
    }
}

export const CalendarContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(calendarReducer, {
        calendar: null
    })

    useEffect(() => {
        const getAppt = async () => {
            const response = await fetch('/api/appointments/counts')
            const json = await response.json()
            if(response.ok) dispatch({type: 'SET_CALENDAR', payload: json})
            else return "error"
        }
        getAppt()
    }, [])

    return (
        <CalendarContext.Provider value={{...state, dispatch}}>
            {children}
        </CalendarContext.Provider>
    )
}