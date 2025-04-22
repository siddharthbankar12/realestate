import { FunctionComponent } from "react";
import ImageInput from "./ImageInput";
import TypeStatusOptions from "./TypeStatusOptions";
import styles from "./ListingHeader.module.css";

export type ListingHeaderType = {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  selectedImages: File[];
};

const ListingHeader: FunctionComponent<ListingHeaderType> = ({
  formData,
  handleInputChange,
  handleImageChange,
  handleRemoveImage,
  selectedImages
}) => {
  return (
    <div className={styles.listingHeader}>
      <div className={styles.listYourPropertyWrapper}>
        <h1 className={styles.listYourProperty}>List your property</h1>
      </div>
      <div className={styles.imageInputParent}>
        <ImageInput
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
          selectedImages={selectedImages}
        />
        <TypeStatusOptions formData={formData} handleInputChange={handleInputChange} />
      </div>
    </div>
  );
};

export default ListingHeader;
