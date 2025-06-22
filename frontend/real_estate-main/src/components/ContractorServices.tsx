import React, { useEffect, useState } from "react";
import styles from "./ContractorServices.module.css";
import {
  FaHardHat,
  FaDraftingCompass,
  FaWrench,
  FaRegClock,
  FaMapMarkerAlt,
  FaPlus,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddContractorForm from "./AddContractorForm"; // Import the form component

interface PortfolioItem {
  title: string;
  description: string;
  images: string[];
  completedOn: string;
  location: string;
}

interface Contractor {
  _id: string;
  name: string;
  location: string;
  serviceType: string;
  verified: boolean;
  portfolio: PortfolioItem[];
}

const ContractorServices: React.FC = () => {
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddContractorForm, setShowAddContractorForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/contractor/verified");
        setContractors(res.data);
      } catch (error) {
        console.error("Error fetching contractors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContractors();
  }, []);

  // Function to handle form submission success
  const handleContractorAdded = () => {
    setShowAddContractorForm(false);
    // Refetch contractors to update the list
    const fetchContractors = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/contractor/verified");
        setContractors(res.data);
      } catch (error) {
        console.error("Error fetching contractors", error);
      }
    };
    fetchContractors();
  };

  return (
    <>
      <Navbar />
      <div style={{ height: '30px' }}></div>
      <div className={styles.wrapper}>
        {/* Add Contractor Button */}
        <div className={styles.addContractorHeader}>
          <button 
            className={styles.addContractorButton}
            onClick={() => setShowAddContractorForm(!showAddContractorForm)}
          >
            <FaPlus className={styles.plusIcon} />
            {showAddContractorForm ? "Cancel" : "Add New Contractor"}
          </button>
        </div>

        {/* Add Contractor Form */}
        {showAddContractorForm && (
          <div className={styles.formContainer}>
            <AddContractorForm onContractorAdded={handleContractorAdded} />
          </div>
        )}

        <section className={styles.heroSection}>
          <h1 className={styles.heading}>Verified Contractor Services</h1>
          <p className={styles.tagline}>
            Hire trusted professionals for repairs, renovations, and civil work.
          </p>
        </section>

        {/* Contractor List */}
        <section className={styles.contractorList}>
          <h2>Available Verified Contractors</h2>
          {loading ? (
            <p>Loading contractors...</p>
          ) : contractors.length === 0 ? (
            <p>No contractors available at the moment.</p>
          ) : (
            <div className={styles.contractorGrid}>
              {contractors.map((contractor) => (
                <div
                  key={contractor._id}
                  className={styles.contractorCard}
                  onClick={() => navigate(`/services/contractors/${contractor._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <h3>{contractor.name}</h3>
                  <p className={styles.infoRow}>
                    <FaMapMarkerAlt className={styles.icon2} />
                    <strong>Location:</strong> {contractor.location}
                  </p>
                  <p className={styles.infoRow}>
                    <FaWrench className={styles.icon2} />
                    <strong>Service Type:</strong> {contractor.serviceType}
                  </p>
                  <p>
                    <strong>Contracts Completed:</strong> {contractor.portfolio.length}
                  </p>
                  <span className={styles.verified}>Verified</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Features Section */}
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
            <li>Vetted contractors with proven experience</li>
            <li>Transparent pricing and timelines</li>
            <li>Support for residential and commercial needs</li>
            <li>Real-time work tracking and updates</li>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContractorServices;