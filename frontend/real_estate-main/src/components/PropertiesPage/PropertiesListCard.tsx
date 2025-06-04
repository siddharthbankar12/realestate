import React, { useState, useEffect } from "react";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

const PropertiesListCard = ({ property }) => {
  console.log(property);
  const imageProperty =
    "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const navigate = useNavigate();

  const {
    Bhk,
    type,
    title,
    address,
    city,
    bathrooms,
    balconies,
    amenities = [],
    other_rooms = {},
    verification,
    propertyType,
    propertyOptions,
    price,
    area,
    images,
  } = property;

  const amenityList =
    amenities.length > 0 ? amenities.join(", ") : "basic utilities";
  const otherRooms = Object.entries(other_rooms)
    .filter(([_, value]) => value)
    .map(([key]) => key.replace(/([A-Z])/g, " $1").toLowerCase())
    .join(", ");

  const handleCardClick = () => {
    navigate(`/property-details-page/${property._id}`, { state: { property } });
  };

  return (
    <>
      <Paper
        onClick={handleCardClick}
        elevation={1}
        sx={{
          mt: 3,
          mb: 5,
          borderRadius: 2,
          boxShadow: "0 3px 8px 0 rgba(0,106,194,.2)",
          position: "relative",
        }}
      >
        {verification === "verified" ? (
          <img
            src="/verifiedPro.png"
            width="100px"
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              zIndex: "99",
              transform: "rotate(20deg)",
            }}
          />
        ) : null}

        <img
          src={images.length < 1 ? imageProperty : images[0]}
          alt="propertyTemp"
          style={{
            borderRadius: 8,
            width: "358px",
            height: "386px",
            objectFit: "cover",
          }}
        />
        <Paper
          variant="outlined"
          sx={{
            position: "absolute",
            right: 0,
            borderRadius: "8px 0px 0px 8px",
            width: "556px",
            padding: "30px 24px",
            top: 0,
            bottom: 0,
            margin: "auto",
            height: "356px",
            border: "none",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "20px",
                lineHeight: "20px",
                fontWeight: 700,
                mt: 0.1,
                ml: -5,
                color: "#091E42",
                cursor: "pointer",
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "14px",
                lineHeight: "20px",
                cursor: "pointer",
                mt: 0.5,
                ml: -5,
              }}
            >
              {Bhk} BHK Serviced {propertyType} for {propertyOptions} in{" "}
              {address}, {city}
            </Typography>
            <Box sx={{ mt: 1, display: "flex", gap: 8, cursor: "pointer" }}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "baseline" }}>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "20px",
                      lineHeight: "28px",
                      fontWeight: 600,

                      color: "#091E42",
                    }}
                  >
                    ₹
                    {price >= 1000000
                      ? (price / 1000000).toFixed(1) + "L"
                      : price >= 1000
                      ? (price / 1000).toFixed(1) + "K"
                      : price.toString()}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "12px",
                      lineHeight: "16px",
                      fontWeight: 400,
                      color: "#42526e",
                    }}
                  >
                    /month
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "10px",
                    lineHeight: "12px",
                    fontWeight: 400,
                    color: "#8993a4",
                  }}
                >
                  Desposit 2 month(s) rent
                </Typography>
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "baseline" }}>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "20px",
                      lineHeight: "28px",
                      fontWeight: 600,
                      color: "#091E42",
                    }}
                  >
                    {area}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "12px",
                      lineHeight: "16px",
                      fontWeight: 400,
                      color: "#42526e",
                    }}
                  >
                    sq.ft.
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "10px",
                    lineHeight: "12px",
                    fontWeight: 400,
                    color: "#8993a4",
                  }}
                >
                  ({(area * 0.092903).toFixed(1)} sq.m.) Super built-up Area
                </Typography>
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "baseline" }}>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "20px",
                      lineHeight: "28px",
                      fontWeight: 600,
                      color: "#091E42",
                    }}
                  >
                    {Bhk} BHK
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "10px",
                    lineHeight: "12px",
                    fontWeight: 400,
                    color: "#8993a4",
                  }}
                >
                  {Bhk > 3 ? (Bhk > 5 ? Bhk - 2 : Bhk - 1) : Bhk} Baths
                </Typography>
              </Box>
            </Box>

            <Typography
              sx={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 400,
                mt: 0.7,
                color: "#091E42",
                mr: 4,
              }}
            >
              {`Amazing ${Bhk}-bedroom, ${bathrooms}-bathroom ${type} in ${title}, located at ${address}, ${city}.`}
              {` This property offers essential utilities such as ${amenityList}, electricity, water tank, and complete power backup.`}
              {` It features ${balconies} balcony${balconies > 1 ? "ies" : ""}${
                Bhk ? `, ${Bhk} wardrobe${Bhk > 1 ? "s" : ""}` : ""
              }, all within a pet-friendly society.`}
              {otherRooms ? ` Additional rooms include: ${otherRooms}.` : ""}
              {` All rooms are spacious and well-ventilated. The construction quality is high-end with premium fittings.`}
            </Typography>

            <Divider sx={{ mt: 2, background: "rgba(0,0,0,0.15)" }} />
            <Box sx={{ mt: 0.5, display: "flex", justifyContent: "flex-end" }}>
              <Button
                disableRipple
                sx={{
                  border: "none",
                  color: "var(--color-white)",
                  borderRadius: "5px",
                  padding: "4px 15px", // Reduced padding for smaller size
                  fontSize: "0.800rem", // Reduced font size
                  backgroundImage: "linear-gradient(90deg, #2895DF, #764EC6)",
                  margin: "0 8px", // Adds an 8px gap on the left and right sides
                  "&:hover": {
                    backgroundColor: "#006ac2",
                  },
                }}
              >
                View Phone Number
              </Button>
              <Button
                disableRipple
                variant="contained"
                sx={{
                  border: "none",
                  color: "var(--color-white)",
                  borderRadius: "5px",
                  padding: "4px 15px", // Reduced padding for smaller size
                  fontSize: "0.800rem", // Reduced font size
                  backgroundImage: "linear-gradient(90deg, #2895DF, #764EC6)",
                  margin: "0 8px", // Adds an 8px gap on the left and right sides
                  "&:hover": {
                    backgroundColor: "#006ac2",
                  },
                }}
              >
                Contact Owner
              </Button>
            </Box>
          </Box>
        </Paper>
      </Paper>
    </>
  );
};

export default PropertiesListCard;
