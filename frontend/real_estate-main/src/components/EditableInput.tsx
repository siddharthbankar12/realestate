import React, { ChangeEvent, FC } from "react";
import styles from "./EditableInput.module.css";

interface EditableInputProps {
  isEditable: boolean;
  value: string;
  field: string; // ✅ Added field
  onChange: (e: ChangeEvent<HTMLInputElement>, field: string) => void;
  errorMessage?: string;
}

const EditableInput: FC<EditableInputProps> = ({
  isEditable,
  value,
  field,
  onChange,
  errorMessage,
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        className={`${styles.inputField} ${!isEditable ? styles.readOnly : ""}`}
        type="text"
        value={value}
        onChange={(e) => onChange(e, field)} // ✅ Correctly pass field name
        readOnly={!isEditable}
      />
      {errorMessage && (
        <div className={styles.errorContainer}>
          <img src="error.svg" className={styles.error} />
          <div className={styles.errorMessage}>{errorMessage}</div>
        </div>
      )}
    </div>
  );
};

export default EditableInput;
