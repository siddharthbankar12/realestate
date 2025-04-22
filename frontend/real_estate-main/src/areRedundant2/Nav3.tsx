import {
  FunctionComponent,
  useMemo,
  type CSSProperties,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Nav3.module.css";

export type NavType = {
  className?: string;
  icbaselineSearch?: string;
  vector?: string;

  /** Style props */
  rectangleDivPadding?: CSSProperties["padding"];
  rectangleDivDebugCommit?: CSSProperties["debugCommit"];
  lOGOPadding?: CSSProperties["padding"];
  frameDivColor?: CSSProperties["color"];
  actionsWidth?: CSSProperties["width"];
  actionsPadding?: CSSProperties["padding"];
  homePadding?: CSSProperties["padding"];
  buyPadding?: CSSProperties["padding"];
  rentPadding?: CSSProperties["padding"];
  sellPadding?: CSSProperties["padding"];

  /** Action props */
  onLOGOTextClick?: () => void;
  onHomeTextClick?: () => void;
  onBuyTextClick?: () => void;
  onVectorIconClick?: () => void;
};

const Nav: FunctionComponent<NavType> = ({
  className = "",
  icbaselineSearch,
  vector,
  rectangleDivPadding,
  rectangleDivDebugCommit,
  lOGOPadding,
  frameDivColor,
  actionsWidth,
  actionsPadding,
  homePadding,
  buyPadding,
  rentPadding,
  sellPadding,
  onLOGOTextClick,
  onHomeTextClick,
  onBuyTextClick,
  onVectorIconClick,
}) => {
  const nav3Style: CSSProperties = useMemo(() => {
    return {
      padding: rectangleDivPadding,
      debugCommit: rectangleDivDebugCommit,
    };
  }, [rectangleDivPadding, rectangleDivDebugCommit]);

  const frameDiv5Style: CSSProperties = useMemo(() => {
    return {
      padding: lOGOPadding,
    };
  }, [lOGOPadding]);

  const searchInputStyle: CSSProperties = useMemo(() => {
    return {
      color: frameDivColor,
    };
  }, [frameDivColor]);

  const frameDiv6Style: CSSProperties = useMemo(() => {
    return {
      width: actionsWidth,
      padding: actionsPadding,
    };
  }, [actionsWidth, actionsPadding]);

  const homeButtonStyle: CSSProperties = useMemo(() => {
    return {
      padding: homePadding,
    };
  }, [homePadding]);

  const actionButtonsStyle: CSSProperties = useMemo(() => {
    return {
      padding: buyPadding,
    };
  }, [buyPadding]);

  const frameDiv7Style: CSSProperties = useMemo(() => {
    return {
      padding: rentPadding,
    };
  }, [rentPadding]);

  const frameDiv8Style: CSSProperties = useMemo(() => {
    return {
      padding: sellPadding,
    };
  }, [sellPadding]);

  const navigate = useNavigate();

  const onLOGOTextClick1 = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onBuyTextClick1 = useCallback(() => {
    navigate("/property-listings-page");
  }, [navigate]);

  const onVectorIconClick1 = useCallback(() => {
    navigate("/user-profile");
  }, [navigate]);

  return (
    <header className={[styles.nav3, className].join(" ")} style={nav3Style}>
      <div className={styles.nav3Child} />
      <div className={styles.logoWrapper} style={frameDiv5Style}>
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
            src={icbaselineSearch}
          />
          <input
            className={styles.searchInput}
            placeholder="Search here..."
            type="text"
            style={searchInputStyle}
          />
        </div>
      </div>
      <div className={styles.actionsWrapper} style={frameDiv6Style}>
        <div className={styles.actions}>
          <div className={styles.homeButton} style={homeButtonStyle}>
            <a className={styles.home} onClick={onHomeTextClick}>
              Home
            </a>
          </div>
          <div className={styles.actionButtons} style={actionButtonsStyle}>
            <a className={styles.buy} onClick={onBuyTextClick}>
              Buy
            </a>
          </div>
          <div className={styles.rentWrapper} style={frameDiv7Style}>
            <a className={styles.rent}>Rent</a>
          </div>
          <div className={styles.sellWrapper} style={frameDiv8Style}>
            <a className={styles.sell}>Sell</a>
          </div>
          <img
            className={styles.vectorIcon}
            loading="lazy"
            alt=""
            src={vector}
            onClick={onVectorIconClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Nav;
