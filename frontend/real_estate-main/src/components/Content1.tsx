import { FunctionComponent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Content1.module.css";

export type ContentType = {
  className?: string;
};

const Content: FunctionComponent<ContentType> = ({ className = "" }) => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const baseUrl = `${baseURL}/api/admin/login`;

  const [loginCredentials, setLoginCredentials] = useState({
    adminId: "admin1",
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
      navigate("/admin-dashboard");
    } catch (error) {
      toast.error("Login failed");
      console.error("Login failed", error);
    }
  };

  return (
    <div className={`${styles.containerContent} ${className}`}>
      <div className={styles.leftPanel}>
        <img
          src="/logo.png"
          alt="Company Logo"
          className={styles.logo}
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        />
        <h1 className={styles.companyName}>Real Estate</h1>
        <p className={styles.tagline}>Manage Your Properties Efficiently</p>
      </div>

      <div className={styles.rightPanel}>
        <form className={styles.loginForm} onSubmit={onSubmitButtonClick}>
          <h2 className={styles.heading}>Admin Portal</h2>

          <div className={styles.inputGroup}>
            <label htmlFor="adminId">Admin ID</label>
            <input
              id="adminId"
              name="adminId"
              type="text"
              placeholder="Enter Admin ID"
              value={loginCredentials.adminId}
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

export default Content;
