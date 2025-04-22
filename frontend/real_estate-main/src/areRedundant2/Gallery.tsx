import { FunctionComponent } from "react";
import styles from "./Gallery.module.css";

export type GalleryType = {
  className?: string;
};

const Gallery: FunctionComponent<GalleryType> = ({ className = "" }) => {
  return (
    <section className={[styles.gallery, className].join(" ")}>
      <img
        className={styles.web162Icon}
        loading="lazy"
        alt=""
        src="/web16-2@2x.png"
      />
      <img
        className={styles.web183Icon}
        loading="lazy"
        alt=""
        src="/web18-3@2x.png"
      />
      <img
        className={styles.web191Icon}
        loading="lazy"
        alt=""
        src="/web19-1@2x.png"
      />
      <img
        className={styles.web171Icon}
        loading="lazy"
        alt=""
        src="/web17-1@2x.png"
      />
      <img
        className={styles.web201Icon}
        loading="lazy"
        alt=""
        src="/web20-1@2x.png"
      />
      <b className={styles.gallery1}>{`Gallery `}</b>
      <img
        className={styles.web211Icon}
        loading="lazy"
        alt=""
        src="/web21-1@2x.png"
      />
    </section>
  );
};

export default Gallery;
