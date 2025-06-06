import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Column 1: Logo + Description */}
        <div className="footer-column">
          <h2 className="logo">
            <span className="logo-icon"></span>Recyclink
          </h2>
          <p>
            Recyclink: Revolutionizing e-waste management through technological innovation.
            Our platform connects you with certified recycling facilities, empowering your
            journey toward environmental responsibility and sustainable electronics disposal.
          </p>
        </div>
        
        {/* Column 2: Recycling Solutions */}
        <div className="footer-column">
          <h3>Recycling Solutions</h3>
          <ul>
            <li>Smartphone Recycling</li>
            <li>Laptop & Computer Recycling</li>
            <li>Electronics Accessories</li>
            <li>Television & Display Recycling</li>
            <li>Refrigerator & Cooling Appliances</li>
            <li>Household Appliance Recycling</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Quick Access</h3>
          <ul>
            <li>Smartphone Recycling</li>
            <li>Laptop & Computer Recycling</li>
            <li>Electronics Accessories</li>
            <li>Television & Display Recycling</li>
            <li>Refrigerator & Cooling Appliances</li>
            <li>Household Appliance Recycling</li>
          </ul>
        </div>
        
        {/* Column 3: Contact Info */}
        <div className="footer-column">
          <h3>Connect With Us</h3>
          <div className="contact-info">
            <p>N.Harshini</p><p> Madurai, Tamil Nadu-625014</p>
            <p>+91 9345791553</p>
            <p>harshinin78@gmail.com</p>
          </div>
          <div className="social-icons">
            <a ><i class="fab fa-linkedin" ></i></a>
            <a><i className="fab fa-instagram"></i></a>
            <a><i className="fab fa-twitter" aria-hidden="true"></i></a>
            <a><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
