import moment from 'moment';
import Calendar from 'react-calendar';
import './styles/CalendarDisplay.css'

function CalendarDisplay() {
    const currentDate = moment() 
  
    // Function for getting the next month
    const getNextMonth = () => {
      return currentDate.clone().add(1, 'month');
    };
  
    return (
      <>
        <div className="calendar">
          {/* Calendar for the current month */}
          <h2>{currentDate.format('MMMM')}</h2>
          <Calendar 
              value={currentDate.toDate()}
              showNeighboringMonth={false}
              showNavigation={false}
              calendarType="gregory"
              view="month"
          />
        </div>
        <div className="calendar">
          {/* Calendar for the next month */}
          <h2>{getNextMonth().format('MMMM')}</h2>
          <Calendar 
              value={getNextMonth().toDate()} 
              showNeighboringMonth={false}
              showNavigation={false}
              calendarType="gregory"
          />
          
        </div>
      </>
    );
  }

export default CalendarDisplay