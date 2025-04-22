import { FunctionComponent } from "react";
import styles from "./OfficeCard.module.css";

const OfficeCard: FunctionComponent = ({ }) => {
  return (
    <div className={styles.officeCard}>
      <img className={styles.image} src="/Delhi.png" />
      <div className={styles.information}>
          <div className={styles.location}>
            <img className={styles.icon} src="/pin.png"/>
            Mumbai
          </div>
          <div className={styles.phone}>
            <img className={styles.icon} src="/phone.png"/>
            033 1234 1234
          </div>
          <div className={styles.email}>
            <img className={styles.icon} src="/mail.png"/>
            mumbai@realestate.com
          </div>
      </div>
    </div>
  );
};

export default OfficeCard;
