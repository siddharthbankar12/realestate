import { FunctionComponent } from "react";
import TestimonialTwoContent from "../components/TestimonialTwoContent";
import styles from "./HappyTradeParent.module.css";

export type HappyTradeParentType = {
  className?: string;
};

const HappyTradeParent: FunctionComponent<HappyTradeParentType> = ({
  className = "",
}) => {
  return (
    <section className={[styles.rectangleParent, className].join(" ")}>
      <section className={styles.frameChild} />
      <div className={styles.customerContainer}>
        <div className={styles.customerTitle}>
          <h1 className={styles.happyCustomers}>HAPPY CUSTOMERS</h1>
          <div className={styles.happyTrade}>
            <h2 className={styles.happyTrade1}>HAPPY TRADE</h2>
          </div>
        </div>
      </div>
      <div className={styles.testimonial}>
        <div className={styles.testimonialCard}>
          <div className={styles.cardImage}>
            <img
              className={styles.vectorIcon}
              loading="lazy"
              alt=""
              src="/vector-2.svg"
            />
          </div>
        </div>
        <TestimonialTwoContent />
      </div>
      <img className={styles.vectorIcon1} alt="" src="/vector-3.svg" />
    </section>
  );
};

export default HappyTradeParent;