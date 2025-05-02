import React from "react";
import styles from "./AdminPropertyVerification.module.css";

interface Property {
  _id: string;
  title: string;
  address: string;
  city: string;
  Bhk: string;
  area: number;
  type: string;
  purpose: string;
  price: number;
  description: string;
  amenities: string[];
  balconies: number;
  bathrooms: number;
  floors: string;
  Propreiter_name: string;
  Propreiter_email: string;
  Propreiter_contact: string;
  created_at: string;
  verification: string;
}

interface VerifyPropertiesFormProps {
  properties: Property[];
  loading: boolean;
  error: string | null;
  handleAcceptProperty: (id: string) => void;
  handleRejectProperty: (id: string) => void;
}

const VerifyPropertiesForm: React.FC<VerifyPropertiesFormProps> = ({
  properties,
  loading,
  error,
  handleAcceptProperty,
  handleRejectProperty,
}) => {
  return (
    <div className={styles.container}>
      {loading ? (
        <p className={styles.message}>Loading properties...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : properties.length === 0 ? (
        <p className={styles.message}>No properties pending verification.</p>
      ) : (
        properties.map((property) => (
          <div key={property._id} className={styles.card}>
            <div className={styles.titleRow}>
              <h2 className={styles.title}>{property.title}</h2>
              <span
                className={`${styles.status} ${
                  property.verification === "pending"
                    ? styles.pending
                    : property.verification === "verified"
                    ? styles.verified
                    : styles.rejected
                }`}
              >
                {property.verification}
              </span>
            </div>

            <div className={styles.infoGroup}>
              <span className={styles.label}>Location:</span>
              <span className={styles.value}>
                {property.address}, {property.city}
              </span>

              <span className={styles.label}>BHK:</span>
              <span className={styles.value}>{property.Bhk}</span>

              <span className={styles.label}>Area:</span>
              <span className={styles.value}>{property.area} sq.ft</span>

              <span className={styles.label}>Type:</span>
              <span className={styles.value}>{property.type}</span>

              <span className={styles.label}>Purpose:</span>
              <span className={styles.value}>{property.purpose}</span>

              <span className={styles.label}>Price:</span>
              <span className={styles.value}>₹{property.price}</span>

              <span className={styles.label}>Description:</span>
              <span className={styles.value}>{property.description}</span>

              <span className={styles.label}>Amenities:</span>
              <span className={styles.value}>
                {property.amenities.join(", ")}
              </span>

              <span className={styles.label}>Balconies:</span>
              <span className={styles.value}>{property.balconies}</span>

              <span className={styles.label}>Bathrooms:</span>
              <span className={styles.value}>{property.bathrooms}</span>

              <span className={styles.label}>Floors:</span>
              <span className={styles.value}>{property.floors}</span>

              <span className={styles.label}>Owner:</span>
              <span className={styles.value}>
                {property.Propreiter_name} | {property.Propreiter_email} |{" "}
                {property.Propreiter_contact}
              </span>

              <span className={styles.label}>Submitted:</span>
              <span className={styles.value}>
                {new Date(property.created_at).toLocaleString()}
              </span>
            </div>

            {property.verification === "pending" && (
              <div className={styles.buttons}>
                <button
                  className={styles.acceptBtn}
                  onClick={() => handleAcceptProperty(property._id)}
                >
                  Accept
                </button>
                <button
                  className={styles.rejectBtn}
                  onClick={() => handleRejectProperty(property._id)}
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

export default VerifyPropertiesForm;
