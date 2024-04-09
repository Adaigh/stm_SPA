import { createContext, useEffect, useReducer } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const DetailsContext = createContext()

export const detailsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_DETAILS':
            return { details: action.payload }

        case 'CLEAR_DETAILS':
            return { details: null }

        default:
            return state
    }
}

export const DetailsContextProvider = ({children}) => {
    const[state, dispatch] = useReducer(detailsReducer, {
        details: null
    })
    const {user} = useAuthContext()

    useEffect(  () => {
        const getDetails = async (token) => {
            const response = await fetch('/api/customers/details', {
                headers: {'Authorization': `Bearer ${token}`}
            })
            const json = await response.json()
            if(response.ok) dispatch({type: 'SET_DETAILS', payload: json})
            else return "error"
        }

        if(user) {
            getDetails(user.webToken)
        }
    }, [user, dispatch])

    console.log(state)

    return (
        <DetailsContext.Provider value={{...state, dispatch}}>
            {children}
        </DetailsContext.Provider>
    )
}