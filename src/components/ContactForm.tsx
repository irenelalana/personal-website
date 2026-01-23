'use client';

import React, { useState } from 'react';
import { sendContactEmail } from '@/app/actions'; // Importar la acción
import { toast } from 'sonner';
import '../app/style.css';

const ContactForm: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const toggleForm = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const res = await sendContactEmail(formData);

    if (res.success) {
      toast.success("Message sent! I will get back to you soon.");
      setIsVisible(false); // Cerramos el formulario al terminar
    } else {
      toast.error(res.message);
    }
    setIsPending(false);
  };

  return (
    <>
      <button className="floating-button" onClick={toggleForm}>
        Contact Me
      </button>

      {isVisible && (
        <form onSubmit={handleSubmit} className="contact-form" style={{ display: 'block' }}>
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="tel" name="phone" placeholder="Phone Number" required />
          <input type="text" name="level/goals" placeholder="Level/Goals" required />
          <textarea name="message" placeholder="Message" required></textarea>
          
          <button type="submit" disabled={isPending}>
            {isPending ? 'Sending...' : 'Send'}
          </button>

          <p className="form-disclaimer">
            By submitting this form, you agree to our{' '}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>.
          </p>
        </form>
      )}
    </>
  );
};

export default ContactForm;
