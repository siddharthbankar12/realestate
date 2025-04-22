import { FunctionComponent } from "react";
import styles from "./ListingForm.module.css";
import ImageInput from "./ImageInput";
import TypeStatusOptions from "./TypeStatusOptions";

export type ListingFormProps = {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  selectedImages: File[];
};

const ListingForm: FunctionComponent<ListingFormProps> = ({
  formData,
  handleInputChange,
  handleImageChange,
  handleRemoveImage,
  selectedImages
}) => {
  return (
    <div className={styles.listingHeader}>
      <div className={styles.listYourPropertyWrapper}>
        <h1 className={styles.listYourProperty}>Rent your property</h1>
      </div>
      <div className={styles.imageInputParent}>
        <ImageInput
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
          selectedImages={selectedImages}
        />
        <TypeStatusOptions
          formData={formData}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default ListingForm;
