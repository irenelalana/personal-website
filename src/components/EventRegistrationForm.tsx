'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { checkoutComplexBooking } from '@/app/actions';
import { toast } from 'sonner';
import Link from 'next/link';

export default function EventRegistrationLongForm() {
  const SOURCES = ['Irela Aqua and Fitness', 'Belen Roldan', 'Yeronga Eagles', 'Move in Tune (Denise)', 'Fuego Beats (Lala)', 'Paola Castro', 'Natura Med (Karina)', 'Xango Capoeira (Yaya)', 'Manu Fit', 'Elvira Cete', 'Agus & Leo', 'Ileana Contreras', 'Social Media', 'Word of Mouth', 'Other'];
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<Record<string, number>>({});

  const [activeTab, setActiveTab] = useState<'general' | 'team'>('general');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [adults, setAdults] = useState<any[]>([]);
  const [youth, setYouth] = useState<any[]>([]);
  const [kidsUnder11, setKidsUnder11] = useState<string>('0');
  
  // NUEVO: Estado para el contacto de emergencia
  const [emergency, setEmergency] = useState({ name: '', phone: '' });
  
  const [team, setTeam] = useState({
    teamName: '',
    jerseyColour: '',
    // Cambiamos name por firstName y lastName
    members: Array.from({ length: 5 }, () => ({ firstName: '', lastName: '', email: '', phone: '' }))
  });
  const [source, setSource] = useState('');

  const [activities, setActivities] = useState({
    runningRace: false,
    fitness: false,
    soccer: false,
    socialSoccer: false,
    party: false,
    kidsFun: false
  });

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
  const PRICE_YOUTH = prices['Youth'] || 0;
  const PRICE_TEAM = prices['Soccer Team'] || 0;

  const handleInputChange = (type: 'adult' | 'youth' | 'team', index: number, field: string, value: string) => {
    if (type === 'adult') {
      const newAdults = [...adults];
      (newAdults[index] as any)[field] = value;
      setAdults(newAdults);
    } else if (type === 'youth') {
      const newyouth = [...youth];
      (newyouth[index] as any)[field] = value;
      setYouth(newyouth);
    } else if (type === 'team') {
      const newMembers = [...team.members];
      (newMembers[index] as any)[field] = value;
      setTeam({ ...team, members: newMembers });
    }
  };

  const updateCount = (type: 'adult' | 'youth', delta: number) => {
    if (type === 'adult') {
      const next = adults.length + delta;
      if (next < 0) return;
      if (next === 0) setKidsUnder11('0');
      // Todos los adultos se inicializan igual, pero solo mostraremos/validaremos email/phone para el index 0
      delta > 0 ? setAdults([...adults, { firstName: '', lastName: '', email: '', phone: '' }]) : setAdults(adults.slice(0, -1));
    } else {
      if (adults.length === 0) return toast.error("Please, add at least one adult first");
      const next = youth.length + delta;
      if (next < 0) return;
      // Quitamos el useAdultContact
      delta > 0 ? setYouth([...youth, { firstName: '', lastName: '', email: '', phone: '' }]) : setYouth(youth.slice(0, -1));
    }
  };

  const addPlayer = () => {
    if (team.members.length < 8) {
      setTeam({ ...team, members: [...team.members, { firstName: '', lastName: '', email: '', phone: '' }] });
    }
  };

  const removePlayer = () => {
    if (team.members.length > 5) {
      setTeam({ ...team, members: team.members.slice(0, -1) });
    }
  };

  const total = activeTab === 'general' 
    ? (adults.length * PRICE_ADULT) + (youth.length * PRICE_YOUTH)
    : PRICE_TEAM;

  const handleSubmit = async () => {
    if (!acceptedTerms) return toast.error("You must accept the Terms and Conditions to proceed");
    // NUEVA VALIDACIÓN: Al menos una actividad seleccionada
    const hasActivity = Object.values(activities).some(val => val === true);
    if (!hasActivity) return toast.error("Please select at least one activity");
    if (total === 0 && activeTab === 'general') return toast.error("Select at least one ticket to proceed");
    if (!source) return toast.error("Please select how you heard about us");

    // NUEVO: Validación de Contacto de Emergencia
    if (!emergency.name) return toast.error("Emergency contact name is required");
    if (!validatePhone(emergency.phone)) return toast.error("Invalid emergency phone number");

    if (activeTab === 'general') {
      // Validamos al primer adulto (Obligatorio email y tfno)
      if (adults.length > 0) {
        if (!adults[0].firstName || !adults[0].lastName) return toast.error("First and Last Name required for Adult 1");
        if (!validateEmail(adults[0].email)) return toast.error("Invalid email for Adult 1");
        if (!validatePhone(adults[0].phone)) return toast.error("Invalid phone for Adult 1");
      }
      
      // Validamos el resto de adultos (Solo nombre)
      for (let i = 1; i < adults.length; i++) {
        if (!adults[i].firstName || !adults[i].lastName) return toast.error(`First and Last Name required for Adult ${i + 1}`);
      }
      
      // Validamos jóvenes (Solo nombre)
      for (let i = 0; i < youth.length; i++) {
        if (!youth[i].firstName || !youth[i].lastName) return toast.error(`First and Last Name required for Youth ${i + 1}`);
      }
    } else if (activeTab === 'team') {
      if (!team.teamName) return toast.error("Team name is required");
      if (!team.jerseyColour) return toast.error("Jersey colour is required");
      
      // Validamos al Capitán (Obligatorio email y tfno)
      if (team.members.length > 0) {
        if (!team.members[0].firstName || !team.members[0].lastName) return toast.error("First and Last Name required for Captain (Player 1)");
        if (!validateEmail(team.members[0].email)) return toast.error("Invalid email for Captain (Player 1)");
        if (!validatePhone(team.members[0].phone)) return toast.error("Invalid phone for Captain (Player 1)");
      }

      // Validamos el resto de jugadores (Solo nombre)
      for (let i = 1; i < team.members.length; i++) {
        if (!team.members[i].firstName || !team.members[i].lastName) return toast.error(`First and Last Name required for Player ${i + 1}`);
      }
    }

    setLoading(true);

    // Asignamos el email y teléfono del Adulto 1 o Capitán al resto de los asistentes en el payload
    const payloadAdults = adults.map((adult, index) => ({
      ...adult,
      email: index === 0 ? adult.email : adults[0].email,
      phone: index === 0 ? adult.phone : adults[0].phone,
      kids: index === 0 ? kidsUnder11 : '0'
    }));

    const payloadYouth = youth.map((y) => ({
      ...y,
      email: adults.length > 0 ? adults[0].email : '',
      phone: adults.length > 0 ? adults[0].phone : ''
    }));

    const payloadTeamMembers = team.members.map((m, index) => ({
      ...m,
      email: index === 0 ? m.email : team.members[0].email,
      phone: index === 0 ? m.phone : team.members[0].phone,
    }));
    
    const payload = {
      adults: activeTab === 'general' ? payloadAdults : [],
      youth: activeTab === 'general' ? payloadYouth : [],
      team: activeTab === 'team' ? { ...team, members: payloadTeamMembers, active: true } : null,
      emergency, // Añadimos el contacto de emergencia global
      source,
      activities
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
          🏋🏽‍♀️🏃🏾Single & Multiple Event Tickets🏋🏻🏃🏼‍♀️
        </button>
        <button className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`} onClick={() => setActiveTab('team')}>
          ⚽Soccer Team Pack (Only for adults)⚽
        </button>
      </div>

      <hr style={{margin: '1.5rem 0', opacity: 0.2}} />

      {activeTab === 'general' && (
        <div className="tab-content fade-in">
          <div className="ticket-selectors">
            {/* ... (Contadores igual que antes) ... */}
            <div className="selector-item">
              <label>Adults (${PRICE_ADULT})</label>
              <div className="counter">
                <button type="button" onClick={() => updateCount('adult', -1)}>-</button>
                <span className="count-value">{adults.length}</span>
                <button type="button" onClick={() => updateCount('adult', 1)}>+</button>
              </div>
            </div>

            <div className={`selector-item ${adults.length === 0 ? 'disabled' : ''}`}>
              <label>Youth (11-17) (${PRICE_YOUTH})</label>
              <div className="counter">
                <button type="button" onClick={() => updateCount('youth', -1)} disabled={adults.length === 0}>-</button>
                <span className="count-value">{youth.length}</span>
                <button type="button" onClick={() => updateCount('youth', 1)} disabled={adults.length === 0}>+</button>
              </div>
            </div>
            <div className={`selector-item ${adults.length === 0 ? 'disabled' : ''}`}>
              <label>Kids Under 11 (Free)</label>
              <div className="counter" style={{ justifyContent: 'flex-start' }}>
                <select 
                  value={kidsUnder11} 
                  onChange={(e) => setKidsUnder11(e.target.value)}
                  disabled={adults.length === 0}
                  style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #cbd5e1', background: 'white', color: 'black', minWidth: '70px', cursor: adults.length === 0 ? 'not-allowed' : 'pointer' }}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3+">3+</option>
                </select>
              </div>
            </div>
          </div>

          <div className="registration-forms">
            {adults.map((adult, i) => (
              <article key={i} className="form-card-activate">
                <div className="card-header"><span className="badge">Adult {i + 1}</span></div>
                <div className="input-group">
                  {/* Sustituye el input de "Full Name" por estos dos: */}
                  <input type="text" placeholder="First Name" value={adult.firstName} onChange={(e) => handleInputChange('adult', i, 'firstName', e.target.value)} required />
                  <input type="text" placeholder="Last Name" value={adult.lastName} onChange={(e) => handleInputChange('adult', i, 'lastName', e.target.value)} required />
                  {/* Solo mostramos Email y Teléfono para el primer adulto */}
                  {i === 0 && (
                    <>
                      <input type="email" placeholder="Email Address" value={adult.email} onChange={(e) => handleInputChange('adult', i, 'email', e.target.value)} required />
                      <input type="tel" placeholder="Phone Number" value={adult.phone} onChange={(e) => handleInputChange('adult', i, 'phone', e.target.value)} required />
                    </>
                  )}
                </div>
              </article>
            ))}

            {youth.map((y, i) => (
              <article key={i} className="form-card-activate kid-card">
                <div className="card-header">
                  <span className="badge orange">Youth {i + 1}</span>
                </div>
                <div className="input-group">
                  {/* Sustituye el input de "Youth's Full Name" por estos dos: */}
                  <input type="text" placeholder="Youth's First Name" value={y.firstName} onChange={(e) => handleInputChange('youth', i, 'firstName', e.target.value)} required />
                  <input type="text" placeholder="Youth's Last Name" value={y.lastName} onChange={(e) => handleInputChange('youth', i, 'lastName', e.target.value)} required />
                  {/* Eliminamos los campos de email y phone para youth */}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="tab-content fade-in">
          <div className="registration-forms">
            <article className="form-card-activate team-card">
              <div className="card-header">
                <span className="badge green">Soccer Team Registration (${PRICE_TEAM})</span>
              </div>
              <div className="input-group">
                <span className="member-label">Team Name</span>
                <input className="team-name-input" type="text" placeholder="Team Name (Required)" value={team.teamName} onChange={(e) => setTeam({...team, teamName: e.target.value})} />
                <span className="member-label">Team jersey Colour</span>   
                <input className="team-name-input" type="text" placeholder="Jersey Colour (Required)" value={team.jerseyColour} onChange={(e) => setTeam({...team, jerseyColour: e.target.value})} />
              </div>

              <div className="team-grid">
                {team.members.map((m, i) => (
                  <div key={i} className="team-member-row">
                    <span className="member-label">{i === 0 ? 'Player 1 (Captain)' : `Player ${i+1}`} {i >= 5 ? '(Optional)' : ''}</span>
                    <div className="input-group">
                      {/* Sustituye el input de "Name" por estos dos: */}
                      <input type="text" placeholder="First Name" value={m.firstName} onChange={(e) => handleInputChange('team', i, 'firstName', e.target.value)} />
                      <input type="text" placeholder="Last Name" value={m.lastName} onChange={(e) => handleInputChange('team', i, 'lastName', e.target.value)} />
                      {/* Solo mostramos Email y Teléfono para el primer jugador (Capitán) */}
                      {i === 0 && (
                        <>
                          <input type="email" placeholder="Email" value={m.email} onChange={(e) => handleInputChange('team', i, 'email', e.target.value)} />
                          <input type="tel" placeholder="Phone" value={m.phone} onChange={(e) => handleInputChange('team', i, 'phone', e.target.value)} />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

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

      {/* --- FOOTER: Origen, Emergencia, T&C y Pago --- */}
      <div className="form-footer">
        
        {/* NUEVO: Contacto de Emergencia */}
        {((activeTab === 'general' && adults.length > 0) || activeTab === 'team') && (
          <div className="emergency-section" style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>Emergency Contact <span style={{color: 'red'}}>*</span></h4>
            <div className="input-group">
              <input type="text" placeholder="Emergency Contact Name" value={emergency.name} onChange={(e) => setEmergency({...emergency, name: e.target.value})} required style={{marginBottom: '10px', width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #cbd5e1'}} />
              <input type="tel" placeholder="Emergency Contact Phone" value={emergency.phone} onChange={(e) => setEmergency({...emergency, phone: e.target.value})} required style={{width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #cbd5e1'}} />
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '5px' }}>This contact will be used for all registered members in this booking.</p>
          </div>
        )}

        {/* NUEVO: Selección de Actividades */}
        <div className="activities-section" style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#0f172a' }}>Which activities will you participate in? <span style={{color: 'red'}}>*</span></h4>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '15px' }}>Select all that apply.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={activities.runningRace} onChange={(e) => setActivities({...activities, runningRace: e.target.checked})} />
              Icoté Sweet Run / Walk 8:00am
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={activities.fitness} onChange={(e) => setActivities({...activities, fitness: e.target.checked})} />
              Fitness activities 9:00am - 4:00pm
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={activities.kidsFun} onChange={(e) => setActivities({...activities, kidsFun: e.target.checked})} />
              Kids & Youth activities 9:00am - 4:00pm
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={activities.socialSoccer} onChange={(e) => setActivities({...activities, socialSoccer: e.target.checked})} />
              Social Soccer (kids, youth and families) 1:30pm & 3:00pm
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={activities.soccer} onChange={(e) => setActivities({...activities, soccer: e.target.checked})} />
              Inti Soccer Tournament (Adults only) 9:00am - 4:00pm
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={activities.party} onChange={(e) => setActivities({...activities, party: e.target.checked})} />
              End of party 4:00pm
            </label>
          </div>
        </div>

        <div className="source-section">
          <label>Where did you hear from us?</label>
          <select value={source} onChange={(e) => setSource(e.target.value)} required>
            <option value="">Please select...</option>
            {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="terms-container">
          <label className="terms-label">
            <input 
              type="checkbox" 
              checked={acceptedTerms} 
              onChange={(e) => setAcceptedTerms(e.target.checked)} 
            />
            I have read and accept the <Link href="/terms-and-conditions" target="_blank"> Terms and Conditions</Link>
          </label>
        </div>

        <div className="total-container">
          <span className="total-label">Subtotal:</span>
          <span className="total-amount">${total} AUD</span>
        </div>
        {/* <p style={{ color: '#f39304' }}>Tickets are not available at the moment, sorry for the inconvenience. They will be available soon, thanks for your patience!</p> */}

        <button className="payment-button cta-button" onClick={handleSubmit} disabled={loading || (activeTab === 'general' && total === 0)}>
          {loading ? 'PROCESSING...' : 'PURCHASE TICKETS'}
        </button>
      </div>
    </section>
  );
}
