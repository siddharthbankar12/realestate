import { FunctionComponent } from "react";
import styles from "./FacilitiesAndAmenities.module.css";

export type FacilitiesAndAmenitiesType = {
  className?: string;
};

const FacilitiesAndAmenities: FunctionComponent<FacilitiesAndAmenitiesType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.facilitiesAndAmenities, className].join(" ")}>
      <b className={styles.facilitiesAndAmenities1}>Facilities and Amenities</b>
      <div className={styles.lobby}>Lobby</div>
      <div className={styles.elevator}>Elevator</div>
      <div className={styles.laundryRoom}>Laundry Room</div>
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
      <div className={styles.studyRoom}>Study Room</div>
      <img
        className={styles.image7Icon}
        loading="lazy"
        alt=""
        src="/image-7@2x.png"
      />
      <img
        className={styles.image8Icon}
        loading="lazy"
        alt=""
        src="/image-8@2x.png"
      />
      <div className={styles.reception}>Reception</div>
      <div className={styles.wifiConnectivity}>Wifi Connectivity</div>
      <div className={styles.basketballCourt}>Basketball Court</div>
      <div className={styles.cctv}>CCTV</div>
      <img
        className={styles.image9Icon}
        loading="lazy"
        alt=""
        src="/image-9@2x.png"
      />
      <img
        className={styles.image10Icon}
        loading="lazy"
        alt=""
        src="/image-10@2x.png"
      />
      <img
        className={styles.image11Icon}
        loading="lazy"
        alt=""
        src="/image-11@2x.png"
      />
    </div>
  );
};

export default FacilitiesAndAmenities;
