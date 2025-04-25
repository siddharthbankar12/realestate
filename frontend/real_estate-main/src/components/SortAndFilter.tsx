import {
  Box,
  Chip,
  Paper,
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
import CityDropdown from "../redux/SearchBox/CityDropDown.jsx";
import {
  handleChange,
  handleBudgetRange,
  handleArea,
  handleNoOfBedrooms,
  handleCity,
} from "../redux/SearchBox/SearchSlice";

const noOfBedroomsList = [1, 2, 3, 4];

const FiltersSection = () => {
  const { noOfBedrooms, budgetRange, area, selectedCity, expanded } =
    useSelector((store) => store.search);

  const dispatch = useDispatch();

  const handleSliderChange = (name, newValue) => {
    if (name === "budgetRange") {
      dispatch(handleBudgetRange(newValue));
    } else if (name === "area") {
      dispatch(handleArea(newValue));
    }
  };

  const handleCityChange = (city) => {
    dispatch(handleCity(city));
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        padding: "8px 12px",
        borderRadius: 2,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
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
            {/* City Dropdown */}
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
                selectedCity={selectedCity}
                onCityChange={handleCityChange}
              />
            </Box>

            {/* No. of Bedrooms */}
            <Accordion
              expanded={expanded.includes("panel1")}
              onChange={() => dispatch(handleChange("panel1"))}
              elevation={0}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ mb: 1 }}>
                <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
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
                    variant="outlined"
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
                    }}
                  />
                ))}
              </AccordionDetails>
            </Accordion>

            {/* Budget Range */}
            <Accordion
              expanded={expanded.includes("panel3")}
              onChange={() => dispatch(handleChange("panel3"))}
              elevation={0}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ mb: 1 }}>
                <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
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

            {/* Area */}
            <Accordion
              expanded={expanded.includes("panel4")}
              onChange={() => dispatch(handleChange("panel4"))}
              elevation={0}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ mb: 1 }}>
                <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
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
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default FiltersSection;
