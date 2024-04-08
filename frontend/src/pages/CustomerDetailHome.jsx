
import { useEffect, useState } from "react";
import { useDetailsContext } from "../hooks/useDetailsContext";

const CustomerDetailHome = () => {

    const {details} = useDetailsContext()
    const [error, setError] = useState()

    useEffect(() => {
        if(!details) {
            setError("Not logged in")
        }
    }, [details])


    return (
        <>
        <h1>DETAILS TEST</h1>
        {details && 
            <div>
                <ul>
                    <li>{details.firstName}</li>
                    <li>{details.lastName}</li>
                    <li>{details.emailAddress}</li>
                    { details.phoneNumbers &&
                        details.phoneNumbers.map((x) => (
                            <li>{x}</li>
                        ))}
                    { details.vehicles &&
                        details.vehicles.map((x) => (
                            <li>{x}</li>
                        ))}
                </ul>
            </div>
        }
        {error && <div className="error">{error}</div>}
        </>
    )
}

export default CustomerDetailHome