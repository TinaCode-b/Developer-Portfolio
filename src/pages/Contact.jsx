import { useRef, useState } from 'react';
import FormField from '../components/FormField.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import sendMessage from '../utils/sendMessage.js';
import { validateAll, validateField } from '../utils/validate.js';
import { SITE } from '../data/site.js';

const INITIAL = { name: '', email: '', message: '' };

export default function Contact() {
  usePageTitle('Contact', 'Have a question or want to collaborate? Send Ernestina a message.');

  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const refs = { name: useRef(null), email: useRef(null), message: useRef(null) };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (status === 'sent') setStatus('idle');
    // Once a field has been visited, re-validate as the person types.
    if (touched[name]) setErrors((er) => ({ ...er, [name]: validateField(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((er) => ({ ...er, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validateAll(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      setStatus('idle');
      refs[firstInvalid].current?.focus();
      return;
    }

    setStatus('sending');
    try {
      await sendMessage(values);
      setStatus('sent');
      setValues(INITIAL);
      setTouched({});
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <section className="page container" aria-labelledby="contact-title">
      <h1 id="contact-title">Contact</h1>
      <p className="lead">Have a question or want to collaborate? Send a message.</p>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <FormField
          label="Name"
          name="name"
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
          inputRef={refs.name}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          inputRef={refs.email}
        />
        <FormField
          label="Message"
          name="message"
          multiline
          hint="At least 20 characters."
          value={values.message}
          error={errors.message}
          onChange={handleChange}
          onBlur={handleBlur}
          inputRef={refs.message}
        />

        <div className="form__actions">
          <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <p className="form__status" role="status" aria-live="polite">
            {status === 'sent' && "Message sent. I'll reply as soon as I can."}
            {status === 'error' && 'Your message could not be sent. Check your connection and try again.'}
            {status === 'idle' && errorCount > 0 && `Fix ${errorCount} ${errorCount === 1 ? 'field' : 'fields'} to continue.`}
          </p>
        </div>
      </form>

      {SITE.links.email && (
        <p className="muted">
          Prefer email? Write to <a href={`mailto:${SITE.links.email}`}>{SITE.links.email}</a>.
        </p>
      )}
    </section>
  );
}
