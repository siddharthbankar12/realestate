import { FunctionComponent } from "react";
import PropertyCardOne from "../components/PropertyCardOne";
import styles from "./FrameComponent.module.css";

export type FrameComponentType = {
  className?: string;
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
}) => {
  return (
    <section
      className={[styles.similarPropertiesContainerWrapper, className].join(
        " "
      )}
    >
      <div className={styles.similarPropertiesContainer}>
        <b className={styles.similarProperties}>Similar Properties</b>
        <div className={styles.similarPropertiesList}>
          <div className={styles.similarPropertyCards}>
            <div className={styles.propertyCardDetails}>
              <img
                className={styles.web11Icon}
                loading="lazy"
                alt=""
                src="/web1-1@2x.png"
              />
              <div className={styles.coppermakerSquareLondonContainer}>
                <p className={styles.coppermakerSquareLondon}>
                  Coppermaker Square, London
                </p>
                <p className={styles.blankLine}>&nbsp;</p>
                <p className={styles.from3723month}>From £3,723/month</p>
              </div>
            </div>
            <PropertyCardOne
              web21="/web2-1@2x.png"
              oVOArenaBuildingLondon="OVO Arena Building, London"
              from2195month="From £2,195/month"
            />
            <div className={styles.propertyCardDetails1}>
              <img
                className={styles.web31Icon}
                loading="lazy"
                alt=""
                src="/web3-1@2x.png"
              />
              <div className={styles.chapterIslingtonLondonContainer}>
                <p className={styles.chapterIslingtonLondon}>
                  Chapter Islington, London
                </p>
                <p className={styles.blankLine1}>&nbsp;</p>
                <p className={styles.from390week}>From £390/week</p>
              </div>
            </div>
            <PropertyCardOne
              web21="/web4-1@2x.png"
              oVOArenaBuildingLondon="The Lyra, London"
              from2195month="From £390/week"
              propPadding="var(--padding-7xs) 0px 0px"
              propHeight="82px"
              propDisplay="inline-block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent;
