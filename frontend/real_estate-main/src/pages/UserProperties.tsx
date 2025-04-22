import { FunctionComponent, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./UserProperties.module.css";
import LottieAnimation from "../components/LottieAnimation";
import Navbar from "../components/Navbar";
import BuilderPropertyCard from "../components/BuilderPropertyCard";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserProperties: FunctionComponent = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalHosted: 0,
    totalSoldOrRented: 0,
    availableProperties: 0,
  });

  let token = localStorage.getItem("authToken");
  const decoded: any = jwtDecode(token);
  const email = decoded.email;

  const fetchProperties = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/property-user/${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const result = await response.json();
      setProperties(result.data);

      // Assuming your backend provides these statistics in the response
      setStats({
        totalHosted: result.stats.totalHosted,
        totalSoldOrRented: result.stats.totalSoldOrRented,
        availableProperties: result.stats.availableProperties,
      });
    } catch (error) {
      console.log("Error fetching property cards:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className={styles.userProperties0}>
      <Navbar />

      <main className={styles.sidebarContainer}>
        <div>
          <Sidebar
            className={styles.sidebar1}
            currentPage="user-properties0"
            sidebarMarginLeft="unset"
            profileSettingsColor="#000"
            profileSettingsFontWeight="unset"
            myPropertiesColor="#784dc6"
            myPropertiesFontWeight="bold"
          />
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <h3>Total Properties Hosted</h3>
            <p>{stats.totalHosted}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Properties Sold/Rented</h3>
            <p>{stats.totalSoldOrRented}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Available Properties</h3>
            <p>{stats.availableProperties}</p>
          </div>
        </div>
      </main>
      {properties.length > 0 ? (
        <div style={{ display: "flex", paddingRight: "2em" }}>
          <div className={styles.popularfeatures}>
            <section className={styles.popularProperties}>
              <div className={styles.listings}>
                {properties.map((property) => (
                  <div key={property._id}>
                    <BuilderPropertyCard
                      title={property.title}
                      city={property.city}
                      price={property.price.toString()}
                      area={property.area.toString()}
                      pid={property._id}
                    />
                    <Link
                      to={`/property-details-page/${property._id}`}
                      className={styles.viewDetailsLink}
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className={styles.emptyStateIllustration}>
          <div className={styles.emptyState}>
            <div className={styles.illustrationContainer}>
              <LottieAnimation
                animationLink="https://lottie.host/fc9fb0d0-1766-4e25-8483-ba9f9fa545f6/rNwcjg5a6Q.json"
                style={{ width: 500, height: 400 }}
              />
            </div>
            <div className={styles.emptyStateMessage}>
              <div className={styles.youHaventBought}>
                You haven’t bought or sold any property yet!
              </div>
            </div>
            <div className={styles.allTheProperties}>
              All the properties and projects that you have bought or sold will
              start appearing here. Search or explore cities now.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProperties;
