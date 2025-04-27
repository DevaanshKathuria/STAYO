import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    rating: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      rating: ''
    });
    onSearch({
      location: '',
      minPrice: '',
      maxPrice: '',
      rating: ''
    });
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="Where do you want to stay?"
            className="search-input"
          />
          <button type="button" className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? '✕' : '⚡ Filters'}
          </button>
          <button type="submit" className="search-button">Search</button>
        </div>

        {showFilters && (
          <div className="advanced-filters">
            <div className="filter-group">
              <label>Price Range (₹)</label>
              <div className="price-inputs">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleChange}
                  placeholder="Min"
                  min="0"
                />
                <span>-</span>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleChange}
                  placeholder="Max"
                  min="0"
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Minimum Rating</label>
              <select
                name="rating"
                value={filters.rating}
                onChange={handleChange}
              >
                <option value="">Any</option>
                <option value="3">3+ ⭐</option>
                <option value="4">4+ ⭐</option>
                <option value="4.5">4.5+ ⭐</option>
              </select>
            </div>

            <button type="button" onClick={clearFilters} className="clear-filters">
              Clear Filters
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchBar;
