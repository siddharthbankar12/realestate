import { FunctionComponent } from "react";
import styles from "./FrameComponent21.module.css";

export type FrameComponent2Type = {
  className?: string;
};

const FrameComponent2: FunctionComponent<FrameComponent2Type> = ({
  className = "",
}) => {
  return (
    <div className={[styles.citiesParent, className].join(" ")}>
      <div className={styles.cities}>
        <div className={styles.cityOptions}>
          <div className={styles.exploreByCityWrapper}>
            <h2 className={styles.exploreByCity}>Explore by City</h2>
          </div>
          <button className={styles.viewMoreBtn}>
            <div className={styles.viewMoreBtnChild} />
            <div className={styles.viewMore}>View More</div>
          </button>
        </div>
        <div className={styles.cityCardParent}>
          <div className={styles.cityCard}>
            <img className={styles.web51Icon} alt="" src="/web5-1@2x.png" />
            <div className={styles.web12} />
            <div className={styles.london}>LONDON</div>
          </div>
          <div className={styles.cityCardWrapper}>
            <div className={styles.cityCard1}>
              <img className={styles.web71Icon} alt="" src="/web7-1@2x.png" />
              <div className={styles.web121} />
              <div className={styles.boston}>BOSTON</div>
            </div>
          </div>
          <div className={styles.cityCardContainer}>
            <div className={styles.cityCard2}>
              <img className={styles.web81Icon} alt="" src="/web8-1@2x.png" />
              <div className={styles.web122} />
              <div className={styles.sydney}>SYDNEY</div>
            </div>
          </div>
          <div className={styles.cityCard3}>
            <img className={styles.web101Icon} alt="" src="/web10-1@2x.png" />
            <div className={styles.web123} />
            <div className={styles.macao}>MACAO</div>
          </div>
        </div>
      </div>
      <div className={styles.cityCardGroup}>
        <div className={styles.cityCard4}>
          <img className={styles.web131Icon} alt="" src="/web13-1@2x.png" />
          <div className={styles.web124} />
          <div className={styles.tokyo}>TOKYO</div>
        </div>
        <div className={styles.cityCardAix}>
          <div className={styles.cityCard5}>
            <img className={styles.web111Icon} alt="" src="/web11-1@2x.png" />
            <div className={styles.web125} />
            <div className={styles.aix}>AIX</div>
          </div>
        </div>
        <div className={styles.cityCardFrame}>
          <div className={styles.cityCard6}>
            <img className={styles.web121Icon} alt="" src="/web12-1@2x.png" />
            <div className={styles.web126} />
            <div className={styles.vienna}>VIENNA</div>
          </div>
        </div>
        <div className={styles.cityCard7}>
          <img className={styles.web91Icon} alt="" src="/web9-1@2x.png" />
          <div className={styles.web127} />
          <div className={styles.dubai}>DUBAI</div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent2;
