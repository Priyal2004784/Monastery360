import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-column">
          <h3 className="footer-brand">Sacred Sikkim</h3>
          <p className="footer-tagline">
            Dedicated to preserving and sharing the rich spiritual heritage of Sikkim's monasteries.
          </p>
          <div className="social-links">
            {/* In a real app, these would be links */}
            <span>FB</span> / <span>IN</span> / <span>YT</span>
          </div>
        </div>
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#!">Home</a></li>
            <li><a href="#!">Monasteries</a></li>
            <li><a href="#!">Pilgrimage</a></li>
            <li><a href="#!">Culture</a></li>
            <li><a href="#!">Plan Your Visit</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li><a href="#!">Buddhist Teachings</a></li>
            <li><a href="#!">Events Calendar</a></li>
            <li><a href="#!">Photo Gallery</a></li>
            <li><a href="#!">Documentary Films</a></li>
            <li><a href="#!">FAQs</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact Us</h4>
          <p>
            Tourism Department,<br />
            Govt. of Sikkim, M.G. Marg,<br />
            Gangtok, Sikkim - 737101
          </p>
          <p>info@sikkim.org</p>
          <p>+91 3592 209090</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2025 Sacred Sikkim. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;