import { FunctionComponent } from "react";
import styles from "./Popular.module.css";

export type PopularType = {
  className?: string;
};

const Popular: FunctionComponent<PopularType> = ({ className = "" }) => {
  return (
    <div className={[styles.popular, className].join(" ")}>
      <div className={styles.exploreByPropertyTypeParent}>
        <h2 className={styles.exploreByProperty}>Explore by Property Type</h2>
        <button className={styles.viewMoreBtn}>
          <div className={styles.viewMoreBtnChild} />
          <div className={styles.viewMore}>View More</div>
        </button>
      </div>
      <div className={styles.cityHeader}>
        <div className={styles.cityCard}>
          <img className={styles.web11Icon} alt="" src="/web1-11@2x.png" />
          <div className={styles.web12} />
          <div className={styles.villa}>VILLA</div>
        </div>
        <div className={styles.cityCardWrapper}>
          <div className={styles.cityCard1}>
            <img className={styles.web11Icon1} alt="" src="/web1-12@2x.png" />
            <div className={styles.web121} />
            <div className={styles.farmhouse}>FARMHOUSE</div>
          </div>
        </div>
        <div className={styles.cityCardContainer}>
          <div className={styles.cityCard2}>
            <img className={styles.web11Icon2} alt="" src="/web1-13@2x.png" />
            <div className={styles.web122} />
            <div className={styles.bungalow}>BUNGALOW</div>
          </div>
        </div>
        <div className={styles.cityCard3}>
          <img className={styles.web11Icon3} alt="" src="/web1-14@2x.png" />
          <div className={styles.web123} />
          <div className={styles.apartment}>APARTMENT</div>
        </div>
      </div>
    </div>
  );
};

export default Popular;
