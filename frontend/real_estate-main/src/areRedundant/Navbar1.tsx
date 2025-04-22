import {
  FunctionComponent,
  useMemo,
  type CSSProperties,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar1.module.css";

export type NavbarType = {
  className?: string;

  /** Style props */
  navbarPadding?: CSSProperties["padding"];
  frameDivPadding?: CSSProperties["padding"];
  frameDivWidth?: CSSProperties["width"];
  frameDivPadding1?: CSSProperties["padding"];
  frameDivPadding2?: CSSProperties["padding"];
  navigationButtonsPadding?: CSSProperties["padding"];
  navigationButtonsPadding1?: CSSProperties["padding"];
  navigationButtonsPadding2?: CSSProperties["padding"];

  /** Action props */
  onLOGOTextClick?: () => void;
  onBuyTextClick?: () => void;
  onRentTextClick?: () => void;
  onSellTextClick?: () => void;
};

const Navbar: FunctionComponent<NavbarType> = ({
  className = "",
  navbarPadding,
  frameDivPadding,
  frameDivWidth,
  frameDivPadding1,
  frameDivPadding2,
  navigationButtonsPadding,
  navigationButtonsPadding1,
  navigationButtonsPadding2,
  onLOGOTextClick,
  onBuyTextClick,
  onRentTextClick,
  onSellTextClick,
}) => {
  const navbarStyle: CSSProperties = useMemo(() => {
    return {
      padding: navbarPadding,
    };
  }, [navbarPadding]);

  const frameDiv3Style: CSSProperties = useMemo(() => {
    return {
      padding: frameDivPadding,
    };
  }, [frameDivPadding]);

  const frameDiv4Style: CSSProperties = useMemo(() => {
    return {
      width: frameDivWidth,
      padding: frameDivPadding1,
    };
  }, [frameDivWidth, frameDivPadding1]);

  const frameDiv5Style: CSSProperties = useMemo(() => {
    return {
      padding: frameDivPadding2,
    };
  }, [frameDivPadding2]);

  const navigationButtonsStyle: CSSProperties = useMemo(() => {
    return {
      padding: navigationButtonsPadding,
    };
  }, [navigationButtonsPadding]);

  const navigationButtons1Style: CSSProperties = useMemo(() => {
    return {
      padding: navigationButtonsPadding1,
    };
  }, [navigationButtonsPadding1]);

  const navigationButtons2Style: CSSProperties = useMemo(() => {
    return {
      padding: navigationButtonsPadding2,
    };
  }, [navigationButtonsPadding2]);

  const navigate = useNavigate();

  const onHomeTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onRentTextClick1 = useCallback(() => {
    navigate("/rent");
  }, [navigate]);

  const onSellTextClick1 = useCallback(() => {
    navigate("/sell");
  }, [navigate]);

  const onVectorIconClick = useCallback(() => {
    navigate("/user-profile");
  }, [navigate]);

  return (
    <header
      className={[styles.navbar, className].join(" ")}
      style={navbarStyle}
    >
      <div className={styles.navbarChild} />
      <div className={styles.logoWrapper} style={frameDiv3Style}>
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
            className={styles.searchBarItem}
            placeholder="Search here..."
            type="text"
          />
        </div>
      </div>
      <div className={styles.navigationOptionsWrapper} style={frameDiv4Style}>
        <div className={styles.navigationOptions}>
          <div className={styles.homeWrapper} style={frameDiv5Style}>
            <a className={styles.home} onClick={onHomeTextClick}>
              Home
            </a>
          </div>
          <div
            className={styles.navigationButtons}
            style={navigationButtonsStyle}
          >
            <a className={styles.buy} onClick={onBuyTextClick}>
              Buy
            </a>
          </div>
          <div
            className={styles.navigationButtons1}
            style={navigationButtons1Style}
          >
            <a className={styles.rent} onClick={onRentTextClick}>
              Rent
            </a>
          </div>
          <div
            className={styles.navigationButtons2}
            style={navigationButtons2Style}
          >
            <a className={styles.sell} onClick={onSellTextClick}>
              Sell
            </a>
          </div>
          <img
            className={styles.vectorIcon}
            loading="lazy"
            alt=""
            src="/vector1.svg"
            onClick={onVectorIconClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
