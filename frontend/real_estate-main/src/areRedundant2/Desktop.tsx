import { FunctionComponent } from "react";
import FrameComponent1 from "./FrameComponent1";
import styles from "./Desktop.module.css";

export type DesktopType = {
  className?: string;
};

const Desktop: FunctionComponent<DesktopType> = ({ className = "" }) => {
  return (
    <section className={[styles.desktop1, className].join(" ")}>
      <div className={styles.propertyDetailsWrapper}>
        <h1 className={styles.propertyDetails}>PROPERTY DETAILS</h1>
      </div>
      <div className={styles.propertyHighlightsWrapper}>
        <div className={styles.propertyHighlights}>
          <div className={styles.locationHighlight}>
            <div className={styles.allAwesomePopular}>
              ALL AWESOME POPULAR LOCATION
            </div>
          </div>
          <div className={styles.areaHighlight}>
            <div className={styles.areaDetails}>
              <div className={styles.areaIcons}>
                <div className={styles.areaIconsChild} />
                <img
                  className={styles.cutPaperIcon}
                  loading="lazy"
                  alt=""
                  src="/cut-paper@2x.png"
                />
              </div>
              <div className={styles.squareFeet}>Square Feet : 3200</div>
            </div>
            <div className={styles.garageHighlight}>
              <div className={styles.garageIcon}>
                <div className={styles.carIcon}>
                  <div className={styles.carIconChild} />
                  <img
                    className={styles.carIcon1}
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
            <div className={styles.bedroomHighlight}>
              <div className={styles.bedroomIcon}>
                <div className={styles.bedroom}>
                  <div className={styles.bedroomChild} />
                  <img
                    className={styles.bedroomIcon1}
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
            <div className={styles.poolHighlight}>
              <div className={styles.poolIcon}>
                <div className={styles.swimmingPoolIcon}>
                  <div className={styles.swimmingPoolIconChild} />
                  <img
                    className={styles.swimmingPoolIcon1}
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
            <div className={styles.familyHighlight}>
              <div className={styles.familyIcon}>
                <div className={styles.familyIconChild} />
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
      </div>
      <div className={styles.frameParent}>
        <div className={styles.spaciousAndLargeGardenParent}>
          <div className={styles.spaciousAndLarge}>
            Spacious and Large Garden
          </div>
          <div className={styles.mapAndLocation}>
            <img
              className={styles.image2Icon}
              loading="lazy"
              alt=""
              src="/image-2@2x.png"
            />
            <img
              className={styles.mapPinIcon}
              loading="lazy"
              alt=""
              src="/map-pin2@2x.png"
            />
            <div className={styles.mapAndLocationChild} />
          </div>
          <div className={styles.puneWrapper}>
            <div className={styles.pune}>Pune</div>
          </div>
          <div className={styles.frameChild} />
        </div>
        <FrameComponent1
          withItsOwnPool="With its Own Pool"
          image3="/image-3@2x.png"
          mumbai="Mumbai"
        />
        <FrameComponent1
          withItsOwnPool={`In Forest - Fresh & Clean air`}
          image3="/image-4@2x.png"
          mumbai="Nainital"
          propPadding="var(--padding-241xl) var(--padding-21xl) 0px"
          propWidth="unset"
          propAlignSelf="stretch"
          propLeft="17px"
          propPadding1="0px var(--padding-12xs) 0px var(--padding-11xl)"
        />
      </div>
    </section>
  );
};

export default Desktop;
