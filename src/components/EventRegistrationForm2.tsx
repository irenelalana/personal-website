'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { checkoutComplexBooking } from '@/app/actions';
import { toast } from 'sonner';

export default function EventRegistrationForm() {
  const SOURCES = ['Irela Aqua and Fitness', 'Belen Roldan', 'El Koala', 'Activate Brisbane Instagram', 'Others'];
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<Record<string, number>>({});

  // Estados de los asistentes
  const [adults, setAdults] = useState<any[]>([]);
  const [kids, setKids] = useState<any[]>([]);
  const [team, setTeam] = useState({
    active: false,
    teamName: '',
    members: Array(5).fill({ name: '', email: '', phone: '' }) // Mínimo 5
  });
  const [source, setSource] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // Acepta formatos como +61 412 345 678, 0412345678, etc. (Mínimo 8 dígitos)
    return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{8,15}$/.test(phone);
  };

  useEffect(() => {
    async function loadPrices() {
      // Ajusta 'Adult', 'Kid' y 'Soccer Team' según los nombres exactos en tu DB
      const { data } = await supabase.from('ticket_types').select('name, price');
      if (data) {
        const priceMap = data.reduce((acc, curr) => ({
          ...acc, [curr.name]: curr.price
        }), {});
        setPrices(priceMap);
      }
    }
    loadPrices();
  }, []);

  const PRICE_ADULT = prices['Adult'] || 0;
  const PRICE_KID = prices['Kid'] || 0;
  const PRICE_TEAM = prices['Soccer Team'] || 0;

  // Actualizar datos de asistentes individuales
  const handleInputChange = (type: 'adult' | 'kid' | 'team', index: number, field: string, value: string) => {
    if (type === 'adult') {
      const newAdults = [...adults];
      newAdults[index][field] = value;
      setAdults(newAdults);

      // Si el primer adulto cambia y los niños tienen marcado "usar datos de adulto", se actualizan
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

  // Checkbox para que el niño use los datos del Adulto 1
  const handleKidContactToggle = (index: number) => {
    const newKids = [...kids];
    const isChecked = !newKids[index].useAdultContact;
    newKids[index].useAdultContact = isChecked;

    if (isChecked && adults[0]) {
      newKids[index].email = adults[0].email;
      newKids[index].phone = adults[0].phone;
    }
    setKids(newKids);
  };

  const updateCount = (type: 'adult' | 'kid', delta: number) => {
    if (type === 'adult') {
      const next = adults.length + delta;
      if (next < 0) return;
      if (next === 0) setKids([]);
      delta > 0 
        ? setAdults([...adults, { name: '', email: '', phone: '' }]) 
        : setAdults(adults.slice(0, -1));
    } else {
      if (adults.length === 0) return toast.error("Añade al menos un adulto primero");
      const next = kids.length + delta;
      if (next < 0) return;
      delta > 0 
        ? setKids([...kids, { name: '', email: '', phone: '', useAdultContact: false }]) 
        : setKids(kids.slice(0, -1));
    }
  };

  // Manejo de miembros del equipo (mínimo 5, máximo 7)
  const updateTeamSize = (delta: number) => {
    const nextSize = team.members.length + delta;
    if (nextSize < 5 || nextSize > 7) return;
    if (delta > 0) {
      setTeam({ ...team, members: [...team.members, { name: '', email: '', phone: '' }] });
    } else {
      setTeam({ ...team, members: team.members.slice(0, -1) });
    }
  };

  const total = (adults.length * PRICE_ADULT) + (kids.length * PRICE_KID) + (team.active ? PRICE_TEAM : 0);

  const handleSubmit = async () => {
    if (total === 0) return toast.error("Select at least one ticket to proceed");
    
    // Validación básica: que todos los nombres estén llenos
    const allNamesFilled = adults.every(a => a.name) && kids.every(k => k.name) && (!team.active || (team.teamName && team.members.every(m => m.name)));
    if (!allNamesFilled) return toast.error("Please, fill up all the names Por favor, rellena todos los nombres");

    if (!source) return toast.error("Please select how did you hear about us");

  // 2. Validar Adultos
    for (let i = 0; i < adults.length; i++) {
        const a = adults[i];
        if (!a.name) return toast.error(`Name required for Adult ${i + 1}`);
        if (!validateEmail(a.email)) return toast.error(`Invalid email for adult ${i + 1}`);
        if (!validatePhone(a.phone)) return toast.error(`Invalid phone number for adult ${i + 1}`);
    }

    // 3. Validar Niños
    for (let i = 0; i < kids.length; i++) {
        const k = kids[i];
        if (!k.name) return toast.error(`Name required for Kid ${i + 1}`);
        // Solo validamos contacto si NO usa el del adulto
        if (!k.useAdultContact) {
        if (!validateEmail(k.email)) return toast.error(`Invalid email for kid ${i + 1}`);
        if (!validatePhone(k.phone)) return toast.error(`Invalid phone number for kid ${i + 1}`);
        }
    }

    // 4. Validar Equipo
    if (team.active) {
        if (!team.teamName) return toast.error("Team name is required");
        for (let i = 0; i < team.members.length; i++) {
        const m = team.members[i];
        if (!m.name) return toast.error(`Name required for Player ${i + 1}`);
        if (!validateEmail(m.email)) return toast.error(`Invalid email for kid ${i + 1}`);
        if (!validatePhone(m.phone)) return toast.error(`Invalid phone number for player ${i + 1}`);
        }
    }

    setLoading(true);
    const res = await checkoutComplexBooking({ adults, kids, team: team.active ? team : null, source });
    if (res?.url) window.location.href = res.url;
    else {
      toast.error("Error creating checkout session. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Ticket Booking</h2>

      {/* --- SELECTORES --- */}
      <div className="space-y-4 mb-10">
        <div className="flex justify-between items-center p-5 bg-blue-50 rounded-xl border border-blue-100">
          <div>
            <p className="font-bold text-blue-900 text-lg">Adult Tickets</p>
            <p className="text-sm text-blue-600">${PRICE_ADULT}.00 AUD</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-lg shadow-sm">
            <button onClick={() => updateCount('adult', -1)} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200">-</button>
            <span className="font-mono font-bold w-6 text-center"> {adults.length}</span>
            <button onClick={() => updateCount('adult', 1)} className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded hover:bg-blue-700">+</button>
          </div>
          {/* Adultos */}
            {adults.map((adult, i) => (
            <div key={`adult-${i}`} className="p-6 border rounded-xl bg-white shadow-sm animate-in fade-in slide-in-from-bottom-2">
                <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">Adult {i+1}</span>
                
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Full Name" value={adult.name} onChange={(e) => handleInputChange('adult', i, 'name', e.target.value)} className="border p-3 rounded-lg w-full outline-blue-500" />
                <input type="email" placeholder="Email" value={adult.email} onChange={(e) => handleInputChange('adult', i, 'email', e.target.value)} className="border p-3 rounded-lg w-full outline-blue-500" />
                <input type="tel" placeholder="Phone Number" value={adult.phone} onChange={(e) => handleInputChange('adult', i, 'phone', e.target.value)} className="border p-3 rounded-lg w-full outline-blue-500" />
                </div>
            </div>
            ))}
        </div>

        <div className={`flex justify-between items-center p-5 rounded-xl border transition-all ${adults.length === 0 ? 'bg-gray-50 opacity-50' : 'bg-orange-50 border-orange-100'}`}>
          <div>
            <p className="font-bold text-orange-900 text-lg">Kid Tickets</p>
            <p className="text-sm text-orange-600">${PRICE_KID}.00 AUD</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-lg shadow-sm">
            <button onClick={() => updateCount('kid', -1)} disabled={adults.length === 0} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 disabled:cursor-not-allowed">-</button>
            <span className="font-mono font-bold w-6 text-center">{kids.length}</span>
            <button onClick={() => updateCount('kid', 1)} disabled={adults.length === 0} className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded hover:bg-orange-600 disabled:cursor-not-allowed">+</button>
          </div>
          {/* Niños */}
        {kids.map((kid, i) => (
          <div key={`kid-${i}`} className="p-6 border border-orange-200 rounded-xl bg-orange-50/30 animate-in fade-in slide-in-from-bottom-2">
            <h3 className="font-bold text-orange-800 mb-2">Kid {i+1}</h3>
            <label className="flex items-center gap-2 mb-4 text-sm text-orange-700 cursor-pointer">
              <input type="checkbox" checked={kid.useAdultContact} onChange={() => handleKidContactToggle(i)} className="rounded text-orange-500" />
              Same as Adult 1
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="Nombre del Niño" value={kid.name} onChange={(e) => handleInputChange('kid', i, 'name', e.target.value)} className="border p-3 rounded-lg w-full outline-orange-400" />
              <input type="email" placeholder="Email" value={kid.email} disabled={kid.useAdultContact} onChange={(e) => handleInputChange('kid', i, 'email', e.target.value)} className="border p-3 rounded-lg w-full disabled:bg-gray-100" />
              <input type="tel" placeholder="Teléfono" value={kid.phone} disabled={kid.useAdultContact} onChange={(e) => handleInputChange('kid', i, 'phone', e.target.value)} className="border p-3 rounded-lg w-full disabled:bg-gray-100" />
            </div>
          </div>
        ))}
        </div>

        <div className="flex justify-between items-center p-5 bg-green-50 rounded-xl border border-green-100">
          <div>
            <p className="font-bold text-green-900 text-lg">Soccer Team Pack</p>
            <p className="text-sm text-green-600">From 5 to 8 players ${PRICE_TEAM}.00 AUD</p>
          </div>
          <input type="checkbox" checked={team.active} onChange={() => setTeam({...team, active: !team.active})} className="w-6 h-6 rounded text-green-600" />
        </div>
      </div>

      {/* --- FORMULARIOS DINÁMICOS --- */}
      <div className="space-y-8">

        {/* Soccer Team */}
        {team.active && (
          <div className="p-6 border-2 border-green-500 rounded-xl bg-green-50/30 animate-in zoom-in-95 duration-200">
            <h3 className="font-black text-2xl text-green-900 mb-4">Registro de Equipo</h3>
            <input type="text" placeholder="Nombre del Equipo" value={team.teamName} onChange={(e) => setTeam({...team, teamName: e.target.value})} className="border-2 border-green-200 p-4 rounded-xl w-full mb-6 font-bold text-lg outline-green-500" />
            
            <div className="space-y-4">
              {team.members.map((member, i) => (
                <div key={`member-${i}`} className="p-4 bg-white rounded-lg border border-green-100 shadow-sm">
                  <p className="text-xs font-bold text-green-600 mb-2 uppercase">Jugador {i+1}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input type="text" placeholder="Nombre" value={member.name} onChange={(e) => handleInputChange('team', i, 'name', e.target.value)} className="border p-2 rounded-md outline-green-500" />
                    <input type="email" placeholder="Email" value={member.email} onChange={(e) => handleInputChange('team', i, 'email', e.target.value)} className="border p-2 rounded-md outline-green-500" />
                    <input type="tel" placeholder="Teléfono" value={member.phone} onChange={(e) => handleInputChange('team', i, 'phone', e.target.value)} className="border p-2 rounded-md outline-green-500" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-4">
              <button onClick={() => updateTeamSize(1)} disabled={team.members.length >= 7} className="flex-1 bg-green-600 text-white py-2 rounded-lg disabled:opacity-30">+ Añadir Jugador</button>
              <button onClick={() => updateTeamSize(-1)} disabled={team.members.length <= 5} className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg disabled:opacity-30">Quitar Jugador</button>
            </div>
          </div>
        )}
      </div>

      <div className="mb-8 p-4 bg-gray-50 rounded-xl border">
        <label className="block text-sm font-bold text-gray-700 mb-2">
          ¿Where did you hear from us?
        </label>
        <select 
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full p-3 rounded-lg border-gray-300 outline-blue-500"
          required
        >
          <option value="">Please Select and Option</option>
          {SOURCES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* --- TOTAL Y ENVÍO --- */}
      <div className="mt-12 pt-8 border-t-2 border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-medium text-gray-600">Resumen del pedido</span>
          <span className="text-4xl font-black text-blue-600">${total}.00 AUD</span>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={loading || total === 0}
          className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:bg-gray-300 disabled:shadow-none"
        >
          {loading ? 'PROCESANDO...' : 'RESERVAR Y PAGAR'}
        </button>
      </div>
    </div>
  );
}