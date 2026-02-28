'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { checkoutComplexBooking } from '@/app/actions';
import { toast } from 'sonner';

export default function EventRegistrationForm() {
  const SOURCES = ['Irela Aqua and Fitness', 'Belen Roldan', 'Movehood (Carla)', 'Move in Tune (Denise)', 'Fuego Bites (Lala)', 'Speed fit (Verónica)', 'Paola Castro', 'Natura Med (Karina)', 'Social Media', 'Word of Mouth', 'Other'];
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<Record<string, number>>({});

  const [adults, setAdults] = useState<any[]>([]);
  const [kids, setKids] = useState<any[]>([]);
  
  // CAMBIO: Empezamos con 1 solo jugador en el array
  const [team, setTeam] = useState({
    active: false,
    teamName: '',
    members: [{ name: '', email: '', phone: '' }]
  });
  
  const [source, setSource] = useState('');

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{8,15}$/.test(phone);

  useEffect(() => {
    async function loadPrices() {
      const { data } = await supabase.from('ticket_types').select('name, price');
      if (data) {
        const priceMap = data.reduce((acc: any, curr: any) => ({ ...acc, [curr.name]: curr.price }), {});
        setPrices(priceMap);
      }
    }
    loadPrices();
  }, []);

  const PRICE_ADULT = prices['Adult'] || 0;
  const PRICE_KID = prices['Kid'] || 0;
  const PRICE_TEAM = prices['Soccer Team'] || 0;

  const handleInputChange = (type: 'adult' | 'kid' | 'team', index: number, field: string, value: string) => {
    if (type === 'adult') {
      setAdults(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
      if (index === 0 && (field === 'email' || field === 'phone')) {
        setKids(prev => prev.map(k => k.useAdultContact ? { ...k, [field]: value } : k));
      }
    } else if (type === 'kid') {
      setKids(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
    } else if (type === 'team') {
      setTeam(prev => ({
        ...prev,
        members: prev.members.map((member, i) => i === index ? { ...member, [field]: value } : member)
      }));
    }
  };

  // NUEVA FUNCIÓN: Añadir jugador uno a uno
  const addTeamMember = () => {
    setTeam(prev => ({
      ...prev,
      members: [...prev.members, { name: '', email: '', phone: '' }]
    }));
  };

  // OPCIONAL: Quitar jugador
  const removeTeamMember = (index: number) => {
    if (team.members.length <= 1) return;
    setTeam(prev => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index)
    }));
  };

  const updateCount = (type: 'adult' | 'kid', delta: number) => {
    if (type === 'adult') {
      const next = adults.length + delta;
      if (next < 0) return;
      delta > 0 ? setAdults([...adults, { name: '', email: '', phone: '' }]) : setAdults(adults.slice(0, -1));
    } else {
      if (adults.length === 0) return toast.error("Add an adult first");
      const next = kids.length + delta;
      if (next < 0) return;
      delta > 0 ? setKids([...kids, { name: '', email: '', phone: '', useAdultContact: false }]) : setKids(kids.slice(0, -1));
    }
  };

  const total = (adults.length * PRICE_ADULT) + (kids.length * PRICE_KID) + (team.active ? PRICE_TEAM : 0);

  const handleSubmit = async () => {
    if (total === 0) return toast.error("Select at least one ticket to proceed");
    if (!source) return toast.error("Please select how you heard about us");

    // Validaciones Adultos y Niños...
    for (const a of adults) {
        if (!a.name || !validateEmail(a.email) || !validatePhone(a.phone)) return toast.error("Please complete all adult details correctly");
    }

    if (team.active) {
      if (!team.teamName) return toast.error("Team name is required");
      
      // CAMBIO: Validación de mínimo 5 jugadores
      if (team.members.length < 5) {
        return toast.error("The Soccer Team pack requires at least 5 players");
      }

      for (let i = 0; i < team.members.length; i++) {
        const m = team.members[i];
        if (!m.name || !validateEmail(m.email) || !validatePhone(m.phone)) {
            return toast.error(`Please complete details for Player ${i + 1}`);
        }
      }
    }

    setLoading(true);
    const res = await checkoutComplexBooking({ adults, kids, team: team.active ? team : null, source });
    if (res?.url) window.location.href = res.url;
    else {
      toast.error("Error creating checkout.");
      setLoading(false);
    }
  };

  return (
    <section className="booking-container">
      <h2 style={{color: '#02678F'}}>Ticket Selection</h2>

      {/* Selectores de cantidad (igual que antes) */}
      <div className="ticket-selectors">
        {/* ... (Adultos y Kids) */}
        <div className="selector-item checkbox-item">
          <label htmlFor="team-check">Soccer Team Pack (${PRICE_TEAM})</label>
          <input id="team-check" type="checkbox" checked={team.active} onChange={() => setTeam({...team, active: !team.active})} />
        </div>
      </div>

      <hr />

      <div className="registration-forms">
        {/* Formularios de adultos y niños (igual que antes) */}
        
        {team.active && (
          <article className="form-card team">
            <h3>Soccer Team Registration</h3>
            <p style={{fontSize: '0.8rem', color: '#666', marginBottom: '1rem'}}>* Minimum 5 players required for this pack</p>
            
            <input 
              className="team-name-input" 
              type="text" 
              placeholder="Team Name" 
              value={team.teamName} 
              onChange={(e) => setTeam({...team, teamName: e.target.value})} 
            />

            {team.members.map((m, i) => (
              <div key={i} className="input-group team-member" style={{position: 'relative', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <small>Player {i+1}</small>
                    {team.members.length > 1 && (
                        <button onClick={() => removeTeamMember(i)} style={{color: 'red', fontSize: '0.7rem', border: 'none', background: 'none', cursor: 'pointer'}}>Remove</button>
                    )}
                </div>
                <input type="text" placeholder="Name" value={m.name} onChange={(e) => handleInputChange('team', i, 'name', e.target.value)} />
                <input type="email" placeholder="Email" value={m.email} onChange={(e) => handleInputChange('team', i, 'email', e.target.value)} />
                <input type="tel" placeholder="Phone" value={m.phone} onChange={(e) => handleInputChange('team', i, 'phone', e.target.value)} />
              </div>
            ))}

            <button 
              type="button" 
              onClick={addTeamMember}
              style={{marginTop: '10px', padding: '8px', background: '#02678F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
            >
              + Add Another Player
            </button>
          </article>
        )}
      </div>

      <footer className="form-footer">
        {/* ... (Source y Total) */}
        <button className="payment-button" onClick={handleSubmit} disabled={loading || total === 0}>
          {loading ? 'Processing...' : 'Secure My Spot'}
        </button>
      </footer>
    </section>
  );
}