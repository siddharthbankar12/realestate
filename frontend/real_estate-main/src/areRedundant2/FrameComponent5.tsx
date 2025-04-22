import { FunctionComponent } from "react";
import styles from "./FrameComponent5.module.css";

export type FrameComponent5Type = {
  className?: string;
};

const FrameComponent5: FunctionComponent<FrameComponent5Type> = ({
  className = "",
}) => {
  return (
    <section className={[styles.propertyDetailsPageInner, className].join(" ")}>
      <div className={styles.homeUkLondonTheLyraParent}>
        <div className={styles.homeUk}>{`Home  > UK > London > The Lyra`}</div>
        <div className={styles.frameParent}>
          <div className={styles.propertyTitleParent}>
            <div className={styles.propertyTitle}>
              <div className={styles.typeWrapper}>
                <div className={styles.type}>Type</div>
              </div>
              <div className={styles.status}>Status</div>
              <div className={styles.areaWrapper}>
                <div className={styles.area}>Area</div>
              </div>
              <div className={styles.furnishingWrapper}>
                <div className={styles.furnishing}>Furnishing</div>
              </div>
              <div className={styles.headerNames}>
                <div className={styles.bedrooms}>Bedrooms</div>
              </div>
              <div className={styles.headerNames1}>
                <div className={styles.bathrooms}>Bathrooms</div>
              </div>
              <div className={styles.price}>Price</div>
            </div>
            <div className={styles.detailHeaders}>
              <div className={styles.typeAndPriceValues}>
                <div className={styles.starsParent}>
                  <img
                    className={styles.starsIcon}
                    loading="lazy"
                    alt=""
                    src="/stars.svg"
                  />
                  <div className={styles.headerNames2}>
                    <div className={styles.reviews}>4.0 (131 reviews)</div>
                  </div>
                </div>
              </div>
              <div className={styles.starsAndCount}>
                <div className={styles.headerNames3}>
                  <div className={styles.apartment}>Apartment</div>
                </div>
                <div className={styles.headerNames4}>
                  <div className={styles.readyToMove}>Ready to move</div>
                </div>
                <div className={styles.ft}> 189.45 ft²</div>
                <div className={styles.reviewCount}>
                  <div className={styles.furnished}>Furnished</div>
                </div>
                <div className={styles.typeAndPriceValues1}>
                  <b className={styles.b}>4</b>
                </div>
                <div className={styles.typeAndPriceValues2}>
                  <b className={styles.b1}>2</b>
                </div>
                <div className={styles.div}> £ 390000</div>
              </div>
            </div>
          </div>
          <img
            className={styles.web141Icon}
            loading="lazy"
            alt=""
            src="/web14-1@2x.png"
          />
          <div className={styles.amenityLabelsOne}>
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

export default FrameComponent5;
