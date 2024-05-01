import { useEffect, useState } from 'react'
import Modal from 'react-modal';

import EditAppointmentForm from '../forms/EditAppointment';

import { formatPhone, standardStyle } from '../../hooks/useUtils'
import { useScheduleContext } from '../../hooks/useScheduleContext'
import { useDeleteAppointment } from '../../hooks/api/useDeleteAppointment'
import './styles/ScheduleDetails.css'

const ScheduleDetails = ({dow, date}) => {

    const [day, setDay] = useState(null)
    const [selectedAppointment, setSelectedAppointment] = useState(null)

    const [showEdit, setShowEdit] = useState(false)

    const {schedule} = useScheduleContext()

    useEffect(() => {
        if(schedule) setDay(
                schedule.filter((x)=> x.date === date && x.reviewed === true)
        )
    },[schedule, date])

    const {deleteApp} = useDeleteAppointment()

    const deleteAppointment = async (e, app) => {
        e.preventDefault()
        await deleteApp(app)
    }

    const editAppt = (e, app) => {
        e.preventDefault()
        setSelectedAppointment(app)
        setShowEdit(true)
    }

    return (
        <div className='schedule-day'>
            {day && 
            <>
            <h2>{dow}, {new Date(date).toLocaleString({}, {month: 'short', day: 'numeric'})}</h2>
            <hr/>
            {day.length === 0 && <div>No Appointments</div>}
            {day.map((app) => {
                return (
                    <div key={app._id} className='appointment'>
                        {app.firstName} {app.lastName}
                            <span onClick={(e) => deleteAppointment(e, app)} className='material-symbols-outlined delete'>delete</span>
                            <span onClick={(e) => editAppt(e, app)} className='material-symbols-outlined edit'>edit</span>
                        <br/>
                        {formatPhone(app.phoneNumber)}
                        <br/>
                        {app.vehicle.vehicleYear}&nbsp;
                        {app.vehicle.vehicleMake}&nbsp;
                        {app.vehicle.vehicleModel}&emsp;
                        <br/>
                        VIN: {app.vehicle.vehicleVIN}
                        <br/>
                        {app.description}
                        <hr/>
                    </div>
                )
            })}
            </>}
            <Modal
                isOpen={showEdit}
                onRequestClose={() => setShowEdit(false)}
                style={standardStyle}
                contentLabel="Edit Appointment Details"
                className="modal"
                overlayClassName="overlay"
                >
                    <EditAppointmentForm
                        appointment={selectedAppointment}
                        closeForm={() => setShowEdit(false)}
                        />
            </Modal>
        </div>
    )
}

export default ScheduleDetails