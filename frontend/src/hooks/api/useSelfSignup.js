import { useState } from "react";
import { useAuthContext } from "../useAuthContext";

import { api_url } from "../../production_variables"
import { stdHeaders } from "../useUtils";

export const useSelfSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const selfSignup = async (email, password, newCustomer) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${api_url}/api/accounts/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'user': email, password })
        })
        const accountJson = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(accountJson.error)
            return
        }
        // saving data to local storage
        localStorage.setItem('STMuser', JSON.stringify(accountJson))


        // Fetch the new user details
        const customerResponse = await fetch(`${api_url}/api/customers`, {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: stdHeaders(accountJson)
        })
        const customerJson = await customerResponse.json()

        if (!customerResponse.ok) {
            setError(customerJson.error)
            await fetch(`${api_url}/api/accounts/${accountJson._id}`, {
                method: 'DELETE',
                headers: stdHeaders(accountJson)
            })
            setIsLoading(false)
            return
        }

        // Update auth context
        dispatch({ type: 'LOGIN', payload: accountJson })

        setIsLoading(false)
    }

    return { selfSignup, isLoading, error, setError }
}