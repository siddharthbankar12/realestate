import React from 'react';
import styles from './PlotProfileForm.module.css';

interface PlotProfileFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PlotProfileForm: React.FC<PlotProfileFormProps> = ({ formData, handleInputChange, nextStep, prevStep }) => {
  return (
    <div className={styles.formSection}>
      <button className={styles.backButton} onClick={prevStep}>Back</button>
      <h2>Plot Profile</h2>

      <div className={styles.plotArea}>
        <label>Plot Area</label>
        <div className={styles.plotAreaInput}>
          <input
            type="number"
            name="plotArea"
            value={formData.plotArea || ""}
            onChange={handleInputChange}
            placeholder="Enter Area"
          />
          <div className={styles.areastyles}>
          <select
            name="areaUnit"
            value={formData.areaUnit || "sq ft"}
            onChange={handleInputChange}
            className={styles.unitDropdown}
          >
            <option value="sq ft">Sq Ft</option>
            <option value="sq yard">Sq Yard</option>
            <option value="sq m">Sq M</option>
            <option value="acres">Acres</option>
            <option value="marla">Marla</option>
            <option value="cents">Cents</option>
          </select>
          </div>
        </div>
      </div>

      <div className={styles.floors}>
        <label>Floors allowed for Construction</label>
        <input
          type="number"
          name="noOfFloors"
          value={formData.noOfFloors || ""}
          onChange={handleInputChange}
          placeholder="No. of floors"
        />
      </div>

      <div className={styles.boundary}>
        <label>Is there a Boundary Wall around the property?</label>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="boundary"
              value="Yes"
              checked={formData.boundary === "Yes"}
              onChange={handleInputChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="boundary"
              value="No"
              checked={formData.boundary === "No"}
              onChange={handleInputChange}
            />
            No
          </label>
        </div>
      </div>

      <div className={styles.construction}>
        <label>Any construction on the property?</label>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="construction"
              value="Yes"
              checked={formData.construction === "Yes"}
              onChange={handleInputChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="construction"
              value="No"
              checked={formData.construction === "No"}
              onChange={handleInputChange}
            />
            No
          </label>
        </div>
      </div>

      <div className={styles.possession}>
        <label>Expected Possession by</label>
        <input
          type="text"
          name="possessionDate"
          value={formData.possessionDate || ""}
          onChange={handleInputChange}
          placeholder="Month and year"
        />
      </div>

      <div className={styles.ownershipType}>
        <label>Ownership Type</label>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="ownership"
              value="Freehold"
              checked={formData.ownership === "Freehold"}
              onChange={handleInputChange}
            />
            Freehold
          </label>
          <label>
            <input
              type="radio"
              name="ownership"
              value="Leasehold"
              checked={formData.ownership === "Leasehold"}
              onChange={handleInputChange}
            />
            Leasehold
          </label>
          <label>
            <input
              type="radio"
              name="ownership"
              value="Co-operative Society"
              checked={formData.ownership === "Co-operative Society"}
              onChange={handleInputChange}
            />
            Co-operative Society
          </label>
          <label>
            <input
              type="radio"
              name="ownership"
              value="Power of Attorney"
              checked={formData.ownership === "Power of Attorney"}
              onChange={handleInputChange}
            />
            Power of Attorney
          </label>
        </div>
      </div>

      <button className={styles.nextButton} onClick={nextStep}>Next</button>
    </div>
  );
};

export default PlotProfileForm;
