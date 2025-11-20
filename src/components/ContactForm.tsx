'use client';

import React, { useState } from 'react';
import '../app/style.css'

const ContactForm: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleForm = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <button
        className="floating-button"
        onClick={toggleForm}
      >
        Contact Me
      </button>

      {isVisible && (
        <form
          action="https://formspree.io/f/xjvdnpqv"
          method="POST"
          className="contact-form"
          id="contactForm"
          style={{ display: 'block' }}
        >
          <input type="text" id="name" name="name" placeholder="Name" required />
          <input type="email" id="email" name="email" placeholder="Email" required />
          <input type="tel" id="phone" name="phone" placeholder="Phone Number" required />
          <input type="goals" id="goals" name="level/goals" placeholder="Level/Goals" required />
          <textarea id="message" name="message" placeholder="Message" required></textarea>
          <button type="submit">Send</button>
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
