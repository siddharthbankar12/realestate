import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./EmailPhoneParent.module.css";

export type EmailPhoneParentType = {
  className?: string;
  web21?: string;
  oVOArenaBuildingLondon?: string;
  from2195month?: string;

  /** Style props */
  propPadding?: CSSProperties["padding"];
  propHeight?: CSSProperties["height"];
  propDisplay?: CSSProperties["display"];
};

const EmailPhoneParent: FunctionComponent<EmailPhoneParentType> = ({
  className = "",
  web21,
  oVOArenaBuildingLondon,
  from2195month,
  propPadding,
  propHeight,
  propDisplay,
}) => {
  const emailPhoneParentStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const oVOArenaBuildingContainerStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
      display: propDisplay,
    };
  }, [propHeight, propDisplay]);

  return (
    <div
      className={[styles.emailPhoneParent, className].join(" ")}
      style={emailPhoneParentStyle}
    >
      <div className={styles.similarPropertyDetails}>
        <img className={styles.web21Icon} loading="lazy" alt="" src={web21} />
        <div
          className={styles.ovoArenaBuildingContainer}
          style={oVOArenaBuildingContainerStyle}
        >
          <p className={styles.ovoArenaBuilding}>{oVOArenaBuildingLondon}</p>
          <p className={styles.blankLine}>&nbsp;</p>
          <p className={styles.from2195month}>{from2195month}</p>
        </div>
      </div>
    </div>
  );
};

export default EmailPhoneParent;
