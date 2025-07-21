import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminContractorVerification.module.css";

type ServiceType = "Civil" | "Electrical" | "Plumbing" | 
                  "Full Construction" | "Interior" | "Other";

interface PreviousWork {
  title: string;
  description: string;
  images: string[];
  completedOn: string;
  location: string;
}

interface Contractor {
  _id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  serviceType: ServiceType;
  verified: boolean;
  portfolio: PreviousWork[];
  createdAt: string;
}

interface ContractorVerificationProps {
  contractors: Contractor[];
  loading: boolean;
  error: string | null;
  handleAcceptContractor: (id: string) => void;
  handleRejectContractor: (id: string) => void;
}

const AdminContractorVerification: React.FC<ContractorVerificationProps> = ({
  contractors,
  loading,
  error,
  handleAcceptContractor,
  handleRejectContractor,
}) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "verified" | "pending">("all");

  const filteredContractors = contractors
    .filter((contractor) =>
      filter === "all"
        ? true
        : filter === "verified"
        ? contractor.verified
        : !contractor.verified
    )
    .reverse();

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <button
          onClick={() => setFilter("all")}
          className={`${styles.filterBtn} ${filter === "all" ? styles.active : ""}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("verified")}
          className={`${styles.filterBtn} ${filter === "verified" ? styles.active : ""}`}
        >
          Verified
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`${styles.filterBtn} ${filter === "pending" ? styles.active : ""}`}
        >
          Pending
        </button>
      </div>

      {loading ? (
        <p className={styles.message}>Loading contractors...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : filteredContractors.length === 0 ? (
        <p className={styles.message}>No contractors found for this filter.</p>
      ) : (
        filteredContractors.map((contractor) => (
          <div key={contractor._id} className={styles.contractorCard}>
            <div className={styles.cardContent}>
              <div className={styles.titleRow}>
                <h2 className={styles.title}>{contractor.name}</h2>
                <span
                  className={`${styles.status} ${
                    contractor.verified ? styles.verified : styles.pending
                  }`}
                >
                  {contractor.verified ? "Verified" : "Pending"}
                </span>
              </div>

              <button
                className={styles.viewDetailsBtn}
                onClick={() => navigate(`/services/contractors/${contractor._id}`)}
              >
                View Details
              </button>

              <div className={styles.infoGroup}>
                <span className={styles.label}>Service Type:</span>
                <span className={`${styles.value} ${styles.serviceType}`}>
                  {contractor.serviceType}
                </span>

                <span className={styles.label}>Contact:</span>
                <span className={styles.value}>
                  {contractor.email} | {contractor.phone}
                </span>

                <span className={styles.label}>Location:</span>
                <span className={styles.value}>{contractor.location}</span>

                <span className={styles.label}>Joined:</span>
                <span className={styles.value}>
                  {new Date(contractor.createdAt).toLocaleString()}
                </span>

                <span className={styles.label}>Portfolio Projects</span>
                {contractor.portfolio.length}

                {contractor.portfolio.length > 0 ? (
                  <ul className={styles.portfolioList}>
                    {contractor.portfolio.slice(0, 2).map((work, i) => (
                      <li key={i}>
                        <div className={styles.portfolioContent}>
                          <strong>{work.title}</strong>
                          <div className={styles.portfolioDescription}>
                            {work.description}
                          </div>
                          <div className={styles.portfolioMeta}>
                            Location: {work.location} • Completed:{" "}
                            {new Date(work.completedOn).toLocaleDateString()}
                          </div>
                        </div>
                        <div className={styles.imageGallery}>
                          {work.images.slice(0, 3).map((img, j) => (
                            <img
                              key={j}
                              src={img}
                              alt={`${work.title} - Portfolio Work`}
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          ))}
                          {work.images.length > 3 && (
                            <div className={styles.moreImages}>
                              +{work.images.length - 3} more
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.message}>No portfolio items provided</p>
                )}
              </div>

              <div className={styles.buttonsContainer}>
                {!contractor.verified && (
                  <div className={styles.adminActions}>
                    <button
                      className={styles.acceptBtn}
                      onClick={() => handleAcceptContractor(contractor._id)}
                    >
                      Verify
                    </button>
                    <button
                      className={styles.rejectBtn}
                      onClick={() => handleRejectContractor(contractor._id)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminContractorVerification;
