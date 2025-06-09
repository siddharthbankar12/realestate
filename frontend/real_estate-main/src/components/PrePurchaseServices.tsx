import React, { useState } from "react";
import styles from "./PrePurchaseServices.module.css";
import {
  FaCheck,
  FaGavel,
  FaClipboardList,
  FaShieldAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PrePurchaseServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <Navbar />

      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Pre-Purchase Property Verification</h1>
          <p>
            Comprehensive legal and technical checks to safeguard your property
            investment before you buy.
          </p>
          <button className={styles.heroButton} onClick={openModal}>
            Enquire Now
          </button>
        </div>
      </div>

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

      <section className={styles.highlightsSection}>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✅ Handled by expert legal and engineering professionals</li>
          <li>✅ End-to-end risk mitigation for smart investment</li>
          <li>✅ Detailed verification reports within 5-7 days</li>
          <li>✅ Full transparency, confidentiality, and reliability</li>
        </ul>
      </section>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.modalClose} onClick={closeModal}>
              ×
            </button>
            <h2 className={styles.modalTitle}>Request a Service</h2>

            <form className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message / Property Details</label>
                <textarea
                  id="message"
                  placeholder="Share your query or property details"
                ></textarea>
              </div>
              <button type="submit" className={styles.submitButton}>
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default PrePurchaseServices;
