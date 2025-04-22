import { FunctionComponent } from "react";
import styles from "./FrameComponent5.module.css";

export type FrameComponent5Type = {
  className?: string;
};

const FrameComponent5: FunctionComponent<FrameComponent5Type> = ({
  className = "",
}) => {
  return (
    <section className={[styles.galleryWrapper, className].join(" ")}>
      <div className={styles.gallery}>
        <div className={styles.galleryHeader}>
          <div className={styles.galleryTitle}>
            <b className={styles.gallery1}>{`Gallery `}</b>
          </div>
          <div className={styles.imageSlider}>
            <div className={styles.web183Wrapper}>
              <img
                className={styles.web183Icon}
                loading="lazy"
                alt=""
                src="/web18-3@2x.png"
              />
            </div>
            <img
              className={styles.web162Icon}
              loading="lazy"
              alt=""
              src="/web16-2@2x.png"
            />
            <img
              className={styles.web211Icon}
              loading="lazy"
              alt=""
              src="/web21-1@2x.png"
            />
          </div>
        </div>
        <div className={styles.thumbnailSlider}>
          <div className={styles.web191Wrapper}>
            <img
              className={styles.web191Icon}
              loading="lazy"
              alt=""
              src="/web19-1@2x.png"
            />
          </div>
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
        </div>
      </div>
    </section>
  );
};

export default FrameComponent5;
