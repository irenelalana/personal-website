'use client'

import { useState, useEffect, useCallback } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { addMinutes } from 'date-fns'
import { getSessions, createBooking } from '@/app/actions' // Tus acciones
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function BookingCalendar() {
  const router = useRouter()
  const [events, setEvents] = useState<any[]>([])
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const loadCalendarData = useCallback(async () => {
    const data = await getSessions()
    const calendarEvents = data.map((s: any) => ({
      id: s.id,
      title: s.title,
      start: s.starts_at,
      end: addMinutes(new Date(s.starts_at), s.duration).toISOString(),
      extendedProps: {
        available_spots: s.available_spots,
        capacity: s.capacity,
        duration: s.duration
      },
      backgroundColor: s.available_spots > 0 ? '#3788d8' : '#d9534f',
    }))
    setEvents(calendarEvents)
  }, [])

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
    <div className="p-4">
      {/* Calendario */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        events={events}
        eventClick={handleEventClick}
        height="auto"
        locale="en"
      />

      {/* Modal Simple (puedes usar Dialog de UI libraries) */}
      {isModalOpen && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">{selectedSession.title}</h2>
            
            <div className="mb-4 text-sm text-gray-600">
              <p>📅 Date & Time: {selectedSession.start.toLocaleString()}</p>
              <p>⏱ Duration: {selectedSession.duration} min</p>
              <p>🟢 Availability: <strong>{selectedSession.available_spots}</strong> / {selectedSession.capacity} spots</p>
            </div>

            {selectedSession.available_spots > 0 ? (
              <form onSubmit={handleBookingSubmit} className="space-y-3">
                <input type="hidden" name="sessionId" value={selectedSession.id} />
                
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <input 
                    name="name" 
                    required 
                    className="w-full border p-2 rounded" 
                    placeholder="your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    className="w-full border p-2 rounded" 
                    placeholder="email@example.com"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4"> 
                  <button 
                    type="submit" 
                    disabled={isPending} // Evita el doble clic
                  >
                  {isPending ? (
                    <>
                      Loading...
                      </>
                    ) : (
                      'Book Session'
                    )}
                  </button>
                  <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <p className="text-red-500 font-bold mb-4">This session is fully booked.</p>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
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