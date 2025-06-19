import React from "react";
import styles from "./ContractorServices.module.css";
import {
  FaHardHat,
  FaDraftingCompass,
  FaWrench,
  FaRegClock,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ContractorServices: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <section className={styles.heroSection}>
          <h1 className={styles.heading}>Verified Contractor Services</h1>
          <p className={styles.tagline}>
            Hire trusted professionals for repairs, renovations, and civil work.
          </p>
        </section>

        <section className={styles.gridSection}>
          <div className={styles.card}>
            <FaHardHat className={styles.icon} />
            <h2>Civil Work</h2>
            <p>
              Expert support for structural repairs, tiling, plastering, and
              home expansion.
            </p>
          </div>

          <div className={styles.card}>
            <FaDraftingCompass className={styles.icon} />
            <h2>Interior Renovation</h2>
            <p>
              Skilled professionals for carpentry, painting, plumbing, and
              design upgrades.
            </p>
          </div>

          <div className={styles.card}>
            <FaWrench className={styles.icon} />
            <h2>On-Demand Repairs</h2>
            <p>
              Quick fixes for leakages, electric faults, and minor construction
              defects.
            </p>
          </div>

          <div className={styles.card}>
            <FaRegClock className={styles.icon} />
            <h2>Time-Bound Delivery</h2>
            <p>
              All work delivered within committed timelines by verified
              contractors.
            </p>
          </div>
        </section>

        <section className={styles.highlights}>
          <h3>Why Hire Through Us?</h3>
          <ul>
            <li>✅ Vetted contractors with proven experience</li>
            <li>✅ Transparent pricing and timelines</li>
            <li>✅ Support for residential and commercial needs</li>
            <li>✅ Real-time work tracking and updates</li>
          </ul>
        </section>

        {/* <section className={styles.contactSection}>
          <h3>Contact Our Team</h3>
          <p>
            <FaPhoneAlt /> +91-9876543210
          </p>
          <p>
            <FaEnvelope /> contractor@propertysecure.in
          </p>
          <p>
            <FaMapMarkerAlt /> Available in: Mumbai, Bangalore, Pune, Hyderabad, Delhi
          </p>
          <button className={styles.cta}>Request a Contractor</button>
        </section> */}
      </div>
      <Footer />
    </>
  );
};

export default ContractorServices;
