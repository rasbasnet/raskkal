import { createContext, useContext, useMemo, useState } from 'react';

const NavigationContext = createContext({
  activeSection: 'top',
  setActiveSection: () => {},
  isNavOpen: false,
  setNavOpen: () => {},
});

export const NavigationProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('top');
  const [isNavOpen, setNavOpen] = useState(false);

  const value = useMemo(
    () => ({ activeSection, setActiveSection, isNavOpen, setNavOpen }),
    [activeSection, isNavOpen]
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigation = () => useContext(NavigationContext);
