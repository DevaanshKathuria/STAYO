import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import About from './pages/About';
import Contact from './pages/Contact';
import Support from './pages/Support';
import HotelDetail from './pages/HotelDetail';
import Settings from './pages/Settings';
import MyBookings from './pages/MyBookings';
import BookingDetail from './pages/BookingDetail';
import './App.css';
import './pages/Settings.css';
import './pages/MyBookings.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <BookingProvider>
          <div className="app">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/support" element={<Support />} />
                <Route path="/hotel/:id" element={<HotelDetail />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/booking/:id" element={<BookingDetail />} />
                <Route path="/my-bookings" element={<MyBookings />} />
              </Routes>
            </main>
          </div>
        </BookingProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
