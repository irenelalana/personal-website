'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { checkoutComplexBooking } from '@/app/actions';
import { toast } from 'sonner';
import Link from 'next/link'; // Importamos Link para los términos

export default function EventRegistrationForm() {
  const SOURCES = ['Irela Aqua and Fitness', 'Belen Roldan', 'Movehood (Carla)', 'Move in Tune (Denise)', 'Fuego Beats (Lala)', 'Speed fit (Verónica)', 'Paola Castro', 'Natura Med (Karina)', 'Xango Capoeira (Yaya)', 'Christian el Koala','Social Media', 'Word of Mouth', 'Other'];
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<Record<string, number>>({});

  const [activeTab, setActiveTab] = useState<'general' | 'team'>('general');
  const [acceptedTerms, setAcceptedTerms] = useState(false); // NUEVO: Estado para T&C

  const [adults, setAdults] = useState<any[]>([]);
  const [kids, setKids] = useState<any[]>([]);
  
  // EQUIPO: Inicializamos con 5 miembros
  const [team, setTeam] = useState({
    teamName: '',
    members: Array.from({ length: 5 }, () => ({ name: '', email: '', phone: '' }))
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
  const PRICE_TEAM = prices['Soccer Team'] || 0; // ¿El precio es fijo para 5-8 o por jugador? Asumo que es un Pack fijo por ahora.

  const handleInputChange = (type: 'adult' | 'kid' | 'team', index: number, field: string, value: string) => {
    if (type === 'adult') {
      const newAdults = [...adults];
      // Usamos (as any) para que TS nos deje indexar con un string dinámico
      (newAdults[index] as any)[field] = value;
      setAdults(newAdults);
      if (index === 0 && (field === 'email' || field === 'phone')) {
        const updatedKids = kids.map(k => k.useAdultContact ? { ...k, [field]: value } : k);
        setKids(updatedKids);
      }
    } else if (type === 'kid') {
      const newKids = [...kids];
      (newKids[index] as any)[field] = value;
      setKids(newKids);
    } else if (type === 'team') {
      const newMembers = [...team.members];
      // Aquí aplicamos lo mismo para tu error específico
      (newMembers[index] as any)[field] = value;
      setTeam({ ...team, members: newMembers });
    }
  };

  const updateCount = (type: 'adult' | 'kid', delta: number) => {
    if (type === 'adult') {
      const next = adults.length + delta;
      if (next < 0) return;
      delta > 0 ? setAdults([...adults, { name: '', email: '', phone: '' }]) : setAdults(adults.slice(0, -1));
    } else {
      if (adults.length === 0) return toast.error("Please, add at least one adult first");
      const next = kids.length + delta;
      if (next < 0) return;
      delta > 0 ? setKids([...kids, { name: '', email: '', phone: '', useAdultContact: false }]) : setKids(kids.slice(0, -1));
    }
  };

  // NUEVO: Funciones para gestionar jugadores del equipo (min 5, max 8)
  const addPlayer = () => {
    if (team.members.length < 8) {
      setTeam({ ...team, members: [...team.members, { name: '', email: '', phone: '' }] });
    }
  };

  const removePlayer = () => {
    if (team.members.length > 5) {
      setTeam({ ...team, members: team.members.slice(0, -1) });
    }
  };

  const total = activeTab === 'general' 
    ? (adults.length * PRICE_ADULT) + (kids.length * PRICE_KID)
    : PRICE_TEAM;

  const handleSubmit = async () => {
    // 1. Validación de Términos (Obligatorio en todos los casos)
    if (!acceptedTerms) return toast.error("You must accept the Terms and Conditions to proceed");
    
    // 2. Validación de Tickets Totales y Fuente
    if (total === 0 && activeTab === 'general') return toast.error("Select at least one ticket to proceed");
    if (!source) return toast.error("Please select how you heard about us");

    // 3. Validaciones de Datos
    if (activeTab === 'general') {
      for (let i = 0; i < adults.length; i++) {
        const a = adults[i];
        if (!a.name) return toast.error(`Name required for Adult ${i + 1}`);
        if (!validateEmail(a.email)) return toast.error(`Invalid email for Adult ${i + 1}`);
        if (!validatePhone(a.phone)) return toast.error(`Invalid phone for Adult ${i + 1}`);
      }
      for (let i = 0; i < kids.length; i++) {
        const k = kids[i];
        if (!k.name) return toast.error(`Name required for Kid ${i + 1}`);
        if (!k.useAdultContact) {
          if (!validateEmail(k.email)) return toast.error(`Invalid email for Kid ${i + 1}`);
          if (!validatePhone(k.phone)) return toast.error(`Invalid phone for Kid ${i + 1}`);
        }
      }
    } else if (activeTab === 'team') {
      if (!team.teamName) return toast.error("Team name is required");
      for (let i = 0; i < team.members.length; i++) {
        const m = team.members[i];
        if (!m.name) return toast.error(`Name required for Player ${i + 1}`);
        if (!validateEmail(m.email)) return toast.error(`Invalid email for Player ${i + 1}`);
        if (!validatePhone(m.phone)) return toast.error(`Invalid phone for Player ${i + 1}`);
      }
    }

    setLoading(true);
    
    const payload = {
      adults: activeTab === 'general' ? adults : [],
      kids: activeTab === 'general' ? kids : [],
      team: activeTab === 'team' ? { ...team, active: true } : null,
      source
    };

    const res = await checkoutComplexBooking(payload);
    
    if (res?.url) {
      window.location.href = res.url;
    } else {
      toast.error("Error creating checkout session. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="booking-container">
      
      <div className="form-tabs">
        <button className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>
          Single & Group Tickets
        </button>
        <button className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`} onClick={() => setActiveTab('team')}>
          Soccer Team Pack
        </button>
      </div>

      <hr style={{margin: '1.5rem 0', opacity: 0.2}} />

      {activeTab === 'general' && (
        <div className="tab-content fade-in">
          <div className="ticket-selectors">
            <div className="selector-item">
              <label>Adults (${PRICE_ADULT})</label>
              <div className="counter">
                <button type="button" onClick={() => updateCount('adult', -1)}>-</button>
                <span className="count-value">{adults.length}</span>
                <button type="button" onClick={() => updateCount('adult', 1)}>+</button>
              </div>
            </div>

            <div className={`selector-item ${adults.length === 0 ? 'disabled' : ''}`}>
              <label>Kids (${PRICE_KID})</label>
              <div className="counter">
                <button type="button" onClick={() => updateCount('kid', -1)} disabled={adults.length === 0}>-</button>
                <span className="count-value">{kids.length}</span>
                <button type="button" onClick={() => updateCount('kid', 1)} disabled={adults.length === 0}>+</button>
              </div>
            </div>
          </div>

          <div className="registration-forms">
            {adults.map((adult, i) => (
              <article key={i} className="form-card">
                <header className="card-header"><span className="badge">Adult {i + 1}</span></header>
                <div className="input-group">
                  <input type="text" placeholder="Full Name" value={adult.name} onChange={(e) => handleInputChange('adult', i, 'name', e.target.value)} required />
                  <input type="email" placeholder="Email Address" value={adult.email} onChange={(e) => handleInputChange('adult', i, 'email', e.target.value)} required />
                  <input type="tel" placeholder="Phone Number" value={adult.phone} onChange={(e) => handleInputChange('adult', i, 'phone', e.target.value)} required />
                </div>
              </article>
            ))}

            {kids.map((kid, i) => (
              <article key={i} className="form-card kid-card">
                <header className="card-header">
                  <span className="badge orange">Kid {i + 1}</span>
                  <label className="contact-sync">
                    <input type="checkbox" checked={kid.useAdultContact} onChange={() => {
                      const newKids = [...kids];
                      newKids[i].useAdultContact = !newKids[i].useAdultContact;
                      if(newKids[i].useAdultContact && adults[0]) {
                        newKids[i].email = adults[0].email;
                        newKids[i].phone = adults[0].phone;
                      }
                      setKids(newKids);
                    }} /> Use Adult 1 info
                  </label>
                </header>
                <div className="input-group">
                  <input type="text" placeholder="Kid's Full Name" value={kid.name} onChange={(e) => handleInputChange('kid', i, 'name', e.target.value)} required />
                  {!kid.useAdultContact && (
                    <>
                      <input type="email" placeholder="Parent's Email" value={kid.email} onChange={(e) => handleInputChange('kid', i, 'email', e.target.value)} />
                      <input type="tel" placeholder="Parent's Phone" value={kid.phone} onChange={(e) => handleInputChange('kid', i, 'phone', e.target.value)} />
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="tab-content fade-in">
          <div className="registration-forms">
            <article className="form-card team-card">
              <header className="card-header">
                <span className="badge green">Soccer Team Registration (${PRICE_TEAM})</span>
              </header>
              <input className="team-name-input" type="text" placeholder="TEAM NAME (Required)" value={team.teamName} onChange={(e) => setTeam({...team, teamName: e.target.value})} />
              
              <div className="team-grid">
                {team.members.map((m, i) => (
                  <div key={i} className="team-member-row">
                    <span className="member-label">Player {i+1} {i >= 5 ? '(Optional)' : ''}</span>
                    <div className="input-group">
                      <input type="text" placeholder="Name" value={m.name} onChange={(e) => handleInputChange('team', i, 'name', e.target.value)} />
                      <input type="email" placeholder="Email" value={m.email} onChange={(e) => handleInputChange('team', i, 'email', e.target.value)} />
                      <input type="tel" placeholder="Phone" value={m.phone} onChange={(e) => handleInputChange('team', i, 'phone', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Botones para añadir/quitar jugadores extras */}
              <div className="team-actions">
                <button type="button" onClick={removePlayer} disabled={team.members.length <= 5} className="team-btn remove">
                  - Remove Player
                </button>
                <button type="button" onClick={addPlayer} disabled={team.members.length >= 8} className="team-btn add">
                  + Add Player
                </button>
              </div>

            </article>
          </div>
        </div>
      )}

      {/* --- FOOTER: Origen, T&C y Pago --- */}
      <footer className="form-footer">
        <div className="source-section">
          <label>Where did you hear from us?</label>
          <select value={source} onChange={(e) => setSource(e.target.value)} required>
            <option value="">Please select...</option>
            {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* NUEVO: Terms and Conditions */}
        <div className="terms-container">
          <label className="terms-label">
            <input 
              type="checkbox" 
              checked={acceptedTerms} 
              onChange={(e) => setAcceptedTerms(e.target.checked)} 
            />
            I have read and accept the <Link href="/terms-and-conditions" target="_blank">Terms and Conditions</Link>
          </label>
        </div>

        <div className="total-container">
          <span className="total-label">Subtotal:</span>
          <span className="total-amount">${total} AUD</span>
        </div>

        <button className="payment-button" onClick={handleSubmit} disabled={loading || (activeTab === 'general' && total === 0)}>
          {loading ? 'PROCESSING...' : 'SECURE MY SPOT'}
        </button>
      </footer>
    </section>
  );
}