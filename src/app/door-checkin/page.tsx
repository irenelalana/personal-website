'use client'
// app/door-checkin/page.tsx

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface Ticket {
  id: string;
  first_name: string;
  last_name: string;
  kids: string | number | null;
  customer_email: string;
  order_id: string;
  created_at: string;
}

export default function DoorCheckinPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortMode, setSortMode] = useState<'recent' | 'alpha'>('recent');

  const fetchLatestTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/door-checkin/latest-tickets', { cache: 'no-store' });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error fetching tickets');
      }

      setTickets(data.tickets || []);
      setSortMode('recent'); // Cada refresco vuelve al orden "más reciente primero"
      toast.success(`Loaded latest ${data.tickets?.length || 0} tickets`);
    } catch (err: any) {
      console.error(err);
      toast.error('Could not load tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLatestTickets();
  }, [fetchLatestTickets]);

  // Formatea created_at (guardado en UTC por Supabase) al horario de Brisbane.
  // Queensland no tiene horario de verano, así que siempre es UTC+10.
  const formatBrisbaneTime = (isoString: string) => {
    if (!isoString) return '—';
    return new Date(isoString).toLocaleString('en-AU', {
      timeZone: 'Australia/Brisbane',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const sortAlphabetically = () => {
    const sorted = [...tickets].sort((a, b) => {
      const firstA = (a.first_name || '').toLowerCase();
      const firstB = (b.first_name || '').toLowerCase();
      if (firstA !== firstB) return firstA.localeCompare(firstB);

      const lastA = (a.last_name || '').toLowerCase();
      const lastB = (b.last_name || '').toLowerCase();
      return lastA.localeCompare(lastB);
    });
    setTickets(sorted);
    setSortMode('alpha');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px 16px 60px' }}>
      <h1 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '4px' }}>
        🎟 Door Check-in — Latest Tickets
      </h1>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>
        Showing the last {tickets.length} tickets purchased
        {sortMode === 'recent' ? ' (most recent first)' : ' (alphabetical order)'}.
      </p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          onClick={fetchLatestTickets}
          disabled={loading}
          style={{
            padding: '10px 18px',
            background: '#f39304',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Loading...' : '🔄 Get Latest Tickets'}
        </button>

        <button
          onClick={sortAlphabetically}
          disabled={loading || tickets.length === 0}
          style={{
            padding: '10px 18px',
            background: '#0f7a93',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: loading || tickets.length === 0 ? 'not-allowed' : 'pointer',
            opacity: loading || tickets.length === 0 ? 0.7 : 1,
          }}
        >
          🔤 Sort Alphabetically
        </button>
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
              <th style={thStyle}>First Name</th>
              <th style={thStyle}>Last Name</th>
              <th style={thStyle}>Kids</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Purchased At (Brisbane)</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 && !loading && (
              <tr>
                <td colSpan={6} style={{ ...tdStyle, textAlign: 'center', color: '#94a3b8' }}>
                  No tickets found.
                </td>
              </tr>
            )}
            {tickets.map((ticket) => (
              <tr key={ticket.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                <td style={tdStyle}>{ticket.first_name}</td>
                <td style={tdStyle}>{ticket.last_name}</td>
                <td style={tdStyle}>{ticket.kids ?? '0'}</td>
                <td style={tdStyle}>{ticket.customer_email}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  {ticket.order_id}
                </td>
                <td style={tdStyle}>{formatBrisbaneTime(ticket.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '10px 12px',
  fontSize: '0.85rem',
  color: '#475569',
  borderBottom: '1px solid #e2e8f0',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  fontSize: '0.9rem',
  color: '#0f172a',
};
