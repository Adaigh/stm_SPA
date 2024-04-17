const VehiclesTable = ({vehicles}) => {
    return (
        <table>
            <tbody>
            {vehicles.map((entry, index) => {
                return(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{entry.vehicleYear}&nbsp;
                        {entry.vehicleMake}&nbsp;
                        {entry.vehicleModel}&nbsp;
                        (VIN: {entry.vehicleVIN})</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default VehiclesTable