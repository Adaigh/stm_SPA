import { api_url } from "../../production_variables"
import { useAccountsContext } from "../useAccountsContext"
import { useAuthContext } from "../useAuthContext"
import { useCustomersContext } from "../useCustomersContext"


const stdHeaders = (user) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.webToken}`
    }
}


export const useCreateAccount = () => {

    const { user } = useAuthContext()
    const { dispatch: accountDispatch } = useAccountsContext()
    const { dispatch: customersDispatch } = useCustomersContext()

    const createAccount = async (email, password, accessLevel, newUser) => {

        console.log(email, password, accessLevel, newUser)
        // Create 'customer' record
        let response = await fetch(`${api_url}/api/customers/`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: stdHeaders(user)
        })
        let customerJSON = await response.json()
        if (!response.ok) {
            return { response, json: customerJSON }
        }
        console.log(`Created user ${customerJSON}`)

        // Create 'account' record
        response = await fetch(`${api_url}/api/accounts/`, {
            method: 'POST',
            body: JSON.stringify({
                'user': email,
                'password': password,
                'access': accessLevel
            }),
            headers: stdHeaders(user)
        })
        let accountJSON = await response.json()
        if (!response.ok) {
            return { response, json: accountJSON }
        }
        console.log(`Created account ${accountJSON}`)

        // Update 'customers' context
        customersDispatch({ type: 'CREATE_CUSTOMER', payload: customerJSON })

        // Update 'accounts' context
        accountJSON.user = customerJSON
        accountDispatch({ type: 'CREATE_ACCOUNT', payload: accountJSON })

        return { response, json: accountJSON }
    }
    return { createAccount }
}

// Get all accounts
export const useFetchAccounts = () => {

    const { user } = useAuthContext()
    const { dispatch } = useAccountsContext()

    const fetchAccounts = async () => {

        const response = await fetch(`${api_url}/api/accounts/`, {
            headers: stdHeaders(user)
        })

        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'SET_ACCOUNTS', payload: json })
        }
    }
    return { fetchAccounts }
}

// Update an account
export const useUpdateAccount = () => {

    const { user } = useAuthContext()
    const { accounts, dispatch } = useAccountsContext()

    const updateAccount = async (account, updatedInfo) => {
        const response = await fetch(`${api_url}/api/accounts/` + account._id, {
            method: 'PATCH',
            headers: stdHeaders(user),
            body: JSON.stringify(updatedInfo)
        })

        const json = await response.json()
        if (response.ok) {
            let newAccountsInfo = [...accounts]
            newAccountsInfo[newAccountsInfo.indexOf(account)] = updatedInfo
            dispatch({ type: 'SET_ACCOUNTS', paload: newAccountsInfo })
        }

        return { response, json }
    }

    return { updateAccount }
}

// Delete an account
export const useDeleteAccount = () => {

    const { user } = useAuthContext()
    const { dispatch } = useAccountsContext()

    const deleteAccount = async (account) => {
        const response = await fetch(`${api_url}/api/accounts/` + account._id, {
            method: 'DELETE',
            headers: stdHeaders(user)
        })

        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'DELETE_ACCOUNT', payload: account })
        }
    }

    return { deleteAccount }
}