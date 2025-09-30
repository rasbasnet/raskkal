import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from './components/AppLayout.jsx';
import HomePage from './pages/Home.jsx';
import ContactPage from './pages/Contact.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { NavigationProvider } from './context/NavigationContext.jsx';

import './styles/theme.css';
import './styles/main.css';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <NavigationProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NavigationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
