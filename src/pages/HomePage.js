import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavLogo from '../assets/kings-logo.png';
import { washTypes, additionalServices } from '../functions/washData';
import '../styles/css/homepage.css';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';

function HomePage() {
  const [selectedWash, setSelectedWash] = useState(null);
  const [additionalSelections, setAdditionalSelections] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [serviceLocation, setServiceLocation] = useState('come'); // Default to "Come to Me"
  const [address, setAddress] = useState('');

  const handleWashChange = (event) => {
    const selectedWashType = washTypes.find((wash) => wash.name === event.target.value);
    setSelectedWash(selectedWashType);
  };

  const handleServiceChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setAdditionalSelections((prev) => [...prev, value]);
    } else {
      setAdditionalSelections((prev) => prev.filter((service) => service !== value));
    }
  };

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (date) {
        try {
          const response = await axios.get(`http://localhost:3030/api/available-slots?date=${date}`);
          setAvailableSlots(response.data);
          setTime('');
        } catch (error) {
          console.error('Error fetching available slots:', error);
        }
      } else {
        setAvailableSlots([]);
      }
    };

    fetchAvailableSlots();
  }, [date]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = selectedWash ? selectedWash.price : 0;
      additionalSelections.forEach((service) => {
        const serviceData = additionalServices.find((s) => s.name === service);
        if (serviceData) {
          total += serviceData.price;
        }
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [selectedWash, additionalSelections]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const bookingData = {
      firstName,
      lastName,
      carModel,
      washType: selectedWash ? { name: selectedWash.name, price: selectedWash.price, details: selectedWash.details } : {},
      additionalServices: additionalSelections.map((service) => {
        const serviceData = additionalServices.find((s) => s.name === service);
        return {
          name: service,
          price: serviceData ? serviceData.price : 0,
        };
      }),
      date,
      time,
      email,
      subscription: subscription ? 'Monthly Subscription - R300' : 'No Subscription',
      serviceLocation, // Include serviceLocation
      address: serviceLocation === 'come' ? address : '', // Include address if serviceLocation is 'come'
    };

    try {
      await axios.post('http://localhost:3030/api/bookings', bookingData);
      toast.success('Booking confirmed!', {
        position: "top-center",
        autoClose: 5000,
      });

      setSelectedWash(null);
      setAdditionalSelections([]);
      setDate('');
      setTime('');
      setFirstName('');
      setLastName('');
      setCarModel('');
      setEmail('');
      setSubscription(false);
      setServiceLocation('come'); // Reset serviceLocation to default
      setAddress(''); // Reset address
      setAvailableSlots([]);
    } catch (error) {
      console.error('There was an error making the booking!', error);
      toast.error('Booking failed. Please try again.', {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <ToastContainer />
      <div className="container mb-5">
        <main>
          <div className="py-5 text-center card shadow rounded-5 bg-light">
            <img className="d-block mx-auto mb-4" src={NavLogo} alt="Logo" width="100" height="100" />
            <h2 className="text-warning">Book Your Car Wash</h2>
            <p className="lead">Fill in the form below to schedule your car wash. Choose your preferred date and time.</p>
          </div>

          <div className="row g-5">
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3 badge text-bg-warning rounded-pill mt-3">Car Wash Details</h4>
              <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label text-light">First Name</label>
                    <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    <div className="invalid-feedback">Valid first name is required.</div>
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label text-light">Last Name</label>
                    <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    <div className="invalid-feedback">Valid last name is required.</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="carModel" className="form-label text-light">Car Model</label>
                    <input type="text" className="form-control" id="carModel" value={carModel} onChange={(e) => setCarModel(e.target.value)} placeholder="Enter your car model" required />
                    <div className="invalid-feedback">Please enter your car model.</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label text-light">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                    <div className="invalid-feedback">Please enter a valid email address.</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="washType" className="form-label text-light">Type of Wash</label>
                    <select className="form-select" id="washType" value={selectedWash ? selectedWash.name : ''} onChange={handleWashChange} required>
                      <option value="">Choose...</option>
                      {washTypes.map((wash) => (
                        <option key={wash.name} value={wash.name}>
                          {wash.name} - ZAR {wash.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">Please select a wash type.</div>
                  </div>

                  {selectedWash && (
                    <div className="col-12 mt-3">
                      <h6 className="text-light">Details:</h6>
                      <p className="text-body-primary">{selectedWash.details}</p>
                    </div>
                  )}

                  <div className="col-12">
                    <label className="form-label text-light">Additional Services</label>
                    {additionalServices.map((service) => (
                      <div key={service.name} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={service.name}
                          id={service.name}
                          onChange={handleServiceChange}
                          checked={additionalSelections.includes(service.name)}
                        />
                        <label className="form-check-label text-light" htmlFor={service.name}>
                          {service.name} - ZAR {service.price.toFixed(2)}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="col-12">
                    <label htmlFor="date" className="form-label text-light">Preferred Date</label>
                    <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    <div className="invalid-feedback">Please select a date.</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="time" className="form-label text-light">Preferred Time</label>
                    <select id="time" className="form-select" value={time} onChange={(e) => setTime(e.target.value)} required>
                      <option value="">Choose...</option>
                      {availableSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">Please select a time.</div>
                  </div>
                </div>
                <div className="col-12 mt-3">
                    <h5 className="text-light">Service Location</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="serviceLocation"
                        id="comeToMe"
                        value="come"
                        checked={serviceLocation === 'come'}
                        onChange={() => setServiceLocation('come')}
                      />
                      <label className="form-check-label text-light" htmlFor="comeToMe">
                        Come to Me
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="serviceLocation"
                        id="goToWash"
                        value="go"
                        checked={serviceLocation === 'go'}
                        onChange={() => setServiceLocation('go')}
                      />
                      <label className="form-check-label text-light" htmlFor="goToWash">
                        Go to Wash
                      </label>
                    </div>
                  </div>

                  {serviceLocation === 'come' && (
                    <div className="col-12">
                      <label htmlFor="address" className="form-label text-light">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                        required
                      />
                      <div className="invalid-feedback">Please enter your address.</div>
                    </div>
                  )}

                <hr className="my-4" />
                <button className="w-100 btn btn-warning btn-lg" type="submit" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Confirm Booking'}
                </button>
              </form>
            </div>

            

            <div className="col-md-4">
              <h4 className="mb-3 badge text-bg-warning rounded-pill mt-3">Summary</h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-sm mt-4">
                  <div>
                    <h6 className="my-0">Car Wash Type</h6>
                    <small className="text-body-secondary">{selectedWash ? selectedWash.name : 'None'}</small>
                  </div>
                  <span className="text-body-secondary">ZAR {selectedWash ? selectedWash.price.toFixed(2) : '0.00'}</span>
                </li>
                {additionalSelections.map((service) => {
                  const serviceData = additionalServices.find((s) => s.name === service);
                  return (
                    <li key={service} className="list-group-item d-flex justify-content-between lh-sm">
                      <div>
                        <h6 className="my-0">{service}</h6>
                      </div>
                      <span className="text-body-secondary">ZAR {serviceData ? serviceData.price.toFixed(2) : '0.00'}</span>
                    </li>
                  );
                })}
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <span>Total (ZAR)</span>
                  <strong>{totalPrice.toFixed(2)}</strong>
                </li>
              </ul>

              <h4 className="mb-3 badge text-bg-warning rounded-pill mt-3">Subscription</h4>
              <div className="card p-3">
                <h5 className="card-title">Monthly Car Wash Subscription</h5>
                <p className="card-text">Subscribe for only ZAR 300/month and get unlimited car washes.</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="subscription"
                    checked={subscription}
                    onChange={(e) => setSubscription(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="subscription">
                    Opt-in for the subscription
                  </label>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
