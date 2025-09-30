import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import MoonCanvas from './MoonCanvas.jsx';
import { useNavigation } from '../context/NavigationContext.jsx';

const AppLayout = () => {
  const location = useLocation();
  const { setNavOpen, setActiveSection } = useNavigation();

  useEffect(() => {
    setNavOpen(false);
    if (location.pathname === '/contact') {
      setActiveSection('contact');
    } else if (location.pathname === '/') {
      setActiveSection('top');
    }
  }, [location.pathname, setNavOpen, setActiveSection]);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="page-frame">
      <MoonCanvas />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
