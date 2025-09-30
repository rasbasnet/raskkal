import { useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigation } from '../context/NavigationContext.jsx';
import useRevealOnScroll from '../hooks/useRevealOnScroll.js';

const CONTACT_EMAIL = 'rasbasnet37@gmail.com';

const Contact = () => {
  const { setActiveSection } = useNavigation();
  const [noteState, setNoteState] = useState('default');

  useEffect(() => {
    setActiveSection('contact');
  }, [setActiveSection]);

  useRevealOnScroll({ threshold: 0.25 });

  const mailto = useMemo(() => `mailto:${CONTACT_EMAIL}`, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const company = formData.get('company')?.toString().trim();
    const timeline = formData.get('timeline')?.toString().trim();
    const message = formData.get('message')?.toString().trim();
    const budget = formData.get('budget');

    const subject = name ? `New project from ${name}` : 'New project inquiry';
    const lines = [
      'Hi Ras,',
      '',
      message || 'Sharing a few details about our project...',
      '',
      `From: ${name || 'Unknown'} (${email || 'no email provided'})`,
    ];

    if (company) {
      lines.push(`Company/Product: ${company}`);
    }
    if (timeline) {
      lines.push(`Timeline: ${timeline}`);
    }
    if (budget) {
      lines.push(`Budget: ${budget}`);
    }

    const body = lines.join('\n');
    const mailtoLink = `${mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setNoteState('sent');
    window.location.href = mailtoLink;
  }, [mailto]);

  return (
    <main className="contact">

      <section className="panel contact__form" aria-labelledby="contact-form-title" data-reveal>
        <div className="panel__header">
          <p className="eyebrow">Let's chat</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field-grid">
            <label className="field">
              <span>Name</span>
              <input type="text" name="name" autoComplete="name" required />
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" name="email" autoComplete="email" required />
            </label>
          </div>
          <div className="field-grid">
            <label className="field">
              <span>Subject</span>
              <input type="text" name="company" autoComplete="organization" />
            </label>
          </div>
          <label className="field">
            <span>What can I help you with?</span>
            <textarea
              name="message"
              rows={6}
              required
            />
          </label>
          <div className="form-actions">
            <button className="btn btn--primary" type="submit">
              Send
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Contact;
