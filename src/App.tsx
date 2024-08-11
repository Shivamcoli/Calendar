// App.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Event, Holiday } from './types'; // Import the types
import YearView from './YearView'; // Import the YearView component
import axios from 'axios';

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
];

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [country, setCountry] = useState<string>('US'); // Default country
  const [view, setView] = useState<'month' | 'year'>('month');

  useEffect(() => {
    const API_URL = `https://date.nager.at/Api/v2/PublicHolidays/2024/${country}`;
    
    axios.get<Holiday[]>(API_URL)
      .then(response => {
        const holidayData = response.data;
        const holidayEvents: Event[] = holidayData.map((holiday: Holiday) => ({
          title: holiday.name,
          date: holiday.date,
        }));
        setEvents(holidayEvents);
      })
      .catch(error => {
        console.error('Error fetching holiday data:', error);
      });
  }, [country]);

  const handleMonthViewClick = () => {
    setView('month');
  };

  const handleYearViewClick = () => {
    setView('year');
  };

  return (
    <div className="App">
      <div>
        <label htmlFor="country-select">Select Country:</label>
        <select
          id="country-select"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={view === 'month' ? 'dayGridMonth' : 'dayGridMonth'}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: view === 'month' 
            ? 'customYearViewButton' 
            : 'customMonthViewButton'
        }}
        customButtons={{
          customMonthViewButton: {
            text: 'Month View',
            click: handleMonthViewClick
          },
          customYearViewButton: {
            text: 'Year View',
            click: handleYearViewClick
          }
        }}
        events={events}
        height="auto"
        viewDidMount={() => {
          if (view === 'year') {
            document.querySelector('.fc-toolbar')?.classList.add('hide-toolbar');
          }
        }}
      />
      {view === 'year' && <YearView events={events} />}
    </div>
  );
}

export default App;
