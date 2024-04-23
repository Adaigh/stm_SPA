import { formatPhone } from "../../hooks/useUtils"

const PhoneNumbersTable = ({phoneNumbers}) => {
    
    return(
        <table>
            <tbody>
            {phoneNumbers.map((num, index) => {
                return(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{formatPhone(num)}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default PhoneNumbersTable