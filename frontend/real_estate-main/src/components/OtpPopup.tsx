import React, { FunctionComponent, useState } from "react";
import styles from "./OtpPopup.module.css";

type OtpPopupProps = {
  email: string;
  onClose: () => void;
  onVerifyOtp: (token: string) => void; // Updated to accept token
};

const OtpPopup: FunctionComponent<OtpPopupProps> = ({
  email,
  onClose,
  onVerifyOtp,
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/emailLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, OTP: otp }),
      });

      if (!response.ok) {
        const message = await response.text();
        setError(message);
        return;
      }

      const data = await response.json();
      console.log("Token received:", data.token);
      onVerifyOtp(data.token); // Pass the token to the parent component
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className={styles.popupBackground}>
      <div className={styles.popupContent}>
        <div className={styles.closeButton} onClick={onClose}>
          &times;
        </div>
        <h2>Enter OTP</h2>
        <p>
          A 6-digit OTP has been sent to <strong>{email}</strong>.{" "}
        </p>
        <p>Please enter it below to complete your registration.</p>
        <form onSubmit={handleVerifyOtp}>
          <div className={styles.section}>
            <label htmlFor="otp" style={{ textAlign: "center" }}>
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.submit}>
            <button type="submit">Verify</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpPopup;
