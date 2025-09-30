const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div>
        <span>© {currentYear} Raskkal. All rights reserved.</span>
      </div>
      <div className="footer-links">
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://instagram.com/ras.b77" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="mailto:rasbasnet37@gmail.com" className="contact__email">
          Email
        </a>
      </div>
    </footer>
  );
};

export default Footer;
