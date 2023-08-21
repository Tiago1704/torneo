import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Evento } from '../shared/interface';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const localizer = momentLocalizer(moment);

const MyCalendar: React.FC = () => {
  const [eventList, setEventList] = useState<Evento[]>([]);

  const tryEvent = async () => {
    const querySnapshot = await getDocs(collection(db, 'events'));
    const dataEvent = querySnapshot.docs.map((doc) => doc.data() as Evento);
    const eventsWithFixedDate: Evento[] = dataEvent.map((event) => ({
      ...event,
      start: new Date(event.start), // 30 de agosto de 2023
      end: new Date(event.end), // Utiliza la fecha final proporcionada por tus eventos
    }));
    setEventList(eventsWithFixedDate);
    console.log(eventsWithFixedDate, "")
  };

  useEffect(() => {
    tryEvent();
  }, []);

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: 'auto' }}
      />
    </div>
  );
};

export default MyCalendar;
