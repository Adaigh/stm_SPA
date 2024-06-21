import { useAuthContext } from "../useAuthContext"
import { useRecipientsContext } from "../useRecipientsContext"

import { api_url } from "../../production_variables"
import { stdHeaders } from "../useUtils"

export const useCreateMailerRecipient = () => {
    const { user } = useAuthContext()
    const { dispatch } = useRecipientsContext()

    const createRecipient = async (emailString) => {
        const response = await fetch(`${api_url}/api/mailer/list`, {
            method: 'POST',
            body: JSON.stringify({ email: emailString }),
            headers: stdHeaders(user)
        })

        if (response.ok) {
            dispatch({ type: "ADD_RECIPIENT", payload: emailString })
        }

        return { response }
    }
    return { createRecipient }
}

export const useRetrieveMailerList = () => {
    const { user } = useAuthContext()
    const { dispatch } = useRecipientsContext()

    const getMailerList = async () => {
        const response = await fetch(`${api_url}/api/mailer/list`, {
            method: 'GET',
            headers: stdHeaders(user)
        })

        if (response.ok) {
            const json = await response.json()
            dispatch({ type: 'SET_RECIPIENTS', payload: json })
        }

        return { response }
    }
    return { getMailerList }
}

export const useDeleteMailerRecipient = () => {
    const { user } = useAuthContext()
    const { dispatch } = useRecipientsContext()

    const deleteRecipient = async (userEmail) => {
        const response = await fetch(`${api_url}/api/mailer/list`, {
            method: 'DELETE',
            body: JSON.stringify({email: userEmail}),
            headers: stdHeaders(user)
        })

        if (response.ok) {
            const json = await response.json()
            dispatch({ type: 'DELETE_RECIPIENT', payload: json.email })
        }
        return { response }
    }
    return { deleteRecipient }
}