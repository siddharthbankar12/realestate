import {
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Switch,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import CityDropdown from "../../redux/SearchBox/CityDropDown.jsx"; // Import CityDropdown
import {
  handleChange,
  handleWithPhotos,
  handleAmenities,
  handleConstructionStatus,
  handleArea,
  handleBudgetRange,
  handleNoOfBedrooms,
  handlePropertyType,
  handleReraApproved,
  handleVerifiedProperties,
  handlePostedBy,
  handleFurnitureType,
  handlePurchaseType,
  handleCity, // Import handleCity action
} from "../../redux/SearchBox/SearchSlice";

const noOfBedroomsList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const propertyTypeList = ["House", "Apartment", "Plot"];
const amenitiesList = ["Gym", "Swimming Pool", "Garden", "Play Area"];
const constructionStatusList = [
  "Under Construction",
  "Ready to Move",
  "New Launch",
];
const postedByList = ["Owner", "Agent", "Builder"];
const furnitureTypeList = ["Furnished", "Semi-Furnished", "Unfurnished"];
const purchaseTypeList = ["New", "Resale"];

const FiltersSection = () => {
  const {
    noOfBedrooms,
    propertyType,
    withPhotos,
    expanded,
    amenities,
    constructionStatus,
    budgetRange,
    area,
    reraApproved,
    verifiedProperties,
    postedBy,
    furnitureType,
    purchaseType,
    city, // Add city from Redux
  } = useSelector((store) => store.search);
  const dispatch = useDispatch();

  console.log(city);

  const handleSliderChange = (name, newValue) => {
    if (name === "budgetRange") {
      dispatch(handleBudgetRange(newValue));
    } else if (name === "area") {
      dispatch(handleArea(newValue));
    }
  };

  // Update filters on city selection change
  const handleCityChange = (city) => {
    dispatch(handleCity(city));
  };

  return (
    <Paper variant="outlined" sx={{ padding: "8px 12px", borderRadius: 4 }}>
      <Accordion
        expanded={expanded.includes("panel1")}
        onChange={() => dispatch(handleChange("panel1"))}
        elevation={0}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography style={{ fontWeight: "bold" }}>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <FormControlLabel
              sx={{ marginLeft: "5px" }}
              control={
                <Switch
                  checked={verifiedProperties}
                  onChange={() => dispatch(handleVerifiedProperties())}
                />
              }
              label="Verified Properties"
            />
            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{
                  color: "#091E42",
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontWeight: 600,
                  fontFamily: "var(--font-montserrat)",
                  mb: 1,
                }}
              >
                City
              </Typography>
              <CityDropdown
                selectedCity={city}
                onCityChange={handleCityChange}
              />
            </Box>
            <Accordion
              expanded={expanded.includes("panel1") ? true : false}
              onChange={() => dispatch(handleChange("panel1"))}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{
                    color: "#091E42",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  No. of Bedrooms
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "grid",
                  gap: 1,
                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                {noOfBedroomsList.map((room, idx) => (
                  <Chip
                    key={idx}
                    label={`${room} BHK`}
                    disableRipple
                    variant={"outlined"}
                    icon={
                      noOfBedrooms.includes(room) ? <DoneIcon /> : <AddIcon />
                    }
                    onClick={() => dispatch(handleNoOfBedrooms(room))}
                    sx={{
                      color: noOfBedrooms.includes(room) ? "#000" : "#42526E",
                      backgroundColor: noOfBedrooms.includes(room)
                        ? "#f0f9ff"
                        : "#fff",
                      borderColor: noOfBedrooms.includes(room)
                        ? "#a3daff"
                        : "#42526E",
                      fontWeight: noOfBedrooms.includes(room) ? 600 : 400,
                      "& .MuiChip-icon": {
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "14px",
                        color: noOfBedrooms.includes(room)
                          ? "#0078db"
                          : "#42526E",
                      },
                    }}
                  />
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded.includes("panel2") ? true : false}
              onChange={() => dispatch(handleChange("panel2"))}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{
                    color: "#091E42",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  Type of Property
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "grid",
                  gap: 1,
                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                {propertyTypeList.map((type, idx) => (
                  <Chip
                    key={idx}
                    label={type}
                    disableRipple
                    variant={"outlined"}
                    icon={
                      propertyType.includes(type) ? <DoneIcon /> : <AddIcon />
                    }
                    onClick={() => dispatch(handlePropertyType(type))}
                    sx={{
                      color: propertyType.includes(type) ? "#000" : "#42526E",
                      backgroundColor: propertyType.includes(type)
                        ? "#f0f9ff"
                        : "#fff",
                      borderColor: propertyType.includes(type)
                        ? "#a3daff"
                        : "#42526E",
                      fontWeight: propertyType.includes(type) ? 600 : 400,
                      "& .MuiChip-icon": {
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "14px",
                        color: propertyType.includes(type)
                          ? "#0078db"
                          : "#42526E",
                      },
                      mb: 1,
                    }}
                  />
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded.includes("panel3") ? true : false}
              onChange={() => dispatch(handleChange("panel3"))}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{
                    color: "#091E42",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  Budget Range
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Slider
                  value={budgetRange}
                  onChange={(e, newValue) =>
                    handleSliderChange("budgetRange", newValue)
                  }
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
                  min={0}
                  max={20000000}
                  step={1000}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded.includes("panel4") ? true : false}
              onChange={() => dispatch(handleChange("panel4"))}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel4a-header"
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{
                    color: "#091E42",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  Area
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Slider
                  value={area}
                  onChange={(e, newValue) =>
                    handleSliderChange("area", newValue)
                  }
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) =>
                    `${value.toLocaleString()} acers`
                  }
                  min={0}
                  max={4000}
                  step={10}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded.includes("panel5") ? true : false}
              onChange={() => dispatch(handleChange("panel5"))}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5a-content"
                id="panel5a-header"
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{
                    color: "#091E42",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  Amenities
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "grid",
                  gap: 1,
                  gridTemplateColumns: "repeat(2, 1fr)",
                }}
              >
                {amenitiesList.map((amenity, idx) => (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Switch
                        checked={amenities.includes(amenity)}
                        onChange={() => dispatch(handleAmenities(amenity))}
                      />
                    }
                    label={amenity}
                  />
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded.includes("panel6") ? true : false}
              onChange={() => dispatch(handleChange("panel6"))}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel6a-content"
                id="panel6a-header"
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{
                    color: "#091E42",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  Construction Status
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {constructionStatusList.map((status, idx) => (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Switch
                        checked={constructionStatus.includes(status)}
                        onChange={() =>
                          dispatch(handleConstructionStatus(status))
                        }
                      />
                    }
                    label={status}
                  />
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded.includes("panel7") ? true : false}
              onChange={() => dispatch(handleChange("panel7"))}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel7a-content"
                id="panel7a-header"
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{
                    color: "#091E42",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  Posted By
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {postedByList.map((poster, idx) => (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Switch
                        checked={postedBy.includes(poster)}
                        onChange={() => dispatch(handlePostedBy(poster))}
                      />
                    }
                    label={poster}
                  />
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded.includes("panel8") ? true : false}
              onChange={() => dispatch(handleChange("panel8"))}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel8a-content"
                id="panel8a-header"
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{
                    color: "#091E42",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  Furniture Type
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {furnitureTypeList.map((furniture, idx) => (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Switch
                        checked={furnitureType.includes(furniture)}
                        onChange={() =>
                          dispatch(handleFurnitureType(furniture))
                        }
                      />
                    }
                    label={furniture}
                  />
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded.includes("panel9") ? true : false}
              onChange={() => dispatch(handleChange("panel9"))}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel9a-content"
                id="panel9a-header"
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{
                    color: "#091E42",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  Purchase Type
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {purchaseTypeList.map((type, idx) => (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Switch
                        checked={purchaseType.includes(type)}
                        onChange={() => dispatch(handlePurchaseType(type))}
                      />
                    }
                    label={type}
                  />
                ))}
              </AccordionDetails>
            </Accordion>

            {/* Add City Dropdown */}

            {/* Include switches for additional filter options */}
            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={withPhotos}
                    onChange={() => dispatch(handleWithPhotos())}
                  />
                }
                label="With Photos"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={reraApproved}
                    onChange={() => dispatch(handleReraApproved())}
                  />
                }
                label="RERA Approved"
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default FiltersSection;
