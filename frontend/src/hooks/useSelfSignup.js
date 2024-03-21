import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSelfSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const selfSignup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/account/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})            
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        } else {
            // saving data to local storage
            localStorage.setItem('STMuser', JSON.stringify(json))

            // Update auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {selfSignup, isLoading, error}
}