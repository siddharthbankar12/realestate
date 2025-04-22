import { FunctionComponent } from "react";
import styles from "./GalleryAndDescription.module.css";

export type GalleryAndDescriptionType = {
  className?: string;
};

const GalleryAndDescription: FunctionComponent<GalleryAndDescriptionType> = ({
  className = "",
}) => {
  return (
    <section className={[styles.galleryAndDescription, className].join(" ")}>
      <div className={styles.descriptionContainer}>
        <b className={styles.location}>Location</b>
        <div className={styles.image13Parent}>
          <img
            className={styles.image13Icon}
            loading="lazy"
            alt=""
            src="/image-13@2x.png"
          />
          <div className={styles.receptionImageContainer}>
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

export default GalleryAndDescription;
