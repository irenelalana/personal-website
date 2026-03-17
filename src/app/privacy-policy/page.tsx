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
            When you submit a contact form or book a lesson, we collect your name, phone number, and
            email address.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
          <p className={styles.text}>
            We use your information solely to respond to your enquiry and provide
            the services you requested.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>3. How We Store Your Information</h2>
          <p className={styles.text}>
            Your information is sent through Formspree (a third-party form handling
            service) and delivered to our email account (Hotmail). We do not store
            your data on this website.
            <br /><br />
            When you book a session, your information is stored in our Database, hosted by Supabase.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Disclosure to Overseas Recipients</h2>
          <p className={styles.text}>
            As we use Formspree, Supabase and Hotmail, your information may be processed and
            stored on servers located outside Australia, including in the United
            States and other countries where these services operate.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>5. How We Protect Your Data</h2>
          <p className={styles.text}>
            We take reasonable steps to protect your information, but no online
            transmission is completely secure. We recommend not sending sensitive
            information via the contact forms.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>6. How Long We Keep Your Information</h2>
          <p className={styles.text}>
            We retain your email correspondence for as long as necessary to respond
            to your enquiry. After that, it may be deleted or archived securely.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Your Rights</h2>
          <p className={styles.text}>
            You can request access to, or correction of, your personal information
            by contacting us.
          </p>
        </div>
      </div>
    </div>
  );
}
