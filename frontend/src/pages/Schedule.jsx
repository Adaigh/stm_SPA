import { useState } from "react";
import Modal from 'react-modal';

// Components
import AboutPane from '../components/ui/AboutPane'
import CalendarDisplay from '../components/ui/CalendarDisplay'
import ContactInfo from '../components/ui/ContactInfo'
import GuestAppointmentForm from '../components/forms/GuestAppointmentForm'

// Hooks
import { useAuthContext } from "../hooks/useAuthContext";

// Styles
import './styles/Schedule.css'

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

Modal.setAppElement('#root');

const Schedule = () => {

    const {user} = useAuthContext();
    const [today] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [formIsOpen, setFormIsOpen] = useState(false)

    return (
        <div className="schedule-container">
            <AboutPane
                header="Shop Schedule"
                >
                <ul>
                    <li>
                        Here you can see how busy the schedule is looking and request an 
                        appointment.
                    </li>
                    <li>
                        We try to check appointment requests multiple times each day, but
                        we may get behind so please allow up to 48 hours for a response.   
                    </li>
                    <li>
                        Also, the schedule may not immediately reflect changes and cancellations,
                        so feel free to call and ask any questions.        
                    </li> 
                </ul>
            </AboutPane>
            <CalendarDisplay
                today={today}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}>

                <div className="appointment-request">
                    {selectedDate && <button onClick={() => setFormIsOpen(true)}>
                        <h3>Request Appointment </h3>
                        {selectedDate.toDateString()}
                    </button>}
                    {!selectedDate && <button style={{cursor: 'default'}}disabled><h3>Select a day to request an appointment!</h3></button>}
                </div>
                <div className="legend">
                    <button className="blue" disabled>Many appointments available</button>
                    <button className="orange" disabled>Few appointments available</button>
                    <button className="red" disabled>Urgent appointments only</button>
                </div>
            </CalendarDisplay>
            <Modal
                isOpen={formIsOpen}
                onRequestClose={() => setFormIsOpen(false)}
                style={standardStyle}
                contentLabel="Appointment Request"
                className="modal"
                overlayClassName="overlay"
                >
                    {!user && <GuestAppointmentForm date={selectedDate}
                    closeForm={() => setFormIsOpen(false)}/>}
            </Modal>
            <ContactInfo/>
        </div>
    )
}

export default Schedule