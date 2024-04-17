const PhoneNumbersTable = ({phoneNumbers}) => {

    const formatPhone = (num) => {
        return num.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    }
    
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