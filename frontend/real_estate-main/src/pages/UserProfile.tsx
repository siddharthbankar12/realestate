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
import PropertyCard from "../components/PropertyCard";

const UserProfile: React.FC = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputValues, setInputValues] = useState({
    role: "Role",
    name: "Full Name",
    phoneNumber1: "Phone Number 1",
    phoneNumber2: "0000000000",
    phoneNumber3: "0000000000",
    mail: "Mail",
    state: "State",
    city: "City",
    address: "Address",
    landlineNumber: "0000000000",
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isRequiredFilled, setIsRequiredFilled] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isProfilePicMenuOpen, setIsProfilePicMenuOpen] = useState(false); // State to track if profile pic menu is open

  useEffect(() => {
    const {
      name,
      phoneNumber1,
      phoneNumber2,
      phoneNumber3,
      mail,
      city,
      state,
      address,
      landlineNumber,
    } = inputValues;
    const errors: Record<string, string> = {};
    if (name === "") {
      errors["name"] = "This is a required field";
    }
    if (phoneNumber1 === "") {
      errors["phoneNumber1"] = "This is a required field";
    } else if (!/^\d+$/.test(phoneNumber1)) {
      errors["phoneNumber1"] = "Phone number must be numeric";
    }
    if (!/^\d+$/.test(phoneNumber2) && phoneNumber2 !== "") {
      errors["phoneNumber2"] = "Phone number must be numeric";
    }
    if (!/^\d+$/.test(phoneNumber3) && phoneNumber3 !== "") {
      errors["phoneNumber3"] = "Phone number must be numeric";
    }
    if (mail === "") {
      errors["mail"] = "This is a required field";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail)) {
      errors["mail"] = "Invalid email format";
    }
    if (city === "") {
      errors["city"] = "This is a required field";
    }
    if (state === "") {
      errors["state"] = "This is a required field";
    }
    if (address === "") {
      errors["address"] = "This is a required field";
    }
    if (!/^\d+$/.test(landlineNumber) && landlineNumber !== "") {
      errors["landlineNumber"] = "Landline number must be numeric";
    }
    setValidationErrors(errors);
    setIsRequiredFilled(Object.keys(errors).length === 0);
  }, [inputValues]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log(token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        setInputValues({
          role: decoded.role || "User",
          name: `${decoded.firstname} ${decoded.lastname}`,
          phoneNumber1: decoded.phoneNumber,
          phoneNumber2: "0000000000",
          phoneNumber3: "0000000000",
          mail: decoded.email,
          state: decoded.state || "State",
          city: decoded.city || "City",
          address: decoded.address || "Address",
          landlineNumber: decoded.landlineNumber || "0000000000",
        });
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }

    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setSelectedImage(savedImage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(inputValues));
  }, [inputValues]);

  useEffect(() => {
    if (selectedImage) {
      localStorage.setItem("profileImage", selectedImage);
    }
  }, [selectedImage]);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    setIsEditable(false);
    if (isRequiredFilled) {
      console.log("Saving profile...");
    } else {
      alert("Please fill in all mandatory fields.");
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setInputValues({
      ...inputValues,
      [field]: e.target.value,
    });
  };

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
        setIsProfilePicMenuOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePic = () => {
    setSelectedImage(null);
    setIsProfilePicMenuOpen(false);
    localStorage.removeItem("profileImage");
  };

  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const onDeleteClick = useCallback(() => {
    setShowDeleteConfirmation(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    navigate("/");
    // Perform additional Delete actions if needed
  }, [navigate]);

  const handleDeleteCancel = useCallback(() => {
    setShowDeleteConfirmation(false);
  }, []);

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const query = searchParams.get("query") || "";
  //   fetchProperties(query);
  // }, [location.search]);

  return (
    <div className={styles.userProfile}>
      <Navbar />
      <section className={styles.sidebarParent}>
        <Sidebar currentPage="profile-settings" />
        <div className={styles.lastNameRow} style={{ marginTop: "3vh" }}>
          <div className={styles.userContainer}>
            <div style={{ display: "flex", flexDirection: "row", gap: "12vw" }}>
              <div className={styles.header}>
                <div className={styles.profileImage}>
                  <div
                    className={styles.logo}
                    style={{
                      backgroundImage: selectedImage
                        ? `url(${selectedImage})`
                        : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundColor: selectedImage
                        ? "transparent"
                        : "linear-gradient(to right, #42a5f5, #7e57c2)",
                    }}
                  />
                  <button
                    className={styles.cameraButton}
                    onClick={handleButtonClick}
                  >
                    <img
                      loading="lazy"
                      alt=""
                      src={
                        selectedImage
                          ? "/materialsymbolsedit.svg"
                          : "/camera.svg"
                      }
                    />
                  </button>
                  {isProfilePicMenuOpen && (
                    <div className={styles.profilePicMenu}>
                      <button onClick={handleRemoveProfilePic}>
                        Remove Profile Picture
                      </button>
                      <button onClick={() => fileInputRef.current?.click()}>
                        Change Profile Picture
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className={styles.editProfile}>
                {!isEditable && (
                  <button
                    className={styles.editButton}
                    onClick={handleEditClick}
                  >
                    {/* <div className={styles.editButtonChild} /> */}
                    <a className={styles.edit}>Edit</a>
                    <img
                      className={styles.materialSymbolseditIcon}
                      alt=""
                      src="/materialsymbolsedit.svg"
                    />
                  </button>
                )}
              </div>
            </div>
            <div className={styles.detailContainer}>
              <div className={styles.editableContainer}>
                <div className={styles.detailColumn}>
                  <div className={styles.indDetail}>
                    You are*
                    <EditableInput
                      isEditable={false}
                      value={inputValues.role}
                      onChange={(e) => handleInputChange(e, "role")}
                    />
                  </div>
                  <div className={styles.indDetail}>
                    Name*
                    <EditableInput
                      isEditable={isEditable}
                      value={inputValues.name}
                      onChange={(e) => handleInputChange(e, "name")}
                      errorMessage={validationErrors["name"]}
                    />
                  </div>
                  <div className={styles.indDetail}>
                    Phone Number 1*
                    <EditableInput
                      isEditable={isEditable}
                      value={inputValues.phoneNumber1}
                      onChange={(e) => handleInputChange(e, "phoneNumber1")}
                      errorMessage={validationErrors["phoneNumber1"]}
                    />
                  </div>
                  <div className={styles.indDetail}>
                    Phone Number 2
                    <EditableInput
                      isEditable={isEditable}
                      value={inputValues.phoneNumber2}
                      onChange={(e) => handleInputChange(e, "phoneNumber2")}
                      errorMessage={validationErrors["phoneNumber2"]}
                    />
                  </div>
                  <div className={styles.indDetail}>
                    Phone Number 3
                    <EditableInput
                      isEditable={isEditable}
                      value={inputValues.phoneNumber3}
                      onChange={(e) => handleInputChange(e, "phoneNumber3")}
                      errorMessage={validationErrors["phoneNumber3"]}
                    />
                  </div>
                </div>
                <div className={styles.detailColumn}>
                  <div className={styles.indDetail}>
                    Mail*
                    <EditableInput
                      isEditable={isEditable}
                      value={inputValues.mail}
                      onChange={(e) => handleInputChange(e, "mail")}
                      errorMessage={validationErrors["mail"]}
                    />
                  </div>
                  <div className={styles.indDetail}>
                    State*
                    <EditableInput
                      isEditable={isEditable}
                      value={inputValues.state}
                      onChange={(e) => handleInputChange(e, "state")}
                      errorMessage={validationErrors["state"]}
                    />
                  </div>
                  <div className={styles.indDetail}>
                    City*
                    <EditableInput
                      isEditable={isEditable}
                      value={inputValues.city}
                      onChange={(e) => handleInputChange(e, "city")}
                      errorMessage={validationErrors["city"]}
                    />
                  </div>
                  <div className={styles.indDetail}>
                    Address*
                    <EditableInput
                      isEditable={isEditable}
                      value={inputValues.address}
                      onChange={(e) => handleInputChange(e, "address")}
                      errorMessage={validationErrors["address"]}
                    />
                  </div>
                  <div className={styles.indDetail}>
                    Landline Number
                    <EditableInput
                      isEditable={isEditable}
                      value={inputValues.landlineNumber}
                      onChange={(e) => handleInputChange(e, "landlineNumber")}
                      errorMessage={validationErrors["landlineNumber"]}
                    />
                  </div>
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
                <button
                  className={`${styles.saveProfile} ${
                    isEditable ? styles.active : ""
                  }`}
                  onClick={handleSaveClick}
                  disabled={!isEditable || !isRequiredFilled}
                >
                  Save Profile
                </button>
                <div className={styles.deleteContainer}>
                  To delete your account{" "}
                  <a className={styles.TCtext} onClick={onDeleteClick}>
                    click here
                  </a>
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
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
