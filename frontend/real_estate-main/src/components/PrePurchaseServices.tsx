import { useState } from "react";
import styles from "./PrePurchaseServices.module.css";
import { FaCheck, FaGavel, FaClipboardList, FaShieldAlt } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast } from "react-toastify";

const PrePurchaseServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState(null);
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Phone: "",
    Address: "",
    MessageOrPropertyDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/Pre-Purchase-Property-Verification/create-enquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Enquiry submitted successfully!");
        setFormData({
          FullName: "",
          Email: "",
          Phone: "",
          Address: "",
          MessageOrPropertyDetails: "",
        });
        setSubmittedEnquiryId(data.requestId); // FIX: use requestId
        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {submittedEnquiryId && (
        <div className={styles.requestIdBox}>
          ✅ <strong>Your Request ID:</strong> {submittedEnquiryId}
          <p>Please save this for future reference.</p>
          <button
            className={styles.modalCloseBtn}
            onClick={() => setSubmittedEnquiryId(null)}
          >
            X
          </button>
        </div>
      )}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Pre-Purchase Property Verification</h1>
          <p>
            Comprehensive legal and technical checks to safeguard your property
            investment before you buy.
          </p>
          <button
            className={styles.heroButton}
            onClick={() => setIsModalOpen(true)}
          >
            Enquire Now
          </button>
        </div>
      </div>

      {/* Services */}
      <section className={styles.servicesSection}>
        <h2 className={styles.sectionTitle}>Our Core Services</h2>
        <div className={styles.cardGrid}>
          <div className={styles.serviceCard}>
            <FaClipboardList className={styles.serviceIcon} />
            <h3>Document Verification</h3>
            <ul>
              <li>
                <FaCheck /> Sale & Mother Deed Validation
              </li>
              <li>
                <FaCheck /> Encumbrance & Liabilities Check
              </li>
              <li>
                <FaCheck /> Title & Possession Documentation
              </li>
              <li>
                <FaCheck /> Urban Planning Compliance
              </li>
            </ul>
          </div>
          <div className={styles.serviceCard}>
            <FaGavel className={styles.serviceIcon} />
            <h3>Legal Assessment</h3>
            <ul>
              <li>
                <FaCheck /> Ownership & Title Chain Review
              </li>
              <li>
                <FaCheck /> Dispute & Govt Acquisition Check
              </li>
              <li>
                <FaCheck /> Legal Heirship Verification
              </li>
              <li>
                <FaCheck /> Local Approvals Examination
              </li>
            </ul>
          </div>
          <div className={styles.serviceCard}>
            <FaShieldAlt className={styles.serviceIcon} />
            <h3>Technical Due Diligence</h3>
            <ul>
              <li>
                <FaCheck /> Site Visit & Measurement Verification
              </li>
              <li>
                <FaCheck /> Structural Stability Check
              </li>
              <li>
                <FaCheck /> Utility & Drainage Access
              </li>
              <li>
                <FaCheck /> Encroachment & Environmental Check
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.highlightsSection}>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✅ Handled by expert legal and engineering professionals</li>
          <li>✅ End-to-end risk mitigation for smart investment</li>
          <li>✅ Detailed verification reports within 5-7 days</li>
          <li>✅ Full transparency, confidentiality, and reliability</li>
        </ul>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.modalClose}
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h2 className={styles.modalTitle}>Request a Service</h2>

            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="FullName"
                    value={formData.FullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="Address"
                    value={formData.Address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message / Property Details</label>
                  <textarea
                    id="message"
                    name="MessageOrPropertyDetails"
                    value={formData.MessageOrPropertyDetails}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={styles.submitButton}
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

export default PrePurchaseServices;
