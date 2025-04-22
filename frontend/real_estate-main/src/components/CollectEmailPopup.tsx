import React, { FunctionComponent, useState } from "react";
import styles from "./CollectEmailPopup.module.css";

type CollectEmailPopupProps = {
  onClose: () => void;
  onSendOtp: (email: string) => void;
};

const CollectEmailPopup: FunctionComponent<CollectEmailPopupProps> = ({ onClose, onSendOtp }) => {
  const [email, setEmail] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Attempting to send OTP to:", email);

    try {
      const response = await fetch('/api/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log("Response received with status:", response.status);

      if (response.status !== 200) {
        console.error("Error response received:", await response.text());
        throw new Error('Failed to generate OTP');
      }

      console.log('OTP sent successfully:', await response.text());
      onSendOtp(email);
        // Close the popup after successful OTP sending
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <div className={styles.popupBackground}>
      <div className={styles.popupContent}>
        <div className={styles.closeButton} onClick={onClose}>
          &times;
        </div>
        <h2>Enter Email</h2>
        <form onSubmit={handleSendOtp}>
          <div className={styles.section}>
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.submit}>
            <button type="submit">Send OTP</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectEmailPopup;
