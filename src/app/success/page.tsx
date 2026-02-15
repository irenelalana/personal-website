'use client'

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function SuccessPage() {
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
          <Link href="/" className="btn-return">
            Back to Home Page
          </Link>
        </footer>
      </div>
    </section>
  );
}