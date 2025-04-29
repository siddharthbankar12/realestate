import { FunctionComponent, useMemo, CSSProperties } from "react";
import styles from "./FirstNameField.module.css";

// Define the types for the component props
export type FirstNameFieldType = {
  className?: string;
  firstName?: string;
  firstNamePlaceholder?: string;
  propMinWidth?: CSSProperties["minWidth"];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
};

const FirstNameField: FunctionComponent<FirstNameFieldType> = ({
  className = "",
  firstName,
  firstNamePlaceholder,
  propMinWidth,
  onChange, // Destructure onChange
}) => {
  const firstNameStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <div className={[styles.firstNameField, className].join(" ")}>
      <div className={styles.firstName} style={firstNameStyle}>
        {firstName}
      </div>
      <div className={styles.firstNameInput}>
        <div className={styles.firstNameInputChild} />
        <input
          className={styles.firstName1}
          placeholder={firstNamePlaceholder}
          type="text"
          value={firstName || ""}
          onChange={onChange}
          readOnly={!onChange}
        />
      </div>
    </div>
  );
};

export default FirstNameField;
