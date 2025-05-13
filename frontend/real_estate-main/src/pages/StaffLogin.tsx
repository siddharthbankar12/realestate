import { FunctionComponent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./StaffLogin.module.css";

export type contentType = {
  className?: string;
};

const StaffLogin: FunctionComponent<contentType> = ({ className = "" }) => {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:8000/api/staff/login";

  const [loginCredentials, setLoginCredentials] = useState({
    staffId: "basil1747053929249",
    password: "a",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitButtonClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(baseUrl, loginCredentials);
      const token = response.data.token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("authToken", token);
      toast.success("Login Successful");
      navigate("/staff-dashboard");
    } catch (error) {
      toast.error("Login failed");
      console.error("Login failed", error);
    }
  };

  return (
    <div className={`${styles.containerContent} ${className}`}>
      <div className={styles.leftPanel}>
        <img src="/logo.png" alt="Company Logo" className={styles.logo} />
        <h1 className={styles.companyName}>Real Estate</h1>
        <p className={styles.tagline}>Manage Your Properties Efficiently</p>
      </div>

      <div className={styles.rightPanel}>
        <form className={styles.loginForm} onSubmit={onSubmitButtonClick}>
          <h2 className={styles.heading}>Staff Portal</h2>

          <div className={styles.inputGroup}>
            <label htmlFor="staffId">Staff ID</label>
            <input
              id="staffId"
              name="staffId"
              type="text"
              placeholder="Enter Staff ID"
              value={loginCredentials.staffId}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter Password"
              value={loginCredentials.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.button}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffLogin;
