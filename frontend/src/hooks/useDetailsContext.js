import { DetailsContext } from "../context/DetailsContext";
import { useContext } from "react";

export const useDetailsContext = () => {
    const context = useContext(DetailsContext)

    if(!context){
        throw Error('useDetailsContext must be used inside provider')
    }

    return context
}