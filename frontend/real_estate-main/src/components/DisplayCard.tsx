import { FunctionComponent } from "react";
import styles from "./DisplayCard.module.css";

export type DisplayCardType = {
    title: string;
    city: string;
    imageUrl?: string;
    className?: string;
    onDisplayCardContainerClick?: () => void;
};

const DisplayCard: FunctionComponent<DisplayCardType> = ({
    title,
    city,
    imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Deras-TreeHouse.JPG/242px-Deras-TreeHouse.JPG",
    className = ""
}) => {
  
    return (
        <div className={[styles.displayCard, className].join(" ")}>
            <img className={styles.image} alt={title} src={imageUrl} />
            <div className={styles.title}>{title}</div>
            <div className={styles.location}>
                <img className={styles.mapPinIcon} alt="Location" src="/map-pin@2x.png" />
                <div className={styles.city}>{city}</div>
            </div>
        </div>
    );
};

export default DisplayCard;
