import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FrameComponent4.module.css";
import LottieAnimation from "./LottieAnimation";

export type FrameComponentType = {
  className?: string;
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
}) => {
  const navigate = useNavigate();

  const onHomeContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={[styles.emptyStateWrapper, className].join(" ")}>
      <div className={styles.emptyState}>
        <div className={styles.httpslottiefilescomanimatWrapper}>
          <LottieAnimation animationLink="https://lottie.host/69e157cb-db54-4f03-b411-e105a2b76125/2bWLBAXZpM.json" style={{ width: 400, height: 280 }} />
        </div>
        <div className={styles.emptyMessage}>
          <div className={styles.youHaventSaved}>
            You haven’t saved any property lately!
          </div>
        </div>
        <div className={styles.allTheProperties}>
          All the properties and projects that you have saved will start
          appearing here. Search or explore cities now.
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
