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
  const [disableLeft, setDisableLeft] = useState(true);
  const [disableRight, setDisableRight] = useState(false);
  const [localities, setLocalities] = useState<Locality[]>([]);

  const scrollAmount = 300;

  const checkDisableButtons = () => {
    const el = viewportRef.current;
    if (!el) return;

    setDisableLeft(el.scrollLeft <= 1);

    setDisableRight(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  const scrollLeft = () => {
    const el = viewportRef.current;
    if (el) {
      el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const el = viewportRef.current;
    if (el) {
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
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
          name: "Madhurawada",
          rating: 4.3,
          projects: 17,
          imageUrl: "image.png",
        },
        {
          id: 5,
          name: "Banjara Hills",
          rating: 4.5,
          projects: 12,
          imageUrl: "image.png",
        },
        {
          id: 6,
          name: "Gachibowli",
          rating: 4.2,
          projects: 8,
          imageUrl: "image.png",
        },
        {
          id: 7,
          name: "Madhurawada",
          rating: 4.3,
          projects: 17,
          imageUrl: "image.png",
        },
        {
          id: 8,
          name: "Banjara Hills",
          rating: 4.5,
          projects: 12,
          imageUrl: "image.png",
        },
        {
          id: 9,
          name: "Gachibowli",
          rating: 4.2,
          projects: 8,
          imageUrl: "image.png",
        },
        {
          id: 10,
          name: "Madhurawada",
          rating: 4.3,
          projects: 17,
          imageUrl: "image.png",
        },
      ];

      setLocalities(response);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkDisableButtons);
    checkDisableButtons();

    return () => el.removeEventListener("scroll", checkDisableButtons);
  }, []);

  return (
    <>
      <div className={styles.head}>
        <h2>Emerging Localities</h2>
        <p>Localities with recent development in this city</p>
      </div>

      <div className={styles.carouselContainer}>
        <button
          className={styles.navButton}
          onClick={scrollLeft}
          disabled={disableLeft}
        >
          &lt;
        </button>

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

        <button
          className={styles.navButton}
          onClick={scrollRight}
          disabled={disableRight}
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default EmergingLocalities;
