import { FunctionComponent, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

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
  
  const onHomeIconClick = useCallback(() => {
    navigate("/user-profile");
  }, [navigate]);

  const onSearchContainerClick = useCallback(() => {
    navigate("/property-explore-page");
  }, [navigate]);
  
  let match = (useLocation().pathname == '/' || useLocation().pathname != '/admin-dashboard');

  return (
    <header className={`${match ? `${styles.navtransparent} ${styles.navbar}` : `${styles.navbar}`}`}>
      <a className={`${styles.navitem} ${styles.logo}`} onClick={onLOGOTextClick}>LOGO</a>
      {/* <div className={`${styles.navitem} ${styles.searchBar}`}>
          <img className={styles.searchicon} src="/icbaselinesearch1.svg" />
          <input className={styles.searchinput} placeholder="Luxurious Penthouses ..." type="text"/>
      </div>
      <a className={`${styles.navitem} ${styles.buy}`} onClick={onBuyTextClick}>Buy</a>
      <a className={`${styles.navitem} ${styles.rent}`} onClick={onRentTextClick}>Rent</a>
      <a className={`${styles.navitem} ${styles.sell}`} onClick={onSellTextClick}>Sell</a> */}
      <a className={`${styles.navitem} ${styles.profile}`} onClick={onHomeIconClick}>
        <img className={styles.homeIcon} src="/vector1.svg"/>
      </a>
    </header>
  );
};

export default Nav;
