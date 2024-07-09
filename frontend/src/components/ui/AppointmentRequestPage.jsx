import CustomerAppointmentForm from "../forms/CustomerAppointmentForm"
import GuestAppointmentForm from "../forms/GuestAppointmentForm"

import './styles/AppointmentRequestPage.css'


const AppointmentRequestPage = ({appointmentDate, closeForm, user}) => {

    return (
        <div className="app-req-page">
            {!user && <GuestAppointmentForm
                date={appointmentDate}
                closeForm={closeForm}/>}
            {user && <CustomerAppointmentForm
                date={appointmentDate}
                closeForm={closeForm}
                customer={user}/>}
        </div>
    )
}

export default AppointmentRequestPage