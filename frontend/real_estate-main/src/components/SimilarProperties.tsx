// import { FunctionComponent, useCallback, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import PropertyCard from "../components/PropertyCard";
// import styles from "./SimilarProperties.module.css";

// const SimilarProperties: FunctionComponent = () => {
//     const [properties, setProperties] = useState([]);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProperties = async () => {
//             try {
//                 const response = await fetch("http://localhost:8000/api/property", {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": 'application/json'
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error("Failed to fetch properties");
//                 }

//                 const result = await response.json();
//                 setProperties(result);
//             }
//             catch (error) {
//                 console.log("Error came when fetching property cards" ,error);
//             }
//         };

//     fetchProperties();
//     }, [properties]);

//     const onRentTextClick = useCallback(() => {
//         navigate("/rent");
//     }, [navigate]);

//     const onSellTextClick = useCallback(() => {
//         navigate("/sell");
//     }, [navigate]);

//     const onPropertyCardContainerClick = useCallback(() => {
//         navigate("/property-details-page");
//     }, [navigate]);

//     return (
//         <section className={styles.SimilarProperties}>
//             <div className={styles.heading}>Similar Properties</div>
//             <div className={styles.similarlistings}>
//                 {properties.map(property => (
//                     <PropertyCard
//                         key={property._id}
//                         title={property.title}
//                         city={property.city}
//                         price={property.price}
//                         area={property.area}
//                     />
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default SimilarProperties;

import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import styles from "./SimilarProperties.module.css";

const SimilarProperties: FunctionComponent = () => {
  const [properties, setProperties] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/allproperty", {
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
        console.log("Error came when fetching property cards", error);
      }
    };

    fetchProperties();
  }, []);

  const onRentTextClick = useCallback(() => {
    navigate("/rent");
  }, [navigate]);

  const onSellTextClick = useCallback(() => {
    navigate("/sell");
  }, [navigate]);

  const onPropertyCardContainerClick = useCallback(() => {
    navigate("/property-details-page");
  }, [navigate]);

  const handleLoadMoreClick = () => {
    setShowAll(true);
  };

  return (
    <section className={styles.SimilarProperties}>
      <div className={styles.heading}>Similar Properties</div>
      <div className={styles.similarlistings}>
        {properties
          .slice(0, showAll ? properties.length : 4)
          .map((property) => (
            <Link
              key={property._id}
              to={`/property-details-page/${property._id}`} // Fixed string interpolation with backticks
              className={styles.linkWrapper} // Add any necessary styles for the Link
            >
              <PropertyCard
                title={property.title}
                city={property.city}
                price={property.price.toString()} // Ensure price is converted to string if necessary
                area={property.area.toString()} // Ensure area is converted to string if necessary
              />
            </Link>
          ))}
      </div>
      {!showAll && (
        <button className={styles.loadMoreButton} onClick={handleLoadMoreClick}>
          Load More
        </button>
      )}
    </section>
  );
};

export default SimilarProperties;
