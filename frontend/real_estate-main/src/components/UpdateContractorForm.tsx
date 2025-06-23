import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./UpdateContractorForm.module.css"; // reuse styles

interface PortfolioEntry {
  title: string;
  description: string;
  images: File[]; // new files
  existingImages: string[]; // URLs of existing uploaded images
  completedOn: string;
  location: string;
}

interface Contractor {
  _id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  serviceType: string;
  portfolio: {
    title: string;
    description: string;
    images: string[];
    completedOn: string;
    location: string;
  }[];
}

interface UpdateContractorFormProps {
  contractor: Contractor;
  onContractorUpdated: (updated: Contractor) => void;
}

const UpdateContractorForm: React.FC<UpdateContractorFormProps> = ({
  contractor,
  onContractorUpdated,
}) => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("role") === "admin";

  const [formData, setFormData] = useState({
    name: contractor.name,
    phone: contractor.phone,
    email: contractor.email,
    location: contractor.location,
    serviceType: contractor.serviceType as Contractor["serviceType"],
  });

  const [portfolioEntries, setPortfolioEntries] = useState<PortfolioEntry[]>(
    []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      toast.error("Unauthorized access");
      navigate(-1);
      return;
    }
    setPortfolioEntries(
      contractor.portfolio.map((p) => ({
        title: p.title,
        description: p.description,
        existingImages: p.images,
        images: [],
        completedOn: p.completedOn,
        location: p.location,
      }))
    );
  }, [contractor.portfolio, isAdmin, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePortfolioChange = (
    index: number,
    field: keyof Omit<PortfolioEntry, "images" | "existingImages">,
    value: string
  ) => {
    const updated = [...portfolioEntries];
    (updated[index] as any)[field] = value;
    setPortfolioEntries(updated);
  };

  const handleNewImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const valid = files.filter(
        (f) =>
          f.type.startsWith("image/") &&
          ["image/jpeg", "image/png", "image/webp"].includes(f.type)
      );
      if (valid.length !== files.length)
        toast.error("Only JPG, PNG, WEBP allowed");
      const updated = [...portfolioEntries];
      updated[index].images = [...updated[index].images, ...valid];
      setPortfolioEntries(updated);
    }
  };

  const removeExistingImage = (entryIndex: number, url: string) => {
    const updated = [...portfolioEntries];
    updated[entryIndex].existingImages = updated[
      entryIndex
    ].existingImages.filter((u) => u !== url);
    setPortfolioEntries(updated);
  };

  const removeNewImage = (entryIndex: number, idx: number) => {
    const updated = [...portfolioEntries];
    updated[entryIndex].images.splice(idx, 1);
    setPortfolioEntries(updated);
  };

  const addEntry = () => {
    setPortfolioEntries((prev) => [
      ...prev,
      {
        title: "",
        description: "",
        images: [],
        existingImages: [],
        completedOn: "",
        location: "",
      },
    ]);
  };

  const removeEntry = (i: number) => {
    if (portfolioEntries.length > 1)
      setPortfolioEntries((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = new FormData();
    payload.append("_method", "PUT");
    payload.append("name", formData.name);
    payload.append("phone", formData.phone);
    payload.append("email", formData.email);
    payload.append("location", formData.location);
    payload.append("serviceType", formData.serviceType);

    portfolioEntries.forEach((entry, idx) => {
      payload.append(`portfolio[${idx}][title]`, entry.title);
      payload.append(`portfolio[${idx}][description]`, entry.description);
      payload.append(`portfolio[${idx}][completedOn]`, entry.completedOn);
      payload.append(`portfolio[${idx}][location]`, entry.location);
      entry.existingImages.forEach((url) =>
        payload.append(`portfolio[${idx}][existingImages]`, url)
      );
      entry.images.forEach((file) =>
        payload.append(`portfolio[${idx}][images]`, file)
      );
    });

    try {
      const res = await fetch(
        `http://localhost:8000/api/contractor/${contractor._id}`,
        {
          method: "PUT",
          body: payload,
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Contractor updated");
      onContractorUpdated(data.contractor);
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        ← Back
      </button>

      <h2>Update Contractor</h2>
      <form onSubmit={handleSubmit} className={styles.contractorForm}>
        <div className={styles.formGroup}>
          <label>Name *</label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Phone *</label>
          <input name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Email *</label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Location *</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Service Type *</label>
          <input
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
          />
        </div>

        <div className={styles.portfolioSection}>
          <h3>Portfolio Projects</h3>
          {portfolioEntries.map((entry, idx) => (
            <div key={idx} className={styles.portfolioEntry}>
              <div className={styles.portfolioHeader}>
                <h4>Project #{idx + 1}</h4>
                {portfolioEntries.length > 1 && (
                  <button type="button" onClick={() => removeEntry(idx)}>
                    Remove
                  </button>
                )}
              </div>
              <div className={styles.formGroup}>
                <label>Title</label>
                <input
                  value={entry.title}
                  onChange={(e) =>
                    handlePortfolioChange(idx, "title", e.target.value)
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <input
                  value={entry.description}
                  onChange={(e) =>
                    handlePortfolioChange(idx, "description", e.target.value)
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Location</label>
                <input
                  value={entry.location}
                  onChange={(e) =>
                    handlePortfolioChange(idx, "location", e.target.value)
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Completed On</label>
                <input
                  type="date"
                  value={entry.completedOn}
                  onChange={(e) =>
                    handlePortfolioChange(idx, "completedOn", e.target.value)
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Existing Images</label>
                <div className={styles.filePreview}>
                  {entry.existingImages.map((url) => (
                    <div key={url} className={styles.imageItem}>
                      <img src={url} alt="proj" className={styles.thumbnail} />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(idx, url)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>New Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleNewImageUpload(idx, e)}
                />
                <div className={styles.filePreview}>
                  {entry.images.map((file, i) => (
                    <div key={i} className={styles.imageItem}>
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeNewImage(idx, i)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <button type="button" className={styles.addButton} onClick={addEntry}>
            + Add Project
          </button>
        </div>

        <div className={styles.formActions}>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Contractor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateContractorForm;
