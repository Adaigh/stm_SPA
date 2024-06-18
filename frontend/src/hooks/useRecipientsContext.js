import { useContext } from "react"
import { RecipientsContext } from "../context/RecipientsContext"


export const useRecipientsContext = () => {
    const context = useContext(RecipientsContext)

    if(!context){
        throw Error('useRecipientsContext must be sed inside provider')
    }

    return context
}