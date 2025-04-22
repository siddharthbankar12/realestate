import { FunctionComponent } from "react";
import FrameComponent1 from "../areRedundant2/FrameComponent1";
import styles from "./Desktop.module.css";

export type DesktopType = {
  className?: string;
};

const Desktop: FunctionComponent<DesktopType> = ({ className = "" }) => {
  return (
    <div className={[styles.desktop1, className].join(" ")}>
      <div className={styles.frameParent}>
        <div className={styles.frameWrapper}>
          <div className={styles.propertyDetailsParent}>
            <h1 className={styles.propertyDetails}>PROPERTY DETAILS</h1>
            <div className={styles.locationHighlight}>
              <div className={styles.allAwesomePopular}>
                ALL AWESOME POPULAR LOCATION
              </div>
            </div>
          </div>
        </div>
        <div className={styles.propertyFeatures}>
          <div className={styles.areaIconsParent}>
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
          <div className={styles.featureRowOne}>
            <div className={styles.carIconWrapper}>
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
          <div className={styles.frameGroup}>
            <div className={styles.bedroomWrapper}>
              <div className={styles.bedroom}>
                <div className={styles.bedroomChild} />
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
          <div className={styles.frameContainer}>
            <div className={styles.swimmingPoolIconWrapper}>
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
          <div className={styles.familyIconParent}>
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
      <div className={styles.desktop1Inner}>
        <div className={styles.frameDiv}>
          <div className={styles.image2Parent}>
            <img
              className={styles.image2Icon}
              loading="lazy"
              alt=""
              src="/image-2@2x.png"
            />
            <div className={styles.frameChild} />
            <div className={styles.featuredPropertyOneDetails}>
              <div className={styles.frameParent1}>
                <div className={styles.spaciousAndLargeGardenWrapper}>
                  <div className={styles.spaciousAndLarge}>
                    Spacious and Large Garden
                  </div>
                </div>
                <div className={styles.areaDetails}>
                  <img
                    className={styles.mapPinIcon}
                    loading="lazy"
                    alt=""
                    src="/map-pin@2x.png"
                  />
                  <div className={styles.puneWrapper}>
                    <div className={styles.pune}>Pune</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameItem} />
          </div>
          <FrameComponent1
            image3="/image-3@2x.png"
            withItsOwnPool="With its Own Pool"
            mumbai="Mumbai"
          />
          <FrameComponent1
            image3="/image-4@2x.png"
            withItsOwnPool={`In Forest - Fresh & Clean air`}
            mumbai="Nainital"
            propPadding="var(--padding-smi) var(--padding-6xs) var(--padding-8xs) var(--padding-4xs)"
            featuredPropertyTwoDetailWidth="278px"
            featuredPropertyTwoDetailPadding="0px var(--padding-5xs)"
            frameDivWidth="unset"
            frameDivPadding="0px 0px 0px var(--padding-4xl)"
            frameDivAlignSelf="stretch"
            frameDivPadding1="var(--padding-5xs) 0px 0px"
          />
        </div>
      </div>
    </div>
  );
};

export default Desktop;
