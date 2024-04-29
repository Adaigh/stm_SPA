import Calendar from 'react-calendar';
import './styles/CalendarDisplay.css'
import { useState } from 'react';
import { useCalendarContext } from '../../hooks/useCalendarContext'

function CalendarDisplay({today,
                          setSelectedDate,
                          showNeigors,
                          decorated,
                          limited,
                          children}) {

    const [prevDayPicked, setPrevDayPicked] = useState(null)
    const [currentDate, setCurrentDate ] = useState(today)
    const endDate = new Date(today.getFullYear(), today.getMonth()+3, today.getDate())
    const {calendar} = useCalendarContext()

    const handleDaySelect = (value, event) => {
      setSelectedDate(value)
      if(prevDayPicked) prevDayPicked.classList.toggle('selectedDay')
      event.currentTarget.classList.toggle('selectedDay')
      setPrevDayPicked(event.currentTarget)
    }

    return (
      <div className={decorated ? "calendar decorated" : "calendar"}>
          <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        {/* Calendar for the current month */}
        <Calendar 
            value={currentDate}
            minDate={limited ? today : null}
            maxDate={limited ? endDate : null}
            onChange={(value, event) => handleDaySelect(value, event)}
            prevLabel={<h2>&lt;</h2>}
            nextLabel={<h2>&gt;</h2>}
            onActiveStartDateChange={val => setCurrentDate(val.activeStartDate)}
            showNeighboringMonth={showNeigors}
            showNavigation={true}
            calendarType="gregory"
            view="month"
            tileDisabled={({date}) => (date.getDay() === 0|| date.getDay() === 6)}
            tileClassName={({date}) => {
              if(date.getDay() === 0|| date.getDay() === 6) return 'weekend'
              if(date < today) return 'past'
              if(date === today) return 'today'
              if(calendar && date.toLocaleDateString() in calendar) {
                if(calendar[date.toLocaleDateString()] === 1) return 'partial'
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