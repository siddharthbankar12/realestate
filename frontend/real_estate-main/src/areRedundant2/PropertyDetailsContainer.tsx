import { FunctionComponent } from "react";
import styles from "./PropertyDetailsContainer.module.css";

export type PropertyDetailsContainerType = {
  className?: string;
};

const PropertyDetailsContainer: FunctionComponent<
  PropertyDetailsContainerType
> = ({ className = "" }) => {
  return (
    <div className={[styles.propertyDetailsContainer, className].join(" ")}>
      <div className={styles.propertyDetail}>
        <div className={styles.propertyTitle}>
          <h1 className={styles.propertyDetails}>PROPERTY DETAILS</h1>
          <div className={styles.allAwesomePopularLocationWrapper}>
            <div className={styles.allAwesomePopular}>
              ALL AWESOME POPULAR LOCATION
            </div>
          </div>
        </div>
      </div>
      <div className={styles.propertyFeatures}>
        <div className={styles.frameParent}>
          <div className={styles.areaFeatureWrapper}>
            <div className={styles.areaFeature}>
              <div className={styles.areaFeatureChild} />
              <img
                className={styles.cutPaperIcon}
                loading="lazy"
                alt=""
                src="/cut-paper@2x.png"
              />
            </div>
          </div>
          <div className={styles.squareFeet}>Square Feet : 3200</div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.garageFeatureWrapper}>
            <div className={styles.garageFeature}>
              <div className={styles.garageFeatureChild} />
              <img
                className={styles.carIcon}
                loading="lazy"
                alt=""
                src="/car@2x.png"
              />
            </div>
          </div>
          <div className={styles.garageYesContainer}>
            <p className={styles.garage}>{`Garage : `}</p>
            <p className={styles.yes}>Yes</p>
          </div>
        </div>
        <div className={styles.frameContainer}>
          <div className={styles.bedroomFeatureWrapper}>
            <div className={styles.bedroomFeature}>
              <div className={styles.bedroomFeatureChild} />
              <img
                className={styles.bedroomIcon}
                loading="lazy"
                alt=""
                src="/bedroom@2x.png"
              />
            </div>
          </div>
          <div className={styles.bedRoomContainer}>
            <p className={styles.bedRoom}>Bed Room :</p>
            <p className={styles.p}> 3</p>
          </div>
        </div>
        <div className={styles.familyDescriptionParent}>
          <div className={styles.familyDescription}>
            <div className={styles.poolFeature}>
              <div className={styles.poolFeatureChild} />
              <img
                className={styles.swimmingPoolIcon}
                loading="lazy"
                alt=""
                src="/swimming-pool@2x.png"
              />
            </div>
          </div>
          <div className={styles.swimmingPoolContainer}>
            <p className={styles.swimming}>Swimming</p>
            <p className={styles.poolYes}>Pool : Yes</p>
          </div>
        </div>
        <div className={styles.frameDiv}>
          <div className={styles.rectangleParent}>
            <div className={styles.frameChild} />
            <img
              className={styles.fullFamilyIcon}
              loading="lazy"
              alt=""
              src="/full-family@2x.png"
            />
          </div>
          <div className={styles.idealForFamily}>Ideal For Family</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsContainer;
