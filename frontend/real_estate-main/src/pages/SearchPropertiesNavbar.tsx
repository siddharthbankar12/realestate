import { Box, Breadcrumbs, Container, Grid, Link } from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router";
import {
  FiltersSection,
  PropertiesListSection,
  SearchSection,
} from "../components/PropertiesPage";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import StraightSharpIcon from "@mui/icons-material/StraightSharp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 300,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 40,
          right: 100,
        }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Properties = (props) => {
  const cityRedux = useSelector((state) => state.search.city);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const fetchProperties = async (city: string = "", query: string = "") => {
    try {
      const selectedCity = city === "All" ? "" : city;

      const response = await fetch(
        `http://localhost:8000/api/property?city=${encodeURIComponent(
          selectedCity
        )}&query=${encodeURIComponent(query)}`,
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
        toast.warn("No properties found. Try another city.");
      } else {
        setProperties(result);
      }
    } catch (error) {
      console.error("Error fetching property cards:", error.message);
      toast.error("Error fetching properties. Please try again later.");
    }
  };
  const Params = new URLSearchParams(location.search);
  const c = Params.get("city") || "";

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query") || "";

    fetchProperties(cityRedux, query);
  }, [location.search, cityRedux]);

  console.log("properprops");
  console.log(props);
  console.log(c);

  console.log("filterproperties");
  console.log(properties);

  const breadcrumbs = [
    <Link
      key="1"
      color="#8993A4"
      onClick={() => navigate("/")}
      sx={{
        cursor: "pointer",
        textDecoration: "none",
        ":hover": {
          color: "#8993A4",
        },
        fontSize: "12px",
        fontFamily: "Open Sans",
      }}
    >
      Home
    </Link>,
    <Link
      key="1"
      color="#8993A4"
      sx={{
        cursor: "pointer",
        textDecoration: "none",
        ":hover": {
          color: "#8993A4",
        },
        fontSize: "12px",
        fontFamily: "Open Sans",
      }}
    >
      Properties
    </Link>,
  ];

  return (
    <>
      <Navbar />
      <Box sx={{ background: "#f4f5f7", minHeight: "100vh" }}>
        <Container sx={{ paddingTop: 0.5 }}>
          <Breadcrumbs
            id="back-to-top-anchor"
            separator="›"
            aria-label="breadcrumb"
            sx={{ mt: 9, ml: 1 }}
          >
            {breadcrumbs}
          </Breadcrumbs>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item md={3.5} sx={{ marginRight: 0 }}>
              <FiltersSection />
            </Grid>
            <Grid item md={8.3}>
              <SearchSection searchCity={c} filterproperty={properties} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ScrollTop {...props}>
        <Fab
          disableRipple
          size="small"
          aria-label="scroll back to top"
          sx={{
            background: "#D6EFFF",
            ":hover": { background: "#D6EFFF" },
            boxShadow: "none",
            padding: "25px",
          }}
        >
          <StraightSharpIcon sx={{ color: "#0078db", fontSize: "20px" }} />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Properties;
