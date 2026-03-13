'use client'

import { useState, useEffect, useCallback } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { format, addMinutes } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { getSessions, createBooking } from '@/app/actions' // Tus acciones
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import styles from './BookingCalendar.module.css' // Importamos el módulo CSS

export default function BookingCalendar() {
  const router = useRouter()
  const [events, setEvents] = useState<any[]>([])
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const loadCalendarData = useCallback(async () => {
    const data = await getSessions();
    const timeZone = 'Australia/Brisbane'; // Fijamos la zona

    const calendarEvents = data.map((s: any) => {
      // 1. Convertimos la fecha UTC de la base de datos a la zona de Brisbane
      const zonedStart = toZonedTime(new Date(s.starts_at), timeZone);
      
      // 2. Calculamos el final usando la fecha ya zonificada
      const zonedEnd = addMinutes(zonedStart, s.duration);

      return {
        id: s.id,
        title: s.title,
        // 3. Formateamos como string ISO "ingenuo" (sin offset Z) 
        // para que el calendario lo tome como hora local de la zona configurada
        start: format(zonedStart, "yyyy-MM-dd'T'HH:mm:ss"),
        end: format(zonedEnd, "yyyy-MM-dd'T'HH:mm:ss"),
        extendedProps: {
          available_spots: s.available_spots,
          capacity: s.capacity,
          duration: s.duration
        },
        backgroundColor: s.available_spots > 0 ? '#3788d8' : '#d9534f',
      };
    });

    setEvents(calendarEvents);
  }, []);

  // Carga inicial
  useEffect(() => {
    loadCalendarData()
  }, [loadCalendarData])

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await createBooking(formData)
      
      if (res.success) {
        toast.success(res.message)
        setIsModalOpen(false)
        
        // 2. Refrescamos los datos de la página (Server Components)
        router.refresh() 
        
        // 3. Y volvemos a cargar los eventos del calendario localmente
        await loadCalendarData() 
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error("Unexpected error occurred.")
    } finally {
      setIsPending(false)
    }
  }

  // Manejar click en un evento
  const handleEventClick = (info: any) => {
    setSelectedSession({
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      ...info.event.extendedProps
    })
    setIsModalOpen(true)
  }

  return (
    <div className={styles.calendarContainer}>
      {/* Calendario */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: ''
        }}
        events={events}
        eventClick={handleEventClick}
        height="auto"
        locale="en"
      />

      {/* Modal */}
      {isModalOpen && selectedSession && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>{selectedSession.title}</h2>
            
            <div className={styles.sessionInfo}>
              <p>📅 <strong>Date & Time:</strong> {selectedSession.start.toLocaleString()}</p>
              <p>⏱ <strong>Duration:</strong> {selectedSession.duration} min</p>
              <p>🟢 <strong>Availability:</strong> {selectedSession.available_spots} / {selectedSession.capacity} spots</p>
            </div>

            {selectedSession.available_spots > 0 ? (
              <form onSubmit={handleBookingSubmit}>
                <input type="hidden" name="sessionId" value={selectedSession.id} />
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name</label>
                  <input 
                    name="name" 
                    required 
                    className={styles.input} 
                    placeholder="Jane Doe"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    className={styles.input} 
                    placeholder="jane@example.com"
                  />
                </div>

                <div className={styles.buttonGroup}> 
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className={styles.btnCancel}
                    disabled={isPending}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.btnSubmit}
                    disabled={isPending}
                  >
                    {isPending ? 'Loading...' : 'Book Session'}
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.fullWarning}>
                <p className={styles.fullWarningText}>This session is fully booked.</p>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className={styles.btnCancel}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}