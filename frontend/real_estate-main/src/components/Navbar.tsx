import React, {
  FunctionComponent,
  useCallback,
  useState,
  useEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";
import OtpPopup from "./OtpPopup";
import CollectEmailPopup from "./CollectEmailPopup";
import NavSearch from "./NavSearch";
import { FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { jwtDecode } from "jwt-decode";

export type NavbarProps = {
  className?: string;
  onSearch?: (query: string) => void;
};

const Navbar: FunctionComponent<NavbarProps> = () => {
  let isAdmin = false;
  let isStaff = false;

  try {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded: any = jwtDecode(token);

      if (decoded?.adminId) {
        isAdmin = decoded?.adminId;
      }

      if (decoded?.staffId) {
        isStaff = decoded?.staffId;
      }
    }
  } catch (err) {
    console.error("Invalid token", err);
  }

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);
  const [isOtpPopupOpen, setOtpPopupOpen] = useState(false);
  const [isCollectEmailPopupOpen, setCollectEmailPopupOpen] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onLOGOTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onRentTextClick = useCallback(() => {
    navigate("/properties/rent");
    setIsMobileMenuOpen(false);
  }, [navigate]);

  const onPostPropertyClick = useCallback(() => {
    navigate("/rent");
    setIsMobileMenuOpen(false);
  }, [navigate]);

  const onSellTextClick = useCallback(() => {
    navigate("/properties/sell");
    setIsMobileMenuOpen(false);
  }, [navigate]);

  const handleLoginClick = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      if (isAdmin) {
        navigate("/admin-dashboard");
      } else if (isStaff) {
        navigate("/staff-dashboard");
      } else {
        navigate("/user-profile");
      }
    } else {
      closePopups();
      setLoginPopupOpen(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleSwitchToCollectEmail = () => {
    closePopups();
    setCollectEmailPopupOpen(true);
  };

  const handleCollectEmail = (email: string) => {
    closePopups();
    setEmailForOtp(email);
    setOtpPopupOpen(true);
  };

  const handleOtpVerification = () => {
    closePopups();
    setRegisterPopupOpen(true);
  };

  const handleSwitchToLogin = () => {
    closePopups();
    setLoginPopupOpen(true);
  };

  const closePopups = () => {
    setLoginPopupOpen(false);
    setRegisterPopupOpen(false);
    setOtpPopupOpen(false);
    setCollectEmailPopupOpen(false);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    closePopups();

    if (isAdmin) {
      navigate("/admin-dashboard");
    } else if (isStaff) {
      navigate("/staff-dashboard");
    }
    {
      navigate("/user-profile");
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(
      `/SearchPropertiesNavbar?city=${encodeURIComponent(
        searchCity
      )}&query=${encodeURIComponent("")}`
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(event.target.value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/aboutus";

  return (
    <header
      className={`${styles.navbar} ${
        (isHomePage || isAboutPage) && !isScrolled
          ? styles.navtransparent
          : styles.navcolored
      }`}
    >
      <div
        className={`${styles.navitem} ${styles.logo}`}
        onClick={onLOGOTextClick}
      >
        <img src="../logo.png" alt="Logo" className={styles.logo1} />
      </div>

      <NavSearch />

      <div className={styles.desktopNav}>
        <div className={styles.navitem} onClick={onSellTextClick}>
          For Buyers
        </div>
        <div className={styles.navitem} onClick={onRentTextClick}>
          For Tenants
        </div>
        <div className={styles.navitem} onClick={onPostPropertyClick}>
          Post Property
        </div>
        <div
          className={styles.navitem}
          onClick={() => {
            setIsMobileMenuOpen(false);
            if (isHomePage) {
              const insightsSection = document.getElementById("insights");
              if (insightsSection) {
                insightsSection.scrollIntoView({ behavior: "smooth" });
              }
            } else {
              navigate("/insights");
            }
          }}
        >
          Insights
        </div>
      </div>

      <div
        className={`${styles.navitem} ${styles.profile}`}
        onClick={handleLoginClick}
      >
        <img
          className={styles.homeIcon}
          src="/vector1.svg"
          alt="profile icon"
        />
      </div>

      <div className={styles.hamburger} onClick={toggleMobileMenu}>
        <FiMenu size={24} color="white" />
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div onClick={onSellTextClick}>For Buyers</div>
          <div onClick={onRentTextClick}>For Tenants</div>
          <div onClick={onPostPropertyClick}>Post Property</div>
          <div
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (isHomePage) {
                const insightsSection = document.getElementById("insights");
                if (insightsSection) {
                  insightsSection.scrollIntoView({ behavior: "smooth" });
                }
              } else {
                navigate("/insights");
              }
            }}
          >
            Insights
          </div>

          {/* 👇 Sidebar options after "Insights" */}
          {isLoggedIn && (
            <>
              <div onClick={() => navigate("/user-profile")}>
                Profile Settings
              </div>
              <div onClick={() => navigate("/user-appointments")}>
                Appointments
              </div>
              <div onClick={() => navigate("/user-properties0")}>
                My Properties
              </div>
              <div onClick={() => navigate("/user-past-searches0")}>
                Past Searches
              </div>
              <div onClick={() => navigate("/user-previously-viewed0")}>
                Previously Viewed
              </div>
              <div onClick={() => navigate("/user-previously-saved0")}>
                Saved
              </div>
              <div onClick={() => navigate("/user-previously-contacted0")}>
                Contacted
              </div>
              <div onClick={() => navigate("/user-notifications0")}>
                Notifications
              </div>
              <div
                onClick={() => {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("userProfile");
                  setIsLoggedIn(false);
                  setIsMobileMenuOpen(false);
                  navigate("/");
                }}
              >
                Log out
              </div>
            </>
          )}
        </div>
      )}

      {isLoginPopupOpen && (
        <LoginPopup
          onClose={closePopups}
          onSwitchToRegister={handleSwitchToCollectEmail}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {isCollectEmailPopupOpen && (
        <CollectEmailPopup
          onClose={closePopups}
          onSendOtp={handleCollectEmail}
        />
      )}
      {isOtpPopupOpen && (
        <OtpPopup
          onClose={closePopups}
          email={emailForOtp}
          onVerifyOtp={handleOtpVerification}
        />
      )}
      {isRegisterPopupOpen && (
        <RegisterPopup
          onClose={closePopups}
          onSwitchToLogin={handleSwitchToLogin}
          prefilledEmail={emailForOtp}
        />
      )}
    </header>
  );
};

export default Navbar;
