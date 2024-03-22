import Calendar from 'react-calendar';
import './styles/CalendarDisplay.css'
import { useEffect, useState } from 'react';

function CalendarDisplay() {
    const [currentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(currentDate);

    useEffect(() => {
      console.log(selectedDate)
    }, [selectedDate])
   
    return (
      <div className="calendar">
        <h2>{currentDate.toLocaleString('default', { month: 'long' })}</h2>
        {/* Calendar for the current month */}
        <Calendar 
            value={currentDate}
            mindate={currentDate}
            onChange={value => setSelectedDate(value)}
            showNeighboringMonth={false}
            showNavigation={false}
            calendarType="gregory"
            view="month"
            tileDisabled={({date}) => (date.getDay() === 0|| date.getDay() === 6)}
            tileClassName={({date}) => {
              if(date.getDay() === 0|| date.getDay() === 6) return 'weekend'
              else return 'weekday'
            }}
        />
      </div>
    );
  }

export default CalendarDisplay