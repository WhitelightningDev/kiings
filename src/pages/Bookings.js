import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const Bookings = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch bookings when the user enters their email
  const fetchBookings = async () => {
    if (!email || !firstName || !lastName) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://kiings-backend.onrender.com/api/my-bookings?email=${email}`);
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Failed to fetch bookings';
      setError(errorMessage);
      setLoading(false);
    }
  };

  // Handle cancellation of a booking
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

  // Categorize bookings into upcoming and past
  const categorizeBookings = (bookings) => {
    const now = moment();
    const upcoming = [];
    const past = [];

    bookings.forEach((booking) => {
      const bookingDateTime = moment(`${booking.date} ${booking.time}`, "YYYY-MM-DD HH:mm");
      if (bookingDateTime.isBefore(now)) {
        past.push(booking);
      } else {
        upcoming.push(booking);
      }
    });

    return { upcoming, past };
  };

  // Get categorized bookings
  const { upcoming, past } = categorizeBookings(bookings);

  return (
    <div className="container mt-5 mb-4">
      <h1 className="text-center text-light mb-4">Check Your Bookings</h1>

      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="firstName" className="form-label text-light">First Name</label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="lastName" className="form-label text-light">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="email" className="form-label text-light">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
      </div>

      <div className="text-center">
        <button
          className="btn btn-primary"
          onClick={fetchBookings}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Bookings'}
        </button>
      </div>

      {error && <p className="text-danger text-center mt-3">{error}</p>}

      {bookings.length === 0 && !loading && (
        <p className="text-center mt-3 text-light">No bookings found.</p>
      )}

      {/* Past Bookings Section */}
      {past.length > 0 && (
        <div className="mt-4">
          <h2 className="text-center">Past Bookings</h2>
          <ul className="list-group">
            {past.map((booking) => (
              <li key={booking._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <p>{`${booking.firstName} ${booking.lastName} - ${booking.carModel} - ${booking.date} at ${booking.time}`}</p>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  disabled
                >
                  Booking Completed
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upcoming Bookings Section */}
      {upcoming.length > 0 && (
        <div className="mt-4">
          <h2 className="text-center">Upcoming Bookings</h2>
          <ul className="list-group">
            {upcoming.map((booking) => (
              <li key={booking._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <p>{`${booking.firstName} ${booking.lastName} - ${booking.carModel} - ${booking.date} at ${booking.time}`}</p>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => cancelBooking(booking._id)}
                >
                  Cancel Booking
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Bookings;
