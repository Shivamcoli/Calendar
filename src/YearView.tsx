// YearView.tsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Event } from './types'; // Import the Event type

interface YearViewProps {
  events: Event[];
}

const months = [
  { title: 'January', code: '01' },
  { title: 'February', code: '02' },
  { title: 'March', code: '03' },
  { title: 'April', code: '04' },
  { title: 'May', code: '05' },
  { title: 'June', code: '06' },
  { title: 'July', code: '07' },
  { title: 'August', code: '08' },
  { title: 'September', code: '09' },
  { title: 'October', code: '10' },
  { title: 'November', code: '11' },
  { title: 'December', code: '12' }
];

const YearView: React.FC<YearViewProps> = ({ events }) => {
  return (
    <div className="year-view">
      {months.map((month) => {
        // Filter events for the current month
        const filteredEvents = events.filter(event =>
          event.date.startsWith(`2024-${month.code}`)
        );

        return (
          <div className="month" key={month.code}>
            <h3>{month.title}</h3>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView=""
              headerToolbar={false}
              initialDate={`2024-${month.code}-01`} // Start date of the month
              visibleRange={{
                start: `2024-${month.code}-01`,
                end: `2024-${month.code}-31`
              }}
              events={filteredEvents}
              height="auto"
            />
          </div>
        );
      })}
    </div>
  );
};

export default YearView;
