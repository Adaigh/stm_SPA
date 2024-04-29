import { createContext, useReducer } from "react";

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
    
    return (
        <ScheduleContext.Provider value={{...state, dispatch}}>
            {children}
        </ScheduleContext.Provider>
    )
}
