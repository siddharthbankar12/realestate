import React from 'react';
import styles from './BasicDetailsForm.module.css';

interface BasicDetailsFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  nextStep: () => void;
}

const BasicDetailsForm: React.FC<BasicDetailsFormProps> = ({ formData, handleInputChange, nextStep }) => {
  const handleNextStep = () => {
    if (formData.title && formData.purpose && formData.propertyType && formData.description) {
      nextStep();
    } else {
      alert('Please fill in all the fields before proceeding.');
    }
  };

  return (
    <div className={styles.formSection}>
      <h2>Basic Details</h2>
      <div className={styles.propertyTitle}>
        <div className={styles.propertyTitleName}>Catchy Title</div>
        <div className={styles.propertyTitleInput}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Catchy Property Title"
            required
          />
        </div>
      </div>
      <div className={styles.propertyType}>
        <div className={styles.propertyTypeName}>I'm looking to..</div>
        <div className={styles.propertyTypeInput}>
          <label>
            <input
              type="radio"
              name="purpose"
              value="Sell"
              checked={formData.purpose === 'Sell'}
              onChange={handleInputChange}
              required
            />
            Sell
          </label>
          <label>
            <input
              type="radio"
              name="purpose"
              value="Rent/Lease"
              checked={formData.purpose === 'Rent/Lease'}
              onChange={handleInputChange}
              required
            />
            Rent/Lease
          </label>
        </div>
      </div>
      <div className={styles.propertyTypeDetails}>
        <div className={styles.propertyTypeDetailsName}>What kind of property do you have?</div>
        <div className={styles.propertyTypeDetailsInput}>
          <label>
            <input
              type="radio"
              name="propertyType"
              value="Apartment"
              checked={formData.propertyType === 'Apartment'}
              onChange={handleInputChange}
              required
            />
            Apartment
          </label>
          <label>
            <input
              type="radio"
              name="propertyType"
              value="Plot"
              checked={formData.propertyType === 'Plot'}
              onChange={handleInputChange}
              required
            />
            Plot
          </label>
          <label>
            <input
              type="radio"
              name="propertyType"
              value="House"
              checked={formData.propertyType === 'House'}
              onChange={handleInputChange}
              required
            />
            House
          </label>
        </div>
      </div>
      <div className={styles.propertyDescription}>
        <div className={styles.propertyDescriptionName}>How would you describe your property?</div>
        <div className={styles.propertyDescriptionInput}>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
        </div>
      </div>
      
      <button onClick={handleNextStep}>Next</button>
    </div>
  );
};

export default BasicDetailsForm;
