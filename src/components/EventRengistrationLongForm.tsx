'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { checkoutComplexBooking } from '@/app/actions';
import { toast } from 'sonner';
import Link from 'next/link';

const ACTIVITIES_OPTS = ['Icoté Sweet Run / Walk', 'INTI Soccer 5-a-side Tournament', 'Group Fitness Classes', 'Wellness Workshops', 'Kids Activities', 'Social, fun & Community Activities'];
const AGE_OPTS = ['Under 18', '18-29', '30-49', '50-64', '65+'];
const GENDER_OPTS = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];
//const COUNTRY_OPTS = ['Australia', 'Spain', 'Latin America', 'Europe (other)', 'Asia', 'Africa', 'Other', 'Prefer not to say'];
const LANG_OPTS = ['Spanish', 'Portuguese', 'English', 'Other', 'Prefer not to say'];
const ACTIVITY_LVL_OPTS = ['I exercise regularly (3+ times per week)', 'I exercise occasionally (1-2 times per week)', 'I am starting or returning to exercise', 'I rarely exercise'];
const MOTIVATION_OPTS = ['Improve my health', 'Social connection', 'Community event', 'Try new sports or activities', 'Family activities', 'Support friends or community'];

export default function EventRegistrationForm() {
  const SOURCES = ['Irela Aqua and Fitness', 'Belen Roldan', 'Move in Tune (Denise)', 'Fuego Beats (Lala)', 'Paola Castro', 'Natura Med (Karina)', 'Xango Capoeira (Yaya)', 'Christian el Koala','Social Media', 'Word of Mouth', 'Other'];
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<Record<string, number>>({});

  const [activeTab, setActiveTab] = useState<'general' | 'team'>('general');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const baseParticipant = {
    firstName: '', lastName: '', email: '', phone: '',
    emergencyName: '', emergencyPhone: '',
    activities: [] as string[],
    ageRange: '', gender: '', countryOfBirth: '', language: '',
    physicalActivity: '', motivations: [] as string[]
  };

  const [adults, setAdults] = useState<any[]>([]);
  const [youth, setYouth] = useState<any[]>([]);
  
  const [team, setTeam] = useState({
    teamName: '',
    jerseyColour: '',
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
  }, [supabase]);

  const PRICE_ADULT = prices['Adult'] || 0;
  const PRICE_YOUTH = prices['Youth'] || 0;
  const PRICE_TEAM = prices['Soccer Team'] || 0;

  const handleInputChange = (type: 'adult' | 'youth' | 'team', index: number, field: string, value: string) => {
    if (type === 'adult') {
      const newAdults = [...adults];
      (newAdults[index] as any)[field] = value;
      setAdults(newAdults);
      
      if (index === 0 && (field === 'email' || field === 'phone')) {
        const updatedyouth = youth.map(k => k.useAdultContact ? { ...k, [field]: value } : k);
        setYouth(updatedyouth);
      }
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

  const handleArrayChange = (type: 'adult' | 'youth', index: number, field: 'activities' | 'motivations', value: string) => {
    const list = type === 'adult' ? [...adults] : [...youth];
    const currentArray = list[index][field] as string[];
    
    if (currentArray.includes(value)) {
      list[index][field] = currentArray.filter(item => item !== value);
    } else {
      list[index][field] = [...currentArray, value];
    }
    
    type === 'adult' ? setAdults(list) : setYouth(list);
  };

  const updateCount = (type: 'adult' | 'youth', delta: number) => {
    if (type === 'adult') {
      const next = adults.length + delta;
      if (next < 0) return;
      delta > 0 ? setAdults([...adults, { ...baseParticipant }]) : setAdults(adults.slice(0, -1));
    } else {
      if (adults.length === 0) return toast.error("Please, add at least one adult first");
      const next = youth.length + delta;
      if (next < 0) return;
      delta > 0 ? setYouth([...youth, { ...baseParticipant, ageRange: 'Under 18', useAdultContact: false }]) : setYouth(youth.slice(0, -1));
    }
  };

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
    ? (adults.length * PRICE_ADULT) + (youth.length * PRICE_YOUTH)
    : PRICE_TEAM;

  const handleSubmit = async () => {
    if (!acceptedTerms) return toast.error("You must accept the Terms and Conditions to proceed");
    if (total === 0 && activeTab === 'general') return toast.error("Select at least one ticket to proceed");
    if (!source) return toast.error("Please select how you heard about us");

    if (activeTab === 'general') {
      for (let i = 0; i < adults.length; i++) {
        const a = adults[i];
        if (!a.firstName || !a.lastName) return toast.error(`First and Last Name required for Adult ${i + 1}`);
        if (!validateEmail(a.email)) return toast.error(`Invalid email for Adult ${i + 1}`);
        if (!validatePhone(a.phone)) return toast.error(`Invalid phone for Adult ${i + 1}`);
        if (!a.emergencyName || !a.emergencyPhone) return toast.error(`Emergency contact info required for Adult ${i + 1}`);
        if (a.activities.length === 0) return toast.error(`Select at least one activity for Adult ${i + 1}`);
      }
      for (let i = 0; i < youth.length; i++) {
        const k = youth[i];
        if (!k.firstName || !k.lastName) return toast.error(`First and Last Name required for Youth ${i + 1}`);
        if (!k.useAdultContact) {
          if (!validateEmail(k.email)) return toast.error(`Invalid email for Youth ${i + 1}`);
          if (!validatePhone(k.phone)) return toast.error(`Invalid phone for Youth ${i + 1}`);
        }
        if (!k.emergencyName || !k.emergencyPhone) return toast.error(`Emergency contact info required for Youth ${i + 1}`);
      }
    } else if (activeTab === 'team') {
      if (!team.teamName) return toast.error("Team name is required");
      if (!team.jerseyColour) return toast.error("Jersey colour is required");
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
      youth: activeTab === 'general' ? youth : [],
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

  // Subcomponente reutilizable para renderizar el formulario de un participante
  const renderParticipantFields = (p: any, type: 'adult' | 'youth', i: number) => (
    <div className="participant-details" style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem'}}>
      
      {/* 1. Basic Info */}
      <h4 style={{marginBottom: '0.2rem', color: '#e2e8f0'}}>1. Basic Information</h4>
      <div className="input-group">
        <input type="text" placeholder="First Name *" value={p.firstName} onChange={(e) => handleInputChange(type, i, 'firstName', e.target.value)} required />
        <input type="text" placeholder="Last Name *" value={p.lastName} onChange={(e) => handleInputChange(type, i, 'lastName', e.target.value)} required />
        
        {!(type === 'youth' && p.useAdultContact) && (
          <>
            <input type="email" placeholder="Email Address *" value={p.email} onChange={(e) => handleInputChange(type, i, 'email', e.target.value)} required />
            <input type="tel" placeholder="Mobile Phone *" value={p.phone} onChange={(e) => handleInputChange(type, i, 'phone', e.target.value)} required />
          </>
        )}
      </div>

      {/* 2. Emergency Contact */}
      <h4 style={{marginBottom: '0.2rem', color: '#e2e8f0', marginTop: '0.5rem'}}>2. Emergency Contact</h4>
      <div className="input-group">
        <input type="text" placeholder="Emergency Contact Name *" value={p.emergencyName} onChange={(e) => handleInputChange(type, i, 'emergencyName', e.target.value)} required />
        <input type="tel" placeholder="Emergency Contact Phone *" value={p.emergencyPhone} onChange={(e) => handleInputChange(type, i, 'emergencyPhone', e.target.value)} required />
      </div>

      {/* 3. Participation Details */}
      <h4 style={{marginBottom: '0.2rem', color: '#e2e8f0', marginTop: '0.5rem'}}>3. Activities of Interest *</h4>
      <div className="checkbox-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem'}}>
        {ACTIVITIES_OPTS.map(act => (
          <label key={act} style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0'}}>
            <input 
              type="checkbox" 
              checked={p.activities.includes(act)}
              onChange={() => handleArrayChange(type, i, 'activities', act)}
            /> {act}
          </label>
        ))}
      </div>

      {/* Línea divisoria ligeramente más clara para verse en fondo oscuro */}
      <hr style={{opacity: 0.4, margin: '1rem 0', borderColor: '#e2e8f0'}} />
      
      {/* Texto de descargo de responsabilidad actualizado y en color claro */}
      <p style={{fontSize: '0.85rem', color: '#cbd5e1', fontStyle: 'italic', lineHeight: '1.4'}}>
        The following questions are optional and help us measure the community impact of the event. 
        This data will be strictly stored for anonymous statistical purposes to understand our audience better.
      </p>

      {/* 4. Demographics */}
      <h4 style={{marginBottom: '0.2rem', color: '#e2e8f0'}}>4. Community & Demographics (Optional)</h4>
      <div className="input-group">
        <select value={p.ageRange} onChange={(e) => handleInputChange(type, i, 'ageRange', e.target.value)}>
          <option value="">Age Range</option>
          {AGE_OPTS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>

        <select value={p.gender} onChange={(e) => handleInputChange(type, i, 'gender', e.target.value)}>
          <option value="">Gender</option>
          {GENDER_OPTS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>

        {/* <select value={p.countryOfBirth} onChange={(e) => handleInputChange(type, i, 'countryOfBirth', e.target.value)}>
          <option value="">Cultural Background</option>
          {COUNTRY_OPTS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select> */}

        <select value={p.language} onChange={(e) => handleInputChange(type, i, 'language', e.target.value)}>
          <option value="">Language spoken at home</option>
          {LANG_OPTS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>

      {/* 5. Health & Indicators */}
      <h4 style={{marginBottom: '0.2rem', color: '#e2e8f0', marginTop: '0.5rem'}}>5. Health & Activity Indicators (Optional)</h4>
      <select value={p.physicalActivity} onChange={(e) => handleInputChange(type, i, 'physicalActivity', e.target.value)} style={{marginBottom: '1rem'}}>
        <option value="">Current level of physical activity?</option>
        {ACTIVITY_LVL_OPTS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>

      <span style={{fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block', color: '#e2e8f0'}}>What motivates you to attend?</span>
      <div className="checkbox-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem'}}>
        {MOTIVATION_OPTS.map(mot => (
          <label key={mot} style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0'}}>
            <input 
              type="checkbox" 
              checked={p.motivations.includes(mot)}
              onChange={() => handleArrayChange(type, i, 'motivations', mot)}
            /> {mot}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <section className="booking-container">
      
      <div className="form-tabs">
        <button className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>
          Single & Multiple Event Tickets
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
              <label>Youth (12-17) (${PRICE_YOUTH})</label>
              <div className="counter">
                <button type="button" onClick={() => updateCount('youth', -1)} disabled={adults.length === 0}>-</button>
                <span className="count-value">{youth.length}</span>
                <button type="button" onClick={() => updateCount('youth', 1)} disabled={adults.length === 0}>+</button>
              </div>
            </div>
          </div>

          <div className="registration-forms">
            {adults.map((adult, i) => (
              <article key={`adult-${i}`} className="form-card-activate">
                <div className="card-header"><span className="badge">Adult {i + 1}</span></div>
                {renderParticipantFields(adult, 'adult', i)}
              </article>
            ))}

            {youth.map((y, i) => (
              <article key={`youth-${i}`} className="form-card-activate kid-card">
                <div className="card-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span className="badge orange">Youth {i + 1}</span>
                  <label className="contact-sync" style={{fontSize: '0.85rem', cursor: 'pointer', color: '#e2e8f0'}}>
                    <input type="checkbox" checked={y.useAdultContact} onChange={() => {
                      const newyouth = [...youth];
                      newyouth[i].useAdultContact = !newyouth[i].useAdultContact;
                      if(newyouth[i].useAdultContact && adults[0]) {
                        newyouth[i].email = adults[0].email;
                        newyouth[i].phone = adults[0].phone;
                      } else {
                        newyouth[i].email = '';
                        newyouth[i].phone = '';
                      }
                      setYouth(newyouth);
                    }} style={{marginRight: '0.5rem'}}/> 
                    Use Adult 1 contact info
                  </label>
                </div>
                {renderParticipantFields(y, 'youth', i)}
              </article>
            ))}
          </div>
        </div>
      )}

      {/* CÓDIGO DEL EQUIPO DE FÚTBOL INTACTO */}
      {activeTab === 'team' && (
        <div className="tab-content fade-in">
          <div className="registration-forms">
            <article className="form-card-activate team-card">
              <div className="card-header">
                <span className="badge green">Soccer Team Registration (${PRICE_TEAM})</span>
              </div>
              <div className="input-group">
                <span className="member-label" style={{color: '#e2e8f0'}}>Team Name</span>
                <input className="team-name-input" type="text" placeholder="Team Name (Required)" value={team.teamName} onChange={(e) => setTeam({...team, teamName: e.target.value})} />
                <span className="member-label" style={{color: '#e2e8f0'}}>Team jersey Colour</span>   
                <input className="team-name-input" type="text" placeholder="Jersey Colour (Required)" value={team.jerseyColour} onChange={(e) => setTeam({...team, jerseyColour: e.target.value})} />
              </div>

              <div className="team-grid">
                {team.members.map((m, i) => (
                  <div key={i} className="team-member-row">
                    <span className="member-label" style={{color: '#e2e8f0'}}>Player {i+1} {i >= 5 ? '(Optional)' : ''}</span>
                    <div className="input-group">
                      <input type="text" placeholder="Name" value={m.name} onChange={(e) => handleInputChange('team', i, 'name', e.target.value)} />
                      <input type="email" placeholder="Email" value={m.email} onChange={(e) => handleInputChange('team', i, 'email', e.target.value)} />
                      <input type="tel" placeholder="Phone" value={m.phone} onChange={(e) => handleInputChange('team', i, 'phone', e.target.value)} />
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

      {/* --- FOOTER: Origen, T&C y Pago --- */}
      <div className="form-footer">
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

        {/* <button className="payment-button cta-button" onClick={handleSubmit} disabled={loading || (activeTab === 'general' && total === 0)}>
          {loading ? 'PROCESSING...' : 'PURCHASE TICKETS'}
        </button> */}
      </div>
    </section>
  );
}