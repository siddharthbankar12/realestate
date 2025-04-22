import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Nav4.module.css";

export type NavType = {
  className?: string;
};

const Nav: FunctionComponent<NavType> = ({ className = "" }) => {
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

  const onFirstIconClick = useCallback(() => {
    navigate("/user-profile");
  }, [navigate]);

  return (
    <header className={[styles.nav3, className].join(" ")}>
      <div className={styles.nav3Child} />
      <div className={styles.linkItems}>
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
            src="/icbaselinesearch.svg"
          />
          <input
            className={styles.searchBarItem}
            placeholder="Search here..."
            type="text"
          />
        </div>
      </div>
      <div className={styles.linkItems1}>
        <div className={styles.options}>
          <div className={styles.homeWrapper}>
            <a className={styles.home} onClick={onLOGOTextClick}>
              Home
            </a>
          </div>
          <div className={styles.menuOptions}>
            <a className={styles.buy} onClick={onBuyTextClick}>
              Buy
            </a>
          </div>
          <div className={styles.rentWrapper}>
            <a className={styles.rent} onClick={onRentTextClick}>
              Rent
            </a>
          </div>
          <div className={styles.sellWrapper}>
            <a className={styles.sell} onClick={onSellTextClick}>
              Sell
            </a>
          </div>
          <img
            className={styles.firstIcon}
            loading="lazy"
            alt=""
            src="/vector1.svg"
            onClick={onFirstIconClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Nav;
