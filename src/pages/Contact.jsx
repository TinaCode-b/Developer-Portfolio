import { useState } from 'react';
import usePageTitle from '../hooks/usePageTitle.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }
  return errors;
}

export default function Contact() {
  usePageTitle('Contact');

  // One state object for all three fields, one for their errors,
  // one for the submit status message.
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'success' | 'error'

  function handleChange(event) {
    const { name, value } = event.target;
    // Spread the previous state, then overwrite just the one field —
    // this is the standard way to update a single key in state.
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    const fieldErrors = validate(values);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fieldErrors = validate(values);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      setStatus('error');
      return;
    }

    // No backend yet — this simulates a successful send.
    setStatus('success');
    setValues({ name: '', email: '', message: '' });
    setErrors({});
  }

  return (
    <section className="contact sheet-frame">
      <h2>Contact</h2>
      <p className="section-lede">Have a question or want to collaborate? Send a message.</p>

      <form className="contact-form" noValidate onSubmit={handleSubmit}>
        <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
          <label htmlFor="name">Name <span aria-hidden="true">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby="nameError"
          />
          {/* aria-describedby ties the input to this span, so a screen
              reader announces the error when the field receives focus —
              not just visually, next to it. */}
          <span className="field-error" id="nameError">{errors.name}</span>
        </div>

        <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby="emailError"
          />
          <span className="field-error" id="emailError">{errors.email}</span>
        </div>

        <div className={`form-field ${errors.message ? 'has-error' : ''}`}>
          <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby="messageError"
          />
          <span className="field-error" id="messageError">{errors.message}</span>
        </div>

        <button type="submit" className="submit-btn">Send message</button>

        {status === 'success' && (
          <p className="form-status is-success" role="status">Thanks! Your message has been sent.</p>
        )}
        {status === 'error' && (
          <p className="form-status" role="status">Please fix the errors above and try again.</p>
        )}
      </form>
    </section>
  );
}
