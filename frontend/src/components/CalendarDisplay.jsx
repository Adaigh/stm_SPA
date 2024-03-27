import Calendar from 'react-calendar';
import './styles/CalendarDisplay.css'
import { useState } from 'react';
import { useScheduleContext } from '../hooks/useScheduleContext'

function CalendarDisplay({today,
                          setSelectedDate,
                          children}) {

    const [prevDayPicked, setPrevDayPicked] = useState(null)
    const [currentDate, setCurrentDate ] = useState(today)
    const endDate = new Date(today.getFullYear(), today.getMonth()+3, today.getDate())
    const {schedule} = useScheduleContext()

    const handleDaySelect = (value, event) => {
      if(value < new Date()) return
      setSelectedDate(value)
      if(prevDayPicked) prevDayPicked.classList.toggle('selectedDay')
      event.currentTarget.classList.toggle('selectedDay')
      setPrevDayPicked(event.currentTarget)
    }

    return (
      <div className="calendar">
          <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        {/* Calendar for the current month */}
        <Calendar 
            value={currentDate}
            minDate={today}
            maxDate={endDate}
            onChange={(value, event) => handleDaySelect(value, event)}
            prevLabel={<h2>&lt;</h2>}
            nextLabel={<h2>&gt;</h2>}
            onActiveStartDateChange={val => setCurrentDate(val.activeStartDate)}
            showNeighboringMonth={false}
            showNavigation={true}
            calendarType="gregory"
            view="month"
            tileDisabled={({date}) => (date.getDay() === 0|| date.getDay() === 6)}
            tileClassName={({date}) => {
              if(date.getDay() === 0|| date.getDay() === 6) return 'weekend'
              if(date < today) return 'past'
              if(date === today) return 'today'
              if(schedule && date.toLocaleDateString() in schedule) {
                if(schedule[date.toLocaleDateString()] === 1) return 'partial'
                return 'full'
              }
              else return 'weekday'
            }}
        />
        {children}
      </div>
    );
  }

export default CalendarDisplay