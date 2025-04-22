import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PropertiesListCard from "./PropertiesListCard";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProperties } from "../../redux/SearchBox/SearchSlice";

const SearchSection = ({ searchCity, filterproperty }) => {
  const {
    noOfBedrooms,
    budgetRange,
    propertyType,
    area,
    city,
    properties,
    searchOption,
    isPropertyLoading,
    verifiedProperties,
  } = useSelector((store) => store.search);
  const dispatch = useDispatch();

  // Extract complex expressions
  const minPrice = budgetRange[0];
  const maxPrice = budgetRange[1];
  const minArea = area[0];
  const maxArea = area[1];
  console.log("filterproperties");
  console.log(filterproperty);
  console.log(searchCity);
  useEffect(() => {
    const filters = {
      noOfBedrooms,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      City: city === "All" ? "" : city,
      PropertyType: propertyType,
      verifiedProperties,
      url: "",
      searchproperties: filterproperty,
    };
    dispatch(getFilteredProperties(filters));
  }, [
    dispatch,
    filterproperty,
    verifiedProperties,
    noOfBedrooms,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    city,
    propertyType,
  ]);

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
        {properties.length} results | Property for "
        {city === "All" || city === "" ? " All Cities " : city}" from
        {city.address === undefined ? " India" : city.address}
      </Typography>

      {isPropertyLoading ? (
        <CircularProgress />
      ) : (
        properties.map((property) => (
          <React.Fragment key={property._id}>
            <PropertiesListCard key={property._id} property={property} />
          </React.Fragment>
        ))
      )}
    </Box>
  );
};

export default SearchSection;
