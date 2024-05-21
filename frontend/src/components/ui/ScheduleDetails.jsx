import { useEffect, useState } from 'react'
import Modal from 'react-modal';

import EditAppointmentForm from '../forms/EditAppointmentForm';

import { formatPhone, standardStyle } from '../../hooks/useUtils'
import { useScheduleContext } from '../../hooks/useScheduleContext'
import { useDeleteAppointment } from '../../hooks/api/useAppointmentsApi';
import './styles/ScheduleDetails.css'
import AddAppointmentForm from '../forms/AddAppointmentForm';

const ScheduleDetails = ({dow, date}) => {

    const [day, setDay] = useState(null)
    const [selectedAppointment, setSelectedAppointment] = useState(null)

    const [showEdit, setShowEdit] = useState(false)
    const [showAdd, setShowAdd] = useState(false)

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

    const addApp = (e, app) => {
        e.preventDefault()
        setShowAdd(true)
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
            <button className='edit' onClick={addApp}>Add Appointment</button>
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
            <Modal
                isOpen={showAdd}
                onRequestClose={() => setShowAdd(false)}
                style={standardStyle}
                contentLabel="Add New Appointment Details"
                className="modal"
                overlayClassName="overlay"
                >
                    {date && <AddAppointmentForm
                        date={new Date(date)}
                        closeForm={() => setShowAdd(false)}
                        />}
            </Modal>
        </div>
    )
}

export default ScheduleDetails