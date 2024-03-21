import { useState } from "react";
import CalendarDisplay from "../components/CalendarDisplay"
import './styles/Schedule.css'
import ContactInfo from "../components/ContactInfo";
const Schedule = () => {

    return (
        <div className="calendar-container">
            <CalendarDisplay/>
            <ContactInfo/>
        </div>
    )
}

export default Schedule