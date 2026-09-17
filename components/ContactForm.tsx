"use client";

export default function ContactForm() {
  return (
    <form className="contact-form" action="mailto:byakkokondo@gmail.com" method="post" encType="text/plain">
      <div className="contact-form-grid">
        <label className="contact-field t-mono soft-in">
          <span className="contact-field-label">NAME</span>
          <input required name="name" autoComplete="name" className="contact-input" placeholder="Your name" />
        </label>
        <label className="contact-field t-mono soft-in">
          <span className="contact-field-label">EMAIL</span>
          <input required type="email" name="email" autoComplete="email" className="contact-input" placeholder="you@example.com" />
        </label>
        <label className="contact-field t-mono soft-in">
          <span className="contact-field-label">COMPANY / ORGANISATION</span>
          <input name="company" autoComplete="organization" className="contact-input" placeholder="Optional" />
        </label>
        <label className="contact-field t-mono soft-in">
          <span className="contact-field-label">SUBJECT</span>
          <input required name="subject" className="contact-input" placeholder="What would you like to discuss?" />
        </label>
      </div>

      <label className="contact-field contact-field--message t-mono soft-in">
        <span className="contact-field-label">MESSAGE</span>
        <textarea required name="message" rows={7} className="contact-input contact-textarea" placeholder="Project, scope, timeline, or anything else that would help me understand the enquiry." />
      </label>

      <button type="submit" className="contact-submit soft-in">
        <span className="t-mono contact-submit-kicker">SEND TO BYAKKO KONDO</span>
        <span className="t-display contact-submit-title">SEND MESSAGE</span>
        <span className="t-mono contact-submit-arrow" aria-hidden="true">→</span>
      </button>
    </form>
  );
}
