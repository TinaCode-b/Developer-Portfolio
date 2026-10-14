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
          // When the drawer is closed it's still in the DOM (just slid
          // off-screen via CSS), so without this, keyboard users could
          // tab into links they can't see. tabIndex={-1} removes them
          // from the tab order until the drawer is actually open.
          <NavLink key={link.to} to={link.to} onClick={onClose} tabIndex={isOpen ? 0 : -1}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
