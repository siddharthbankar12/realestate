import React, { useRef, useState, useEffect } from "react";
import styles from "./EmergingLocalities.module.css";
import LocalityCard from "./LocalityCard";

interface Locality {
  id: number;
  name: string;
  rating: number;
  projects: number;
  imageUrl: string;
}

const EmergingLocalities: React.FC = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [localities, setLocalities] = useState<Locality[]>([]);

  useEffect(() => {
    const response = [
      {
        id: 1,
        name: "Madhurawada",
        rating: 4.3,
        projects: 17,
        imageUrl: "image.png",
      },
      {
        id: 2,
        name: "Banjara Hills",
        rating: 4.5,
        projects: 12,
        imageUrl: "image.png",
      },
      {
        id: 3,
        name: "Gachibowli",
        rating: 4.2,
        projects: 8,
        imageUrl: "image.png",
      },
      {
        id: 4,
        name: "Kukatpally",
        rating: 4.0,
        projects: 10,
        imageUrl: "image.png",
      },
      {
        id: 5,
        name: "Jubilee Hills",
        rating: 4.6,
        projects: 15,
        imageUrl: "image.png",
      },
    ];
    setLocalities(response);
  }, []);

  return (
    <>
      <div className={styles.head}>
        <h2>Emerging Localities</h2>
        <p>Localities with recent development in this city</p>
      </div>

      <div className={styles.carouselContainer}>
        <div className={styles.carouselViewport} ref={viewportRef}>
          <div className={styles.carousel}>
            {localities.map((locality) => (
              <LocalityCard
                key={locality.id}
                name={locality.name}
                rating={locality.rating}
                projects={locality.projects}
                imageUrl={locality.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmergingLocalities;
