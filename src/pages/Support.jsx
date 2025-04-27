import React, { useState } from 'react';
import './Pages.css';

function Support() {
  const [ticket, setTicket] = useState({ subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Support ticket submitted successfully!");
    setTicket({ subject: '', message: '' });
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Support Center</h1>
        <br></br>
        <div className="support-sections">
          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <br></br>
            <div className="faq-list">
              <div className="faq-item">
                <h3>How do I cancel my booking?</h3>
                <br></br>
                <p>You can cancel your booking through the "My Bookings" section. Please note our cancellation policy.</p>
              </div>
              <br></br>
              <div className="faq-item">
                <h3>What is the check-in time?</h3>
                <p>Standard check-in time is 3:00 PM. Early check-in may be available upon request.</p>
              </div>
              <br></br>
              <div className="faq-item">
                <h3>Is breakfast included?</h3>
                <p>Breakfast inclusion varies by property. Check the hotel details for specific information.</p>
              </div>
              <br></br>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Support;
