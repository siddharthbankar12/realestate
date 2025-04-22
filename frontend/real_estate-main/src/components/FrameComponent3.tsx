import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FrameComponent3.module.css";

export type FrameComponent3Type = {
  className?: string;
};

const FrameComponent3: FunctionComponent<FrameComponent3Type> = ({
  className = "",
}) => {
  const navigate = useNavigate();

  const onMostPopularPropertyCardClick = useCallback(() => {
    navigate("/property-details-page");
  }, [navigate]);

  return (
    <div className={[styles.popularProperties, className].join(" ")}>
      <div className={styles.popularCards}>
        <div className={styles.cardList}>
          <h2 className={styles.mostPopular}>Most Popular</h2>
          <div className={styles.mostPopularPropertyCardParent}>
            <div
              className={styles.mostPopularPropertyCard}
              onClick={onMostPopularPropertyCardClick}
            >
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
            <div className={styles.mostPopularPropertyCardWrapper}>
              <div
                className={styles.mostPopularPropertyCard1}
                onClick={onMostPopularPropertyCardClick}
              >
                <img
                  className={styles.web21Icon}
                  loading="lazy"
                  alt=""
                  src="/web2-1@2x.png"
                />
                <div className={styles.ovoArenaBuildingContainer}>
                  <p className={styles.ovoArenaBuilding}>
                    OVO Arena Building, London
                  </p>
                  <p className={styles.blankLine1}>&nbsp;</p>
                  <p className={styles.from2195month}>From £2,195/month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mostPopularPropertyCardContainer}>
          <div
            className={styles.mostPopularPropertyCard2}
            onClick={onMostPopularPropertyCardClick}
          >
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
              <p className={styles.blankLine2}>&nbsp;</p>
              <p className={styles.from390week}>From £390/week</p>
            </div>
          </div>
        </div>
        <div className={styles.viewMoreBtnParent}>
          <button className={styles.viewMoreBtn}>
            <div className={styles.viewMoreBtnChild} />
            <div className={styles.viewMore}>View More</div>
          </button>
          <div className={styles.mostPopularPropertyCardFrame}>
            <div
              className={styles.mostPopularPropertyCard3}
              onClick={onMostPopularPropertyCardClick}
            >
              <img
                className={styles.web41Icon}
                loading="lazy"
                alt=""
                src="/web4-11@2x.png"
              />
              <div className={styles.theLyraLondonContainer}>
                <p className={styles.theLyraLondon}>The Lyra, London</p>
                <p className={styles.blankLine3}>&nbsp;</p>
                <p className={styles.from390week1}>From £390/week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent3;
