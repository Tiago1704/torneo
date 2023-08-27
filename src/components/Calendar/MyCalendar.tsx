import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventType, Evento, EventoVM } from '../shared/interface';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../../context/AuthContext';
import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const localizer = momentLocalizer(moment);

const useStyles = makeStyles({
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    borderRadius: '8px',
    outline: 'none',
  }
});

const MyCalendar: React.FC = () => {
  const { user } = useAuth();
  const [eventList, setEventList] = useState<Evento[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<EventoVM | null>(null);
  const [selectedEventType, setSelectedEventType] = useState<EventType[]>([]);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const classes = useStyles();

  const tryEvent = async () => {
    const queryEvent = await getDocs(collection(db, 'events'));
    const queryEventType = await getDocs(collection(db, 'eventType'));
    const dataEvent = queryEvent.docs.map((doc) => doc.data() as Evento);
    setSelectedEventType(queryEventType.docs.map(doc => doc.data() as EventType))
    const eventsWithFixedDate: Evento[] = dataEvent.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    }));
    setEventList(eventsWithFixedDate);
  };

  useEffect(() => {
    tryEvent();
  }, []);

  const closeModal = () => {
    setOpen(false);
    setOpenAlert(false);
    setSelectedEvent(null);
  };

  const handleRegister = () => {
    if (!selectedEvent) return ;
    const eventoRegistro = eventList.find(e => selectedEvent?.id === e.id);
    const cant = selectedEvent.jugadoresPorEquipo * 2;
    console.log(user)
    if (eventoRegistro && eventoRegistro?.participantes && eventoRegistro.participantes.length >= (cant)) {
      setOpenAlert(true)
      setOpen(false)
    }
    //Agregar solicitud de registro

  }

  const handleClick = (event: Evento) => {
    const tipo = selectedEventType.find(se => se.id === event.idType)
    setOpen(true);
    setSelectedEvent({
      id: event.id,
      title: event.title,
      start: event.start.toLocaleString(),
      end: event.end.toLocaleString(),
      jugadoresPorEquipo: tipo?.jugadoresPorEquipo || 0,
      mapa: tipo?.mapa || "",
      reglas: tipo?.reglas || []
      })
  }

  return (
    <div style={{ height: 500 }}>
      <Calendar
        onSelectEvent={(event: Evento) => {
          handleClick(event)
        }}
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: 'auto' }}
      />

      {/* Modal */}
      <Modal
        open={open}
        onClose={closeModal}
        className={classes.modalContainer}
      >
        <Box className={classes.modalContent}>
          {selectedEvent && (
            <div>
              <Typography variant="h5" gutterBottom>
                ¿Deseas participar en {selectedEvent.title}? ¡Registrate!
              </Typography>
              <Typography variant="body1">
                Empieza el: {selectedEvent.start.toString()}
              </Typography>
              <Typography variant="body1">
                Termina el: {selectedEvent.end.toString()}
              </Typography>
              <ul>
                {selectedEvent.reglas.map((regla, index) => (
                  <li key={index}>{regla}</li>
                ))}
              </ul>
              {/* Add more event information if needed */}
              <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '16px' }}>
                <Button variant="contained" onClick={closeModal}>
                  Cerrar
                </Button>
                <Button variant="contained" color="primary" onClick={handleRegister}>
                  Registrarse
                </Button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
      { openAlert &&
      <Alert color="error" action={
        <IconButton
          aria-label="close"
          color="error"
          size="small"
          onClick={() => {
            setOpenAlert(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      } >
        <Typography> {`No puede registrarse a este torneo porque ya está la cantidad máxima de miembros (${selectedEvent?.jugadoresPorEquipo} por equipo)`} </Typography>
      </Alert>
      }
    </div>
  );
};

export default MyCalendar;
