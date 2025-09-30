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
      <section className="contact__intro">
        <div className="contact__headline" data-reveal>
          <p className="eyebrow">Let's talk</p>
          <h1>Tell me about the product you're building</h1>
          <p>
            I collaborate with product teams and founders to design, build, and ship digital experiences. Share a few details below and I'll be in touch within two business days.
          </p>
        </div>
        <div className="contact__card" data-reveal>
          <h2>Prefer email?</h2>
          <p>
            Reach me directly at{' '}
            <a className="contact__email" href={mailto}>
              {CONTACT_EMAIL}
            </a>{' '}
            or book time using the form.
          </p>
          <ul className="contact__meta">
            <li>Based in Melbourne (UTC+10)</li>
            <li>Available for fractional leadership and project engagements</li>
            <li>Open to remote-first teams worldwide</li>
            <li>Follow along on Instagram <a href="https://instagram.com/ras.b77" target="_blank" rel="noreferrer">@ras.b77</a></li>
            <li>Freelance slots open for carefully scoped 2025 engagements</li>
          </ul>
        </div>
      </section>

      <section className="panel contact__form" aria-labelledby="contact-form-title" data-reveal>
        <div className="panel__header">
          <p className="eyebrow">Project fit</p>
          <h2 id="contact-form-title">Let's scope the work together</h2>
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
              <span>Company or product</span>
              <input type="text" name="company" autoComplete="organization" />
            </label>
            <label className="field">
              <span>Timeline</span>
              <select name="timeline">
                <option value="">Select an option</option>
                <option value="2-4 weeks">We need momentum in 2-4 weeks</option>
                <option value="1-3 months">Kick-off within 1-3 months</option>
                <option value="3+ months">Planning for 3+ months ahead</option>
              </select>
            </label>
          </div>
          <label className="field">
            <span>What can I help you build?</span>
            <textarea
              name="message"
              rows={6}
              placeholder="Tell me about the problem, desired outcome, and any existing context."
              required
            />
          </label>
          <div className="field">
            <span>Budget comfort</span>
            <div className="radio-group">
              <label>
                <input type="radio" name="budget" value="Under $10k" />
                <span>Under $10k AUD</span>
              </label>
              <label>
                <input type="radio" name="budget" value="$10k-$25k" />
                <span>$10k - $25k AUD</span>
              </label>
              <label>
                <input type="radio" name="budget" value="$25k+" />
                <span>$25k+ AUD</span>
              </label>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn--primary" type="submit">
              Send introduction
            </button>
            <p className="form-note" data-state={noteState}>
              {noteState === 'sent'
                ? 'Opening your email client with a draft - send it when you are ready.'
                : 'This opens in your email client so you keep a record of the outreach.'}
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Contact;
