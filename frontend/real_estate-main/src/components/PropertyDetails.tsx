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
    user_id?: string;
    title: string;
    description: string;
    address: string;
    city: string;

    price: number;
    Bhk: number;
    area: number;
    type: string;
    status: string;
    purpose: string;
    amenities: string[];
    created_at: string;
    images: string[];
    balconies: number;
    bathrooms: number;
    verification: string;
    landmark?: string;
    floors?: string;
    availabilityStatus?: string;
    other_rooms: {
      studyRoom?: boolean;
      poojaRoom?: boolean;
      servantRoom?: boolean;
      storeRoom?: boolean;
    };
    Propreiter_name?: string;
    Propreiter_email?: string;
    Propreiter_contact?: string;
    priceNegotiable?: boolean;
    allInclusivePrice?: boolean;
    taxAndGovtChargesExcluded?: boolean;
  };
};

const PropertyDetails: FunctionComponent<PropertyDetailsType> = ({
  property,
}) => {
  const token = localStorage.getItem("authToken");
  const [userId, setUserId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const toTitleCase = (str: string = "") =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

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
        if (data.message === "Property unsaved successfully") {
          toast.info("Property removed from saved list");
          setIsSaved(false);
        } else if (data.message === "Property saved successfully") {
          toast.success("Property saved successfully");
          setIsSaved(true);
        }
      } else {
        throw new Error(data.message || "Failed to update saved property");
      }
    } catch (error) {
      console.error("Error saving property", error);
      toast.error("Failed to save property");
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/reviews/single-property-reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId: property?._id,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setReviews(data.reviews || []);
      }
    } catch (error) {
      console.error("Error fetch reviews of property", error);
      toast.error("Failed to save property");
    }
  };

  const getAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / reviews.length;
  };

  const averageRating = getAverageRating(reviews);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded, "token");
      setUserId(decoded._id);
    }
    fetchReviews();
  }, [token]);

  useEffect(() => {
    const checkIfSaved = async () => {
      if (!userId || !property?._id) return;

      try {
        const response = await fetch(
          "http://localhost:8000/api/user-update/is-property-saved",
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
        setIsSaved(data.isSaved);
      } catch (error) {
        console.error("Failed to check saved status", error);
      }
    };

    checkIfSaved();
  }, [userId, property._id]);

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
                {property.price} | <i className="fas fa-home"></i>{" "}
                {property.type} | {toTitleCase(property.status)} |{" "}
                {property.purpose}
              </div>
            </div>
            <div className={styles.ratingANDsave}>
              <div className={styles.ratings}>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>
                      {averageRating >= star
                        ? "★"
                        : averageRating >= star - 0.5
                        ? "☆"
                        : "☆"}
                    </span>
                  ))}
                </div>

                <div className={styles.reviews}>({reviews.length} Reviews)</div>
              </div>
              <button
                className={styles.saveProBtn}
                onClick={handleSaveProperty}
              >
                {isSaved ? "Unsave Property" : "Save Property"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.Gallery}>
        <div className={styles.images}>
          {property.images.map((url, idx) => (
            <img className={styles.image} key={idx} src={url} alt={url} />
          ))}
        </div>
      </section>

      <section className={styles.PropertyDetails}>
        <div className={styles.left}>
          <section className={styles.Description}>
            <div className={styles.heading}>Description</div>
            <div className={styles.describe}>
              <b>
                -{" "}
                {property.availabilityStatus && (
                  <>
                    {property.availabilityStatus}
                    <br />
                  </>
                )}
                -{" "}
                {property.balconies !== undefined &&
                  `${property.balconies} ${
                    property.balconies === 1 ? "Balcony" : "Balconies"
                  } `}
                {property.bathrooms !== undefined &&
                  `| ${property.bathrooms} ${
                    property.bathrooms === 1 ? "Bathroom" : "Bathrooms"
                  } `}
                {property.floors &&
                  `| ${property.floors} ${
                    +property.floors === 1 ? "Floor" : "Floors"
                  }`}
                {property.price !== undefined &&
                  ` | ₹${property.price.toLocaleString("en-IN")}`}
                <br />- {property.description}
              </b>
              <br />
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

          <PriceHistoryChart />

          {/* {property.amenities?.length > 0 && (
            <section className={styles.FacilitiesAmenities}>
              <div className={styles.heading}>Facilities and Amenities</div>
              <div className={styles.gridContainer}>
                {property.amenities.map((amenity, index) => {
                  return (
                    <div key={index} className={styles.gridItem}>
                      <div className={styles.facilityamenity}>{amenity}</div>
                    </div>
                  );
                })}
              </div>
            </section>
          )} */}
        </div>

        <div className={styles.right}>
          <ContactForm
            userId={userId}
            phone={property.Propreiter_contact}
            propertyId={property._id}
          />

          <ReviewForm propertyId={property._id} />
        </div>
      </section>

      <section className={styles.ReviewPage}>
        <ReviewPage reviewsProperty={reviews} />
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
            Address : {toTitleCase(property.address)}
            <br />
            City : {toTitleCase(property.city)}
            <br />
            Landmark : {toTitleCase(property.landmark || "")}
          </div>
        </div>

        <iframe
          className={styles.map}
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            `${property.landmark || ""} ${property.city}`
          )}&output=embed`}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>
    </>
  );
};

export default PropertyDetails;
