import { createContext, useReducer } from "react"

export const RecipientsContext = createContext()

export const recipientsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_RECIPIENTS':
            return {
                recipients: action.payload
            }
        
        case 'ADD_RECIPIENT':
            return {
                recipients: [action.payload, ...state.recipients]
            }
        
        case 'DELETE_RECIPIENT':
            return {
                recipients: state.recipients.filter((r)=> r !== action.payload)
            }

        default:
            return state
    }
}

export const RecipientsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(recipientsReducer, {
        recipients: null
    })

    return (
        <RecipientsContext.Provider value={{...state,dispatch}}>
            {children}
        </RecipientsContext.Provider>
    )
}