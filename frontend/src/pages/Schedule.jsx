import { useState } from "react";
import AboutPane from '../components/AboutPane'
import CalendarDisplay from '../components/CalendarDisplay'
import ContactInfo from '../components/ContactInfo'
import './styles/Schedule.css'
import { useAuthContext } from "../hooks/useAuthContext";
const Schedule = () => {

    const {user} = useAuthContext();
    const [today] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

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
                
                {selectedDate && <button onClick={() => user ? console.log(user.email) : console.log("Guest")}>
                    <h3>Request Appointment </h3>
                    {selectedDate.toDateString()}
                </button>}
                {!selectedDate && <h3>Select a day to request an appointment!</h3>}
                </div>
            </CalendarDisplay>
            <ContactInfo/>
        </div>
    )
}

export default Schedule