import { useContext } from "react"
import { AccountsContext } from "../context/AccountsContext"

export const useAccountsContext = () => {
    const context = useContext(AccountsContext)

    if(!context) {
        throw Error('useAccountsContext must be used inside provider')
    }

    return context
}