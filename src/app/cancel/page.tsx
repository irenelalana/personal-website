'use client'

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { cancelBooking } from '@/app/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function CancelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleCancel = async () => {
    if (!token) return;
    setLoading(true);
    const res = await cancelBooking(token);
    if (res.success) {
      setDone(true);
      toast.success(res.message);
      setTimeout(() => {
          router.push('/');
        }, 3000);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  if (done) return <div className="p-10 text-center">Booking Cancelled.</div>;
  return (
    <div className="p-10 text-center max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">¿Cancel your booking?</h1>
      <p className="mb-6">This action cannot be undone.</p>
      <button
        onClick={handleCancel}
        disabled={loading}
        className="bg-red-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Cancelling...' : 'Confirm Cancellation'}
      </button>
    </div>
  );
}

export default function CancelPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Cargando...</div>}>
      <CancelContent />
    </Suspense>
  );
}