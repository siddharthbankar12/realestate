import { FunctionComponent } from "react";
import styles from "./Amenities.module.css";

export type AmenitiesType = {
  className?: string;
};

const Amenities: FunctionComponent<AmenitiesType> = ({ className = "" }) => {
  return (
    <section className={[styles.amenities, className].join(" ")}>
      <div className={styles.facilitiesAndAmenitiesParent}>
        <b className={styles.facilitiesAndAmenities}>
          Facilities and Amenities
        </b>
        <div className={styles.amenitiesContent}>
          <div className={styles.amenitiesGallery}>
            <div className={styles.amenitySliderParent}>
              <div className={styles.amenitySlider}>
                <div className={styles.amenityItems}>
                  <div className={styles.div}>🔄</div>
                  <img
                    className={styles.image5Icon}
                    loading="lazy"
                    alt=""
                    src="/image-5@2x.png"
                  />
                  <img
                    className={styles.image6Icon}
                    loading="lazy"
                    alt=""
                    src="/image-61@2x.png"
                  />
                  <img
                    className={styles.image8Icon}
                    loading="lazy"
                    alt=""
                    src="/image-8@2x.png"
                  />
                </div>
              </div>
              <div className={styles.amenityLabels}>
                <div className={styles.laundryRoom}>Laundry Room</div>
                <div className={styles.elevator}>Elevator</div>
                <div className={styles.studyRoom}>Study Room</div>
                <div className={styles.lobby}>Lobby</div>
              </div>
            </div>
          </div>
          <div className={styles.amenityImagesGrid}>
            <div className={styles.imageRow}>
              <div className={styles.imageColumn}>
                <div className={styles.imageCell}>
                  <div className={styles.amenityImageWrapper}>
                    <div className={styles.amenityImageContainer}>
                      <img
                        className={styles.image7Icon}
                        loading="lazy"
                        alt=""
                        src="/image-7@2x.png"
                      />
                    </div>
                    <img
                      className={styles.image9Icon}
                      loading="lazy"
                      alt=""
                      src="/image-9@2x.png"
                    />
                  </div>
                </div>
                <img
                  className={styles.image11Icon}
                  loading="lazy"
                  alt=""
                  src="/image-11@2x.png"
                />
              </div>
              <div className={styles.additionalAmenities}>
                <div className={styles.reception}>Reception</div>
                <div className={styles.connectivity}>
                  <div className={styles.wifiConnectivity}>
                    Wifi Connectivity
                  </div>
                  <div className={styles.cctv}>CCTV</div>
                </div>
              </div>
            </div>
            <div className={styles.image10Parent}>
              <img
                className={styles.image10Icon}
                loading="lazy"
                alt=""
                src="/image-10@2x.png"
              />
              <div className={styles.basketballCourtLabel}>
                <div className={styles.basketballCourt}>Basketball Court</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
