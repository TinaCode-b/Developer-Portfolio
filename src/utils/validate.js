const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(name, value) {
  const v = value.trim();
  switch (name) {
    case 'name':
      if (!v) return 'Enter your name.';
      if (v.length < 2) return 'Your name needs at least 2 characters.';
      return '';
    case 'email':
      if (!v) return 'Enter your email address.';
      if (!EMAIL.test(v)) return 'Enter a valid email address, like name@example.com.';
      return '';
    case 'message':
      if (!v) return 'Write a message.';
      if (v.length < 20) return `Write at least 20 characters (${20 - v.length} more).`;
      return '';
    default:
      return '';
  }
}

// Returns an object containing only the fields that have an error.
export function validateAll(values) {
  const errors = {};
  Object.keys(values).forEach((key) => {
    const message = validateField(key, values[key]);
    if (message) errors[key] = message;
  });
  return errors;
}
