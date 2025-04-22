import React from 'react';
import styles from './PhotosForm.module.css';

interface PhotosFormProps {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  selectedImages: File[];
  nextStep: () => void;
  prevStep: () => void;  // Ensure this prop is passed correctly
}

const PhotosForm: React.FC<PhotosFormProps> = ({
  handleImageChange,
  handleRemoveImage,
  selectedImages,
  nextStep,
  prevStep
}) => {
  const handleNextStep = () => {
    if (selectedImages.length >= 4) {
        nextStep();
    } else {
        alert('Please upload at least 4 media items before proceeding.');
    }
};


  return (
    <div className={styles.formSection}>
      {/* Ensure the function prevStep is properly passed and working */}
      <button className={styles.backButton} onClick={prevStep}>Back</button>
      <h2>Photos and Videos</h2>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleImageChange}
        multiple
      />
      <div className={styles.imagePreview}>
        {selectedImages.map((image, index) => (
          <div key={index} className={styles.imageContainer}>
            <img
              className={styles.thumbnail}
              src={URL.createObjectURL(image)}
              alt={`preview ${index}`}
            />
            <button onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button className={styles.nextButton} onClick={handleNextStep}>Next</button>
    </div>
  );
};

export default PhotosForm;
