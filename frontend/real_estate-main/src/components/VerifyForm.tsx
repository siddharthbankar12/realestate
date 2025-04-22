import React, { FunctionComponent } from "react";
import styles from "./VerifyForm.module.css";

interface Property {
  _id: string;
  Propreiter_name: string;
  Propreiter_email: string;
  Propreiter_contact: string;
}

interface VerifyPropertiesFormProps {
  properties: Property[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

const VerifyPropertiesForm: FunctionComponent<VerifyPropertiesFormProps> = ({
  properties,
  onAccept,
  onReject,
}) => {
  return (
    <div className={styles.verifyPropertiesForm}>
      <div className={styles.heading}>
        <b>Verify Properties</b>
      </div>
      {properties.map((property) => (
        <div key={property._id} className={styles.formContainer}>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor={`propreiterName-${property._id}`}>
                Proprietor Name
              </label>
              <input
                type="text"
                id={`propreiterName-${property._id}`}
                value={property.Propreiter_name}
                readOnly
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor={`propreiterContact-${property._id}`}>
                Proprietor Contact
              </label>
              <input
                type="text"
                id={`propreiterContact-${property._id}`}
                value={property.Propreiter_contact}
                readOnly
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor={`propreiterEmail-${property._id}`}>
                Proprietor Email
              </label>
              <input
                type="email"
                id={`propreiterEmail-${property._id}`}
                value={property.Propreiter_email}
                readOnly
              />
            </div>
            <div className={styles.formButtons}>
              <button
                type="button"
                className={`${styles.btn} ${styles.accept}`}
                onClick={() => onAccept(property._id)}
              >
                Accept
              </button>
              <button
                type="button"
                className={`${styles.btn} ${styles.reject}`}
                onClick={() => onReject(property._id)}
              >
                Reject
              </button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
};

export default VerifyPropertiesForm;
