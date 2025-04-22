import { FunctionComponent } from "react";
import styles from "./FrameComponent41.module.css";

export type FrameComponent4Type = {
  className?: string;
};

const FrameComponent4: FunctionComponent<FrameComponent4Type> = ({
  className = "",
}) => {
  return (
    <section className={[styles.locationDetailsWrapper, className].join(" ")}>
      <div className={styles.locationDetails}>
        <b className={styles.location}>Location</b>
        <div className={styles.locationImage}>
          <img
            className={styles.image13Icon}
            loading="lazy"
            alt=""
            src="/image-13@2x.png"
          />
          <div className={styles.locationAddress}>
            <div className={styles.portalWNorth}>
              1 Portal W North Acton, London, England W3 6BX
            </div>
          </div>
        </div>
        <img
          className={styles.locationOnMap}
          alt=""
          src="/location-on-map@2x.png"
        />
      </div>
    </section>
  );
};

export default FrameComponent4;
