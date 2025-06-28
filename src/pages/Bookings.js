import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await axios.get("https://kiings-backend.onrender.com/api/all-bookings");
        setBookings(response.data);
      } catch (error) {
        const errorMessage = error.response ? error.response.data.error : 'Failed to fetch bookings';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    try {
      const response = await axios.delete(`https://kiings-backend.onrender.com/api/cancel-booking/${bookingId}`);
      alert(response.data.message);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Failed to cancel booking';
      alert(errorMessage);
    }
  };

  const now = moment();
  const past = [];
  const upcoming = [];

  bookings.forEach((booking) => {
    const bookingDateTime = moment(`${booking.date} ${booking.time}`, "YYYY-MM-DD HH:mm");
    if (bookingDateTime.isBefore(now)) {
      past.push(booking);
    } else {
      upcoming.push(booking);
    }
  });

  return (
    <div className="container mt-5 mb-4 p-4 rounded" style={{ backgroundColor: '#1e1e2f', color: '#fff' }}>
      <h1 className="text-center mb-4">All Bookings</h1>

      {loading && <p className="text-center">Loading bookings...</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      {!loading && bookings.length === 0 && <p className="text-center text-muted">No bookings found.</p>}

      {/* Upcoming Bookings */}
      {upcoming.length > 0 && (
        <div className="mt-4">
          <h2 className="text-center mb-3">Upcoming Bookings</h2>
          <div className="list-group">
            {upcoming.map((booking) => (
              <div key={booking._id} className="list-group-item bg-dark text-white mb-2 rounded shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{booking.firstName} {booking.lastName}</strong><br />
                    {booking.carModel} | {booking.date} @ {booking.time}
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => cancelBooking(booking._id)}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Past Bookings */}
      {past.length > 0 && (
        <div className="mt-5">
          <h2 className="text-center mb-3">Past Bookings</h2>
          <div className="list-group">
            {past.map((booking) => (
              <div key={booking._id} className="list-group-item bg-secondary text-white mb-2 rounded shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{booking.firstName} {booking.lastName}</strong><br />
                    {booking.carModel} | {booking.date} @ {booking.time}
                  </div>
                  <button className="btn btn-light btn-sm" disabled>
                    Booking Completed
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
