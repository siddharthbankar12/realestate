import { FunctionComponent, useState } from "react";
import styles from "./RegisterPopup.module.css";
import { toast } from "react-toastify";

type RegisterPopupProps = {
  onClose: () => void;
  onSwitchToLogin: () => void;
  prefilledEmail: string;
};

const RegisterPopup: FunctionComponent<RegisterPopupProps> = ({
  onClose,
  onSwitchToLogin,
  prefilledEmail,
}) => {
  const [email, setEmail] = useState(prefilledEmail);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [landlineNumber, setLandlineNumber] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const registrationData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      role,
      city,
      address,
      state,
      landlineNumber,
    };

    try {
      const response = await fetch("http://localhost:8000/api/users/newuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const message = await response.text();
        setError(message);
        return;
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      toast.success("Registration successful");
      onSwitchToLogin();
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className={styles.popupBackground}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className={styles.section}>
            <label htmlFor="firstName">First Name*</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.section}>
            <label htmlFor="lastName">Last Name*</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={styles.section}>
            <label htmlFor="phoneNumber">Phone Number*</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className={styles.section}>
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              readOnly
            />
          </div>
          <div className={styles.section}>
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.section}>
            <label>Are you a real estate agent or a builder?*</label>
            <div className={styles.radioGroup}>
              <input
                className={styles.circle}
                type="radio"
                id="agent"
                name="role"
                value="agent"
                checked={role === "agent"}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              <label htmlFor="agent">Yes</label>
              <input
                className={styles.circle}
                type="radio"
                id="builder"
                name="role"
                value="builder"
                checked={role === "builder"}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              <label htmlFor="builder">No</label>
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}

          <div>
            <p className="text">
              Already have an account?{" "}
              <div className={styles.login} onClick={onSwitchToLogin}>
                Login
              </div>
            </p>
          </div>
          <div className={styles.submit}>
            <button type="submit">Registere</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPopup;
