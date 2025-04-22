import { FunctionComponent } from "react";
import styles from "./Footer1.module.css";

export type Footer1Type = {
  className?: string;
};

const Footer1: FunctionComponent<Footer1Type> = ({ className = "" }) => {
  return (
    <section className={[styles.rectangleParent, className].join(" ")}>
      <section className={styles.frameChild} />
      <div className={styles.realEstateTitle}>
        <h2
          className={styles.realEstateAround}
        >{`REAL ESTATE AROUND THE GLOBE `}</h2>
      </div>
      <div className={styles.futureContainerParent}>
        <div className={styles.futureContainer}>
          <div className={styles.futureContent}>
            <div className={styles.futureTitle}>
              <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            </div>
            <img
              className={styles.imagePlaceholderIcon}
              loading="lazy"
              alt=""
              src="/rectangle-39@2x.png"
            />
          </div>
          <div className={styles.futureDescription}>
            <h2 className={styles.theFutureOf}>
              THE FUTURE OF SELLING AND BUYING
            </h2>
            <div className={styles.loremIpsum}>
              <p
                className={styles.contraryToPopular}
              >{`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular....................                                   `}</p>
              <div className={styles.readMoreIconWrapper}>
                <img
                  className={styles.readMoreIcon}
                  alt=""
                  src="/vector-1.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.readMoreButton}>
          <div className={styles.readMore}>READ MORE</div>
        </div>
      </div>
    </section>
  );
};

export default Footer1;
