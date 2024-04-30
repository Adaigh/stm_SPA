import { useState } from 'react';

import Modal from 'react-modal';
import EditAppointmentForm from '../forms/EditAppointment';

import { useAuthContext } from "../../hooks/useAuthContext"
import { useScheduleContext } from "../../hooks/useScheduleContext"
import { formatPhone, standardStyle } from '../../hooks/useUtils'

import './styles/AppointmentRequest.css'
import { useCalendarContext } from '../../hooks/useCalendarContext';

const AppointmentRequest = ({appReq}) => {

    const [showEdit, setShowEdit] = useState(false)

    const {user} = useAuthContext()
    const {schedule, dispatch} = useScheduleContext()
    let calendar = useCalendarContext().calendar
    let calendarDispatch = useCalendarContext().dispatch

    const editRequest = (e) => {
        e.preventDefault()
        setShowEdit(true)
    }

    const approveRequest = async (e) => {
        e.preventDefault()

        let reviewedAppointment = {...appReq}
        reviewedAppointment.reviewed = true

        const response = await fetch('/api/appointments/' + appReq._id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.webToken}`},
            body: JSON.stringify(reviewedAppointment)
        })

        const json = response.json()

        if(response.ok){
            let updatedAppointments = [...schedule]
            updatedAppointments[updatedAppointments.indexOf(appReq)] = reviewedAppointment
            dispatch({type: 'SET_SCHEDULE', payload: updatedAppointments})
            let updateDate = reviewedAppointment.date
            calendar[updateDate] = calendar[updateDate] ? calendar[updateDate] + 1 : 1
            calendarDispatch({type: 'SET_CALENDAR', payload: calendar})
            return
        } else {
            window.alert(json.error)
        }

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