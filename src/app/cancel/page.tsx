"use client";

import React, { useState, Suspense } from "react"; // Importamos Suspense
import { useRouter, useSearchParams } from "next/navigation";
import { cancelBooking } from "@/app/actions";
import { toast } from "sonner";
import styles from "./cancelBooking.module.css";

// 1. Movemos la lógica a un componente interno
function CancelBookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("token");
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCancel = async () => {
    if (!bookingId) return;
    
    setIsPending(true);
    try {
      const res = await cancelBooking(bookingId);
      if (res.success) {
        toast.success("Booking cancelled successfully");
        setIsSuccess(true);
      } else {
        toast.error(res.message || "Could not cancel the booking");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        {!isSuccess ? (
          <>
            <span className={styles.icon}>🗓️</span>
            <h1 className={styles.title}>Cancel Booking</h1>
            <p className={styles.text}>
              Are you sure you want to cancel your spot? This action cannot be undone, 
              and someone else might take the spot immediately.
            </p>
            
            <button 
              onClick={handleCancel} 
              disabled={isPending}
              className={styles.button}
            >
              {isPending ? "Processing..." : "Confirm Cancellation"}
            </button>
            
            <br />
            <button 
              onClick={() => router.push('/')} 
              className={styles.buttonSecondary}
            >
              Keep my booking
            </button>
          </>
        ) : (
          <>
            <span className={styles.icon}>✅</span>
            <h1 className={styles.title}>Done!</h1>
            <p className={styles.text}>
              Your booking has been successfully cancelled. We hope to see you in another session soon.
            </p>
            <button 
              onClick={() => router.push('/')} 
              className={styles.button}
              style={{ backgroundColor: '#02678F' }}
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </main>
  );
}

// 2. La página principal exporta el componente envuelto en Suspense
export default function CancelBooking() {
  return (
    <Suspense fallback={<div className={styles.container}>Loading...</div>}>
      <CancelBookingContent />
    </Suspense>
  );
}