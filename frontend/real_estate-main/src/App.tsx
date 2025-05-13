import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import PropertyExplorePage from "./pages/PropertyExplorePage";
import PropertyListingsPage from "./pages/PropertyListingsPage";
import SearchPropertiesNavbar from "./pages/SearchPropertiesNavbar";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import Rent from "./pages/Rent";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UserProfile from "./pages/UserProfile";
import UserAppointments from "./pages/UserAppointments";
import UserProperties from "./pages/UserProperties";
import UserPastSearches from "./pages/UserPastSearches";
import UserPreviouslyViewed from "./pages/UserPreviouslyViewed";
import UserPreviouslySaved from "./pages/UserPreviouslySaved";
import UserPreviouslyContacted from "./pages/UserPreviouslyContacted";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import PropertiesRent from "./pages/PropertiesRent";
import PropertiesSell from "./pages/PropertiesSell";
import Properties from "./pages/Properties";
import { Insights } from "@mui/icons-material";
import CardLayout from "./components/Insights";
import UserNotifications from "./pages/UserNotifications";
import StaffLogin from "./pages/StaffLogin";
import StaffDashboard from "./pages/StaffDashboard";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/aboutus":
        title = "";
        metaDescription = "";
        break;
      case "/property-explore-page":
        title = "";
        metaDescription = "";
        break;
      case "/property-listings-page":
        title = "";
        metaDescription = "";
        break;
      case "/property-details-page":
        title = "";
        metaDescription = "";
        break;
      case "/rent":
        title = "";
        metaDescription = "";
        break;
      case "/admin-login":
        title = "";
        metaDescription = "";
        break;
      case "/admin-dashboard":
        title = "";
        metaDescription = "";
        break;
      case "/user-profile":
        title = "";
        metaDescription = "";
        break;
      case "/user-appointments":
        title = "";
        metaDescription = "";
        break;
      case "/user-properties0":
        title = "";
        metaDescription = "";
        break;
      case "/user-past-searches0":
        title = "";
        metaDescription = "";
        break;
      case "/user-previously-viewed0":
        title = "";
        metaDescription = "";
        break;
      case "/user-previously-saved0":
        title = "";
        metaDescription = "";
        break;
      case "/user-previously-contacted0":
        title = "";
        metaDescription = "";
        break;
      case "/register":
        title = "";
        metaDescription = "";
        break;
      case "/log-in":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <>
      {" "}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/insights" element={<CardLayout />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route
          path="/property-explore-page"
          element={<PropertyExplorePage />}
        />
        <Route
          path="/property-listings-page"
          element={<PropertyListingsPage />}
        />
        <Route
          path="/SearchPropertiesNavbar"
          element={<SearchPropertiesNavbar />}
        />
        <Route
          path="/property-details-page/:property_id"
          element={<PropertyDetailsPage />}
        />
        <Route path="/rent" element={<Rent />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-appointments" element={<UserAppointments />} />
        <Route path="/user-properties0" element={<UserProperties />} />
        <Route path="/user-past-searches0" element={<UserPastSearches />} />
        <Route
          path="/user-previously-viewed0"
          element={<UserPreviouslyViewed />}
        />
        <Route
          path="/user-previously-saved0"
          element={<UserPreviouslySaved />}
        />
        <Route
          path="/user-previously-contacted0"
          element={<UserPreviouslyContacted />}
        />
        <Route path="/user-notifications0" element={<UserNotifications />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/log-in" element={<LogIn />} /> */}
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/sell" element={<PropertiesSell />} />
        <Route path="/properties/rent" element={<PropertiesRent />} />

        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
      </Routes>
    </>
  );
}

export default App;
