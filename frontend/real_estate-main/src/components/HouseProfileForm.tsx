import React from 'react';
import styles from './HouseProfileForm.module.css';

const HouseProfileForm = ({
  formData,
  handleInputChange,
  nextStep,
  prevStep,
}) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    handleInputChange({
      ...e,
      target: {
        name,
        value: checked,
      },
    });
  };

  const handleSubmit = () => {
    const requiredFields = [
      "numberOfBedrooms",
      "numberOfBathrooms",
      "numberOfBalconies"
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert("Please fill in all the required fields before proceeding.");
        return;
      }
    }

    nextStep();
  };

  return (
    <div className={styles.formSection}>
      <button className={styles.backButton} onClick={prevStep}>
        Back
      </button>

      <h2>House Profile</h2>

      <div className={styles.twoColumnLayout}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Number of Bedrooms</label>
          <input
            type="number"
            name="numberOfBedrooms"
            value={formData.numberOfBedrooms || ""}
            onChange={handleInputChange}
            placeholder="0"
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Number of Bathrooms</label>
          <input
            type="number"
            name="numberOfBathrooms"
            value={formData.numberOfBathrooms || ""}
            onChange={handleInputChange}
            placeholder="0"
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Number of Balconies</label>
          <input
            type="number"
            name="numberOfBalconies"
            value={formData.numberOfBalconies || ""}
            onChange={handleInputChange}
            placeholder="0"
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          
            <label className={styles.formLabel}>Add Area Details</label>
            <div className={styles.areagroup}>
            <input
              type="number"
              name="areaDetails"
              value={formData.areaDetails || ""}
              onChange={handleInputChange}
              placeholder="Enter Area"
              className={styles.formInput}
            />
            <div className={styles.areastyle}>
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

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Floor Details</label>
          <div className={styles.doubleInputContainer}>
            <input
              type="number"
              name="totalFloorDetails"
              value={formData.totalFloorDetails || ""}
              onChange={handleInputChange}
              placeholder="Total Floors"
              className={styles.formInput}
            />
            <input
              type="number"
              name="propertyFloorDetails"
              value={formData.propertyFloorDetails || ""}
              onChange={handleInputChange}
              placeholder="Property on Floor"
              className={styles.formInput}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Other Rooms (optional)</label>
          <div className={styles.checkboxGroup}>
            <label className={styles.inlineLabel}>
              <input
                type="checkbox"
                name="studyRoom"
                checked={formData.studyRoom || false}
                onChange={handleCheckboxChange}
                className={styles.checkbox}
              />
              Study Room
            </label>
            <label className={styles.inlineLabel}>
              <input
                type="checkbox"
                name="poojaRoom"
                checked={formData.poojaRoom || false}
                onChange={handleCheckboxChange}
                className={styles.checkbox}
              />
              Pooja Room
            </label>
            <label className={styles.inlineLabel}>
              <input
                type="checkbox"
                name="servantRoom"
                checked={formData.servantRoom || false}
                onChange={handleCheckboxChange}
                className={styles.checkbox}
              />
              Servant Room
            </label>
            <label className={styles.inlineLabel}>
              <input
                type="checkbox"
                name="storeRoom"
                checked={formData.storeRoom || false}
                onChange={handleCheckboxChange}
                className={styles.checkbox}
              />
              Store Room
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Availability Status</label>
          <div className={styles.radioGroup}>
            <label className={styles.inlineLabel}>
              <input
                type="radio"
                name="availability"
                value="Ready to move"
                checked={formData.availability === "Ready to move"}
                onChange={handleInputChange}
                className={styles.radio}
              />
              Ready to move
            </label>
            <label className={styles.inlineLabel}>
              <input
                type="radio"
                name="availability"
                value="Under construction"
                checked={formData.availability === "Under construction"}
                onChange={handleInputChange}
                className={styles.radio}
              />
              Under construction
            </label>
          </div>
        </div>

        {formData.availability === "Ready to move" && (
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Age of Property (in years)</label>
            <input
              type="number"
              name="ageOfProperty"
              value={formData.ageOfProperty || ""}
              onChange={handleInputChange}
              placeholder="0"
              className={styles.formInput}
            />
          </div>
        )}

        {formData.availability === "Under construction" && (
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Possession by</label>
            <input
              type="date"
              name="possessionBy"
              value={formData.possessionBy || ""}
              onChange={handleInputChange}
              className={styles.formInput}
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Ownership</label>
          <div className={styles.radioGroup}>
            <label className={styles.inlineLabel}>
              <input
                type="radio"
                name="ownership"
                value="Freehold"
                checked={formData.ownership === "Freehold"}
                onChange={handleInputChange}
                className={styles.radio}
                required
              />
              Freehold
            </label>
            <label className={styles.inlineLabel}>
              <input
                type="radio"
                name="ownership"
                value="Leasehold"
                checked={formData.ownership === "Leasehold"}
                onChange={handleInputChange}
                className={styles.radio}
                required
              />
              Leasehold
            </label>
            <label className={styles.inlineLabel}>
              <input
                type="radio"
                name="ownership"
                value="Co-operative Society"
                checked={formData.ownership === "Co-operative Society"}
                onChange={handleInputChange}
                className={styles.radio}
                required
              />
              Co-operative Society
            </label>
            <label className={styles.inlineLabel}>
              <input
                type="radio"
                name="ownership"
                value="Power of Attorney"
                checked={formData.ownership === "Power of Attorney"}
                onChange={handleInputChange}
                className={styles.radio}
                required
              />
              Power of Attorney
            </label>
          </div>
        </div>
      </div>
      <button className={styles.nextButton} onClick={handleSubmit}>
          Next
        </button>
    </div>
  );
};

export default HouseProfileForm;
