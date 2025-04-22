import React from 'react';
import styles from './LocationDetailsForm.module.css';

interface LocationDetailsFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const LocationDetailsForm: React.FC<LocationDetailsFormProps> = ({ formData, handleInputChange, nextStep, prevStep }) => {
  const handleNextStep = () => {
    if (formData.city && formData.address && formData.landmark) {
      nextStep();
    } else {
      alert('Please fill in all the fields before proceeding.');
    }
  };

  const handlePrevStep = () => {
    console.log('Back button clicked'); // Debugging log
    prevStep(); // Ensure this function is working correctly
  };
  
  return (
    <div className={styles.formSection}>
      <button className={styles.backButton} onClick={prevStep}>Back</button>
      <h2>Location Details</h2>
      <div className={styles.city}>
        <div className={styles.cityName}>City</div>
        <div className={styles.cityInput}>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
          />
        </div>
      </div>
      <div className={styles.address}>
        <div className={styles.addressName}>Address</div>
        <div className={styles.addressInput}>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
          />
        </div>
      </div>
      <div className={styles.addressLandmark}>
        <div className={styles.addressLandmarkName}>Landmark</div>
        <div className={styles.addressLandmarkInput}>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleInputChange}
            placeholder="Landmark"
          />
        </div>
      </div>
      <button className={styles.nextButton} onClick={handleNextStep}>Next</button>
    </div>
  );
};

export default LocationDetailsForm;
