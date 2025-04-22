import { FunctionComponent, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomerReviewCard from "../components/CustomerReviewCard";
import LoginPopup from "../components/LoginPopup";
import PropertyCard from "../components/PropertyCard";
import BuilderCard from "../components/BuilderCard";
import CardLayout from "../components/Insights";
import CityWiseReviews from "../components/CityWiseReviews";
import Upcoming from "../components/upcoming";
import EmergingLocalities from "../components/EmergingLocalities";
import Articles from "../components/Articles";
import ReviewForm from "../components/ReviewForm";
import PropertyTypeCarousel from "../components/PropertyTypeCarousel";
import SearchBar from "../components/SearchBar";
import AppointmentForm from "../components/AppointmentForm";
import { useSelector } from "react-redux";
import RecentSearch from "../components/RecentSearch";

const HomePage: FunctionComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);
  const [properties, setProperties] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const recentSearchCities = useSelector(
    (state: any) => state.search.recentSearchCities
  );

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const apiUrl = "http://localhost:8000/api/appointments";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
        }),
      });

      if (response.ok) {
        alert("Appointment booked successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setIsFormVisible(false); // Close the form after submission
      } else {
        throw new Error("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  const fetchProperties = async (query: string = "") => {
    try {
      const response = await fetch(`http://localhost:8000/api/allproperty`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const result = await response.json();
      setProperties(result);
    } catch (error) {
      console.log("Error fetching property cards:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=real%20estate&apiKey=24bcf6c46b474bec8c8e6a95e67f0cbe"
        );
        const data = await response.json();
        fetchArticles(data.articles[7]);
      } catch (error) {
        console.error("Error fetching the articles: ", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div
      className={
        isLoginPopupVisible
          ? `${styles.pageContainer} ${styles.blur}`
          : styles.pageContainer
      }
    >
      <Navbar
        onLoginClick={() => setIsLoginPopupVisible(true)}
        onSearch={fetchProperties}
      />
      <div className={styles.hero}>
        <div className={styles.search}>
          <SearchBar />
        </div>
      </div>
      <RecentSearch />
      <PropertyTypeCarousel />
      <section className={styles.popularProperties}>
        <div className={styles.heading}>POPULAR PROPERTIES</div>
        <div className={styles.listings}>
          {properties.slice(0, 4).map((property: any) => (
            <Link
              key={property._id}
              to={`/property-details-page/${property._id}`}
              className={styles.linkWrapper}
            >
              <PropertyCard
                title={property.title}
                bhk={property.Bhk}
                city={property.city}
                price={property.price.toString()}
                area={property.area.toString()}
              />
            </Link>
          ))}
        </div>
      </section>
      <section className={styles.popularBuilders}>
        <div className={styles.heading}>POPULAR BUILDERS</div>
        <div className={styles.listings}>
          {properties.slice(0, 1).map((builder: any) => (
            <Link key={builder._id} className={styles.linkWrapper}>
              <BuilderCard
                name="MV Kiran Sooraj"
                properties="1500+ Properties"
              />
              <BuilderCard name="Raj" properties="2000+ Properties" />
            </Link>
          ))}
        </div>
      </section>
      <Upcoming />
      <CityWiseReviews />

      <EmergingLocalities />

      <div
        id="insights"
        style={{
          padding: "0",
          margin: "0",
        }}
      >
        <CardLayout />
      </div>
      <div className={styles.happycustomers}>
        <div className={styles.heading}>HAPPY CUSTOMERS</div>
        <div className={styles.subheading}>HAPPY TRADE</div>
        <div className={styles.reviews}>
          <CustomerReviewCard
            imageUrl="./istockphoto1476170969170667a-1@2x.png"
            name="Raghav"
            review="I was blown away by the exceptional service I received from your website! The website was easy to navigate, and the real estate agents were knowledgeable and responsive. I found my dream home in no time, and the entire process was stress-free. I highly recommend this to anyone looking to buy or sell a property. Thanks a lot to the team of BasilAbode."
          />
          <CustomerReviewCard
            imageUrl="./istockphoto1476170969170667a-1@2x.png"
            name="Kishore"
            review="As a first-time homebuyer, I was nervous about the process, but this made it a breeze! The website's resources and guides were incredibly helpful, and the agents were patient and understanding. I found my dream home in no time, and the entire process was stress-free. I felt supported every step of the way, and I couldn't be happier with my new home."
          />
          <CustomerReviewCard
            imageUrl="./istockphoto1476170969170667a-1@2x.png"
            name="Ravi"
            review="I had a great experience using this real estate website. The search functionality was user-friendly, and the property listings were accurate and detailed. The customer support team was always available to assist me with any questions I had. I found the perfect property and closed the deal smoothly. I will definitely use this website again for future real estate needs!"
          />
        </div>
      </div>
      <Articles />
      <Footer />
      {isFormVisible && (
        <AppointmentForm onClose={() => setIsFormVisible(false)} />
      )}
      <div
        className={styles.fixedIcon}
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        Book an
        <br />
        Appointment
      </div>
    </div>
  );
};

export default HomePage;
