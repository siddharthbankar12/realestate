import React from "react";
import styles from "./AdminContractorVerification.module.css";

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
  serviceType: string;
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
  return (
    <div className={styles.container}>
      {loading ? (
        <p className={styles.message}>Loading contractors...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : contractors.length === 0 ? (
        <p className={styles.message}>No contractors pending verification.</p>
      ) : (
        contractors.reverse().map((contractor) => (
          <div key={contractor._id} className={styles.card}>
            <div className={styles.titleRow}>
              <h2 className={styles.title}>{contractor.name}</h2>
              <span
                className={`${styles.status} ${
                  contractor.verified
                    ? styles.verified
                    : styles.pending
                }`}
              >
                {contractor.verified ? "Verified" : "Pending"}
              </span>
            </div>

            <div className={styles.infoGroup}>
              <span className={styles.label}>Service Type:</span>
              <span className={styles.value}>{contractor.serviceType}</span>

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

              <span className={styles.label}>Portfolio:</span>
              <ul className={styles.portfolioList}>
                {contractor.portfolio.map((work, i) => (
                  <li key={i}>
                    <strong>{work.title}</strong> - {work.description} <br />
                    Location: {work.location}, Completed:{" "}
                    {new Date(work.completedOn).toLocaleDateString()}
                    <div className={styles.imageGallery}>
                      {work.images.map((img, j) => (
                        <img key={j} src={img} alt="Portfolio Work" />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {!contractor.verified && (
              <div className={styles.buttons}>
                <button
                  className={styles.acceptBtn}
                  onClick={() => handleAcceptContractor(contractor._id)}
                >
                  Accept
                </button>
                <button
                  className={styles.rejectBtn}
                  onClick={() => handleRejectContractor(contractor._id)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminContractorVerification;
