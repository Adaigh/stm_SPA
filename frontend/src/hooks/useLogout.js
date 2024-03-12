import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()

    const logout = () => {
        // Removing user info from LocalStorage
        localStorage.removeItem('STMuser')

        // Update AuthContext
        dispatch({type:'LOGOUT'})
    }

    return {logout}
}