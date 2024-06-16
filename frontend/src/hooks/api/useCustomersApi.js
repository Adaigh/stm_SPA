import { useAuthContext } from "../useAuthContext"
import { useCustomersContext } from "../useCustomersContext"
import { api_url } from "../../production_variables"
import { stdHeaders } from "../useUtils"

// Create a new customer record
export const useCreateCustomer = () => {

    const { user } = useAuthContext()
    const { dispatch } = useCustomersContext()

    const createCustomer = async (newCustomer) => {
        const response = await fetch(`${api_url}/api/customers`, {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: stdHeaders(user)
        })

        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'CREATE_CUSTOMER', payload: json })
        }
        return { response, json }
    }
    return { createCustomer }
}

// Get all customer details
export const useFetchCustomers = () => {

    const { user } = useAuthContext()
    const { dispatch } = useCustomersContext()

    const fetchCustomers = async () => {

        const response = await fetch(`${api_url}/api/customers/`, {
            headers: stdHeaders(user)
        })

        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'SET_CUSTOMERS', payload: json })
        }
    }
    return { fetchCustomers }

}

// Update a customer record
export const useUpdateCustomer = () => {

    const { user } = useAuthContext()
    const { customers, dispatch } = useCustomersContext()

    const updateCustomer = async (updatedInfo, customer) => {
        const response = await fetch(`${api_url}/api/customers/` + customer._id, {
            method: 'PATCH',
            headers: stdHeaders(user),
            body: JSON.stringify(updatedInfo)
        })

        const json = await response.json()
        if (response.ok) {
            let newCustomersInfo = [...customers]
            newCustomersInfo[newCustomersInfo.indexOf(customer)] = updatedInfo
            dispatch({ type: 'SET_CUSTOMERS', payload: newCustomersInfo })
            window.alert("Updates Successful!")
        }
        console.log(response, json)

        return { response, json }
    }

    return { updateCustomer }
}

// Delete a customer record
export const useDeleteCustomer = () => {

    const { user } = useAuthContext()
    const { dispatch } = useCustomersContext()

    const deleteCustomer = async (customerInfo) => {
        const response = await fetch(`${api_url}/api/customers/` + customerInfo._id, {
            method: 'DELETE',
            headers: stdHeaders(user)
        })

        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'DELETE_CUSTOMER', payload: json })
        }
    }

    return { deleteCustomer }
}