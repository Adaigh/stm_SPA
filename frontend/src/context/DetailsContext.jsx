import { createContext, useEffect, useReducer } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { api_url } from "../production_variables";
export const DetailsContext = createContext()

export const detailsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_DETAILS':
            return { details: action.payload }

        case 'CLEAR_DETAILS':
            return { details: null }

        case 'UPDATE_DETAILS':
            state.details.user = action.payload
            return state

        default:
            return state
    }
}

export const DetailsContextProvider = ({children}) => {
    const[state, dispatch] = useReducer(detailsReducer, {
        details: null
    })
    const {user} = useAuthContext()

    useEffect(() => {
        const getDetails = async (token) => {
            localStorage.setItem('details', true)
            const response = await fetch(`${api_url}/api/customers/details`, {
                headers: {'Authorization': `Bearer ${token}`}
            })
            const json = await response.json()
            if(response.ok) dispatch({type: 'SET_DETAILS', payload: json})
        }

        if(user) {
            const fetched = JSON.parse(localStorage.getItem('details'))
            if(!fetched) getDetails(user.webToken)
        }
    }, [user])

    return (
        <DetailsContext.Provider value={{...state, dispatch}}>
            {children}
        </DetailsContext.Provider>
    )
}