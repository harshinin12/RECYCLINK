import React, { useState, useEffect } from 'react';
import { BrowserRouter as Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'

const heroSlides = [
  {
    mainTitle: "Your technology partner for Innovative and Impactful",
    subTitle: "E-Waste Facility Locator",
    description: "ELocate: Transforming E-Waste Management. Find E-waste facilities effortlessly with our platform. Your key to responsible recycling and sustainability.",
    image: "/images/blogs/heroimage.jpg",
    buttonText: "START RECYCLING",
    buttonLink: "/facilities"
  },
  {
    mainTitle: "Transform Your E-Waste Journey Today",
    subTitle: "Easily Manage Your E-Waste",
    description: "Join the revolution in sustainable living! Connect with us to make e-waste management smarter, cleaner, and hassle-free. Together, we’ll shape a greener tomorrow!",
    image: "/images/blogs/heroimage2.jpg",
    buttonText: "CONTACT US",
    buttonLink: "/contactus"
  },
  {
    mainTitle: "Empowering Communities for a Greener Tomorrow",
    subTitle: "Join Our Recycling Community",
    description: "Be a part of our e-waste recycling community. Together, we can reduce electronic waste and promote responsible recycling practices. Let's create a positive impact, one device at a time!",
    image: "/images/blogs/heroimage3.jpg",
    buttonText: "READ BLOG",
    buttonLink: "/blogs"
  }
];

const aboutServices = [
  {
    icon: "♻️",
    title: "E-Waste Collection Booking",
    text: "We provide a convenient platform for users to schedule pickups or drop-offs of their old electronic devices. Our aim is to simplify the recycling process while promoting responsible disposal."
  },
  {
    icon: "📍",
    title: "Nearby Recycling Facility Locator",
    text: "Using location access, we help users find certified e-waste recycling centers near them. This ensures that recycling is accessible, safe, and aligned with environmental standards."
  },
  {
    icon: "🖥️",
    title: "Multi-Device Recycling",
    text: "Whether it's laptops, smartphones, TVs, or tablets, we support recycling for a wide range of electronic devices. Users can specify what they're recycling and receive instructions or facility suggestions."
  },
  {
    icon: "🧾",
    title: "Online Recycling Appointments",
    text: "Users can book recycling services from selected facilities with just a few clicks. This streamlined booking system reduces effort and improves participation in sustainable practices."
  },
  {
    icon: "📚",
    title: "Educational Blog on E-Waste",
    text: "Our platform features a dedicated blog that educates users about harmful components found in everyday electronic devices. Stay informed and learn how to handle and recycle e-waste responsibly."
  },
  {
    icon: "🤖",
    title: "Personalized Chatbot Assistance",
    text: "We offer an intelligent chatbot that provides real-time support tailored to user questions. From recycling guidelines to booking help, our chatbot is here to clarify your doubts anytime."
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleButtonClick = (link) => {
    navigate(link);
  };

  // Auto-advance slides every 20 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 20000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-slider" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
          {heroSlides.map((slide, index) => (
            <div className="hero-slide" key={index}>
              <div className="hero-content">
                <p className="welcome-text">WELCOME TO RECYCLINK</p>
                <h1>{slide.mainTitle}</h1>
                <h2 className="hero-subtitle">{slide.subTitle}</h2>
                <p>{slide.description}</p>
                <div className="hero-buttons">
                  <button onClick={() => handleButtonClick(slide.buttonLink)}>{slide.buttonText}</button>
                </div>
              </div>
              <img src={slide.image} alt={slide.mainTitle} />
            </div>
          ))}
        </div>

        <div className="hero-navigation">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`hero-nav-button ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <button className="hero-arrow prev" onClick={prevSlide}>←</button>
        <button className="hero-arrow next" onClick={nextSlide}>→</button>
      </section>

      <section className="features-section">
        <h2>Why Recycle E-Waste?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Environmental Protection</h3>
            <p>Prevent harmful chemicals from entering our soil and water systems</p>
          </div>
          <div className="feature-card">
            <h3>Resource Recovery</h3>
            <p>Valuable materials can be recovered and reused in new products</p>
          </div>
          <div className="feature-card">
            <h3>Legal Compliance</h3>
            <p>Proper disposal helps you comply with environmental regulations</p>
          </div>
          <div className="feature-card">
  <h3>Global Impact</h3>
  <p>Recycling e-waste reduces the global carbon footprint and supports sustainability</p>
</div>
<div className="feature-card">
  <h3>Resource Recovery</h3>
  <p>Valuable materials can be recovered and reused in new products</p>
</div>
<div className="feature-card">
  <h3>Job Creation</h3>
  <p>Recycling industries create employment opportunities in communities</p>
</div>
<div className="feature-card">
  <h3>Energy Conservation</h3>
  <p>Recycling e-waste saves energy compared to mining raw materials</p>
</div>
<div className="feature-card">
  <h3>Health Benefits</h3>
  <p>Proper disposal prevents toxic exposure to harmful substances</p>
</div>
        </div>
      </section>

      <section id="about" className="about-section">
        <h2>About Our Services</h2>
        <div className="about-cards">
          {aboutServices.map((service, idx) => (
            <div className="about-card" key={idx}>
              <div className="about-icon" style={{ fontSize: '2rem' }}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="Footer-section">
      <Footer/>
      </section>
    </div>
  );
};

export default Home; 