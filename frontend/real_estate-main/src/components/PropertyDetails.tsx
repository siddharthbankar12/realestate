import { FunctionComponent, useEffect, useState } from "react";
import styles from "./PropertyDetails.module.css";
import ContactForm from "./ContactForm";
import ReviewPage from "./ReviewPage";
import ReviewForm from "../components/ReviewForm";
import priceHistoryChart from "../components/priceHistoryChart";
import PriceHistoryChart from "./priceHistoryChart";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";

export type PropertyDetailsType = {
  className?: string;
  property: {
    verification: boolean;
    title: string;
    area: number;
    Bhk: number;
    price: number;
    type: string;
    status: string;
    purpose: string;
    availability_status: string;
    balconies: number;
    bathrooms: number;
    floors: number;
    description: string;
    Propreiter_email: string;
    Propreiter_contact: string;
    Propreiter_name: string;
    city: string;
    location: string;
    landmark: string;
  };
};

const PropertyDetails: FunctionComponent<PropertyDetailsType> = ({
  property,
}) => {
  const token = localStorage.getItem("authToken");
  const [userId, setUserId] = useState("");

  const handleSaveProperty = async () => {
    try {
      if (!userId) {
        toast.warn("Please log in to save properties");
        return;
      }

      const response = await fetch(
        "http://localhost:8000/api/user-update/save-property",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            propertyId: property._id,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.message === "Property already saved") {
          toast.info("Property is already saved");
          // console.log(data.saveProperties);
        } else {
          toast.success("Property saved successfully");
        }
      } else {
        throw new Error(data.message || "Failed to save property");
      }
    } catch (error) {
      console.error("Error saving property", error);
      toast.error("Failed to save property");
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded, "token");
      setUserId(decoded._id);
    }
  }, [token]);

  console.log(userId);

  return (
    <>
      {console.log(property)}
      <section className={styles.Details}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div className={styles.name}>
              <div className={styles.propertyname}>
                {property.verification ? (
                  <img src="/verified.png" className={styles.verify} />
                ) : null}{" "}
                {property.title}
              </div>
              <div className={styles.details}>
                <i className="fa-solid fa-ruler-combined"></i> {property.area}{" "}
                Sqft. | <i className="fas fa-bed"></i> {property.Bhk} BHK |{" "}
                <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                {property.price}| <i className="fas fa-home"></i>{" "}
                {property.type} | {property.status} | {property.purpose}
              </div>
            </div>
            <div className={styles.ratingANDsave}>
              <div className={styles.ratings}>
                <div className={styles.stars}>
                  &#9733;&#9733;&#9733;&#9733;&#9734;
                </div>
                <div className={styles.reviews}>(951 Reviews)</div>
              </div>
              <button
                className={styles.saveProBtn}
                onClick={handleSaveProperty}
              >
                Save Property
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.Gallery}>
        <div className={styles.images}>
          <img
            className={styles.image}
            src="/web16-2@2x.png"
            alt="Gallery Image"
          />
          <img
            className={styles.image}
            src="/web18-3@2x.png"
            alt="Gallery Image"
          />
          <img
            className={styles.image}
            src="/web21-1@2x.png"
            alt="Gallery Image"
          />
          <img
            className={styles.image}
            src="/web19-1@2x.png"
            alt="Gallery Image"
          />
          <img
            className={styles.image}
            src="/web17-1@2x.png"
            alt="Gallery Image"
          />
          <img
            className={styles.image}
            src="/web20-1@2x.png"
            alt="Gallery Image"
          />
          <img
            className={styles.image}
            src="/web16-2@2x.png"
            alt="Gallery Image"
          />
          <img
            className={styles.image}
            src="/web18-3@2x.png"
            alt="Gallery Image"
          />
          <img
            className={styles.image}
            src="/web21-1@2x.png"
            alt="Gallery Image"
          />
          <img
            className={styles.image}
            src="/web19-1@2x.png"
            alt="Gallery Image"
          />
          <img
            className={styles.image}
            src="/web17-1@2x.png"
            alt="Gallery Image"
          />
          <img
            className={styles.image}
            src="/web20-1@2x.png"
            alt="Gallery Image"
          />
        </div>
      </section>

      <section className={styles.PropertyDetails}>
        <div className={styles.left}>
          <section className={styles.Description}>
            <div className={styles.heading}>Description</div>
            <div className={styles.describe}>
              <b>
                {property.availability_status}
                <br />
                {property.balconies
                  ? `${property.balconies} Balconies`
                  : null}{" "}
                |{" "}
                {property.bathrooms ? `${property.bathrooms} Bathrooms` : null}{" "}
                | {`${property.floors} Floors`}
                <br />
                {property.description}
              </b>
              <br />
              Welcome to our luxurious two-bedroom apartment, ideally situated
              in downtown's vibrant core. Boasting modern amenities,
              breathtaking city views facing east, and proximity to key
              landmarks such as Central Park and renowned dining spots. Perfect
              for discerning urbanites, offering convenience, culture, and a
              coveted lifestyle at your doorstep.
            </div>
          </section>

          <section className={styles.FacilitiesAmenities}>
            <div className={styles.heading}>Facilities and Amenities</div>
            <div className={styles.gridContainer}>
              <div className={styles.gridItem}>
                <img
                  className={styles.img}
                  src="/image-5@2x.png"
                  alt="Elevator"
                />
                <div className={styles.facilityamenity}>Elevator</div>
              </div>
              <div className={styles.gridItem}>
                <img
                  className={styles.img}
                  src="/image-61@2x.png"
                  alt="Library"
                />
                <div className={styles.facilityamenity}>Library</div>
              </div>
              <div className={styles.gridItem}>
                <img
                  className={styles.img}
                  src="/image-8@2x.png"
                  alt="Laundry Room"
                />
                <div className={styles.facilityamenity}>Laundry Room</div>
              </div>
              <div className={styles.gridItem}>
                <img
                  className={styles.img}
                  src="/image-11@2x.png"
                  alt="24/7 CCTV Surveillance"
                />
                <div className={styles.facilityamenity}>
                  24/7 CCTV Surveillance
                </div>
              </div>
              <div className={styles.gridItem}>
                <img
                  className={styles.img}
                  src="/image-7@2x.png"
                  alt="Reception"
                />
                <div className={styles.facilityamenity}>Reception</div>
              </div>
              <div className={styles.gridItem}>
                <img
                  className={styles.img}
                  src="/image-8@2x.png"
                  alt="Lorem, ipsum dolor."
                />
                <div className={styles.facilityamenity}>
                  Lorem, ipsum dolor.
                </div>
              </div>
              <div className={styles.gridItem}>
                <img
                  className={styles.img}
                  src="/image-9@2x.png"
                  alt="Wifi Connectivity"
                />
                <div className={styles.facilityamenity}>Wifi Connectivity</div>
              </div>
              <div className={styles.gridItem}>
                <img
                  className={styles.img}
                  src="/image-10@2x.png"
                  alt="Basketball Court"
                />
                <div className={styles.facilityamenity}>Basketball Court</div>
              </div>
            </div>
          </section>
        </div>
        <div className={styles.right}>
          <PriceHistoryChart />
          <ContactForm
            email={property.Propreiter_email}
            phone={property.Propreiter_contact}
            name={property.Propreiter_name}
          />
          <div className={styles.right1}>
            <ReviewForm />
          </div>
        </div>
      </section>

      <section className={styles.Location}>
        <div className={styles.heading}>Location</div>
        <div className={styles.address}>
          <img
            className={styles.mapicon}
            src="/image-13@2x.png"
            alt="Map Icon"
          />
          <div className={styles.location}>
            Address : {property.city} {property.location}
            <br />
            Landmark : {property.landmark}
          </div>
        </div>
        <iframe
          className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.3882263594105!2d88.34073987534423!3d22.56457877949738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02779ff7e5b9af%3A0x1d1b1884bdbbbd79!2sEden%20Gardens!5e0!3m2!1sen!2sin!4v1723799966301!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>

      {/* Add Review Page Section */}
      <section className={styles.ReviewPage}>
        <ReviewPage propertyId={property.id} />
      </section>
    </>
  );
};

export default PropertyDetails;
