import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BasicDetailsForm from "../components/BasicFormDetails";
import LocationDetailsForm from "../components/LocationDetailsForm";
import ApartmentProfileForm from "../components/ApartmentProfileForm";
import PlotProfileForm from "../components/PlotProfileForm";
import HouseProfileForm from "../components/HouseProfileForm";
import PhotosForm from "../components/PhotosForm";
import PricingForm from "../components/PricingForm";
import styles from "./Rent.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Rent: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    purpose: "sell",
    propertyType: "",
    description: "",

    city: "",
    address: "",
    landmark: "",

    price: "",
    bhk: "",
    bathrooms: "",
    balconies: "",
    other_rooms: "",
    area: "",

    allInclusivePrice: false,
    taxAndGovtChargesExcluded: false,
    priceNegotiable: false,

    type: "Residential",
    status: "Available",
    floors: "",
    availability: "",
    phone: "",
    mail: "",
    proprietorName: "",
    proprietorEmail: "",
    proprietorContact: "",
    proprietorPhone: "",
    posterType: "",

    // Apartment specific fields
    numberOfBedrooms: "",
    numberOfBathrooms: "",
    numberOfBalconies: "",
    areaDetails: "",
    totalFloorDetails: "",
    propertyFloorDetails: "",
    // House specific fields
    studyRoom: false,
    poojaRoom: false,
    servantRoom: false,
    storeRoom: false,
    ageOfProperty: "",
    possessionDate: "",
    ownershipType: "",

    //plot

    plotArea: "",
    noOfFloorsConst: "",
    boundary: "",
    construction: "",
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const route = useNavigate();

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => {
    console.log("PrevStep triggered");
    setStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImages([...selectedImages, ...Array.from(event.target.files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const combinedFormData = new FormData();

    const updatedFormData = {
      ...formData,
      // Send nested object explicitly
      other_rooms: {
        studyRoom: formData.studyRoom,
        poojaRoom: formData.poojaRoom,
        servantRoom: formData.servantRoom,
        storeRoom: formData.storeRoom,
      },
    };

    // Append each field properly
    Object.entries(updatedFormData).forEach(([key, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        combinedFormData.append(key, JSON.stringify(value)); // For objects
      } else if (Array.isArray(value)) {
        value.forEach((val) => combinedFormData.append(key, val));
      } else {
        combinedFormData.append(key, String(value));
      }
    });

    selectedImages.forEach((image) => {
      combinedFormData.append("propertyImage", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/property",
        combinedFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Property listed successfully!");
      route("/");
    } catch (error) {
      console.error("Error uploading property or images:", error);
      toast.error("Failed to list property.");
    } finally {
      setLoading(false);
    }
  };

  const renderPropertyProfileForm = () => {
    switch (formData.propertyType) {
      case "Apartment":
        return (
          <ApartmentProfileForm
            formData={formData}
            handleInputChange={handleInputChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case "Plot":
        return (
          <PlotProfileForm
            formData={formData}
            handleInputChange={handleInputChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case "House":
        return (
          <HouseProfileForm
            formData={formData}
            handleInputChange={handleInputChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };

  console.log(formData);

  return (
    <>
      <div className={styles.rent}>
        <Navbar />
        <div className={styles.body}>
          <main className={styles.content}>
            <div className={styles.box}>
              <h3>Few more steps to get your property posted</h3>
              <p>
                Providing clear details about your property finds you good
                buyers
              </p>
            </div>
            {step === 1 && (
              <BasicDetailsForm
                formData={formData}
                handleInputChange={handleInputChange}
                nextStep={nextStep}
              />
            )}
            {step === 2 && (
              <LocationDetailsForm
                formData={formData}
                handleInputChange={handleInputChange}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {step === 3 && renderPropertyProfileForm()}
            {step === 4 && (
              <PhotosForm
                handleImageChange={handleImageChange}
                handleRemoveImage={handleRemoveImage}
                selectedImages={selectedImages}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {step === 5 && (
              <PricingForm
                formData={formData}
                handleInputChange={handleInputChange}
                prevStep={prevStep}
                handleSubmit={handleSubmit}
                loading={loading}
              />
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Rent;
