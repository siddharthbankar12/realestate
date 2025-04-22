import { FunctionComponent } from "react";
import styles from "./FrameComponent6.module.css";

export type FrameComponent6Type = {
  className?: string;
};

const FrameComponent6: FunctionComponent<FrameComponent6Type> = ({
  className = "",
}) => {
  return (
    <section className={[styles.breadcrumbWrapper, className].join(" ")}>
      <div className={styles.breadcrumb}>
        <div className={styles.homeUk}>{`Home  > UK > London > The Lyra`}</div>
        <div className={styles.propertyInfo}>
          <div className={styles.propertyDetails}>
            <div className={styles.propertyAttributes}>
              <div className={styles.attributeLabels}>
                <div className={styles.type}>Type</div>
              </div>
              <div className={styles.status}>Status</div>
              <div className={styles.attributeLabels1}>
                <div className={styles.area}>Area</div>
              </div>
              <div className={styles.furnishingLabel}>
                <div className={styles.furnishing}>Furnishing</div>
              </div>
              <div className={styles.attributeLabels2}>
                <div className={styles.bedrooms}>Bedrooms</div>
              </div>
              <div className={styles.attributeLabels3}>
                <div className={styles.bathrooms}>Bathrooms</div>
              </div>
              <div className={styles.price}>Price</div>
            </div>
            <div className={styles.rating}>
              <div className={styles.ratingStars}>
                <div className={styles.starsParent}>
                  <img
                    className={styles.starsIcon}
                    loading="lazy"
                    alt=""
                    src="/stars.svg"
                  />
                  <div className={styles.reviewsCount}>
                    <div className={styles.reviews}>4.0 (131 reviews)</div>
                  </div>
                </div>
              </div>
              <div className={styles.propertySummary}>
                <div className={styles.summaryValues}>
                  <div className={styles.apartment}>Apartment</div>
                </div>
                <div className={styles.summaryValues1}>
                  <div className={styles.readyToMove}>Ready to move</div>
                </div>
                <div className={styles.ft}> 189.45 ft²</div>
                <div className={styles.summaryValues2}>
                  <div className={styles.furnished}>Furnished</div>
                </div>
                <div className={styles.summaryValues3}>
                  <div className={styles.div}>4</div>
                </div>
                <div className={styles.summaryValues4}>
                  <div className={styles.div1}>2</div>
                </div>
                <div className={styles.div2}> £ 390000</div>
              </div>
            </div>
          </div>
          <img
            className={styles.web141Icon}
            loading="lazy"
            alt=""
            src="/web14-1@2x.png"
          />
          <div className={styles.propertyTitle}>
            <h2 className={styles.theLyra}>The Lyra</h2>
            <div
              className={styles.portalNorthAction}
            >{`Portal North Action, London, England `}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent6;
