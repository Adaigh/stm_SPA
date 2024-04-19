import { useAuthContext } from "./useAuthContext"
import { useDetailsContext } from "./useDetailsContext"

export const useLogout = () => {
    const logoutUser = useAuthContext().dispatch
    const clearDetails = useDetailsContext().dispatch

    const logout = () => {
        // Removing user info from LocalStorage
        localStorage.removeItem('STMuser')

        // Update AuthContext
        logoutUser({type:'LOGOUT'})
        clearDetails({type: 'CLEAR_DETAILS'})
    }

    return {logout}
}