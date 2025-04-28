import React, { useEffect, useState } from "react";
import styles from "./AppointmentForm.module.css";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const AppointmentForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // Retrieve the token from localStorage (assuming it's stored there)
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log(decoded);

        const userId = decoded._id || decoded.id;
        setUserId(userId);
        console.log(userId);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const apiUrl = token
      ? "http://localhost:8000/api/appointments/user" // For logged-in users
      : "http://localhost:8000/api/appointments/admin"; // For guests

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userId ? `Bearer ${token}` : "",
          // Attach the Bearer token if available
        },
        body: JSON.stringify({ firstName, lastName, email, phone, userId }),
      });

      if (response.ok) {
        toast.success("Appointment Book Successfully");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        onClose(); // Close the form after submission
      } else {
        throw new Error("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.heading}>Book Appointment</h2>
        <form className={styles.aptform} onSubmit={handleSubmit}>
          <div className={styles.fullname}>
            <input
              className={styles.fname}
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className={styles.lname}
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <input
            className={styles.email}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.phno}
            placeholder="Phone"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button className={styles.bookappointment} type="submit">
            Get Your Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
