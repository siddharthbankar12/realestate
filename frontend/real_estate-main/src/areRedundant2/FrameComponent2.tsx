import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./FrameComponent2.module.css";

export type FrameComponentType = {
  className?: string;
  bathroom?: string;
  bathroomPlaceholder?: string;

  /** Style props */
  propBorderRadius?: CSSProperties["borderRadius"];
  propPadding?: CSSProperties["padding"];
  propBorderRadius1?: CSSProperties["borderRadius"];
  propWidth?: CSSProperties["width"];
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
  bathroom,
  bathroomPlaceholder,
  propBorderRadius,
  propPadding,
  propBorderRadius1,
  propWidth,
}) => {
  const frameDiv6Style: CSSProperties = useMemo(() => {
    return {
      borderRadius: propBorderRadius,
      padding: propPadding,
    };
  }, [propBorderRadius, propPadding]);

  const rectangleDiv1Style: CSSProperties = useMemo(() => {
    return {
      borderRadius: propBorderRadius1,
    };
  }, [propBorderRadius1]);

  const bathroomStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <div className={[styles.bathroomParent, className].join(" ")}>
      <div className={styles.bathroom}>{bathroom}</div>
      <div className={styles.rectangleParent} style={frameDiv6Style}>
        <div className={styles.frameChild} style={rectangleDiv1Style} />
        <input
          className={styles.bathroom1}
          placeholder={bathroomPlaceholder}
          type="text"
          style={bathroomStyle}
        />
      </div>
    </div>
  );
};

export default FrameComponent;
