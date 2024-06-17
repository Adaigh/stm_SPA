import { useState } from 'react';
import Modal from 'react-modal';

import EditAppointmentForm from '../forms/EditAppointmentForm';
import AlertModal from '../forms/AlertModal';
import ConfirmModal from '../forms/ConfirmModal'
import { formatPhone, standardStyle } from '../../hooks/useUtils'
import {
    useDeleteAppointment,
    useApproveAppointment
} from '../../hooks/api/useAppointmentsApi';

import './styles/AppointmentRequest.css'

const AppointmentRequest = ({appReq}) => {

    const [showEdit, setShowEdit] = useState(false)
    const [alertIsOpen, setAlertIsOpen] = useState(false)
    const [confirmIsOpen, setConfirmIsOpen] = useState(false)

    const {deleteApp} = useDeleteAppointment()
    const {approveApp} = useApproveAppointment()

    const closeForm = (updated) => {
        setShowEdit(false)
        setAlertIsOpen(updated)
    }

    const editRequest = (e) => {
        e.preventDefault()
        setShowEdit(true)
    }

    const approveRequest = async (e) => {
        e.preventDefault()
        await approveApp(appReq)
    }

    const confirmDeny = (e) => {
        e.preventDefault()
        setConfirmIsOpen(true)
    }

    const denyRequest = async (confirmed) => {
        setConfirmIsOpen(false)
        if(confirmed) await deleteApp(appReq)
    }

    return (
        <div className='request'>

            <table>
                <tbody>
                    <tr>
                        <td><h3>{appReq.date}</h3></td>
                        <td className='req-desc' rowSpan={5}>{appReq.description}</td>
                        <td className='button'>
                            <button className='edit' onClick={editRequest}>Edit</button>
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
                            <button className='approve' onClick={approveRequest}>Approve</button>
                        </td>
                    </tr>
                    <tr>
                        <td>VIN: {appReq.vehicle.vehicleVIN}</td>
                    </tr>
                    <tr>
                        <td>{formatPhone(appReq.phoneNumber)}</td>
                        <td className='button'>
                            <button className='deny' onClick={confirmDeny}>Deny</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Modal
                isOpen={showEdit}
                onRequestClose={() => closeForm(false)}
                style={standardStyle}
                contentLabel="Edit Appointment Details"
                className="modal"
                overlayClassName="overlay"
                >
                    <EditAppointmentForm
                        appointment={appReq}
                        closeForm={closeForm}
                        />
            </Modal>

            <AlertModal
                modalIsOpen={alertIsOpen}
                onClose={() => setAlertIsOpen(false)}
                message="Updates successful."
            />
            
            <ConfirmModal
                modalIsOpen={confirmIsOpen}
                onClose={denyRequest}
                message="Are you sure you want to deny this appointment?"
            />
        </div>
    )
}

export default AppointmentRequest