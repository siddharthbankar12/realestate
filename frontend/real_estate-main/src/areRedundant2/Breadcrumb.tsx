import { FunctionComponent } from "react";
import styles from "./Breadcrumb.module.css";

export type BreadcrumbType = {
  className?: string;
};

const Breadcrumb: FunctionComponent<BreadcrumbType> = ({ className = "" }) => {
  return (
    <section className={[styles.breadcrumb, className].join(" ")}>
      <div className={styles.facilitiesAndAmenitiesParent}>
        <b className={styles.facilitiesAndAmenities}>
          Facilities and Amenities
        </b>
        <div className={styles.propertyInfo}>
          <div className={styles.propertyInfoInner}>
            <div className={styles.frameParent}>
              <div className={styles.frameWrapper}>
                <div className={styles.parent}>
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
              <div className={styles.amenityIcons}>
                <div className={styles.laundryRoom}>Laundry Room</div>
                <div className={styles.elevator}>Elevator</div>
                <div className={styles.studyRoom}>Study Room</div>
                <div className={styles.lobby}>Lobby</div>
              </div>
            </div>
          </div>
          <div className={styles.iconAndLabelOne}>
            <div className={styles.frameGroup}>
              <div className={styles.frameContainer}>
                <div className={styles.connectivityLabelsWrapper}>
                  <div className={styles.connectivityLabels}>
                    <div className={styles.galleryHeader}>
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
              <div className={styles.receptionParent}>
                <div className={styles.reception}>Reception</div>
                <div className={styles.wifiConnectivityParent}>
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
              <div className={styles.basketballCourtWrapper}>
                <div className={styles.basketballCourt}>Basketball Court</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
