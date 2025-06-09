import React from "react";
import styles from "./PostPurchaseServices.module.css";
import {
  FaRegFileAlt,
  FaUserEdit,
  FaTools,
  FaBalanceScale,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PostPurchaseServices = () => {
  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <section className={styles.heroSection}>
          <h1 className={styles.heading}>Post-Purchase Property Services</h1>
          <p className={styles.tagline}>
            Simplifying ownership formalities with expert legal and
            documentation services.
          </p>
        </section>

        <section className={styles.gridSection}>
          <div className={styles.card}>
            <FaRegFileAlt className={styles.icon} />
            <h2>Ownership Mutation</h2>
            <p>
              We help you record the new ownership with local municipal
              authorities, ensuring legal recognition.
            </p>
          </div>

          <div className={styles.card}>
            <FaUserEdit className={styles.icon} />
            <h2>Utility Transfers</h2>
            <p>
              Seamless transfer of electricity, water, gas, and internet
              connections to the new owner’s name.
            </p>
          </div>

          <div className={styles.card}>
            <FaTools className={styles.icon} />
            <h2>Tax & Record Updates</h2>
            <p>
              Assistance with updating property tax records and society
              documents to reflect rightful ownership.
            </p>
          </div>

          <div className={styles.card}>
            <FaBalanceScale className={styles.icon} />
            <h2>Legal Advisory</h2>
            <p>
              Get expert guidance on affidavits, stamp duty, and
              property-related legal clarifications post-purchase.
            </p>
          </div>
        </section>

        <section className={styles.highlights}>
          <h3>Why Choose Us?</h3>
          <ul>
            <li>✅ All documentation handled by legal and municipal experts</li>
            <li>✅ Accurate, compliant, and timely updates</li>
            <li>✅ End-to-end support across major Indian cities</li>
            <li>✅ Transparent process with fixed turnaround times</li>
          </ul>
        </section>

        {/* <section className={styles.contactSection}>
          <h3>Get in Touch</h3>
          <p>
            <FaPhoneAlt /> +91-9876543210
          </p>
          <p>
            <FaEnvelope /> services@propertysecure.in
          </p>
          <p>
            <FaMapMarkerAlt /> Offices in: Mumbai, Bangalore, Pune, Hyderabad,
            Delhi
          </p>
          <button className={styles.cta}>Request Post-Purchase Support</button>
        </section> */}
      </div>
      <Footer />
    </>
  );
};

export default PostPurchaseServices;
