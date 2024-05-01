import { useState } from 'react';

import Modal from 'react-modal';
import EditAppointmentForm from '../forms/EditAppointment';

import { formatPhone, standardStyle } from '../../hooks/useUtils'

import './styles/AppointmentRequest.css'
import { useDeleteAppointment } from '../../hooks/api/useDeleteAppointment';
import { useApproveAppointment } from '../../hooks/api/useApproveAppointment';

const AppointmentRequest = ({appReq}) => {

    const [showEdit, setShowEdit] = useState(false)
    // const [showDelDiag, setShowDelDiag] = useState(false)


    const {deleteApp} = useDeleteAppointment()
    const {approveApp} = useApproveAppointment()


    const editRequest = (e) => {
        e.preventDefault()
        setShowEdit(true)
    }

    const approveRequest = async (e) => {
        e.preventDefault()
        await approveApp(appReq)
    }

    const denyRequest = async (e) => {
        e.preventDefault()
        const message = await deleteApp(appReq)
        window.alert(message)
    }

    return (
        <div className='request'>

            <table>
                <tbody>
                    <tr>
                        <td><h3>{appReq.date}</h3></td>
                        <td className='req-desc' rowSpan={5}>{appReq.description}</td>
                        <td className='button'>
                            <button onClick={editRequest}>Edit</button>
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
                            <button onClick={approveRequest}>Approve</button>
                        </td>
                    </tr>
                    <tr>
                        <td>VIN: {appReq.vehicle.vehicleVIN}</td>
                    </tr>
                    <tr>
                        <td>{formatPhone(appReq.phoneNumber)}</td>
                        <td className='button'>
                            <button onClick={denyRequest}>Deny</button>
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

            {/* <Modal
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
            </Modal> */}
        </div>
    )
}

export default AppointmentRequest