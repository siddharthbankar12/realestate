import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar1.module.css";

export type Navbar1Type = {
  className?: string;
};

const Navbar1: FunctionComponent<Navbar1Type> = ({ className = "" }) => {
  const navigate = useNavigate();

  const onLOGOTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onVectorIconClick = useCallback(() => {
    navigate("/user-profile");
  }, [navigate]);

  const onBuyTextClick = useCallback(() => {
    navigate("/property-listings-page");
  }, [navigate]);

  return (
    <header className={[styles.navbar, className].join(" ")}>
      <div className={styles.navbarChild} />
      <a className={styles.logo} onClick={onLOGOTextClick}>
        LOGO
      </a>
      <img
        className={styles.vectorIcon}
        loading="lazy"
        alt=""
        src="/vector2.svg"
        onClick={onVectorIconClick}
      />
      <a className={styles.buy} onClick={onBuyTextClick}>
        Buy
      </a>
      <a className={styles.rent}>Rent</a>
      <a className={styles.sell}>Sell</a>
      <div className={styles.searchBar}>
        <div className={styles.searchBarChild} />
        <img
          className={styles.icbaselineSearchIcon}
          alt=""
          src="/icbaselinesearch1.svg"
        />
        <div className={styles.searchHere}>Search here...</div>
      </div>
      <a className={styles.home} onClick={onLOGOTextClick}>
        Home
      </a>
    </header>
  );
};

export default Navbar1;
