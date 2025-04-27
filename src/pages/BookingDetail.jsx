import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const booking = {
    id: parseInt(id),
    hotelName: 'Luxury Palace Hotel',
    checkIn: '2025-05-01',
    checkOut: '2025-05-05',
    status: 'upcoming',
    price: 19996,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3',
    roomType: 'Deluxe Suite',
    guests: 2,
    amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant'],
    address: '123 Luxury Street, Mumbai, Maharashtra',
    contactNumber: '+91 1234567890'
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="booking-detail-page">
      <div className="booking-detail-container">
        <button className="back-button" onClick={() => navigate('/my-bookings')}>
          ← Back to My Bookings
        </button>

        <div className="booking-header">
          <h1>{booking.hotelName}</h1>
          <div className={`booking-status ${booking.status}`}>
            {booking.status}
          </div>
        </div>

        <div className="booking-content">
          <div className="booking-image">
            <img src={booking.image} alt={booking.hotelName} />
          </div>

          <div className="booking-info">
            <section className="info-section">
              <h2>Booking Details</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Check-in</span>
                  <span className="value">{formatDate(booking.checkIn)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Check-out</span>
                  <span className="value">{formatDate(booking.checkOut)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Room Type</span>
                  <span className="value">{booking.roomType}</span>
                </div>
                <div className="info-item">
                  <span className="label">Guests</span>
                  <span className="value">{booking.guests} Adults</span>
                </div>
                <div className="info-item">
                  <span className="label">Total Amount</span>
                  <span className="value price">₹{booking.price}</span>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h2>Hotel Information</h2>
              <div className="info-grid">
                <div className="info-item full-width">
                  <span className="label">Address</span>
                  <span className="value">{booking.address}</span>
                </div>
                <div className="info-item">
                  <span className="label">Contact</span>
                  <span className="value">{booking.contactNumber}</span>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h2>Included Amenities</h2>
              <div className="amenities-list">
                {booking.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    {amenity}
                  </div>
                ))}
              </div>
            </section>

            {booking.status === 'upcoming' && (
              <div className="booking-actions">
                <button className="modify-booking">Modify Booking</button>
                <button className="cancel-booking">Cancel Booking</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetail;
