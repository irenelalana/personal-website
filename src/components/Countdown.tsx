'use client';
import { useState, useEffect } from 'react';

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-container">
      <div className="time-box"><span>{timeLeft.days}</span><small>Days</small></div>
      <div className="time-box"><span>{timeLeft.hours}</span><small>Hrs</small></div>
      <div className="time-box"><span>{timeLeft.minutes}</span><small>Mins</small></div>
      <div className="time-box"><span>{timeLeft.seconds}</span><small>Secs</small></div>
    </div>
  );
}