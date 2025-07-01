import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavLogo from "../assets/kings-logo.png";
import {
  washTypes,
  additionalServices,
  reasonsByExtra,
} from "../functions/washData";
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
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleWashChange = (event) => {
    const selectedWashType = washTypes.find(
      (wash) => wash.name === event.target.value
    );
    setSelectedWash(selectedWashType);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
        setSlotsLoading(true);
        try {
          const response = await axios.get(
            `https://kiings-backend.onrender.com/api/available-slots?date=${date}`
          );
          setAvailableSlots(response.data);
          setTime("");
        } catch (error) {
          toast.error("Error fetching available slots. Please try again.", {
            position: "top-center",
            autoClose: 5000,
          });
        } finally {
          setSlotsLoading(false);
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

    if (
      !firstName ||
      !lastName ||
      !carModel ||
      !email ||
      (!isBooking && !subscription)
    ) {
      toast.error(
        "Please fill in all required fields or select a subscription.",
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
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
      {/* Top Banner */}
      <div className="bg-primary text-white py-4  position-relative overflow-hidden">
        <div
          style={{
            whiteSpace: "nowrap",
            position: "absolute",
            animation: "scrollText 17s linear infinite",
            left: 0,
          }}
        >
          ⏰ Operating Hours: Monday - Saturday, 8 AM - 6 PM | Book Your Car
          Wash Today! 🚗✨
        </div>
      </div>

      <main className="container py-4">
        <ToastContainer />

        {/* Header Card */}
        <div className="booking-header-container">
          <div className="booking-header-content">
            <img src={NavLogo} alt="Kings Logo" className="booking-logo" />
            <h1 className="booking-title">Book Your Car Wash</h1>
            <p className="booking-subtitle">
              Fill in the form to schedule your car wash.
            </p>
          </div>
        </div>

        {/* Booking Form Card */}
        <div className="form-section-container">
          <div className="form-content">
            <h4 className="mb-4">Booking Details</h4>

            <form noValidate onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* --- Personal Info --- */}
                <h5 className="mt-3">Personal Information</h5>
                <hr className="mt-0 mb-2" />

                <div className="col-md-6">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* --- Car Info --- */}
                <h5 className="mt-4">Car & Wash Details</h5>
                <hr className="mt-0 mb-2" />

                <div className="col-12">
                  <label className="form-label">Car Model *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Type of Wash *</label>
                  <select
                    className="form-select"
                    value={selectedWash ? selectedWash.name : ""}
                    onChange={handleWashChange}
                    required
                  >
                    <option value="">Select a wash type</option>
                    {washTypes.map((wash) => (
                      <option key={wash.name} value={wash.name}>
                        {wash.name} - ZAR {wash.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedWash && (
                  <>
                    <div className="col-12 mt-2">
                      <small className="text-muted d-block">
                        <strong>Details:</strong> {selectedWash.details}
                      </small>
                    </div>

                    {selectedWash.recommendedExtras &&
                      selectedWash.recommendedExtras.length > 0 && (
                        <div className="col-12 mt-3">
                          <div
                            className="p-3 rounded text-white fw-bold"
                            style={{
                              backgroundColor: "#ff6600",
                              fontSize: "1.2rem",
                              animation: "pulse 2s infinite",
                              boxShadow: "0 0 10px 2px rgba(255, 102, 0, 0.7)",
                              userSelect: "none",
                              cursor: "pointer",
                            }}
                            onClick={openModal}
                            title="Tap to discover why these extras are worth it!"
                          >
                            <span
                              role="img"
                              aria-label="star"
                              style={{ marginRight: "8px" }}
                            >
                              🌟
                            </span>
                            Highly Recommended Extras:{" "}
                            {selectedWash.recommendedExtras.join(", ")}
                            <span
                              role="img"
                              aria-label="thumbs up"
                              style={{ marginLeft: "8px" }}
                            >
                              👍
                            </span>
                          </div>
                        </div>
                      )}
                  </>
                )}

                {/* Modal */}
                {modalOpen && (
                  <>
                    <div
                      className="modal-backdrop"
                      onClick={closeModal}
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: 1000,
                      }}
                    />
                    <div
                      className="modal-content"
                      role="dialog"
                      aria-modal="true"
                      style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#fff",
                        padding: "2rem",
                        borderRadius: "12px",
                        maxWidth: "420px",
                        width: "90%",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
                        zIndex: 1001,
                      }}
                    >
                      <h4 className="mb-3 text-center text-dark">
                        ✨ Why You’ll Love These Extras
                      </h4>
                      <ul style={{ paddingLeft: "1.25rem" }}>
                        {selectedWash.recommendedExtras.map((extra) => (
                          <li key={extra} className="mb-2">
                            <strong>{extra}:</strong>{" "}
                            {reasonsByExtra[extra] ||
                              "This extra enhances your service for a better finish."}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={closeModal}
                        style={{
                          marginTop: "1.5rem",
                          backgroundColor: "#ff6600",
                          border: "none",
                          padding: "0.6rem 1.2rem",
                          color: "#fff",
                          fontWeight: "bold",
                          borderRadius: "6px",
                          width: "100%",
                          cursor: "pointer",
                        }}
                      >
                        Got it!
                      </button>
                    </div>
                  </>
                )}

                <style>{`
  @keyframes pulse {
    0% { box-shadow: 0 0 10px 2px rgba(255, 102, 0, 0.7); }
    50% { box-shadow: 0 0 20px 6px rgba(255, 102, 0, 1); }
    100% { box-shadow: 0 0 10px 2px rgba(255, 102, 0, 0.7); }
  }
`}</style>

                <div className="col-12">
                  <label className="form-label">Additional Services</label>
                  <div className="row">
                    {additionalServices.map((service) => (
                      <div className="col-sm-6 mb-3" key={service.name}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`service-${service.name}`}
                            value={service.name}
                            checked={additionalSelections.includes(
                              service.name
                            )}
                            onChange={handleServiceChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`service-${service.name}`}
                          >
                            {service.name} – ZAR {service.price.toFixed(2)}
                          </label>
                        </div>
                        {service.details && (
                          <small className="text-muted d-block ms-4">
                            {service.details}
                          </small>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* --- Booking Time --- */}
                <h5 className="mt-4">Booking Time</h5>
                <hr className="mt-0 mb-2" />

                <div className="col-md-6">
                  <label className="form-label">Preferred Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Preferred Time *</label>
                  {slotsLoading ? (
                    <div className="d-flex align-items-center justify-content-start gap-2">
                      <div
                        className="spinner-border text-warning"
                        role="status"
                      />
                      <span className="text-light">
                        Loading available times...
                      </span>
                    </div>
                  ) : (
                    <select
                      className="form-select"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    >
                      <option value="">Select a time</option>
                      {availableSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* --- Location --- */}
                <h5 className="mt-4">Service Location</h5>
                <hr className="mt-0 mb-2" />

                <div className="col-12">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="serviceLocation"
                      value="come"
                      id="come"
                      checked={serviceLocation === "come"}
                      onChange={(e) => setServiceLocation(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="come">
                      Come to Me (provide address)
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="serviceLocation"
                      value="home"
                      id="home"
                      checked={serviceLocation === "home"}
                      onChange={(e) => setServiceLocation(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="home">
                      24 Morton Way, Eersteriver, Cape Town
                    </label>
                  </div>
                </div>

                {serviceLocation === "come" && (
                  <div className="col-12">
                    <label className="form-label">Your Address *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your address"
                      required
                    />
                  </div>
                )}

                {/* --- Subscription ---
                <div className="col-12 mt-3">
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
                </div> */}

                {/* --- Total & Submit --- */}
                <div className="col-12 mt-4">
                  <hr />
                  <h5 className="text-end">
                    Total: ZAR {totalPrice.toFixed(2)}
                  </h5>
                </div>

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
                      />
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
