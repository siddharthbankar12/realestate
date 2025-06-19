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
    _id: string;
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
  const [loanOffers, setLoanOffers] = useState([]);
  const [loadingLoanOffers, setLoadingLoanOffers] = useState(false);
  const [selectedLoanAmount, setSelectedLoanAmount] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [showAllOffers, setShowAllOffers] = useState(false);

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

  const fetchLoanOffers = async () => {
    if (!property._id) return;
    
    setLoadingLoanOffers(true);
    try {
      let url = `http://localhost:8000/api/banking-partners/loan-options/${property._id}`;
      const params = new URLSearchParams();
      
      if (selectedLoanAmount) {
        params.append('loanAmount', selectedLoanAmount);
      }
      if (monthlyIncome) {
        params.append('monthlyIncome', monthlyIncome);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setLoanOffers(data.loanOffers || []);
      } else {
        console.error("Error fetching loan offers:", data.message);
      }
    } catch (error) {
      console.error("Error fetching loan offers", error);
    } finally {
      setLoadingLoanOffers(false);
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
    fetchLoanOffers();
  }, [token, property._id]);

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

  const handleLoanFilterChange = () => {
    fetchLoanOffers();
  };

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

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
        </div>

        <div className={styles.right}>
          {/* Banking Partners Section with Scrollable Loan Offers */}
          <section className={styles.bankingSection} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9', marginTop: '20px' , minHeight:'900px' }}>
            <div className={styles.heading} style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
              🏦 Loan Options Available
            </div>
            
            {/* Loan Filter Inputs */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="number"
                  placeholder="Desired loan amount"
                  value={selectedLoanAmount}
                  onChange={(e) => setSelectedLoanAmount(e.target.value)}
                  style={{ 
                    flex: 1, 
                    padding: '8px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                <input
                  type="number"
                  placeholder="Monthly income"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  style={{ 
                    flex: 1, 
                    padding: '8px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <button
                onClick={handleLoanFilterChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Get Personalized Offers
              </button>
            </div>

            {loadingLoanOffers ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div>Loading loan offers...</div>
              </div>
            ) : loanOffers.length > 0 ? (
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                  {loanOffers.length} loan offers available
                </div>
                
                {/* Scrollable container for loan offers */}
                <div style={{ 
                  maxHeight: '800px', 
                  overflowY: 'auto',
                  paddingRight: '5px'
                }}>
                  {loanOffers.map((offer, index) => (
                    <div key={index} style={{ 
                      marginBottom: '15px', 
                      padding: '15px', 
                      border: '1px solid #e0e0e0', 
                      borderRadius: '6px',
                      backgroundColor: 'white'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                          {offer.bankName}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ color: '#ffa500' }}>★</span>
                          <span style={{ fontSize: '14px' }}>{offer.bankRating}/5</span>
                        </div>
                      </div>
                      
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                        {offer.productName} - {offer.productType.replace('_', ' ').toUpperCase()}
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                        <div>
                          <div style={{ fontSize: '12px', color: '#888' }}>Max Loan Amount</div>
                          <div style={{ fontWeight: 'bold', color: '#28a745' }}>
                            {formatCurrency(offer.maxLoanAmount)}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', color: '#888' }}>Interest Rate</div>
                          <div style={{ fontWeight: 'bold', color: '#007bff' }}>
                            {offer.interestRate}% p.a.
                          </div>
                        </div>
                      </div>

                      {offer.emiOptions && offer.emiOptions.length > 0 && (
                        <div style={{ marginBottom: '10px' }}>
                          <div style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>EMI Options</div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {offer.emiOptions.slice(0, 3).map((emi, emiIndex) => (
                              <div key={emiIndex} style={{ 
                                fontSize: '12px', 
                                padding: '4px 8px', 
                                backgroundColor: '#f0f8ff', 
                                borderRadius: '4px',
                                border: '1px solid #cce7ff'
                              }}>
                                {emi.tenure}yr: {formatCurrency(emi.emi)}/mo
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {offer.processingFee > 0 && (
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          Processing Fee: {formatCurrency(offer.processingFee)}
                        </div>
                      )}

                      {offer.specialOffers && offer.specialOffers.length > 0 && (
                        <div style={{ 
                          marginTop: '8px', 
                          padding: '6px 8px', 
                          backgroundColor: '#fff3cd', 
                          borderRadius: '4px',
                          fontSize: '12px',
                          color: '#856404'
                        }}>
                          🎉 {offer.specialOffers[0].offerName}: {offer.specialOffers[0].description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                <div>🏦</div>
                <div style={{ marginTop: '8px', fontSize: '14px' }}>
                  No loan offers available for this property at the moment.
                </div>
              </div>
            )}
          </section>
        </div>
      </section>

      {/* Review and Contact sections side by side */}
      <section style={{ 
        display: 'flex', 
        gap: '20px', 
        margin: '20px 0',
        alignItems: 'flex-start'
      }}>
        <div style={{ flex: 1 }}>
          <ContactForm
            userId={userId}
            phone={property.Propreiter_contact}
            propertyId={property._id}
          />
        </div>
        <div style={{ flex: 1 }}>
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