import React, {
  FunctionComponent,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./NavSearch.module.css";
import { useSelector, useDispatch } from "react-redux";
import { handleCity } from "../redux/SearchBox/SearchSlice";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import axios from "axios";

export type NavSearchProps = {};

const NavSearch: FunctionComponent<NavSearchProps> = () => {
  const navigate = useNavigate();
  // const city = useSelector((state) => state.search.city);
  const location = useLocation();
  const [searchCity, setSearchCity] = useState("");
  const [isFilterListVisible, setIsFilterListVisible] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const capitalizedCity = capitalizeCity(searchCity);
    dispatch(handleCity(capitalizedCity));
    navigate(
      `/SearchPropertiesNavbar?city=${encodeURIComponent(
        capitalizedCity
      )}&query=${encodeURIComponent("")}`
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(event.target.value);
  };

  const toggleFilterListVisibility = () => {
    setIsFilterListVisible(!isFilterListVisible);
  };

  const capitalizeCity = (city: string) => {
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  };

  const getUserLocation = async () => {
    try {
      const response = await axios.get("https://ipinfo.io?d66a8f0420021a");
      const cityName = response.data.city;
      if (cityName) {
        setUserLocation(cityName);
      }
    } catch (error) {
      console.error("Error fetching user location:", error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <h4 className={styles.cityHead}>
        <FaMapMarkerAlt
          style={{ marginRight: "5px", color: "red" }}
          size={14}
        />
        {userLocation ? userLocation : "Location"}
      </h4>

      {/* <div className={styles.filter}>
        <div
          className={styles.dropdownfilter}
          onClick={toggleFilterListVisibility}
        >
          All Residential{" "}
          <span
            className={`${styles.rotate} ${
              isFilterListVisible ? styles.rotated : ""
            }`}
          >
            ▼
          </span>
        </div>
        <div
          className={`${styles.filterlist} ${
            isFilterListVisible ? styles.visible : ""
          }`}
        >
          <div className={`${styles.column}`}>
            <input
              type="checkbox"
              id="flat"
              name="flat"
              value="flat"
              defaultChecked={true}
              className={`${styles.filterElement}`}
            />
            <label htmlFor="flat">Flat/Apartment</label> <br />
            <input
              type="checkbox"
              id="independent"
              name="independent"
              value="independent"
              defaultChecked={true}
              className={`${styles.filterElement}`}
            />
            <label htmlFor="independent">Independent/Builder Floor</label>{" "}
            <br />
            <input
              type="checkbox"
              id="residentialLand"
              name="residentialLand"
              value="residentialLand"
              defaultChecked={true}
              className={`${styles.filterElement}`}
            />
            <label htmlFor="residentialLand">Residential Land</label>
            <br />
          </div>
          <div>
            <input
              type="checkbox"
              id="studioApartment"
              name="studioApartment"
              value="studioApartment"
              defaultChecked={true}
              className={`${styles.filterElement}`}
            />
            <label htmlFor="studioApartment">Studio Apartment</label> <br />
            <input
              type="checkbox"
              id="farmHouse"
              name="farmHouse"
              value="farmHouse"
              defaultChecked={true}
              className={`${styles.filterElement}`}
            />
            <label htmlFor="farmHouse">Farm House</label>
            <br />
            <input
              type="checkbox"
              id="servicedApartments"
              name="servicedApartments"
              value="servicedApartments"
              defaultChecked={true}
              className={`${styles.filterElement}`}
            />
            <label htmlFor="servicedApartments">Serviced Apartments</label>
            <br />
          </div>
        </div>
      </div> */}

      <div className={styles.searchContainer}>
        <input
          className={styles.searchinput}
          style={{ margin: "0" }}
          placeholder="Enter City / Type / No. of Bhk needed.."
          type="text"
          value={searchCity}
          onChange={handleSearchChange}
        />

        <button
          type="submit"
          className={styles.searchicon}
          aria-label="Search"
          style={
            {
              // display: "flex",
              // alignItems: "center",
              // justifyContent: "center",
            }
          }
        >
          <FaSearch style={{ transform: "translateY(2px)" }} size={16} />
        </button>
      </div>
    </form>
  );
};

export default NavSearch;
