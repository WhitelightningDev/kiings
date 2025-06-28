import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavLogo from "../assets/kings-logo.png";
import { washTypes, additionalServices } from "../functions/washData";
import "../styles/css/homepage.css";

function HomePage() {
  const [selectedWash, setSelectedWash] = useState(null);
  const [additionalSelections, setAdditionalSelections] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [serviceLocation, setServiceLocation] = useState("come");
  const [address, setAddress] = useState("");
  const isBooking = selectedWash && date && time;

  const handleWashChange = (event) => {
    const selectedWashType = washTypes.find(
      (wash) => wash.name === event.target.value
    );
    setSelectedWash(selectedWashType);
  };

  const handleServiceChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setAdditionalSelections((prev) => [...prev, value]);
    } else {
      setAdditionalSelections((prev) =>
        prev.filter((service) => service !== value)
      );
    }
  };

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (date) {
        try {
          const response = await axios.get(
            `https://kiings-backend.onrender.com/api/available-slots?date=${date}`
          );
          setAvailableSlots(response.data);
          setTime(""); // Reset selected time when new slots are fetched
        } catch (error) {
          console.error("Error fetching available slots:", error);
          toast.error("Error fetching available slots. Please try again.", {
            position: "top-center",
            autoClose: 5000,
          });
        }
      } else {
        setAvailableSlots([]);
      }
    };

    fetchAvailableSlots();
  }, [date]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
  
      if (selectedWash) {
        total += selectedWash.price;
      }
  
      additionalSelections.forEach((service) => {
        const serviceData = additionalServices.find((s) => s.name === service);
        if (serviceData) {
          total += serviceData.price;
        }
      });
  
      if (subscription) {
        total += 300; // Add monthly subscription fee
      }
  
      setTotalPrice(total);
    };
  
    calculateTotalPrice();
  }, [selectedWash, additionalSelections, subscription]);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    if (!firstName || !lastName || !carModel || !email || (!isBooking && !subscription)) {
      toast.error("Please fill in all required fields or select a subscription.", {
        position: "top-center",
        autoClose: 5000,
      });
      setLoading(false);
      return;
    }
  
    if (serviceLocation === "come" && !address) {
      toast.error("Please provide an address for home service.", {
        position: "top-center",
        autoClose: 5000,
      });
      setLoading(false);
      return;
    }
  
    const isConfirmed = window.confirm(
      "Are you sure you want to confirm this booking?"
    );
    if (!isConfirmed) {
      setLoading(false);
      return;
    }
  
    const bookingData = {
      firstName,
      lastName,
      carModel,
      washType: selectedWash
        ? {
            name: selectedWash.name,
            price: Number(selectedWash.price),
            details: selectedWash.details,
          }
        : {},
      additionalServices: additionalSelections.map((service) => {
        const serviceData = additionalServices.find((s) => s.name === service);
        return {
          name: service,
          price: serviceData ? Number(serviceData.price) : 0,
        };
      }),
      date,
      time,
      email,
      subscription: subscription
        ? "Monthly Subscription - R300"
        : "No Subscription",
      serviceLocation,
      address: serviceLocation === "come" ? address : "",
      totalPrice, // Use the pre-calculated state
    };
  
    console.log("Booking Data Sent to Backend:", bookingData);
  
    try {
      const response = await axios.post(
        "https://kiings-backend.onrender.com/api/book",
        bookingData
      );
      console.log("Backend Response:", response.data);
  
      const { redirectUrl } = response.data;
  
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        toast.error("Failed to initiate payment.", {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error making the booking:", error);
      toast.error("Booking failed. Please try again.", {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  

  
return (
  <>
    {/* Top scrolling banner */}
    <div
      className="bg-primary text-white py-2 mb-3 position-relative overflow-hidden"
      style={{ height: 50 }}
    >
      <div
        style={{
          whiteSpace: "nowrap",
          position: "absolute",
          animation: "scrollText 17s linear infinite",
          left: 0,
          right: 0,
        }}
      >
        ⏰ Operating Hours: Monday - Saturday, 8 AM - 6 PM | Book Your Car Wash Today! 🚗✨
      </div>
    </div>

    <main className="container" style={{ maxWidth: "720px" }}>
      <ToastContainer />

      {/* Title and logo card */}
      <div className="card mb-4 mt-3 text-center">
        <img
          src={NavLogo}
          alt="Logo"
          style={{ maxWidth: 100, margin: "1rem auto 0" }}
          className="card-img-top"
        />
        <div className="card-body">
          <h1 className="card-title mb-3">Book Your Car Wash</h1>
          <p className="card-text">
            Fill in the form below to schedule your car wash. Choose your preferred date and time.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="mb-4">Car Wash Details</h3>

          <form noValidate onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* First Name */}
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              {/* Last Name */}
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              {/* Car Model */}
              <div className="col-12">
                <label htmlFor="carModel" className="form-label">
                  Car Model: Please Specify <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="carModel"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Type of Wash */}
              <div className="col-12">
                <label htmlFor="washType" className="form-label">
                  Type of Wash <span className="text-danger">*</span>
                </label>
                <select
                  id="washType"
                  className="form-select"
                  value={selectedWash ? selectedWash.name : ""}
                  onChange={handleWashChange}
                  required
                >
                  <option value="">Choose...</option>
                  {washTypes.map((wash) => (
                    <option key={wash.name} value={wash.name}>
                      {wash.name} - ZAR {wash.price.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Wash Details */}
              {selectedWash && (
                <div className="col-12">
                  <small>
                    <strong>Details:</strong> {selectedWash.details}
                  </small>
                </div>
              )}

              {/* Additional Services */}
              <fieldset className="col-12">
                <legend className="col-form-label pt-0">Additional Services</legend>
                {additionalServices.map((service) => (
                  <div className="form-check" key={service.name}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`service-${service.name}`}
                      value={service.name}
                      checked={additionalSelections.includes(service.name)}
                      onChange={handleServiceChange}
                    />
                    <label className="form-check-label" htmlFor={`service-${service.name}`}>
                      {service.name} - ZAR {service.price.toFixed(2)}
                    </label>
                  </div>
                ))}
              </fieldset>

              {/* Preferred Date */}
              <div className="col-md-6">
                <label htmlFor="date" className="form-label">
                  Preferred Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              {/* Preferred Time */}
              <div className="col-md-6">
                <label htmlFor="time" className="form-label">
                  Preferred Time <span className="text-danger">*</span>
                </label>
                <select
                  id="time"
                  className="form-select"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                >
                  <option value="">Choose...</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Location */}
              <fieldset className="col-12">
                <legend className="col-form-label pt-0">Service Location <span className="text-danger">*</span></legend>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="serviceLocation"
                    id="comeToMe"
                    value="come"
                    checked={serviceLocation === "come"}
                    onChange={(e) => setServiceLocation(e.target.value)}
                    required
                  />
                  <label className="form-check-label" htmlFor="comeToMe">
                    Come to Me (Add Address Below)
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="serviceLocation"
                    id="homeLocation"
                    value="home"
                    checked={serviceLocation === "home"}
                    onChange={(e) => setServiceLocation(e.target.value)}
                    required
                  />
                  <label className="form-check-label" htmlFor="homeLocation">
                    24 Morton Way, Stataford Green, Eersteriver, Cape Town
                  </label>
                </div>
              </fieldset>

              {/* Address if Come to Me */}
              {serviceLocation === "come" && (
                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Please add your address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="For Home Service only"
                  />
                </div>
              )}

              {/* Monthly Subscription */}
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="subscription"
                    checked={subscription}
                    onChange={(e) => setSubscription(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="subscription">
                    Monthly Subscription - ZAR 300
                  </label>
                </div>
              </div>

              {/* Total Price */}
              <div className="col-12">
                <hr />
                <h5>Total Price: ZAR {totalPrice.toFixed(2)}</h5>
              </div>

              {/* Submit Button */}
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Book Now"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>

    <style>{`
      @keyframes scrollText {
        0% { left: 100%; }
        100% { left: -100%; }
      }
    `}</style>
  </>
);


}

export default HomePage;
