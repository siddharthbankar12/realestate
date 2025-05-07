import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LottieAnimation from "../components/LottieAnimation";
import styles from "./UserPreviouslySaved.module.css";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

interface Property {
  _id: string;
  title: string;
  location: string;
  price: number;
  images?: string[];
  type: string;
  city: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  status: string;
}

interface SavedProperty {
  propertyId: Property;
  _id: string;
}

const UserPreviouslySaved: FunctionComponent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [userId, setUserId] = useState("");
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);

  useEffect(() => {
    if (token) {
      const decoded: any = jwtDecode(token);
      setUserId(decoded._id);
    }
  }, [token]);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      if (!userId) return;

      try {
        const res = await fetch(
          `http://localhost:8000/api/user-update/${userId}/saved-properties`
        );
        const data = await res.json();
        setSavedProperties(data.saveProperties || []);
      } catch (error) {
        console.error("Failed to fetch saved properties", error);
      }
    };

    fetchSavedProperties();
  }, [userId]);

  const handleRemove = async (propertyId: string) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/user-update/${userId}/remove-saved-property/${propertyId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (res.ok) {
        setSavedProperties((prev) =>
          prev.filter((item) => item.propertyId._id !== propertyId)
        );
        toast.success(data.message || "Property removed successfully!");
      } else {
        toast.error(data.message || "Failed to remove property");
      }
    } catch (error) {
      console.error("Failed to remove property", error);
      toast.error("An error occurred. Try again.");
    }
  };

  const handleViewDetails = (propertyId: string) => {
    navigate(`/property-details-page/${propertyId}`);
  };

  return (
    <div className={styles["ups-container"]}>
      <Navbar />
      <main className={styles["ups-mainLayout"]}>
        <Sidebar
          currentPage="user-previously-saved0"
          sidebarMarginLeft="unset"
          profileSettingsColor="#000"
          profileSettingsFontWeight="unset"
          myPropertiesColor="#784dc6"
          myPropertiesFontWeight="bold"
        />

        <div className={styles["ups-content"]}>
          {savedProperties.length > 0 ? (
            <>
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: "600",
                  margin: "20px auto",
                }}
              >
                Saved Properties
              </p>
              <div className={styles["ups-grid"]}>
                {savedProperties.map((item) => (
                  <div key={item.propertyId._id} className={styles["ups-card"]}>
                    <div className={styles["ups-imageWrapper"]}>
                      <img
                        src={item.propertyId.images?.[0] || "./web17-1@2x.png"}
                        alt={item.propertyId.title}
                        className={styles["ups-image"]}
                      />
                      <span className={styles["ups-tag"]}>
                        {item.propertyId.type}
                      </span>
                    </div>
                    <div className={styles["ups-details"]}>
                      <div style={{ display: "flex" }}>
                        <h3>{item.propertyId.title}</h3>
                        <p className={styles["ups-location"]}>
                          {item.propertyId.location}, {item.propertyId.city}
                        </p>
                      </div>
                      <div className={styles["ups-meta"]}>
                        <span>₹ {item.propertyId.price.toLocaleString()}</span>
                        <span className={styles["ups-status"]}>
                          {item.propertyId.status}
                        </span>
                      </div>
                      <div className={styles["ups-stats"]}>
                        <span>{item.propertyId.bedrooms || 0} Beds</span> |{" "}
                        <span>{item.propertyId.bathrooms || 0} Baths</span> |{" "}
                        <span>{item.propertyId.area} sqft</span>
                      </div>
                      <div className={styles["ups-actions"]}>
                        <button
                          onClick={() => handleViewDetails(item.propertyId._id)}
                          className={styles["ups-viewBtn"]}
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleRemove(item.propertyId._id)}
                          className={styles["ups-removeBtn"]}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles["ups-emptyState"]}>
              <LottieAnimation
                animationLink="https://lottie.host/69e157cb-db54-4f03-b411-e105a2b76125/2bWLBAXZpM.json"
                style={{ width: 400, height: 320 }}
              />
              <h2 className={styles["ups-emptyTitle"]}>
                You haven’t saved any property lately!
              </h2>
              <p className={styles["ups-emptySubtitle"]}>
                All the properties and projects that you have saved will start
                appearing here. Start exploring your dream home now.
              </p>
              <div>
                <button
                  className={styles["ups-exploreBtn"]}
                  onClick={() => navigate("/SearchPropertiesNavbar")}
                >
                  Explore Properties
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserPreviouslySaved;
