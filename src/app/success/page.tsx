'use client'

import { useEffect, useState, Suspense } from 'react'; // Importa Suspense
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { fbEvent } from '@/lib/fbpixel';

// 1. Creamos un componente interno para la lógica de los params
function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      router.push('/activate-brisbane');
      return;
    }

    setLoading(false);

    // 📊 META PIXEL: Purchase, con el monto real verificado contra Stripe.
    // Usamos sessionStorage para no disparar el evento dos veces si el
    // usuario refresca esta página o vuelve atrás con el navegador.
    const alreadyTracked = sessionStorage.getItem(`purchase_tracked_${sessionId}`);

    if (!alreadyTracked) {
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.amount !== undefined) {
            fbEvent('Purchase', {
              value: data.amount,
              currency: data.currency,
              content_name: 'Actívate Brisbane - Ticket Purchase',
              event_id: sessionId, // Ayuda a deduplicar si más adelante añades Conversions API
            });
            sessionStorage.setItem(`purchase_tracked_${sessionId}`, '1');
          }
        })
        .catch((err) => console.error('Error verifying session for Meta Pixel:', err));
    }

    // Efecto de Confeti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, [sessionId, router]);

  if (loading) {
    return (
      <section className="status-container">
        <div className="custom-loader"></div>
      </section>
    );
  }

  return (
    <section className="status-container">
      <div className="status-card">
        <div className="status-icon-check">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="status-title">¡Successful Payment!</h1>
        
        <p className="status-text">
          Thanks for your purchase! We've sent your tickets and payment confirmation to your email. 
          Check your inbox (and spam folder) in a few minutes.
        </p>

        <footer className="status-footer">
          <Link href="/activate-brisbane" className="btn-return">
            Back to Event Page
          </Link>
        </footer>
      </div>
    </section>
  );
}

// 2. El export default envuelve el contenido en Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <section className="status-container">
        <div className="custom-loader"></div>
      </section>
    }>
      <SuccessContent />
    </Suspense>
  );
}
