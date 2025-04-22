import React from 'react';
import styles from './PropertyProfileForm.module.css';

interface PropertyProfileFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PropertyProfileForm: React.FC<PropertyProfileFormProps> = ({ formData, handleInputChange, nextStep, prevStep }) => {
  return (
    <div className={styles.formSection}>
      <h2>Property Profile</h2>
      <input
        type="text"
        name="bhk"
        value={formData.bhk}
        onChange={handleInputChange}
        placeholder="BHK"
      />
      <input
        type="text"
        name="area"
        value={formData.area}
        onChange={handleInputChange}
        placeholder="Area (in sq. m)"
      />
      <select name="type" value={formData.type} onChange={handleInputChange}>
        <option value="residential">Residential</option>
        <option value="commercial">Commercial</option>
      </select>
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default PropertyProfileForm;
