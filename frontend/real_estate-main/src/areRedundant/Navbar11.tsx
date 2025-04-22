import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar11.module.css";

export type Navbar1Type = {
  className?: string;
};

const Navbar1: FunctionComponent<Navbar1Type> = ({ className = "" }) => {
  const navigate = useNavigate();

  const onLOGOTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onBuyTextClick = useCallback(() => {
    navigate("/property-listings-page");
  }, [navigate]);

  const onRentTextClick = useCallback(() => {
    navigate("/rent");
  }, [navigate]);

  const onSellTextClick = useCallback(() => {
    navigate("/sell");
  }, [navigate]);

  const onVectorIconClick = useCallback(() => {
    navigate("/user-profile");
  }, [navigate]);

  return (
    <header className={[styles.navbar, className].join(" ")}>
      <div className={styles.navbarChild} />
      <div className={styles.logoWrapper}>
        <a className={styles.logo} onClick={onLOGOTextClick}>
          LOGO
        </a>
      </div>
      <div className={styles.searchBarWrapper}>
        <div className={styles.searchBar}>
          <div className={styles.searchBarChild} />
          <img
            className={styles.icbaselineSearchIcon}
            alt=""
            src="/icbaselinesearch1.svg"
          />
          <input
            className={styles.searchInput}
            placeholder="Search here..."
            type="text"
          />
        </div>
      </div>
      <div className={styles.navigationMenu}>
        <div className={styles.menuOptions}>
          <div className={styles.homeLink}>
            <a className={styles.home} onClick={onLOGOTextClick}>
              Home
            </a>
          </div>
          <div className={styles.menuLinks}>
            <a className={styles.buy} onClick={onBuyTextClick}>
              Buy
            </a>
          </div>
          <div className={styles.menuLinks1}>
            <a className={styles.rent} onClick={onRentTextClick}>
              Rent
            </a>
          </div>
          <div className={styles.menuLinks2}>
            <a className={styles.sell} onClick={onSellTextClick}>
              Sell
            </a>
          </div>
          <img
            className={styles.vectorIcon}
            loading="lazy"
            alt=""
            src="/vector2.svg"
            onClick={onVectorIconClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar1;
