import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "./ContractorDetails.module.css";

interface PortfolioProject {
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
  email: string;
  phone: string;
  portfolio: PortfolioProject[];
}

const ContractorDetails: React.FC = () => {
  const { id } = useParams();
  const [contractor, setContractor] = useState<Contractor | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchContractor() {
      try {
        const res = await fetch(`http://localhost:8000/api/contractor/${id}`);
        const data = await res.json();
        setContractor(data);
      } catch (err) {
        console.error("Failed to load contractor", err);
      }
    }
    fetchContractor();
  }, [id]);

  if (!contractor) {
    return (
      <>
        <Navbar />
        <p className={styles.loading}>Loading contractor…</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1 className={styles.title}>{contractor.name}</h1>
        <div className={styles.metaGrid}>
          <div>
            <strong>Location:</strong> {contractor.location}
          </div>
          <div>
            <strong>Service Type:</strong> {contractor.serviceType}
          </div>
          <div>
            <strong>Contact no:</strong> {contractor.phone}
          </div>
          <div>
            <strong>Email:</strong> {contractor.email}
          </div>
        </div>

        {contractor.verified && (
          <p className={styles.verified}>Verified Contractor</p>
        )}

        <h2 className={styles.subheading}>Portfolio Projects</h2>

        {contractor.portfolio.length === 0 ? (
          <p className={styles.noPortfolio}>No portfolio available.</p>
        ) : (
          contractor.portfolio.map((project, i) => (
            <div key={i} className={styles.project}>
              <h3>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>
              <p className={styles.meta}>
                <strong>Location:</strong> {project.location}
              </p>
              <p className={styles.meta}>
                <strong>Completed On:</strong>{" "}
                {new Date(project.completedOn).toLocaleDateString()}
              </p>
              {project.images?.length > 0 && (
                <div className={styles.images}>
                  {project.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${project.title} #${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default ContractorDetails;
