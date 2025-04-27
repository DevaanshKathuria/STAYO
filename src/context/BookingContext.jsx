import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('bookings');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);
  const addBooking = (newBooking) => {
    setBookings(prevBookings => [...prevBookings, {
      ...newBooking,
      id: Date.now(),
      status: 'upcoming'
    }]);
  };
  const cancelBooking = (bookingId) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' }
          : booking
      )
    );
  };

  const getUserBookings = () => {
    return bookings;
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, getUserBookings }}>
      {children}
    </BookingContext.Provider>
  );
}
export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
}
