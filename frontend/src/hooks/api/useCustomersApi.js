import { useAuthContext } from "../useAuthContext"
import { useCustomersContext } from "../useCustomersContext"
import { api_url } from "../../production_variables"

// Create a new customer record
export const useCreateCustomer = () => {

    const {user} = useAuthContext()
    const {dispatch} = useCustomersContext()

    const createCustomer = async (newCustomer) => {
        const response = await fetch(`${api_url}/api/customers`, {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.webToken}`
            }
        })

        const json = await response.json()
        if(response.ok) {
            dispatch({type: 'CREATE_CUSTOMER', payload: json})
        }
        return {response, json}
    }
    return {createCustomer}
}

// Get all customer details
export const useFetchCustomers = () => {

    const {user} = useAuthContext()
    const {dispatch} = useCustomersContext()

    const fetchCustomers = async () => {

        const response = await fetch(`${api_url}/api/customers/`, {
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

// Update a customer record
export const useUpdateCustomer = () => {

    const {user} = useAuthContext()
    const {customers, dispatch} = useCustomersContext()

    const updateCustomer = async (updatedInfo, customer) => {
        const response = await fetch(`${api_url}/api/customers/` + customer._id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.webToken}`},
            body: JSON.stringify(updatedInfo)
        })

        const json = await response.json()
        if(response.ok) {
            window.alert("Updates Successful!")
            let newCustomersInfo = [...customers]
            newCustomersInfo[newCustomersInfo.indexOf(customer)] = updatedInfo
            dispatch({type: 'SET_CUSTOMERS', payload: newCustomersInfo})
        }

        return {response, json}
    }

    return{updateCustomer}
}

// Delete a customer record
export const useDeleteCustomer = () => {

    const {user} = useAuthContext()
    const {dispatch} = useCustomersContext()

    const deleteCustomer = async (customerInfo) => {
        const response = await fetch(`${api_url}/api/customers/` + customerInfo._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.webToken}`
            }
        })

        const json = await response.json()
        if(response.ok) {
            dispatch({type: 'DELETE_CUSTOMER', payload: json})
        }
    }

    return {deleteCustomer}
}