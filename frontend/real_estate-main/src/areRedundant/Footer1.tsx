import { FunctionComponent } from "react";
import styles from "./Footer1.module.css";

export type Footer1Type = {
  className?: string;
};

const Footer1: FunctionComponent<Footer1Type> = ({ className = "" }) => {
  return (
    <section className={[styles.rectangleParent, className].join(" ")}>
      <div className={styles.frameChild} />
      <div className={styles.customerContainer}>
        <h2
          className={styles.realEstateAround}
        >{`REAL ESTATE AROUND THE GLOBE `}</h2>
      </div>
      <div className={styles.leftContent}>
        <div className={styles.sellingBuyingContent}>
          <div className={styles.futureSellingBuying}>
            <div className={styles.reviewer}>
              <img
                className={styles.vectorIcon}
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
            <img
              className={styles.imagePlaceholderIcon}
              loading="lazy"
              alt=""
              src="/rectangle-39@2x.png"
            />
          </div>
          <div className={styles.theFutureOfSellingAndBuyiParent}>
            <h2 className={styles.theFutureOf}>
              THE FUTURE OF SELLING AND BUYING
            </h2>
            <div className={styles.descriptionContainer}>
              <div
                className={styles.contraryToPopular}
              >{`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular....................                                   `}</div>
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
        <div className={styles.readMoreWrapper}>
          <div className={styles.readMore}>READ MORE</div>
        </div>
      </div>
    </section>
  );
};

export default Footer1;
