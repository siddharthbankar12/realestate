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
import { toast } from "react-toastify";

const TitleSearchServices = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState({
    propertyAddress: "",
    PropertyCity: "",
    PropertyState: "",
    propertyType: "",
    PropertyRegistrationNumber: "",
    ContactFullName: "",
    ContactEmail: "",
    ContactPhone: "",
    ContactNotes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/title-search/create-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success("Request submitted successfully!");
        setSubmittedRequestId(result.requestId);
        setShowModal(false);
        setFormData({
          propertyAddress: "",
          PropertyCity: "",
          PropertyState: "",
          propertyType: "",
          PropertyRegistrationNumber: "",
          ContactFullName: "",
          ContactEmail: "",
          ContactPhone: "",
          ContactNotes: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(
          `Submission failed: ${errorData.message || "Server error"}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        {submittedRequestId && (
          <div className={styles.requestIdBox}>
            ✅ <strong>Your Request ID :</strong> {submittedRequestId}
            <p>Please save this for future reference.</p>
            <button
              className={styles.modalCloseBtn}
              onClick={() => {
                setShowModal(false);
                setSubmittedRequestId(null);
              }}
            >
              X
            </button>
          </div>
        )}

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
              <div className={styles.formLeft}>
                <h3>Property Details</h3>
                <input
                  type="text"
                  name="propertyAddress"
                  placeholder="Property Address"
                  value={formData.propertyAddress}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="PropertyCity"
                  placeholder="City"
                  value={formData.PropertyCity}
                  onChange={handleChange}
                  required
                />
                <select
                  name="PropertyState"
                  value={formData.PropertyState}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Delhi">Delhi</option>
                </select>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Property Type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land">Land</option>
                </select>
                <input
                  type="text"
                  name="PropertyRegistrationNumber"
                  placeholder="Registration Number (Optional)"
                  value={formData.PropertyRegistrationNumber}
                  onChange={handleChange}
                />
              </div>

              {/* RIGHT - Contact Info */}
              <button
                className={styles.closeButton}
                onClick={() => {
                  setShowModal(false);
                  setFormData({
                    propertyAddress: "",
                    PropertyCity: "",
                    PropertyState: "",
                    propertyType: "",
                    PropertyRegistrationNumber: "",
                    ContactFullName: "",
                    ContactEmail: "",
                    ContactPhone: "",
                    ContactNotes: "",
                  });
                }}
                aria-label="Close modal"
              >
                &times;
              </button>

              <div className={styles.formRight}>
                <h3>Your Contact Info</h3>
                <input
                  type="text"
                  name="ContactFullName"
                  placeholder="Full Name"
                  value={formData.ContactFullName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="ContactEmail"
                  placeholder="Email"
                  value={formData.ContactEmail}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="ContactPhone"
                  placeholder="Phone Number"
                  value={formData.ContactPhone}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="ContactNotes"
                  placeholder="Any additional notes"
                  value={formData.ContactNotes}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Request"}
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
