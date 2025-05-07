import React, {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "./UserProfile.module.css";
import EditableInput from "../components/EditableInput";
import { toast } from "react-toastify";

const UserProfile: React.FC = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputValues, setInputValues] = useState({
    role: "Role",
    name: "Full Name",
    phoneNumber: "Phone Number",
    mail: "Mail",
    state: "State",
    city: "City",
    address: "Address",
    landlineNumber: "0000000000",
    saveProperties: [],
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [isRequiredFilled, setIsRequiredFilled] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isProfilePicMenuOpen, setIsProfilePicMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // console.log(decoded);

        setInputValues({
          role: decoded.role || "User",
          name: `${decoded.firstname} ${decoded.lastname}`,
          phoneNumber: decoded.phoneNumber || "",
          mail: decoded.email || "",
          state: decoded.state || "",
          city: decoded.city || "",
          address: decoded.address || "",
          landlineNumber: decoded.landlineNumber || "",
          saveProperties: decoded.saveProperties || [],
        });

        setSelectedImage(decoded.image);

        const userId = decoded._id || decoded.id;
        setUserId(userId);
        console.log("Decoded token:", decoded);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedImage) {
      localStorage.setItem("profileImage", selectedImage);
    }
  }, [selectedImage]);

  useEffect(() => {
    const errors: Record<string, string> = {};
    const requiredFields = [
      "name",
      "phoneNumber",
      "mail",
      "state",
      "city",
      "address",
      "landlineNumber",
    ];

    requiredFields.forEach((field) => {
      if (!inputValues[field]) {
        errors[field] = "This is a required field";
      }
    });

    if (
      inputValues.mail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValues.mail)
    ) {
      errors.mail = "Invalid email format";
    }
    if (
      inputValues.landlineNumber &&
      !/^\d+$/.test(inputValues.landlineNumber)
    ) {
      errors.landlineNumber = "Landline number must be numeric";
    }

    setValidationErrors(errors);
    setIsRequiredFilled(Object.keys(errors).length === 0);
  }, [inputValues]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setInputValues({
      ...inputValues,
      [field]: e.target.value,
    });
  };

  const handleEditClick = () => setIsEditable(true);

  const handleSaveClick = async () => {
    if (isRequiredFilled && userId) {
      setIsEditable(false);
      console.log("Profile saved:", inputValues);

      // Create a new FormData object to append data
      const formData = new FormData();

      // Append form data
      formData.append("name", inputValues.name);
      formData.append("mail", inputValues.mail);
      formData.append("phoneNumber", inputValues.phoneNumber);
      formData.append("landlineNumber", inputValues.landlineNumber);
      formData.append("city", inputValues.city);
      formData.append("state", inputValues.state);
      formData.append("address", inputValues.address);

      // If image is selected, append it to the formData
      if (selectedFile) {
        formData.append("image", selectedFile);
      } else if (removeImage) {
        // If image should be removed, add removeImage flag to FormData
        formData.append("removeImage", "true");
      }

      try {
        // Send FormData to the backend
        const response = await fetch(
          `http://localhost:8000/api/user-update/${userId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: formData,
          }
        );

        const data = await response.json();

        console.log(data);

        if (response.ok) {
          setSaveSuccess("Profile saved successfully!");
          localStorage.setItem("userProfile", JSON.stringify(inputValues));

          if (data.token) {
            localStorage.setItem("authToken", data.token);
            console.log("New token updated in localStorage");
          }
        } else {
          toast.error(data.message || "Profile save failed");
        }

        toast.success("Update User Profile successfully");
      } catch (error) {
        console.error("Error saving profile:", error);
        setSaveSuccess("An error occurred while saving your profile.");
      }

      setTimeout(() => setSaveSuccess(null), 3000);
    } else {
      alert("Please fill in all mandatory fields correctly.");
    }
    setRemoveImage(false);
  };

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(inputValues));
    // console.log(inputValues, "inputValues");
  }, [inputValues]);

  const handleButtonClick = () => {
    if (selectedImage) {
      setIsProfilePicMenuOpen(!isProfilePicMenuOpen);
    } else if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setSelectedFile(file);
        setIsProfilePicMenuOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePic = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setRemoveImage(true); // << indicate image removal to backend
    localStorage.removeItem("profileImage");
    setIsProfilePicMenuOpen(false);
  };

  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const onDeleteClick = useCallback(() => {
    setShowDeleteConfirmation(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    localStorage.clear();
    navigate("/");
  }, [navigate]);

  const handleDeleteCancel = useCallback(() => {
    setShowDeleteConfirmation(false);
  }, []);

  useEffect(() => {
    // console.log("Validation Errors: ", validationErrors);
    setIsRequiredFilled(Object.keys(validationErrors).length === 0);
  }, [validationErrors]);

  // console.log("userId:", userId);
  // console.log(inputValues, "inputValues");
  // console.log(selectedImage);

  return (
    <div className={styles.userProfile}>
      <Navbar />
      <section className={styles.sidebarParent}>
        <Sidebar currentPage="profile-settings" />

        <div className={styles.userContainer}>
          <div className={styles.profileHeader}>
            <div className={styles.profileImageWrapper}>
              <div
                className={styles.profileImage}
                style={{
                  backgroundImage: selectedImage
                    ? `url(${selectedImage})`
                    : inputValues.image
                    ? `url(${inputValues.image})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor:
                    selectedImage || inputValues.image ? "transparent" : "#ccc",
                }}
              >
                <button
                  className={styles.cameraButton}
                  onClick={handleButtonClick}
                  aria-label="Change profile"
                >
                  <img
                    alt="Change"
                    src={
                      selectedImage ? "/materialsymbolsedit.svg" : "/camera.svg"
                    }
                  />
                </button>
              </div>

              {isProfilePicMenuOpen && (
                <div className={styles.profilePicMenu}>
                  <button
                    className={styles.removeButton}
                    onClick={handleRemoveProfilePic}
                  >
                    Remove Profile Picture
                  </button>
                  <button
                    className={styles.changeButton}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Profile Picture
                  </button>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
            </div>

            {!isEditable && (
              <button className={styles.editButton} onClick={handleEditClick}>
                <span>Edit</span>
                <img src="/materialsymbolsedit.svg" alt="Edit" />
              </button>
            )}
          </div>

          <div className={styles.detailContainer}>
            <div className={styles.editableContainer}>
              <div className={styles.detailColumn}>
                {[
                  ["You are*", "role"],
                  ["Name*", "name"],
                  ["Phone Number *", "phoneNumber"],
                  ["Landline Number", "landlineNumber"],
                ].map(([label, key]) => (
                  <div className={styles.indDetail} key={key}>
                    {label}
                    <EditableInput
                      isEditable={key !== "role" && isEditable}
                      value={inputValues[key]}
                      field={key}
                      onChange={(e) => handleInputChange(e, key)}
                      errorMessage={validationErrors[key]}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.detailColumn}>
                {[
                  ["Mail*", "mail"],
                  ["State*", "state"],
                  ["City*", "city"],
                  ["Address*", "address"],
                ].map(([label, key]) => (
                  <div className={styles.indDetail} key={key}>
                    {label}
                    <EditableInput
                      isEditable={isEditable}
                      value={inputValues[key]}
                      field={key} // ✅ Add this line
                      onChange={(e) => handleInputChange(e, key)}
                      errorMessage={validationErrors[key]}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.other}>
              <div className={styles.subscribeContainer}>
                Subscribe for updates from Real Estate.
                <div className={styles.checkContainer}>
                  <input
                    type="checkbox"
                    id="subscribe"
                    className={styles.checkbox}
                  />
                  Other Promotional Mailers
                </div>
              </div>
              <div className={styles.TC}>
                By clicking below you agree to the{" "}
                <span className={styles.TCtext}>Terms and Conditions</span>
              </div>
              <div className={styles.saveBtn}>
                <button
                  className={`${styles.saveProfile} ${
                    isEditable ? styles.active : ""
                  }`}
                  onClick={handleSaveClick}
                  // disabled={!isEditable || !isRequiredFilled}
                >
                  Save Profile
                </button>
              </div>
              <div className={styles.deleteContainer}>
                To delete your account{" "}
                <span className={styles.TCtext} onClick={onDeleteClick}>
                  click here
                </span>
              </div>
              {showDeleteConfirmation && (
                <div className={styles.DeletePopup}>
                  <div className={styles.DeleteMessage}>
                    Are you sure you want to delete your account?
                  </div>
                  <div className={styles.DeleteButtons}>
                    <button
                      className={styles.DeleteButton}
                      onClick={handleDeleteConfirm}
                    >
                      Yes
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={handleDeleteCancel}
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
