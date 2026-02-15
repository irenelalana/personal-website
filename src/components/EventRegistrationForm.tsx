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
  const [team, setTeam] = useState({
    active: false,
    teamName: '',
    members: Array(5).fill({ name: '', email: '', phone: '' })
  });
  const [source, setSource] = useState('');

  // Validaciones
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{8,15}$/.test(phone);

  useEffect(() => {
    async function loadPrices() {
      const { data } = await supabase.from('ticket_types').select('name, price');
      if (data) {
        const priceMap = data.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.price }), {});
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
      const newAdults = [...adults];
      newAdults[index][field] = value;
      setAdults(newAdults);
      if (index === 0 && (field === 'email' || field === 'phone')) {
        const updatedKids = kids.map(k => k.useAdultContact ? { ...k, [field]: value } : k);
        setKids(updatedKids);
      }
    } else if (type === 'kid') {
      const newKids = [...kids];
      newKids[index][field] = value;
      setKids(newKids);
    } else if (type === 'team') {
      const newMembers = [...team.members];
      newMembers[index][field] = value;
      setTeam({ ...team, members: newMembers });
    }
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

    // 1. Validar Adultos
    for (let i = 0; i < adults.length; i++) {
      const a = adults[i];
      if (!a.name) return toast.error(`Name required for Adult ${i + 1}`);
      if (!validateEmail(a.email)) return toast.error(`Invalid email for Adult ${i + 1}`);
      if (!validatePhone(a.phone)) return toast.error(`Invalid phone for Adult ${i + 1}`);
    }

    // 2. Validar Niños
    for (let i = 0; i < kids.length; i++) {
      const k = kids[i];
      if (!k.name) return toast.error(`Name required for Kid ${i + 1}`);
      if (!k.useAdultContact) {
        if (!validateEmail(k.email)) return toast.error(`Invalid email for Kid ${i + 1}`);
        if (!validatePhone(k.phone)) return toast.error(`Invalid phone for Kid ${i + 1}`);
      }
    }

    // 3. Validar Equipo
    if (team.active) {
      if (!team.teamName) return toast.error("Team name is required");
      for (let i = 0; i < team.members.length; i++) {
        const m = team.members[i];
        if (!m.name) return toast.error(`Name required for Player ${i + 1}`);
        if (!validateEmail(m.email)) return toast.error(`Invalid email for Player ${i + 1}`);
        if (!validatePhone(m.phone)) return toast.error(`Invalid phone for Player ${i + 1}`);
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

      {/* Selectores de cantidad */}
      <div className="ticket-selectors">
        <div className="selector-item">
          <label>Adults (${PRICE_ADULT})</label>
          <div className="counter">
            <button type="button" onClick={() => updateCount('adult', -1)}>-</button>
            <span>{adults.length}</span>
            <button type="button" onClick={() => updateCount('adult', 1)}>+</button>
          </div>
        </div>

        <div className={`selector-item ${adults.length === 0 ? 'disabled' : ''}`}>
          <label>Kids (${PRICE_KID})</label>
          <div className="counter">
            <button type="button" onClick={() => updateCount('kid', -1)} disabled={adults.length === 0}>-</button>
            <span>{kids.length}</span>
            <button type="button" onClick={() => updateCount('kid', 1)} disabled={adults.length === 0}>+</button>
          </div>
        </div>

        <div className="selector-item checkbox-item">
          <label htmlFor="team-check">Soccer Team Pack (${PRICE_TEAM})</label>
          <input 
            id="team-check"
            type="checkbox" 
            checked={team.active} 
            onChange={() => setTeam({...team, active: !team.active})} 
          />
        </div>
      </div>

      <hr />

      {/* Formularios Dinámicos */}
      <div className="registration-forms">
        {adults.map((adult, i) => (
          <article key={i} className="form-card">
            <h3>Adult {i + 1}</h3>
            <div className="input-group">
              <input type="text" placeholder="Full Name" value={adult.name} onChange={(e) => handleInputChange('adult', i, 'name', e.target.value)} />
              <input type="email" placeholder="Email" value={adult.email} onChange={(e) => handleInputChange('adult', i, 'email', e.target.value)} />
              <input type="tel" placeholder="Phone" value={adult.phone} onChange={(e) => handleInputChange('adult', i, 'phone', e.target.value)} />
            </div>
          </article>
        ))}

        {kids.map((kid, i) => (
          <article key={i} className="form-card kid">
            <h3>Kid {i + 1}</h3>
            <label className="sublist">
              <input type="checkbox" checked={kid.useAdultContact} onChange={() => {
                const newKids = [...kids];
                newKids[i].useAdultContact = !newKids[i].useAdultContact;
                if(newKids[i].useAdultContact && adults[0]) {
                  newKids[i].email = adults[0].email;
                  newKids[i].phone = adults[0].phone;
                }
                setKids(newKids);
              }} /> Use Adult 1 contact details
            </label>
            <div className="input-group">
              <input type="text" placeholder="Kid's Name" value={kid.name} onChange={(e) => handleInputChange('kid', i, 'name', e.target.value)} />
              {!kid.useAdultContact && (
                <>
                  <input type="email" placeholder="Email" value={kid.email} onChange={(e) => handleInputChange('kid', i, 'email', e.target.value)} />
                  <input type="tel" placeholder="Phone" value={kid.phone} onChange={(e) => handleInputChange('kid', i, 'phone', e.target.value)} />
                </>
              )}
            </div>
          </article>
        ))}

        {team.active && (
          <article className="form-card team">
            <h3>Soccer Team</h3>
            <input className="team-name-input" type="text" placeholder="Team Name" value={team.teamName} onChange={(e) => setTeam({...team, teamName: e.target.value})} />
            {team.members.map((m, i) => (
              <div key={i} className="input-group team-member">
                <small>Player {i+1}</small>
                <input type="text" placeholder="Name" value={m.name} onChange={(e) => handleInputChange('team', i, 'name', e.target.value)} />
              </div>
            ))}
          </article>
        )}
      </div>

      {/* Origen y Pago */}
      <footer className="form-footer">
        <label>How did you hear about us?</label>
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">Select...</option>
          {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <div className="total-display">
          <span>Total:</span>
          <strong>${total} AUD</strong>
        </div>

        <button className="payment-button" onClick={handleSubmit} disabled={loading || total === 0}>
          {loading ? 'Processing...' : 'Secure My Spot'}
        </button>
      </footer>
    </section>
  );
}