import { FunctionComponent, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // adjust as per your path
import Navbar from "../components/Navbar";
import SortAndFilter from "../components/SortAndFilter";
import PropertyCard from "../components/PropertyCard";
import styles from "./PropertyListingsPage.module.css";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Typography } from "@mui/material";

const PropertyListingsPage: FunctionComponent = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const {
    noOfBedrooms,
    budgetRange,
    propertyType,
    area,
    city,
    searchOption,
    isPropertyLoading,
    verifiedProperties,
  } = useSelector((store) => store.search);

  const fetchProperties = useCallback(
    async (city: string = "", query: string = "") => {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        if (city) params.append("city", city);
        if (query) params.append("query", query);
        if (noOfBedrooms.length > 0) {
          params.append("bedrooms", noOfBedrooms.join(","));
        }
        if (budgetRange.length === 2) {
          params.append("minBudget", budgetRange[0].toString());
          params.append("maxBudget", budgetRange[1].toString());
        }
        if (area.length === 2) {
          params.append("minArea", area[0].toString());
          params.append("maxArea", area[1].toString());
        }
        if (propertyType.length > 0) {
          params.append("propertyType", propertyType.join(","));
        }
        if (verifiedProperties) {
          params.append("verified", "true");
        }

        const response = await fetch(
          `http://localhost:8000/api/property?${params.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch properties: ${response.statusText}`);
        }

        const result = await response.json();

        if (Array.isArray(result) && result.length === 0) {
          toast.warn("No properties found. Try another city.", {
            autoClose: 5000,
          });
        } else {
          setProperties(result);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Error fetching properties. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    },
    [noOfBedrooms, budgetRange, area, propertyType, verifiedProperties]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query") || "";
    fetchProperties(city, query);
  }, [location.search, city, fetchProperties]);

  return (
    <div className={styles.propertyListingsPage}>
      <Navbar />
      <main className={styles.sortAndFilterParent}>
        <SortAndFilter />

        {loading ? (
          <div>Loading properties...</div>
        ) : (
          <div style={{ width: "100%" }}>
            <Typography
              sx={{
                fontSize: "20px",
                lineHeight: "28px",
                fontWeight: 600,
                color: "#091E42",
                fontFamily: "Open Sans",
                margin: "22px 0",
              }}
              className={styles.headDetail}
            >
              {properties.length} results | Property from "
              {city == "" ? "All Cities" : city}"{" "}
              {city.address === undefined ? "India" : city.address}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              {properties.map((property) => {
                const price = property.price ?? 0;
                const bhk = property.Bhk ?? property.bhk ?? 0;
                const propArea = property.area ?? 0;
                const type = property.type ?? "";

                // Redux filters
                const filters = {
                  minBudget: budgetRange[0],
                  maxBudget: budgetRange[1],
                  minArea: area[0],
                  maxArea: area[1],
                  bedrooms: noOfBedrooms,
                  types: propertyType,
                  city: city,
                };

                // Validation
                const isBudgetValid =
                  price >= filters.minBudget && price <= filters.maxBudget;
                const isAreaValid =
                  propArea >= filters.minArea && propArea <= filters.maxArea;
                const isBedroomValid =
                  filters.bedrooms.length === 0 ||
                  filters.bedrooms.includes(bhk);
                const isTypeValid =
                  filters.types.length === 0 || filters.types.includes(type);
                const isCityValid =
                  !filters.city ||
                  property.city?.toLowerCase() === filters.city.toLowerCase();

                const isMatch =
                  isBudgetValid &&
                  isAreaValid &&
                  isBedroomValid &&
                  isTypeValid &&
                  isCityValid;

                if (!isMatch) return null; // Skip property if it doesn't match

                return (
                  <div
                    key={property._id}
                    className={styles.propertyCardWrapper}
                  >
                    <Link
                      to={`/property-details-page/${property._id}`}
                      className={styles.linkWrapper}
                    >
                      <PropertyCard
                        title={property.title}
                        city={property.city}
                        price={price.toString()}
                        area={propArea.toString()}
                        bhk={bhk}
                      />
                    </Link>
                  </div>
                );
              })}
            </Box>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PropertyListingsPage;
