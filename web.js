// ---------- Mobile drawer ----------
const navToggle = document.getElementById('navToggle');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerBackdrop = document.getElementById('drawerBackdrop');

function openDrawer() {
  mobileDrawer.classList.add('is-open');
  drawerBackdrop.hidden = false;
  // next frame, so the transition actually plays
  requestAnimationFrame(() => drawerBackdrop.classList.add('is-open'));
  navToggle.setAttribute('aria-expanded', 'true');
  mobileDrawer.setAttribute('aria-hidden', 'false');
}

function closeDrawer() {
  mobileDrawer.classList.remove('is-open');
  drawerBackdrop.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  mobileDrawer.setAttribute('aria-hidden', 'true');
  setTimeout(() => {
    if (!drawerBackdrop.classList.contains('is-open')) {
      drawerBackdrop.hidden = true;
    }
  }, 300);
}

navToggle.addEventListener('click', () => {
  const isOpen = mobileDrawer.classList.contains('is-open');
  isOpen ? closeDrawer() : openDrawer();
});

drawerBackdrop.addEventListener('click', closeDrawer);

// Close the drawer whenever a link inside it is clicked
mobileDrawer.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeDrawer);
});

// Close on Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
    closeDrawer();
  }
});

// ---------- Contact form validation ----------
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const fields = {
  name: {
    input: document.getElementById('name'),
    error: document.getElementById('nameError'),
    validate: (value) => (value.trim().length === 0 ? 'Please enter your name.' : ''),
  },
  email: {
    input: document.getElementById('email'),
    error: document.getElementById('emailError'),
    validate: (value) => {
      if (value.trim().length === 0) return 'Please enter your email.';
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value) ? '' : 'Please enter a valid email address.';
    },
  },
  message: {
    input: document.getElementById('message'),
    error: document.getElementById('messageError'),
    validate: (value) => (value.trim().length < 10 ? 'Message should be at least 10 characters.' : ''),
  },
};

function validateField(key) {
  const field = fields[key];
  const message = field.validate(field.input.value);
  field.error.textContent = message;
  field.input.closest('.form-field').classList.toggle('has-error', Boolean(message));
  return message === '';
}

// Validate as the user leaves each field
Object.keys(fields).forEach((key) => {
  fields[key].input.addEventListener('blur', () => validateField(key));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const results = Object.keys(fields).map(validateField);
  const allValid = results.every(Boolean);

  if (!allValid) {
    formStatus.textContent = 'Please fix the errors above and try again.';
    formStatus.classList.remove('is-success');
    return;
  }

  // No backend yet — this just simulates a successful send.
  formStatus.textContent = 'Thanks! Your message has been sent.';
  formStatus.classList.add('is-success');
  form.reset();
});