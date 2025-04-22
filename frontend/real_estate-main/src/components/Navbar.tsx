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

export type NavbarProps = {
  className?: string;
  onSearch?: (query: string) => void;
};

const Navbar: FunctionComponent<NavbarProps> = () => {
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
    if (isLoggedIn) {
      navigate("/user-profile");
    } else {
      closePopups();
      setLoginPopupOpen(true);
    }
  };

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

      {/* Desktop Nav Items */}
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

      {/* Profile Icon */}
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

      {/* Hamburger Icon */}
      <div className={styles.hamburger} onClick={toggleMobileMenu}>
        <FiMenu size={28} color="white" />
      </div>

      {/* Mobile Dropdown Menu */}
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
        </div>
      )}

      {/* Popups */}
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
