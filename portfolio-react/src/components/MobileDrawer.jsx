import { NavLink } from 'react-router-dom';

// This component holds no state of its own — it's fully controlled by
// its parent (Navbar) through props. That pattern ("lift state up")
// keeps MobileDrawer simple and reusable: it just renders what it's told.
export default function MobileDrawer({ links, isOpen, onClose }) {
  return (
    <>
      <div
        className={`drawer-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
        hidden={!isOpen}
      />
      <nav
        id="mobileDrawer"
        className={`mobile-drawer ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
      >
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} onClick={onClose}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
