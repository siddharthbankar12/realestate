import { FunctionComponent } from "react";
import FrameComponent1 from "./FrameComponent1";
import styles from "./FrameComponent.module.css";

export type FrameComponentType = {
  className?: string;
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.desktop1Inner, className].join(" ")}>
      <div className={styles.frameParent}>
        <div className={styles.spaciousAndLargeGardenParent}>
          <div className={styles.spaciousAndLarge}>
            Spacious and Large Garden
          </div>
          <div className={styles.image2Parent}>
            <img
              className={styles.image2Icon}
              loading="lazy"
              alt=""
              src="/image-2@2x.png"
            />
            <img
              className={styles.mapPinIcon}
              loading="lazy"
              alt=""
              src="/map-pin@2x.png"
            />
            <div className={styles.frameChild} />
          </div>
          <div className={styles.puneWrapper}>
            <div className={styles.pune}>Pune</div>
          </div>
          <div className={styles.frameItem} />
        </div>
        <FrameComponent1
          withItsOwnPool="With its Own Pool"
          image3="/image-3@2x.png"
          mumbai="Mumbai"
        />
        <FrameComponent1
          withItsOwnPool={`In Forest - Fresh & Clean air`}
          image3="/image-4@2x.png"
          mumbai="Nainital"
          propPadding="var(--padding-241xl) var(--padding-21xl) 0px"
          propWidth="unset"
          propAlignSelf="stretch"
          propLeft="17px"
          propPadding1="0px var(--padding-12xs) 0px var(--padding-11xl)"
        />
      </div>
    </div>
  );
};

export default FrameComponent;
