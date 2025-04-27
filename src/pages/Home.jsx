import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import { hotels as hotelData } from '../data/hotels';
import './Pages.css';
function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHotels, setFilteredHotels] = useState(hotelData);
  useEffect(() => {
    const filtered = hotelData.filter(hotel => 
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHotels(filtered);
  }, [searchQuery]);
  return (
    <div className="page-container">
      <div className="hero-section">
        <h1 style={{color: "white"}}>Find Your Perfect Stay with Stayo</h1>
        <p style={{color: "white"}}>Discover amazing hotels and accommodations around India in no time.</p>
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by city or hotel name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>
      <div className="hotels-section">
        <h2>{searchQuery ? 'Search Results' : 'Featured Hotels'}</h2>
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

export default Home;

