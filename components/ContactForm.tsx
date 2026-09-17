"use client";

export default function ContactForm() {
  return (
    <form className="brief" action="mailto:byakkokondo@gmail.com" method="post" encType="text/plain">
      <label className="t-mono soft-in">NAME
        <input required name="name" autoComplete="name" className="contact-input" placeholder="Your name" />
      </label>
      <label className="t-mono soft-in">EMAIL
        <input required type="email" name="email" autoComplete="email" className="contact-input" placeholder="you@example.com" />
      </label>
      <label className="t-mono soft-in">COMPANY / ORGANISATION
        <input name="company" autoComplete="organization" className="contact-input" placeholder="Optional" />
      </label>
      <label className="t-mono soft-in">SUBJECT
        <input required name="subject" className="contact-input" placeholder="What would you like to discuss?" />
      </label>
      <label className="t-mono soft-in">MESSAGE
        <textarea required name="message" rows={8} className="contact-input" placeholder="Project, scope, timeline, or anything else that would help me understand the enquiry." />
      </label>
      <button type="submit" className="next-link soft-in" style={{ width: "100%", textAlign: "left", cursor: "pointer" }}>
        <span className="t-mono next-label">SEND TO BYAKKO KONDO</span>
        <span className="t-display next-name">SEND MESSAGE</span>
        <span className="t-mono next-arrow" aria-hidden="true">→</span>
      </button>
    </form>
  );
}
