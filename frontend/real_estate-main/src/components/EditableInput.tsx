import React, { ChangeEvent, FC } from 'react';
import styles from './EditableInput.module.css';

interface EditableInputProps {
  isEditable: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, field: string) => void;
  errorMessage?: string; // Optional error message prop
}

const EditableInput: FC<EditableInputProps> = ({ isEditable, value, onChange, errorMessage }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        className={`${styles.inputField} ${!isEditable ? styles.readOnly : ''}`}
        type="text"
        value={value}
        onChange={(e) => onChange(e, value)}
        readOnly={!isEditable}
      />
      {errorMessage && (
        <div className={styles.errorContainer}>
          <img src="error.svg" className={styles.error} />
          <div className={styles.errorMessage}>
            {errorMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableInput;
