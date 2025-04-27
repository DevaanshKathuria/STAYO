import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useBookings } from '../context/BookingContext';
import { hotels } from '../data/hotels';
import './Pages.css';

function HotelDetail() {
  const { id } = useParams();
  const [selectedDates, setSelectedDates] = useState({ checkIn: '', checkOut: '' });
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState('');
  const { user } = useUser();
  const { addBooking } = useBookings();
  const navigate = useNavigate();
  useEffect(() => {
    const foundHotel = hotels.find(h => h.id === parseInt(id));
    if (!foundHotel) {
      setError('Hotel not found');
    } else {
      setHotel(foundHotel);
    }
  }, [id]);
  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/hotels')} className="back-btn">
          Back to Hotels
        </button>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="page-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  const calculateNights = () => {
    try {
      if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
      
      const checkInDate = new Date(selectedDates.checkIn);
      const checkOutDate = new Date(selectedDates.checkOut);
      
      if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
        return 0;
      }
      
      if (checkOutDate <= checkInDate) return 0;
      
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return nights;
    } catch (err) {
      console.error('Error calculating nights:', err);
      return 0;
    }
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!user) {
        setError('Please log in to book a hotel');
        return;
      }

      const nights = calculateNights();
      if (nights <= 0) {
        setError('Please select valid check-in and check-out dates');
        return;
      }
      const newBooking = {
        id: Date.now(),
        hotelId: hotel.id,
        hotelName: hotel.name,
        location: hotel.location,
        checkIn: selectedDates.checkIn,
        checkOut: selectedDates.checkOut,
        nights: nights,
        pricePerNight: hotel.price,
        totalPrice: hotel.price * nights,
        image: hotel.image,
        status: 'confirmed',
        bookingDate: new Date().toISOString().split('T')[0],
        userId: user.email
      };
      addBooking(newBooking);
      navigate('/my-bookings', { state: { bookingSuccess: true } });
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('An error occurred while creating your booking. Please try again.');
    }
  };
  return (
    <div className="page-container">
      <div className="hotel-detail">
        <div className="hotel-images">
          {hotel.images.map((image, index) => (
            <>
            <img key={index} src={image} alt={`${hotel.name} view ${index + 1}`} />
            <br></br>
            </>
          ))}
        </div>
        <div className="hotel-info-detail">
          <h1>{hotel.name}</h1>
          <p className="location">{hotel.location}</p>
          <div className="rating">{hotel.rating} / 5</div>
          
          <div className="description">
            <h2>About the Hotel</h2>
            <p>{hotel.description}</p>
          </div>
          <br></br>
          <div className="amenities">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              {hotel.amenities.map((amenity, index) => (
                <>
                <div key={index} className="amenity">✓ {amenity}</div>
                <br></br>
                </>
              ))}
            </div>
          </div>

          <div className="booking-form">
            <h2>Book Now</h2>
            <div className="price-info">
              <span className="price">₹{hotel.price}</span>
              <span className="per-night">per night</span>
            <br></br>
            </div>
            <form onSubmit={handleBookNow}>
              {error && <div className="error-message">{error}</div>}
              <div className="form-group">
                <label>Check-in Date</label>
                <input
                  type="date"
                  value={selectedDates.checkIn}
                  onChange={(e) => setSelectedDates({...selectedDates, checkIn: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                <br></br>
              </div>
              <div className="form-group">
                <label>Check-out Date</label>
                <input
                  type="date"
                  value={selectedDates.checkOut}
                  onChange={(e) => setSelectedDates({...selectedDates, checkOut: e.target.value})}
                  min={selectedDates.checkIn || new Date().toISOString().split('T')[0]}
                  required
                />
                <br></br>
              </div>
              {selectedDates.checkIn && selectedDates.checkOut && calculateNights() > 0 && (
                <div className="price-summary">
                  <div className="price-row">
                    <span>Price per night</span>
                    <span>₹{hotel.price}</span>
                  </div>
                  <div className="price-row">
                    <span>Number of nights</span>
                    <span>{calculateNights()}</span>
                  </div>
                  <div className="price-row total">
                    <span>Total Price</span>
                    <span>₹{hotel.price * calculateNights()}</span>
                  </div>
                </div>
              )}
              <button type="submit" className="book-now-btn" 
                disabled={!selectedDates.checkIn || !selectedDates.checkOut || calculateNights() <= 0}>
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetail;
