import { FunctionComponent, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import LottieAnimation from "../components/LottieAnimation";
import Navbar from "../components/Navbar";
import styles from "./UserPreviouslyViewed.module.css";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

interface Property {
  _id: string;
  propertyId: string;
  Bhk: number;
  Propreiter_contact: string;
  Propreiter_email: string;
  Propreiter_name: string;
  address: string;
  amenities: string[];
  area: number;
  availability_status: string;
  balconies: number;
  bathrooms: number;
  city: string;
  created_at: string;
  description: string;
  floors: string;
  images: string[];
  landmark: string;
  price: number;
  purpose: string;
  status: string;
  title: string;
  type: string;
  verification: string;
}

const UserPreviouslyViewed: FunctionComponent = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  useEffect(() => {
    const fetchPreviouslyViewed = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No token found");

        const decoded: any = jwtDecode(token);
        const userId = decoded?._id;
        if (!userId) throw new Error("User ID not found in token");

        const res = await fetch(
          `http://localhost:8000/api/user-update/previous-view`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          }
        );
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setProperties(data.previousView);
      } catch (error) {
        console.error("Failed to fetch previously viewed properties:", error);
      }
    };

    fetchPreviouslyViewed();
  }, []);

  const openPropertyDetails = (property: Property) => {
    setSelectedProperty(property);
  };

  const closePropertyDetails = () => {
    setSelectedProperty(null);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <section className={styles.contentArea}>
        <Sidebar currentPage="user-previously-viewed0" />
        <div className={styles.propertyList}>
          {properties.length === 0 ? (
            <div className={styles.emptySection}>
              <LottieAnimation
                animationLink="https://lottie.host/fc9fb0d0-1766-4e25-8483-ba9f9fa545f6/rNwcjg5a6Q.json"
                style={{ width: "300px", height: "auto", margin: "0 auto" }}
              />
              <p className={styles.emptyMessage}>
                You haven’t viewed anything yet
              </p>
              <p className={styles.emptyMessage}>
                All the properties and projects that you have viewed will start
                appearing here. Search or explore cities now.
              </p>
            </div>
          ) : (
            <ul className={styles.propertyGrid}>
              {properties.map((item) => {
                const property = item.propertyId || item;
                return (
                  <li
                    key={property._id}
                    className={styles.propertyCard}
                    onClick={() => openPropertyDetails(property)}
                  >
                    <div className={styles.cardImageWrapper}>
                      <img
                        src={"./web19-1@2x.png"}
                        alt={property.title}
                        className={styles.cardImage}
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>{property.title}</h3>
                        <span className={styles.cardPrice}>
                          ₹{property.price.toLocaleString()}
                        </span>
                      </div>
                      <p className={styles.cardLocation}>{property.city}</p>
                      <p className={styles.cardDetails}>
                        🛏️ {property.Bhk} BHK • 🛁 {property.bathrooms} Bath •
                        📐 {property.area} sqft
                      </p>
                      <p className={styles.cardDesc}>
                        {property.description
                          ? `${property.description.slice(0, 80)}...`
                          : "No description provided."}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
      {selectedProperty && (
        <div className={styles.propertyPopupOverlay}>
          <div className={styles.propertyPopupContent}>
            <h2>{selectedProperty.title}</h2>
            <p>{selectedProperty.description}</p>
            <p>
              <strong>City:</strong> {selectedProperty.city}
            </p>
            <p>
              <strong>Price:</strong> ₹{selectedProperty.price}
            </p>
            <p>
              <strong>BHK:</strong> {selectedProperty.Bhk}
            </p>
            <p>
              <strong>Type:</strong> {selectedProperty.type}
            </p>
            <p>
              <strong>Status:</strong> {selectedProperty.status}
            </p>
            <div className={styles.closeView}>
              <Link
                to={`/property-details-page/${selectedProperty._id}`}
                className={styles.viewDetailLink}
              >
                View Details
              </Link>
              <button
                className={styles.closeButton}
                onClick={closePropertyDetails}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPreviouslyViewed;
