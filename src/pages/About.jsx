import React from 'react';
import './Pages.css';

function About() {
  return (
    <div className="page-container">
      <h1>About STAYO</h1>
      <br></br>
      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
          Welcome to Stayo — your trusted partner for unforgettable stays!
We make hotel booking easy, offering everything from cozy budget rooms to luxury hotels, all with transparent pricing and exclusive deals.
At Stayo, we’re committed to making every trip smooth, simple, and memorable. Start your journey with us today!wri
          </p>
        </section>
        <br></br>
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
          At Stayo, our mission is simple — to make finding the perfect stay easy, affordable, and inspiring.
          We aim to connect travelers with trusted accommodations, deliver unbeatable value, and create a seamless booking experience that turns every trip into a memorable adventure.
          </p>
        </section>
        <br></br>
        <section className="about-section">
          <h2>Why Choose STAYO?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>Best Prices</h3>
              <p>Guaranteed best rates across all hotels</p>
              <br></br>
              <h3>Quality Assured</h3>
              <p>All hotels are personally verified</p>
              <br></br>
              <h3>Secure Booking</h3>
              <p>Safe and secure payment options</p>
              <br></br>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer service</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
