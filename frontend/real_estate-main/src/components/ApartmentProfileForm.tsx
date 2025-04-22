import React from 'react';
import styles from './ApartmentProfileForm.module.css';

const ApartmentProfileForm = ({
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

      <h2>Apartment Profile</h2>

      <div className={styles.bedrooms}>
        <label>Number of Bedrooms</label>
        <input
          type="number"
          name="numberOfBedrooms"
          value={formData.numberOfBedrooms || ""}
          onChange={handleInputChange}
          placeholder="0"
        />
      </div>

      <div className={styles.bathrooms}>
        <label>Number of Bathrooms</label>
        <input
          type="number"
          name="numberOfBathrooms"
          value={formData.numberOfBathrooms || ""}
          onChange={handleInputChange}
          placeholder="0"
        />
      </div>

      <div className={styles.balconies}>
        <label>Number of Balconies</label>
        <input
          type="number"
          name="numberOfBalconies"
          value={formData.numberOfBalconies || ""}
          onChange={handleInputChange}
          placeholder="0"
        />
      </div>

      {/* Area Details with Dropdown for Units */}
      <div className={styles.areaDetails}>
        <label>Add Area Details</label>
        <div className={styles.areaDetailsInput}>
          <input
            type="number"
            name="areaDetails"
            value={formData.areaDetails || ""}
            onChange={handleInputChange}
            placeholder="Enter Area"
          />
          <div className={styles.areastyle}>
          {/* <span className={styles.selectedUnit}>
            {formData.areaUnit || "sq ft"}
          </span> */}
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

      <div className={styles.area}>
        <div className={styles.areaLabel}>
        <label>Other Rooms (optional)</label>
        </div>
        <div className={styles.areaInput}>
          <label>
            <input
              type="checkbox"
              name="studyRoom"
              checked={formData.studyRoom || false}
              onChange={handleCheckboxChange}
            />
            Study Room
          </label>
          <label>
            <input
              type="checkbox"
              name="poojaRoom"
              checked={formData.poojaRoom || false}
              onChange={handleCheckboxChange}
            />
            Pooja Room
          </label>
          <label>
            <input
              type="checkbox"
              name="servantRoom"
              checked={formData.servantRoom || false}
              onChange={handleCheckboxChange}
            />
            Servant Room
          </label>
          <label>
            <input
              type="checkbox"
              name="storeRoom"
              checked={formData.storeRoom || false}
              onChange={handleCheckboxChange}
            />
            Store Room
          </label>
        </div>
      </div>

      <div className={styles.floorDetails}>
        <div className={styles.floorlabel}>
        <label>Floor Details</label>
        </div>
        <div className={styles.floorInput}>
          <input
            type="number"
            name="totalFloorDetails"
            value={formData.totalFloorDetails || ""}
            onChange={handleInputChange}
            placeholder="Total Floors"
          />
          <input
            type="number"
            name="propertyFloorDetails"
            value={formData.propertyFloorDetails || ""}
            onChange={handleInputChange}
            placeholder="Property on Floor"
          />
        </div>
      </div>

      <div className={styles.availability}>
        <div className={styles.availabilityLabel}>
        <label>Availability Status</label>
        </div>
        <div className={styles.availabilityInput}>
          <label>
            <input
              type="radio"
              name="availability"
              value="Ready to move"
              checked={formData.availability === "Ready to move"}
              onChange={handleInputChange}
            />
            Ready to move
          </label>
          <label>
            <input
              type="radio"
              name="availability"
              value="Under construction"
              checked={formData.availability === "Under construction"}
              onChange={handleInputChange}
            />
            Under construction
          </label>
        </div>
      </div>

      {formData.availability === "Ready to move" && (
        <div className={styles.ageOfProperty}>
          <div className={styles.ageLabel}>
          <label>Age of Property</label>
          </div>
          <input
            type="number"
            name="ageOfProperty"
            value={formData.ageOfProperty || ""}
            onChange={handleInputChange}
            placeholder="Age of property in years"
          />
        </div>
      )}

      {formData.availability === "Under construction" && (
        <div className={styles.possessionDate}>
          <div className={styles.posessionLabel}>
          <label>Possession Date</label>
          </div>
          <input
            type="date"
            name="possessionDate"
            value={formData.possessionDate || ""}
            onChange={handleInputChange}
          />
        </div>
      )}

      <div className={styles.ownershipType}>
      <div className={styles.ownershipLabel}>
        <label>Ownership Type</label>
        </div>
        <div className={styles.ownershipTypeInput}>
          <label>
            <input
              type="radio"
              name="ownershipType"
              value="Freehold"
              checked={formData.ownershipType === "Freehold"}
              onChange={handleInputChange}
            />
            Freehold
          </label>
          <label>
            <input
              type="radio"
              name="ownershipType"
              value="Leasehold"
              checked={formData.ownershipType === "Leasehold"}
              onChange={handleInputChange}
            />
            Leasehold
          </label>
          <label>
            <input
              type="radio"
              name="ownershipType"
              value="Co-operative Society"
              checked={formData.ownershipType === "Co-operative Society"}
              onChange={handleInputChange}
            />
            Co-operative Society
          </label>
          <label>
            <input
              type="radio"
              name="ownershipType"
              value="Power of Attorney"
              checked={formData.ownershipType === "Power of Attorney"}
              onChange={handleInputChange}
            />
            Power of Attorney
          </label>
        </div>
      </div>

      <button className={styles.nextButton} onClick={handleSubmit}>
        Next
      </button>
    </div>
  );
};

export default ApartmentProfileForm;
