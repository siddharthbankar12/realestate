import React, { useState } from "react";
import styles from "./TitleSearchServices.module.css";
import {
  FaCheckCircle,
  FaBalanceScale,
  FaFileAlt,
  FaStar,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TitleSearchServices = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted form:", formData);

    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <header className={styles.headerSection}>
          <h1 className={styles.title}>🔍 Property Title Search Services</h1>
          <p className={styles.subtitle}>
            Ensure your next property deal is legally sound and secure with our
            trusted verification service.
          </p>
        </header>

        <section className={styles.gridSection}>
          <section className={styles.gridSection}>
            <div className={styles.card}>
              <FaFileAlt className={styles.icon} />
              <h2>What’s Included</h2>
              <ul>
                <li>✅ Title Ownership History</li>
                <li>✅ Encumbrance & Mortgage Check</li>
                <li>✅ Dispute & Litigation Check</li>
                <li>✅ Chain of Title Verification</li>
                <li>✅ Final Legal Opinion Report</li>
              </ul>
            </div>

            <div className={styles.card}>
              <FaBalanceScale className={styles.icon} />
              <h2>Why Choose Us</h2>
              <ul>
                <li>✔ Experienced Real Estate Lawyers</li>
                <li>✔ Pan-India Coverage</li>
                <li>✔ 100% Confidentiality</li>
                <li>✔ Fast Turnaround – 5 Days</li>
                <li>✔ 24/7 Support</li>
              </ul>
            </div>

            <div className={styles.card}>
              <FaStar className={styles.icon} />
              <h2>Service Plans</h2>
              <ul>
                <li>🏠 Residential Property – ₹1999</li>
                <li>🏢 Commercial Property – ₹2999</li>
                <li>🌳 Land/Plot – ₹3499</li>
                <li>🧾 Custom Legal Opinion – On Request</li>
              </ul>
            </div>
          </section>
        </section>

        <section className={styles.testimonials}>
          <h3>💬 What Our Clients Say</h3>
          <p>
            “Saved me from a disputed property. Very professional.” –{" "}
            <i>Arjun P., Mumbai</i>
          </p>
          <p>
            “Fast, reliable, and accurate. Worth every rupee!” –{" "}
            <i>Sneha R., Bangalore</i>
          </p>
        </section>

        <button className={styles.ctaButton} onClick={() => setShowModal(true)}>
          Get Title Search Now
        </button>

        <p className={styles.note}>
          * All services include a downloadable report. Additional charges apply
          for physical copies.
        </p>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>🔐 Request Title Search</h2>
            <form className={styles.formTwoColumn} onSubmit={handleSubmit}>
              {/* LEFT - Property Details */}
              <div className={styles.formLeft}>
                <h3>Property Details</h3>
                <input
                  type="text"
                  name="address"
                  placeholder="Property Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Delhi">Delhi</option>
                </select>
                <input
                  type="text"
                  name="propertyType"
                  placeholder="Property Type (Residential / Commercial / Land)"
                  value={formData.propertyType}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="registrationNumber"
                  placeholder="Registration Number (Optional)"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                />
              </div>

              {/* RIGHT - Contact Info */}
              <button
                className={styles.closeButton}
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
              >
                &times;
              </button>

              <div className={styles.formRight}>
                <h3>Your Contact Info</h3>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="notes"
                  placeholder="Any additional notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
                <button type="submit" className={styles.submitBtn}>
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default TitleSearchServices;
