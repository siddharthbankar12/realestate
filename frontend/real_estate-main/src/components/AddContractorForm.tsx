import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./AddContractorForm.module.css";

interface PortfolioEntry {
  title: string;
  description: string;
  images: File[];
  completedOn: string;
  location: string;
}

// Add the props interface
interface AddContractorFormProps {
  onContractorAdded: () => void;
}

const AddContractorForm: React.FC<AddContractorFormProps> = ({ onContractorAdded }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    serviceType: "Civil" as
      | "Civil"
      | "Electrical"
      | "Plumbing"
      | "Full Construction"
      | "Interior"
      | "Other",
  });

  const [portfolioEntries, setPortfolioEntries] = useState<PortfolioEntry[]>([
    { title: "", description: "", images: [], completedOn: "", location: "" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePortfolioChange = (
    index: number,
    field: keyof PortfolioEntry,
    value: string
  ) => {
    const updatedEntries = [...portfolioEntries];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };
    setPortfolioEntries(updatedEntries);
  };

  const handleImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Validate file types
      const validFiles = files.filter(
        (file) =>
          file.type.startsWith("image/") &&
          ["image/jpeg", "image/png", "image/webp"].includes(file.type)
      );

      if (validFiles.length !== files.length) {
        toast.error("Only JPG, PNG, and WEBP images are allowed");
      }

      // Validate total images per project (max 5)
      const currentImages = portfolioEntries[index].images;
      const newTotal = currentImages.length + validFiles.length;

      if (newTotal > 5) {
        toast.error("Maximum 5 images per project");
        return;
      }

      const updatedEntries = [...portfolioEntries];
      updatedEntries[index] = {
        ...updatedEntries[index],
        images: [...currentImages, ...validFiles],
      };
      setPortfolioEntries(updatedEntries);
    }
  };

  const removeImage = (entryIndex: number, imageIndex: number) => {
    const updatedEntries = [...portfolioEntries];
    const images = [...updatedEntries[entryIndex].images];
    images.splice(imageIndex, 1);
    updatedEntries[entryIndex] = { ...updatedEntries[entryIndex], images };
    setPortfolioEntries(updatedEntries);
  };

  const addPortfolioEntry = () => {
    setPortfolioEntries((prev) => [
      ...prev,
      { title: "", description: "", images: [], completedOn: "", location: "" },
    ]);
  };

  const removePortfolioEntry = (index: number) => {
    if (portfolioEntries.length > 1) {
      setPortfolioEntries((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.location.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    for (const entry of portfolioEntries) {
      if (
        !entry.title.trim() ||
        !entry.description.trim() ||
        !entry.location.trim() ||
        !entry.completedOn
      ) {
        toast.error(
          "Please fill in all required fields for portfolio projects"
        );
        return;
      }
    }

    setIsSubmitting(true);

    // Create FormData to handle file uploads
    const formPayload = new FormData();

    // Append main form data
    formPayload.append("name", formData.name);
    formPayload.append("phone", formData.phone);
    formPayload.append("email", formData.email || "");
    formPayload.append("location", formData.location);
    formPayload.append("serviceType", formData.serviceType);

    // Append portfolio entries
    portfolioEntries.forEach((entry, index) => {
      formPayload.append(`portfolio[${index}][title]`, entry.title);
      formPayload.append(`portfolio[${index}][description]`, entry.description);
      formPayload.append(`portfolio[${index}][completedOn]`, entry.completedOn);
      formPayload.append(`portfolio[${index}][location]`, entry.location);

      // Append each image file
      entry.images.forEach((file) => {
        formPayload.append(`portfolio[${index}][images]`, file);
      });
    });

    try {
      const response = await fetch("http://localhost:8000/api/contractor", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Contractor added successfully!");
        // Call the callback instead of navigating directly
        onContractorAdded();
      } else {
        throw new Error(data.message || "Failed to add contractor");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while adding contractor");
      console.error("Add contractor error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add New Contractor</h2>
      <form onSubmit={handleSubmit} className={styles.contractorForm}>
        <div className={styles.formGroup}>
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Service Type *</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
          >
            <option value="Civil">Civil</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Full Construction">Full Construction</option>
            <option value="Interior">Interior</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className={styles.portfolioSection}>
          <h3>Portfolio Projects</h3>

          {portfolioEntries.map((entry, index) => (
            <div key={index} className={styles.portfolioEntry}>
              <div className={styles.portfolioHeader}>
                <h4>Project #{index + 1}</h4>
                {portfolioEntries.length > 1 && (
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removePortfolioEntry(index)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Project Title *</label>
                <input
                  type="text"
                  value={entry.title}
                  onChange={(e) =>
                    handlePortfolioChange(index, "title", e.target.value)
                  }
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description *</label>
                <textarea
                  value={entry.description}
                  onChange={(e) =>
                    handlePortfolioChange(index, "description", e.target.value)
                  }
                  required
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Location *</label>
                <input
                  type="text"
                  value={entry.location}
                  onChange={(e) =>
                    handlePortfolioChange(index, "location", e.target.value)
                  }
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Completion Date *</label>
                <input
                  type="date"
                  value={entry.completedOn}
                  onChange={(e) =>
                    handlePortfolioChange(index, "completedOn", e.target.value)
                  }
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Project Images (Max 5)</label>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg, image/png, image/webp"
                  onChange={(e) => handleImageUpload(index, e)}
                />
                <p className={styles.imageNote}>
                  {entry.images.length}/5 images selected. Only JPG, PNG, and
                  WEBP formats are allowed.
                </p>

                {entry.images.length > 0 && (
                  <div className={styles.filePreview}>
                    {entry.images.map((file, imageIndex) => (
                      <div key={imageIndex} className={styles.imageItem}>
                        <span>{file.name}</span>
                        <button
                          type="button"
                          className={styles.removeImageButton}
                          onClick={() => removeImage(index, imageIndex)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            className={styles.addButton}
            onClick={addPortfolioEntry}
          >
            + Add Another Project
          </button>
        </div>

        <div className={styles.formActions}>
          {/* <button
            type="button"
            className={styles.cancelButton}
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Cancel
          </button> */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Contractor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContractorForm;