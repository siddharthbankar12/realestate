import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FrameComponent11.module.css";
import LottieAnimation from "./LottieAnimation";

export type FrameComponent1Type = {
  className?: string;
};

const FrameComponent1: FunctionComponent<FrameComponent1Type> = ({
  className = "",
}) => {
  const navigate = useNavigate();

  const onHomeButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div
      className={[styles.emptyStateIllustrationConteParent, className].join(
        " "
      )}
    >
      <div className={styles.emptyStateIllustrationConte}>
        <div className={styles.httpslottiefilescomanimatWrapper}>
          <LottieAnimation animationLink="https://lottie.host/fc9fb0d0-1766-4e25-8483-ba9f9fa545f6/rNwcjg5a6Q.json" style={{ width: 500, height: 400 }} />
        </div>
        <div className={styles.youHaventViewedAnythingYeWrapper}>
          <div className={styles.youHaventViewed}>
            You haven’t viewed anything yet!
          </div>
        </div>
        <div className={styles.allTheProperties}>
          All the properties and projects that you have viewed will start
          appearing here. Search or explore cities now.
        </div>
      </div>
    </div>
  );
};

export default FrameComponent1;
