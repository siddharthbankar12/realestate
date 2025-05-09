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
  let email = "";

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      email = decoded.email;
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  console.log(properties);

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

      if (!response.ok) throw new Error("Failed to fetch properties");

      const result = await response.json();
      setProperties(result.data);

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
    <div className={styles.userProperties}>
      <Navbar />

      <main className={styles.mainContainer}>
        <Sidebar
          currentPage="user-properties0"
          sidebarMarginLeft="unset"
          profileSettingsColor="#000"
          profileSettingsFontWeight="unset"
          myPropertiesColor="#784dc6"
          myPropertiesFontWeight="bold"
        />

        <div className={styles.content}>
          {properties.length > 0 ? (
            <>
              <div className={styles.statsContainer}>
                <div className={styles.statCard}>
                  <h3>Total Properties Hosted</h3>
                  <p>{stats.totalHosted}</p>
                </div>
                <div className={styles.statCard}>
                  <h3>Total Properties Sold / Rented</h3>
                  <p>{stats.totalSoldOrRented}</p>
                </div>
                <div className={styles.statCard}>
                  <h3>Available Properties</h3>
                  <p>{stats.availableProperties}</p>
                </div>
              </div>

              <div className={styles.propertiesGrid}>
                {properties.map((property) => (
                  <div key={property._id} className={styles.cardWrapper}>
                    <BuilderPropertyCard
                      title={property.title}
                      city={property.city}
                      price={property.price.toString()}
                      area={property.area.toString()}
                      pid={property._id}
                      imageUrl={property.image}
                      onSoldUpdate={fetchProperties}
                      status={property.status}
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
            </>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.lottieWrapper}>
                <LottieAnimation
                  animationLink="https://lottie.host/fc9fb0d0-1766-4e25-8483-ba9f9fa545f6/rNwcjg5a6Q.json"
                  style={{ width: 400, height: 350 }}
                />
              </div>
              <h2>You haven’t bought or sold any property yet!</h2>
              <p>
                All the properties and projects that you have bought or sold
                will start appearing here. Search or explore cities now.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserProperties;
