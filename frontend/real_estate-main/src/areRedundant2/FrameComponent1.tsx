import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./FrameComponent1.module.css";

export type FrameComponent1Type = {
  className?: string;
  image3?: string;
  withItsOwnPool?: string;
  mumbai?: string;

  /** Style props */
  propPadding?: CSSProperties["padding"];
  featuredPropertyTwoDetailWidth?: CSSProperties["width"];
  featuredPropertyTwoDetailPadding?: CSSProperties["padding"];
  frameDivWidth?: CSSProperties["width"];
  frameDivPadding?: CSSProperties["padding"];
  frameDivAlignSelf?: CSSProperties["alignSelf"];
  frameDivPadding1?: CSSProperties["padding"];
};

const FrameComponent1: FunctionComponent<FrameComponent1Type> = ({
  className = "",
  image3,
  withItsOwnPool,
  mumbai,
  propPadding,
  featuredPropertyTwoDetailWidth,
  featuredPropertyTwoDetailPadding,
  frameDivWidth,
  frameDivPadding,
  frameDivAlignSelf,
  frameDivPadding1,
}) => {
  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const featuredPropertyTwoDetailsStyle: CSSProperties = useMemo(() => {
    return {
      width: featuredPropertyTwoDetailWidth,
      padding: featuredPropertyTwoDetailPadding,
    };
  }, [featuredPropertyTwoDetailWidth, featuredPropertyTwoDetailPadding]);

  const frameDiv1Style: CSSProperties = useMemo(() => {
    return {
      width: frameDivWidth,
      padding: frameDivPadding,
      alignSelf: frameDivAlignSelf,
    };
  }, [frameDivWidth, frameDivPadding, frameDivAlignSelf]);

  const frameDiv2Style: CSSProperties = useMemo(() => {
    return {
      padding: frameDivPadding1,
    };
  }, [frameDivPadding1]);

  return (
    <div
      className={[styles.image3Parent, className].join(" ")}
      style={frameDivStyle}
    >
      <img className={styles.image3Icon} loading="lazy" alt="" src={image3} />
      <div className={styles.frameChild} />
      <div
        className={styles.featuredPropertyTwoDetails}
        style={featuredPropertyTwoDetailsStyle}
      >
        <div className={styles.frameParent}>
          <div className={styles.withItsOwnPoolWrapper} style={frameDiv1Style}>
            <div className={styles.withItsOwn}>{withItsOwnPool}</div>
          </div>
          <div className={styles.mapPinParent}>
            <img className={styles.mapPinIcon} alt="" src="/map-pin@2x.png" />
            <div className={styles.mumbaiWrapper} style={frameDiv2Style}>
              <div className={styles.mumbai}>{mumbai}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent1;
