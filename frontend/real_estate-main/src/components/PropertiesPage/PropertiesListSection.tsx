import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PropertiesListCard from "./PropertiesListCard";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProperties } from "../../redux/SearchBox/SearchSlice";

const PropertiesListSection = ({ searchQuery, filterproperty }) => {
  const {
    noOfBedrooms,
    propertyType,
    withPhotos,
    expanded,
    amenities,
    availabilityStatus,
    budgetRange,
    area,
    reraApproved,
    verifiedProperties,
    postedBy,
    furnitureType,
    purchaseType,
    city,
    properties,
    isPropertyLoading,
  } = useSelector((store) => store.search);
  const dispatch = useDispatch();

  // Extract complex expressions
  const minPrice = budgetRange[0];
  const maxPrice = budgetRange[1];
  const minArea = area[0];
  const maxArea = area[1];
  // console.log("filterproperties");
  // console.log(filterproperty)
  // console.log("verifiedProperties")
  // console.log(verifiedProperties);
  if (searchQuery.type === "Apartments") {
    searchQuery.type = "Apartment";
  }
  if (
    searchQuery.type === "Independent House" ||
    searchQuery.type === "Independent Builder Floor"
  ) {
    searchQuery.type = "House";
  }
  useEffect(() => {
    const baseURL = import.meta.env.VITE_BACKEND_URL;
    const filters = {
      noOfBedrooms,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      City: city,
      PropertyType: propertyType,
      verifiedProperties,
      withPhotos,
      amenities,
      availabilityStatus,
      postedBy,
      furnitureType,
      purchaseType,
      searchproperties: filterproperty,
      url: `${baseURL}/api/propertyPurpose?query=${searchQuery.type}`,
      reraApproved,
    };

    dispatch(getFilteredProperties(filters));
  }, [
    verifiedProperties,
    noOfBedrooms,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    city,
    propertyType,
    withPhotos,
    amenities,
    availabilityStatus,
    postedBy,
    furnitureType,
    purchaseType,
    reraApproved,
    dispatch,
    searchQuery.type,
    filterproperty,
  ]);

  const propertiesReverse = [...properties].reverse();

  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        sx={{
          fontSize: "20px",
          lineHeight: "28px",
          fontWeight: 600,
          color: "#091E42",
          fontFamily: "Open Sans",
        }}
      >
        {propertiesReverse.length} results | Property for {searchQuery.type} in{" "}
        {city.address === undefined ? "India" : city.address}
      </Typography>

      {isPropertyLoading ? (
        <CircularProgress />
      ) : (
        propertiesReverse.map(
          (property) => (
            console.log(property),
            (
              <React.Fragment key={property._id}>
                <PropertiesListCard key={property._id} property={property} />
              </React.Fragment>
            )
          )
        )
      )}
    </Box>
  );
};

export default PropertiesListSection;
