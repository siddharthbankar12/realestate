import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage1.module.css";

export type HomePage1Type = {
  className?: string;
};

const HomePage1: FunctionComponent<HomePage1Type> = ({ className = "" }) => {
  const navigate = useNavigate();

  const onLoginTextClick = useCallback(() => {
    navigate("/log-in");
  }, [navigate]);

  const onBuyTextClick = useCallback(() => {
    navigate("/property-listings-page");
  }, [navigate]);

  const onSearchClick = useCallback(() => {
    navigate("/property-explore-page");
  }, [navigate]);

  return (
    <section className={[styles.homePage, className].join(" ")}>
      <img className={styles.image1Icon} alt="" src="/image-1@2x.png" />
      <a className={styles.logo}>LOGO</a>
      <div className={styles.firstName}>First Name</div>
      <div className={styles.actionButtons}>
        <div className={styles.buttonsAndMap}>
          <div className={styles.buttonContainer}>
            <div className={styles.buyRentButtons}>
              <a className={styles.buy}>Buy</a>
              <a className={styles.rent}>Rent</a>
            </div>
            <a className={styles.sell}>Sell</a>
            <a className={styles.login} onClick={onLoginTextClick}>
              Login
            </a>
          </div>
        </div>
        <div className={styles.rectangleParent}>
          <div className={styles.frameChild} />
          <div className={styles.appointmentBanner}>
            <h3 className={styles.bookAppointment}>BOOK APPOINTMENT</h3>
          </div>
          <div className={styles.contactForm}>
            <input
              className={styles.firstNameInput}
              placeholder="First Name"
              type="text"
            />
            <input
              className={styles.lastNameInput}
              placeholder="Last Name"
              type="text"
            />
          </div>
          <div className={styles.emailPhoneInputs}>
            <input
              className={styles.emailInput}
              placeholder="Your Email"
              type="text"
            />
            <input
              className={styles.phoneInput}
              placeholder="Your Phone"
              type="text"
            />
          </div>
          <div className={styles.submitButton}>
            <button className={styles.getAppointmentButton}>
              <div className={styles.getAppointmentButtonChild} />
              <div className={styles.getYourAppointment}>
                Get Your Appointment
              </div>
            </button>
          </div>
          <h1 className={styles.yourDreamHome}>Your Dream Home Awaits</h1>
        </div>
      </div>
      <a className={styles.buy1} onClick={onBuyTextClick}>
        Buy
      </a>
      <div className={styles.searchBar}>
        <img className={styles.searchBarChild} alt="" src="/rectangle-1.svg" />
        <header className={styles.search} onClick={onSearchClick}>
          <div className={styles.searchChild} />
          <img
            className={styles.icbaselineSearchIcon}
            loading="lazy"
            alt=""
            src="/icbaselinesearch.svg"
          />
        </header>
      </div>
    </section>
  );
};

export default HomePage1;
