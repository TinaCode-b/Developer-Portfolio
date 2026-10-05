import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';

// Centralizing the nav links here means Navbar and MobileDrawer
// both stay in sync just by reading this one array (a prop).
export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export default function App() {
  return (
    <>
      <Navbar links={NAV_LINKS} />

      {/* Routes swaps in whichever page matches the current URL path.
          No full page reload happens when you click a link — React Router
          intercepts the click and just re-renders this section. */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
