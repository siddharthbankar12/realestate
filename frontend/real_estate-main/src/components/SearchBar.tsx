import React from "react";
import style from "./searchbar.module.css";
import { GoSearch } from "react-icons/go";
import { Box, Flex, Grid, Input, Select, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleCity } from "../redux/SearchBox/SearchSlice";
import cityList from "../redux/SearchBox/CityList";

// Helper function to capitalize city
const capitalizeCity = (city: string) => {
  return city
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function Homepage() {
  const [selectedOpt, setSelectedOpt] = React.useState("Buy");
  const [searchCity, setSearchCity] = useState("");
  const [city, selectCity] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    setSearchCity(capitalizeCity(event.target.value));
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    selectCity(selectedCity);
    setSearchCity("");
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const cityToSearch = city === "All" ? "" : city || searchCity;
    const capitalizedCity = capitalizeCity(cityToSearch);

    dispatch(handleCity(capitalizedCity));

    const cityQuery = `city=${encodeURIComponent(
      capitalizedCity
    )}&query=${encodeURIComponent(searchCity)}`;

    navigate(`/property-listings-page?${cityQuery}`);
  };

  return (
    <Box>
      <Box className={style.homepageContainer} padding={0}>
        <Grid className={style.buyRent} templateColumns="repeat(2, 1fr)">
          {[
            { label: "Buy", path: "/properties/sell" },
            { label: "Rent", path: "/properties/rent" },
            // { label: "New Launch", path: "/properties/new-launch" },
            // { label: "Commercial", path: "/properties/commercial" },
            // { label: "Plots / Land", path: "/properties/land" },
          ].map((option) => (
            <Box
              key={option.label}
              onClick={() => setSelectedOpt(option.label)}
            >
              <Link className={style.labelOption} to={option.path}>
                {option.label}
              </Link>
            </Box>
          ))}
        </Grid>

        <form onSubmit={handleSearch} style={{ padding: 0 }}>
          <Flex
            className={style.searchBox}
            padding={0}
            flexDirection={["column", "column", "row"]}
          >
            <Box
              width={["100%", "100%", "auto"]}
              mb={[4, 4, 0]}
              className={style.responsiveSelect}
            >
              <Select
                placeholder="Select a City"
                value={city}
                style={{ padding: "10px 20px" }}
                size="lg"
                width={["100%", "100%", "150px"]}
                focusBorderColor="purple"
                onChange={handleCityChange}
                className={style.labelOption}
              >
                {cityList.map((cityName) => (
                  <option key={cityName} value={cityName}>
                    {cityName}
                  </option>
                ))}
              </Select>
            </Box>

            <Box className={style.searchInput} flex="1" mb={[4, 4, 0]}>
              <Input
                placeholder={`Search properties in ${city || "City"}`}
                onChange={handleSearchChange}
                value={searchCity}
                width="100%"
              />
            </Box>

            <Box
              width={["100%", "100%", "auto"]}
              className={style.responsiveSearch}
            >
              <Button
                type="submit"
                leftIcon={<GoSearch />}
                bgColor="#fd3752"
                variant="solid"
                color="white"
                className={style.searchButton}
                // width={["100%", "100%", "150px"]}
              >
                Search
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default Homepage;
