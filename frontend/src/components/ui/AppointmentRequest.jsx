import Modal from 'react-modal';
import { formatPhone } from '../../hooks/useUtils'

import './styles/AppointmentRequest.css'
import { useState } from 'react';
import EditAppointmentForm from '../forms/EditAppointment';

const standardStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
}

const AppointmentRequest = ({appReq}) => {

    const [showEdit, setShowEdit] = useState(false)

    return (
        <div className='request'>

            <table>
                <tbody>
                    <tr>
                        <td><h3>{appReq.date}</h3></td>
                        <td className='req-desc' rowSpan={5}>{appReq.description}</td>
                        <td className='button'>
                            <button onClick={() => setShowEdit(true)}>Edit</button>
                        </td>
                    </tr>
                    <tr>
                        <td>{appReq.firstName} {appReq.lastName}</td>
                    </tr>
                    <tr>
                        <td>
                            {appReq.vehicle.vehicleYear}&nbsp;
                            {appReq.vehicle.vehicleMake}&nbsp;
                            {appReq.vehicle.vehicleModel}
                        </td>
                        <td className='button'>
                            <button>Approve</button>
                        </td>
                    </tr>
                    <tr>
                        <td>VIN: {appReq.vehicle.vehicleVIN}</td>
                    </tr>
                    <tr>
                        <td>{formatPhone(appReq.phoneNumber)}</td>
                        <td className='button'>
                            <button>Deny</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Modal
                isOpen={showEdit}
                onRequestClose={() => setShowEdit(false)}
                style={standardStyle}
                contentLabel="Edit Appointment Details"
                className="modal"
                overlayClassName="overlay"
                >
                    <EditAppointmentForm
                        appointment={appReq}
                        closeForm={() => setShowEdit(false)}
                        />
            </Modal>
        </div>
    )
}

export default AppointmentRequest