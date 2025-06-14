import React from "react";
import styles from "./PricingForm.module.css";

interface PricingFormProps {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const PricingForm: React.FC<PricingFormProps> = ({
  formData,
  handleInputChange,
  prevStep,
  handleSubmit,
  loading,
}) => {
  const validateForm = () => {
    if (
      !formData.price ||
      !formData.proprietorName ||
      !formData.proprietorEmail ||
      !formData.proprietorPhone ||
      !formData.posterType
    ) {
      alert("Please fill in all the required fields before submitting.");
      return false;
    }
    return true;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.formSection}>
      <button className={styles.backButton} onClick={prevStep}>
        Back
      </button>
      <h2>Pricing and Other Details</h2>
      <div className={styles.twoColumnLayout}>
        <div className={styles.partOne}>
          <div className={styles.priceDetails}>
            <div className={styles.priceDetailsName}>Price</div>
            <div className={styles.priceDetailsInput}>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price in Indian Rupee"
              />
            </div>
          </div>

          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                name="allInclusivePrice"
                checked={formData.allInclusivePrice}
                onChange={handleInputChange}
              />
              All Inclusive Price
            </label>
            <label>
              <input
                type="checkbox"
                name="taxAndGovtChargesExcluded"
                checked={formData.taxAndGovtChargesExcluded}
                onChange={handleInputChange}
              />
              Tax and Govt. Charges Excluded
            </label>
            <label>
              <input
                type="checkbox"
                name="priceNegotiable"
                checked={formData.priceNegotiable}
                onChange={handleInputChange}
              />
              Price Negotiable
            </label>
          </div>

          <div className={styles.amenitiesDetails}>
            <div className={styles.amenitiesDetailsName}>Amenities</div>
            <div className={styles.amenitiesDetailsInput}>
              <textarea
                name="amenities"
                value={formData.amenities}
                onChange={handleInputChange}
                placeholder="List of amenities"
                rows={3}
              />
            </div>
          </div>
        </div>
        <div className={styles.partOne}>
          <div className={styles.proprietorDetails}>
            <div className={styles.proprietorDetailsName}>Contact Details</div>
            <div className={styles.proprietorName}>Name</div>
            <div className={styles.proprietorNameInput}>
              <input
                name="proprietorName"
                value={formData.proprietorName}
                onChange={handleInputChange}
                placeholder="Enter Your Name"
              />
            </div>
            <div className={styles.proprietorEmail}>E-mail ID</div>
            <div className={styles.proprietorEmailInput}>
              <input
                name="proprietorEmail"
                value={formData.proprietorEmail}
                onChange={handleInputChange}
                placeholder="Enter Your E-mail ID"
              />
            </div>
            <div className={styles.proprietorContact}>Phone No.</div>
            <div className={styles.proprietorContactInput}>
              <input
                name="proprietorPhone"
                value={formData.proprietorPhone}
                onChange={handleInputChange}
                placeholder="Enter Your Phone Number"
              />
            </div>
          </div>

          <div className={styles.posterTypeDetails}>
            <div className={styles.posterTypeDetailsName}>You are:</div>
            <div className={styles.posterTypeDetailsInput}>
              <label>
                <input
                  type="radio"
                  name="posterType"
                  value="Owner"
                  checked={formData.posterType === "Owner"}
                  onChange={handleInputChange}
                  required
                />
                Owner
              </label>
              <label>
                <input
                  type="radio"
                  name="posterType"
                  value="Builder"
                  checked={formData.posterType === "Builder"}
                  onChange={handleInputChange}
                  required
                />
                Builder
              </label>
              <label>
                <input
                  type="radio"
                  name="posterType"
                  value="Agent"
                  checked={formData.posterType === "Agent"}
                  onChange={handleInputChange}
                  required
                />
                Agent
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles.buttons}> */}
      <button
        type="submit"
        className={styles.submitButton}
        onClick={handleFormSubmit}
        disabled={loading}
      >
        Submit
      </button>
      {/* </div> */}
      {loading && (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
          <span className={styles.loadingText}>Please wait, submitting...</span>
        </div>
      )}
    </div>
  );
};

export default PricingForm;
