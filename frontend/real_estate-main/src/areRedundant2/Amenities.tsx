import { FunctionComponent } from "react";
import EmailPhoneParent from "../components/EmailPhoneParent";
import styles from "./Amenities.module.css";

export type AmenitiesType = {
  className?: string;
};

const Amenities: FunctionComponent<AmenitiesType> = ({ className = "" }) => {
  return (
    <section className={[styles.amenities, className].join(" ")}>
      <div className={styles.similarPropertiesParent}>
        <b className={styles.similarProperties}>Similar Properties</b>
        <div className={styles.submitParent}>
          <div className={styles.amenitiesContainer}>
            <div className={styles.web11Parent}>
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
            <EmailPhoneParent
              web21="/web2-1@2x.png"
              oVOArenaBuildingLondon="OVO Arena Building, London"
              from2195month="From £2,195/month"
            />
            <div className={styles.web31Parent}>
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
            <EmailPhoneParent
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

export default Amenities;
