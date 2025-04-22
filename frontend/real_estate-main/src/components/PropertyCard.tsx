import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PropertyCard.module.css";

export type PropertyCardType = {
  title: string;
  city: string;
  price: string;
  area: string;
  bhk?: string;
  imageUrl?: string;
  className?: string;
  onPropertyCardContainerClick?: () => void;
};

const PropertyCard: FunctionComponent<PropertyCardType> = ({
  title,
  city,
  price,
  area,
  imageUrl = "/try3.jpg", // Default image URL
  className = "",
  bhk,
  onPropertyCardContainerClick,
}) => {
  return (
    <div className={[styles.propertyCard, className].join(" ")}>
      <img className={styles.image} alt={title} src={imageUrl} />
      <div className={styles.information}>
        <div className={styles.TitleContainer}>
          <div className={styles.title}>{title}</div>
          <div className={styles.title}>{bhk} BHK</div>
        </div>
        <div className={styles.frameParent}>
          <div className={styles.location}>
            <img
              className={styles.mapPinIcon}
              alt="Location"
              src="/map-pin2@2x.png"
            />
            <div className={styles.city}>{city}</div>
          </div>
          <div className={styles.details}>
            <div className={styles.area}>
              {area && `${area} acres`} {/* Render area only if it exists */}
            </div>
            <div className={styles.price}>Rs. {price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
