import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { handleSearchCity, updateFilters } from "./SearchSlice";
import { useNavigate } from "react-router-dom";
import cityList from "../SearchBox/CityList";

const CityDropdown = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.search.city);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const city = event.target.value;
    dispatch(handleSearchCity(city));
    dispatch(updateFilters({ city: city === "All" ? "" : city }));

    const queryParam = new URLSearchParams();
    queryParam.set("city", city);
    navigate(`?${queryParam.toString()}&query=`);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>City</InputLabel>
      <Select value={selectedCity} onChange={handleChange} label="City">
        {cityList.map((city) => (
          <MenuItem key={city} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CityDropdown;
