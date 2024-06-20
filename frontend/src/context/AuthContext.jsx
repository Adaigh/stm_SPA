import { createContext, useReducer } from 'react'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { api_url } from '../production_variables'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }

        case 'LOGOUT':
            return { user: null }

        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // On page load/refresh
    useEffect(() => {

        const refreshToken = async (oldToken) => {
            const response = await fetch(`${api_url}/api/accounts/refresh`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${oldToken}`
                }
            })

            if (response.ok) {
                const json = await response.json()
                localStorage.setItem('STMuser', JSON.stringify(json))
                localStorage.setItem('details', false)
                dispatch({ type: 'LOGIN', payload: json })
            }
        }

        // Checking for existing user information
        const existingUser = JSON.parse(localStorage.getItem('STMuser'))


        if (existingUser) {

            // Token expiration check
            const token = jwtDecode(existingUser.webToken)
            const now = Math.floor(new Date().getTime() / 1000)

            // If token is expired
            if (token.exp < now) {
                console.log("LOGOUT")
                localStorage.removeItem('STMuser')
                dispatch({ type: 'LOGOUT' })

            // If token is still valid
            } else {
                refreshToken(existingUser.webToken)
                dispatch({ type: 'LOGIN', payload: existingUser })
            }
        }
        // eslint-disable-next-line
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

