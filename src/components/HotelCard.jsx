import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HotelCard.css';

function HotelCard({ hotel }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/hotel/${hotel.id}`);
  };
  return (
    <div className="hotel-card" onClick={handleClick}>
      <img src={hotel.image} alt={hotel.name} className="hotel-image" />
      <div className="hotel-info">
        <h3>{hotel.name}</h3>
        <p className="location">{hotel.location}</p>
        <div className="hotel-features">
          <span>{hotel.rating}⭐️</span>
          <span>🛏️ {hotel.rooms} Rooms</span>
        </div>
        <div className="price-book">
          <p className="price">₹{hotel.price}<span>/night</span></p>
          <button className="book-now" onClick={(e) => {
            e.stopPropagation();
            navigate(`/hotel/${hotel.id}`);
          }}>Book Now</button>
        </div>
      </div>
    </div>
  );
}
export default HotelCard;