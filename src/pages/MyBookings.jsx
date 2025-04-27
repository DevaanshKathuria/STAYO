import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useBookings } from '../context/BookingContext';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

function MyBookings() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('all');
  const { bookings: bookingsList, cancelBooking } = useBookings();
  const [showSuccess, setShowSuccess] = useState(location.state?.bookingSuccess || false);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };
  const handleViewDetails = (bookingId) => {
    navigate(`/booking/${bookingId}`);
  };
  const handleCancelBooking = (bookingId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (confirmCancel) {
      cancelBooking(bookingId);
    }
  };
  const filteredBookings = bookingsList.filter(booking => {
    if (booking.userId !== user.email) return false;
    if (activeFilter === 'all') return true;
    return booking.status === activeFilter.toLowerCase();
  });
  return (
    <div className="bookings-page">
      <div className="bookings-container">
        <h1>My Bookings</h1>
        {showSuccess && (
          <div className="success-message">
            Booking confirmed successfully!
            <button onClick={() => setShowSuccess(false)} className="close-btn">×</button>
          </div>
        )}  
        <div className="bookings-filters">
          <button 
            className={activeFilter === 'all' ? 'active' : ''}
            onClick={() => handleFilterChange('all')}
          >All Bookings</button>
          <button 
            className={activeFilter === 'upcoming' ? 'active' : ''}
            onClick={() => handleFilterChange('upcoming')}
          >Upcoming</button>
          <button 
            className={activeFilter === 'completed' ? 'active' : ''}
            onClick={() => handleFilterChange('completed')}
          >Completed</button>
          <button 
            className={activeFilter === 'cancelled' ? 'active' : ''}
            onClick={() => handleFilterChange('cancelled')}
          >Cancelled</button>
        </div>
        <div className="bookings-list">
          {filteredBookings.length === 0 ? (
            <div className="no-bookings">
              <h3>No {activeFilter !== 'all' ? activeFilter : ''} bookings found</h3>
              <p>When you book a hotel, your reservations will appear here.</p>
            </div>
          ) : (
            filteredBookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-image">
                  <img src={booking.image} alt={booking.hotelName} />
                </div>
                <div className="booking-details">
                  <h3>{booking.hotelName}</h3>
                  <div className="booking-dates">
                    <div>
                      <span className="label">Check-in:</span>
                      <span className="date">{formatDate(booking.checkIn)}</span>
                    </div>
                    <div>
                      <span className="label">Check-out:</span>
                      <span className="date">{formatDate(booking.checkOut)}</span>
                    </div>
                  </div>
                  <div className="booking-price">
                    <span className="label">Total:</span>
                    <span className="amount">₹{booking.price}</span>
                  </div>
                  <div className={`booking-status ${booking.status}`}>
                    {booking.status}
                  </div>
                </div>
                <div className="booking-actions">
                  <button 
                    className="view-details"
                    onClick={() => handleViewDetails(booking.id)}
                  >View Details</button>
                  {booking.status === 'upcoming' && (
                    <button 
                      className="cancel-booking"
                      onClick={() => handleCancelBooking(booking.id)}
                    >Cancel Booking</button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
