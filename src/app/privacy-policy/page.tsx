import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <section id="faq">
      <h1>Privacy Policy</h1>
      <p>
        We respect your privacy and are committed to protecting your personal
        information. This policy explains how we handle your data when you use
        our website.
      </p>

      <p className="question">1. Information We Collect</p>
      <p>
        When you submit a contact form or book a lesson, we collect your name, phone number, and
        email address.
      </p>

      <p className="question">2. How We Use Your Information</p>
      <p>
        We use your information solely to respond to your enquiry and provide
        the services you requested.
      </p>

      <p className="question">3. How We Store Your Information</p>
      <p>
        Your information is sent through Formspree (a third-party form handling
        service) and delivered to our email account (Hotmail). We do not store
        your data on this website.

        When you book a session, your information is stored in our Database, hosted by Supabase.
      </p>

      <p className="question">4. Disclosure to Overseas Recipients</p>
      <p>
        As we use Formspree, Supabase and Hotmail, your information may be processed and
        stored on servers located outside Australia, including in the United
        States and other countries where these services operate.
      </p>

      <p className="question">5. How We Protect Your Data</p>
      <p>
        We take reasonable steps to protect your information, but no online
        transmission is completely secure. We recommend not sending sensitive
        information via the contact forms.
      </p>

      <p className="question">6. How Long We Keep Your Information</p>
      <p>
        We retain your email correspondence for as long as necessary to respond
        to your enquiry. After that, it may be deleted or archived securely.
      </p>

      <p className="question">7. Your Rights</p>
      <p>
        You can request access to, or correction of, your personal information
        by contacting us.
      </p>
    </section>
  );
}