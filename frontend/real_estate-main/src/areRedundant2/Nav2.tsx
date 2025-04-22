import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Nav2.module.css";

export type NavType = {
  className?: string;

  /** Action props */
  onLOGOTextClick?: () => void;
  onHomeText1Click?: () => void;
  onBuyTextClick?: () => void;
  onHomeIconClick?: () => void;
};

const Nav: FunctionComponent<NavType> = ({
  className = "",
  onLOGOTextClick,
  onHomeText1Click,
  onBuyTextClick,
  onHomeIconClick,
}) => {
  const navigate = useNavigate();

  const onLOGOTextClick1 = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onBuyTextClick1 = useCallback(() => {
    navigate("/property-listings-page");
  }, [navigate]);

  const onHomeIconClick1 = useCallback(() => {
    navigate("/user-profile");
  }, [navigate]);

  return (
    <header className={[styles.nav3, className].join(" ")}>
      <div className={styles.nav3Child} />
      <div className={styles.buttons}>
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
      <div className={styles.buttons1}>
        <div className={styles.frameParent}>
          <div className={styles.homeWrapper}>
            <a className={styles.home} onClick={onHomeText1Click}>
              Home
            </a>
          </div>
          <div className={styles.buyWrapper}>
            <a className={styles.buy} onClick={onBuyTextClick}>
              Buy
            </a>
          </div>
          <div className={styles.homeIconBackground}>
            <a className={styles.rent}>Rent</a>
          </div>
          <div className={styles.sellWrapper}>
            <a className={styles.sell}>Sell</a>
          </div>
          <img
            className={styles.homeIcon}
            loading="lazy"
            alt=""
            src="/vector1.svg"
            onClick={onHomeIconClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Nav;
