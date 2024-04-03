import { createContext, useReducer } from 'react'
import { useEffect } from 'react'
const jwt = require('jwt-decode')

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

    // On page load/refresh
    useEffect(()=> {
        
        // Checking for existing user information
        const existingUser = JSON.parse(localStorage.getItem('STMuser'))
        

        if(existingUser) {

            // Token expiration check
            const token = jwt.jwtDecode(existingUser.webToken)
            const now = Math.floor(new Date().getTime()/1000)

            // If token is expired
            if(token.exp < now){
                console.log("LOGOUT")
                localStorage.removeItem('STMuser')
                dispatch({type: 'LOGOUT'})
            
            // If token is still valid
            } else {
                dispatch({type: 'LOGIN', payload: existingUser})
            }
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

