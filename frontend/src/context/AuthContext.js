import { createContext, useReducer } from 'react'
import { useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return {user: action.payload}

        case 'LOGOUT':
            return {user: null}

        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(()=> {
        const existingUser = JSON.parse(localStorage.getItem('STMuser'))
        if(existingUser) {
            dispatch({type: 'LOGIN', payload: existingUser})
        }
    }, [])


    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

