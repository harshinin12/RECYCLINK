import React from 'react';
import './ContactUs.css'; // We'll create this CSS file next
import Footer from '../components/Footer';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-main-heading">CONTACT US</h1>
      <p className="contact-sub-heading">Join us in shaping a sustainable future for electronics. Together, we can drive impactful change through responsible recycling and eco-friendly practices.</p>
      <p className="contact-intro-text">
        Have questions or need assistance? We're here to help! Whether you're looking for e-waste recycling centers, need guidance on responsible disposal, or want to collaborate with us, feel free to reach out. Together, we can work towards a cleaner, greener future. Let's stay connected!
      </p>

      <div className="contact-content">
        <div className="contact-form-section">
          <h2>Reach Out to Our Team</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Your email address" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="Your contact number" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea id="message" rows="5" placeholder="How can we assist with your e-waste management needs?"></textarea>
            </div>
            {/* Add a submit button here later if needed */}
          </form>
        </div>

        <div className="contact-info-section">
          <h2>Direct Contact Information</h2>
          <div className="contact-info-item">
            <i className="fas fa-map-marker-alt"></i> {/* Placeholder for icon */}
            <div>
              <h3>Our Location</h3>
              <p>Thirupparankundram, Tamil Nadu, India</p>
            </div>
          </div>
          <div className="contact-info-item">
            <i className="fas fa-phone-alt"></i> {/* Placeholder for icon */}
            <div>
              <h3>Phone Support</h3>
              <p>+91 9345791553</p>
              <p>Mon-Fri: 9AM to 6PM IST</p>
            </div>
          </div>
          <div className="contact-info-item">
            <i className="fas fa-envelope"></i> {/* Placeholder for icon */}
            <div>
              <h3>Email Us</h3>
              <p>harshinin78@gmail.com</p>
            </div>
          </div>

          <div className="contact-social-media">
            <h3>Connect on Social Media</h3>
            <div className="social-icons">
              {/* Placeholder for social icons */}
              <a  aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a  aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a  aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a  aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
        </div>
      </div>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default ContactUs; 