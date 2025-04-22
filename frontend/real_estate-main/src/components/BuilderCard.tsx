import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BuilderCard.module.css";

export type BuilderCardType = {
  name: string;
  properties: string;
  imageUrl?: string;
  className?: string;
  onBuilderCardContainerClick?: () => void;
};

const BuilderCard: FunctionComponent<BuilderCardType> = ({
  name,
  properties,
    imageUrl = "/builder.jpeg", // Default image URL
  className = "",
  onBuilderCardContainerClick,
}) => {
  return (
    <div className={[styles.builderCard, className].join(" ")}>
      <img className={styles.image} alt={name} src={imageUrl} />
      <div className={styles.information}>
        <div className={styles.name}>{name}</div>
        <div className={styles.properties}>{properties}</div>
      </div>
    </div>
  );
};

export default BuilderCard;
