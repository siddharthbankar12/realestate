import { FunctionComponent } from "react";
import styles from "./BuilderPropertyCard.module.css";

export type PropertyCardType = {
  title: string;
  city: string;
  price: string;
  pid: string;
  area: string;
  imageUrl?: string;
  className?: string;
  status?: string;
  onSoldUpdate?: () => void;
  onPropertyCardContainerClick?: () => void;
};

const BuilderPropertyCard: FunctionComponent<PropertyCardType> = ({
  title,
  city,
  price,
  area,
  imageUrl = "/image-4@2x.png",
  className = "",
  pid,
  status,
  onSoldUpdate,
}) => {
  const isSold = status?.toLowerCase() === "sold";

  const formatPrice = (price: string) => {
    const num = Number(price);
    if (num >= 10000000) return `Rs. ${(num / 10000000).toFixed(1)} Cr`;
    if (num >= 100000) return `Rs. ${(num / 100000).toFixed(1)} Lakh`;
    return `Rs. ${num.toLocaleString()}`;
  };

  const handleBuyNowClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/property/${pid}/sold`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update property status");
      }

      onSoldUpdate && onSoldUpdate();
    } catch (error) {
      console.log("Error updating property status:", error);
    }
  };

  return (
    <div
      className={[
        styles.propertyCard,
        className,
        isSold ? styles.sold : "",
      ].join(" ")}
    >
      <img
        className={styles.image}
        alt={title}
        src={imageUrl}
        style={{ filter: isSold ? "blur(4px)" : "none" }}
      />
      <div
        className={styles.information}
        style={{ filter: isSold ? "blur(4px)" : "none" }}
      >
        <div className={styles.title}>{title}</div>
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
            <div className={styles.area}>{area} acres</div>
            <div className={styles.price}>{formatPrice(price)}</div>
          </div>
        </div>
      </div>
      {isSold ? (
        <div className={styles.soldWatermark}>SOLD</div>
      ) : (
        <button className={styles.check} onClick={handleBuyNowClick}>
          Mark as Sold
        </button>
      )}
    </div>
  );
};

export default BuilderPropertyCard;
