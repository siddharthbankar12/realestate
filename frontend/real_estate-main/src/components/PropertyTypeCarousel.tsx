import React, { useRef } from "react";
import styles from "./PropertyTypeCarousel.module.css";
import { useNavigate } from "react-router-dom";

interface PropertyTypeCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const PropertyTypeCard: React.FC<PropertyTypeCardProps> = ({
  title,
  description,
  imageSrc,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/properties?type=${title}`);
  };
  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={imageSrc} alt={title} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

const PropertyTypeCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const propertyTypes = [
    {
      title: "Independent House",
      description: "1,400+ Properties",
      imageSrc: "/villa.png",
    },
    {
      title: "Independent Builder Floor",
      description: "210+ Properties",
      imageSrc: "/builder.jpg",
    },
    {
      title: "Plots",
      description: "800+ Properties",
      imageSrc: "/istockphoto.png",
    },
    {
      title: "Apartments",
      description: "300+ Properties",
      imageSrc: "/Delhi.png",
    },
    {
      title: "Studio Apartments",
      description: "150+ Properties",
      imageSrc: "/Delhi.png",
    },
    {
      title: "Luxury Villas",
      description: "70+ Properties",
      imageSrc: "/villa.png",
    },
  ];

  return (
    <div className={styles.carousel}>
      <h2 className={styles.carouselTitle}>APARTMENTS, VILLAS AND MORE</h2>
      <div className={styles.cardsContainer} ref={carouselRef}>
        {propertyTypes.map((property, index) => (
          <PropertyTypeCard
            key={index}
            title={property.title}
            description={property.description}
            imageSrc={property.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyTypeCarousel;
