import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useNavigation } from '../context/NavigationContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

const NAV_LINKS = [];

const Header = () => {
  const { activeSection, isNavOpen, setNavOpen } = useNavigation();
  const location = useLocation();
  const [isScrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > 24);
    };
    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  const handleNavLinkClick = () => setNavOpen(false);

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname, setNavOpen]);

  return (
    <header className="site-header" data-scrolled={isScrolled ? 'true' : 'false'}>
      <div className="site-brand">
        <span className="brand-mark" aria-hidden="true">
          R
        </span>
        <Link to="/" onClick={handleNavLinkClick}>
          Raskkal
        </Link>
      </div>
      <nav className="site-nav" data-open={isNavOpen ? 'true' : 'false'} aria-label="Primary">
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={isNavOpen ? 'true' : 'false'}
          aria-controls="site-nav-list"
          onClick={() => setNavOpen(!isNavOpen)}
        >
          <span className="nav-toggle__line" aria-hidden="true" />
          <span className="nav-toggle__line" aria-hidden="true" />
          <span className="nav-toggle__line" aria-hidden="true" />
          <span className="nav-toggle__label">Menu</span>
        </button>
        <ul id="site-nav-list">
          {NAV_LINKS.map((item) => (
            <li key={item.id}>
              <Link
                to={item.to}
                data-nav="link"
                data-active={activeSection === item.id ? 'true' : undefined}
                onClick={handleNavLinkClick}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="site-nav__cta">
            <Link
              to="/contact"
              className="nav-cta"
              data-active={activeSection === 'contact' ? 'true' : undefined}
              onClick={handleNavLinkClick}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <span className="theme-toggle__icon" aria-hidden="true" data-theme-indicator={theme} />
      </button>
    </header>
  );
};

export default Header;
