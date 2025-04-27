import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import { hotels as hotelData } from '../data/hotels';
import './Pages.css';

function Hotels() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hotels] = useState(hotelData);
  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="hotels-header">
          <h1>Find Your Perfect Stay</h1>
        </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search hotels by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        <div className="hotels-grid">
          {filteredHotels.map(hotel => (
            <Link to={`/hotel/${hotel.id}`} key={hotel.id} className="hotel-link">
              <HotelCard hotel={hotel} />
            </Link>
          ))}
        </div>
        {filteredHotels.length === 0 && (
          <div className="no-results">
            <p>No hotels found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Hotels;
