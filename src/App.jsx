import { useEffect, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';

// lazy() means the code for these pages isn't included in the initial
// JS bundle at all — it's fetched only when someone actually navigates
// to /projects or /contact. Home stays a normal import since almost
// everyone lands there first; no point delaying the page they're
// already on.
const Projects = lazy(() => import('./pages/Projects.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));

// Centralizing the nav links here means Navbar and MobileDrawer
// both stay in sync just by reading this one array (a prop).
export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export default function App() {
  const location = useLocation();
  const mainRef = useRef(null);

  // In a normal multi-page site, the browser moves focus to the top of
  // the document on every navigation automatically. A client-routed SPA
  // doesn't get that for free — React Router just swaps the DOM — so we
  // do it ourselves: move keyboard/screen-reader focus to <main> every
  // time the route changes. tabIndex={-1} on main makes it focusable via
  // script even though it's not naturally in the tab order.
  useEffect(() => {
    mainRef.current?.focus();
  }, [location.pathname]);

  return (
    <>
      {/* Visually hidden until focused — lets keyboard users jump past
          the nav instead of tabbing through every link on every page. */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Navbar links={NAV_LINKS} />

      {/* Routes swaps in whichever page matches the current URL path.
          No full page reload happens when you click a link — React Router
          intercepts the click and just re-renders this section. */}
      <main id="main-content" ref={mainRef} tabIndex={-1}>
        {/* Suspense shows this fallback while a lazy-loaded page's code
            is still downloading — on a fast connection it's invisible,
            on a slow one it avoids a blank screen. */}
        <Suspense fallback={<p className="sheet-frame page-loading">Loading…</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
