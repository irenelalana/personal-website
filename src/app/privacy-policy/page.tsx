import React from "react";
import styles from "./privacy.module.css";

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.mainTitle}>Privacy Policy</h1>
        <p className={styles.intro}>
          We respect your privacy and are committed to protecting your personal
          information. This policy explains how we handle your data when you use
          our website.
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
          <p className={styles.text}>
            When you submit a contact form, book a lesson, or purchase a ticket, we collect your name, phone number, and
            email address.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
          <p className={styles.text}>
            We use your information solely to respond to your enquiry, process your bookings, and provide
            the services you requested.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>3. How We Store Your Information</h2>
          <p className={styles.text}>
            Your contact inquiries are processed securely using Resend (an email API service) 
            and delivered to our corporate email account hosted by Zoho Mail. We do not store 
            contact form data directly on this website.
            <br /><br />
            When you book a session or register for an event, your information is stored in our database, hosted by Supabase.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Payment Processing</h2>
          <p className={styles.text}>
            All payments made on our website are processed securely through Stripe. 
            We do not collect, process, or store your full credit card details or bank 
            information on our servers. Stripe handles this information according to their 
            own privacy and security policies.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Third-Party Services & Overseas Recipients</h2>
          <p className={styles.text}>
            As we use third-party services like Resend, Zoho Mail, Supabase, and Stripe, 
            your information may be processed and stored on servers located outside Australia, 
            including in the United States and other countries where these services operate.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>6. How We Protect Your Data</h2>
          <p className={styles.text}>
            We take reasonable steps to protect your information, but no online
            transmission is completely secure. We recommend not sending sensitive
            information via the contact forms.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>7. How Long We Keep Your Information</h2>
          <p className={styles.text}>
            We retain your email correspondence and booking history for as long as necessary to respond
            to your enquiry or provide our services. After that, it may be deleted or archived securely.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Your Rights</h2>
          <p className={styles.text}>
            You can request access to, or correction of, your personal information
            by contacting us.
          </p>
        </div>
      </div>
    </div>
  );
}
