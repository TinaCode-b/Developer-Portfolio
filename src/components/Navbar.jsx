import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MobileDrawer from './MobileDrawer.jsx';

// `links` is a prop: an array passed in from App.jsx. Navbar doesn't
// know or care what the links are — that makes it reusable.
export default function Navbar({ links }) {
  // isOpen is component state. Calling setIsOpen triggers a re-render
  // with the new value, which is how the drawer actually opens/closes.
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="sheet-frame">
        <NavLink to="/" className="wordmark">PDP</NavLink>

        <nav className="site-nav" aria-label="Primary">
          {links.map((link) => (
            // NavLink automatically adds an "active" class when its
            // `to` matches the current URL — that's how we highlight
            // the current page without writing that logic ourselves.
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="nav-toggle"
          aria-label="Open menu"
          aria-expanded={isOpen}
          aria-controls="mobileDrawer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <MobileDrawer links={links} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
