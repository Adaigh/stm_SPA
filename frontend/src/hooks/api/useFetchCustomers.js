import { useAuthContext } from "../useAuthContext"
import { useCustomersContext } from "../useCustomersContext"

export const useFetchCustomers = () => {

    const {user} = useAuthContext()
    const {dispatch} = useCustomersContext()

    const fetchCustomers = async () => {

        const response = await fetch('/api/customers/', {
            headers: {
                'Authorization': `Bearer ${user.webToken}`
            }
        })
        
        const json = await response.json()
        if(response.ok) {
            dispatch({type:'SET_CUSTOMERS', payload: json})
        }
    }

    return {fetchCustomers}

}