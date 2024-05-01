import { useAuthContext } from "../useAuthContext"

export const deleteAppointment = async (id) => {

    const { user } = useAuthContext();

    const request = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user.webToken}`
        }
    }

    const response = await fetch('/api/appointments/' + id, request)
    return response
}