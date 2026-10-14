import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// On client-side navigation, the browser does not reload, so screen reader users
// get no signal that the page changed. This moves focus to <main>, resets scroll,
// and announces the new page title in a polite live region.
export default function RouteAnnouncer() {
  const { pathname } = useLocation();
  const [message, setMessage] = useState('');
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return undefined;
    }
    window.scrollTo(0, 0);
    document.getElementById('main')?.focus({ preventScroll: true });
    const timer = setTimeout(() => setMessage(`Navigated to ${document.title}`), 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <p className="sr-only" role="status" aria-live="polite">
      {message}
    </p>
  );
}
