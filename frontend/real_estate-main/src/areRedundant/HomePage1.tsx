import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage1.module.css";

export type HomePage1Type = {
  className?: string;
};

const HomePage1: FunctionComponent<HomePage1Type> = ({ className = "" }) => {
  const navigate = useNavigate();

  const onBuyTextClick = useCallback(() => {
    navigate("/property-listings-page");
  }, [navigate]);

  const onRentTextClick = useCallback(() => {
    navigate("/rent");
  }, [navigate]);

  const onSellTextClick = useCallback(() => {
    navigate("/sell");
  }, [navigate]);

  const onLoginTextClick = useCallback(() => {
    navigate("/log-in");
  }, [navigate]);

  const onSearchContainerClick = useCallback(() => {
    navigate("/property-explore-page");
  }, [navigate]);

  return (
    <div className={[styles.homePage, className].join(" ")}>
      <img className={styles.image1Icon} alt="" src="/image-1@2x.png" />
      <div className={styles.firstName}>First Name</div>
      <header className={styles.logoParent}>
        <a className={styles.logo}>LOGO</a>
        <nav className={styles.actionButtons}>
          <a className={styles.buy} onClick={onBuyTextClick}>
            Buy
          </a>
          <a className={styles.rent} onClick={onRentTextClick}>
            Rent
          </a>
          <div className={styles.sellWrapper}>
            <a className={styles.sell} onClick={onSellTextClick}>
              Sell
            </a>
          </div>
          <a className={styles.login} onClick={onLoginTextClick}>
            Login
          </a>
        </nav>
      </header>
      <div className={styles.appointmentContentWrapper}>
        <div className={styles.appointmentContent}>
          <h1 className={styles.yourDreamHome}>Your Dream Home Awaits</h1>
          <div className={styles.formFields}>
            <form className={styles.rectangleParent}>
              <div className={styles.frameChild} />
              <div className={styles.buttonsAndMap}>
                <h3 className={styles.bookAppointment}>BOOK APPOINTMENT</h3>
              </div>
              <div className={styles.nameFields}>
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
              <div className={styles.contactFields}>
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
              <div className={styles.getAppointmentButton}>
                <button className={styles.getAppointmentButton1}>
                  <div className={styles.getAppointmentButtonChild} />
                  <div className={styles.getYourAppointment}>
                    Get Your Appointment
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.searchBar}>
        <img className={styles.searchBarChild} alt="" src="/rectangle-1.svg" />
        <div className={styles.search} onClick={onSearchContainerClick}>
          <div className={styles.searchChild} />
          <img
            className={styles.icbaselineSearchIcon}
            loading="lazy"
            alt=""
            src="/icbaselinesearch.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage1;
