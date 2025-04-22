import { FunctionComponent, useCallback, useState } from "react";
import PasswordInput from "./PasswordInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Content1.module.css";

export type ContentType = {
  className?: string;
};

const Content: FunctionComponent<ContentType> = ({ className = "" }) => {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:8000/api/admin/login"; //  backend URL

  const [loginCredentials, setLoginCredentials] = useState({
    adminId: "",
    password: "",
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

      console.log(response.data);
      navigate("/admin-dashboard");
    } catch (error) {
      toast.error("Login failed");
      console.error("Login failed", error);
      throw new Error("Login failed");
    }
  };

  return (
    <section className={[styles.content, className].join(" ")}>
      <form className={styles.rectangleParent} onSubmit={onSubmitButtonClick}>
        <div className={styles.frameChild} />
        <div className={styles.adminLoginHeader}>
          <div className={styles.adminLogin}>Admin Login</div>
        </div>
        <div className={styles.adminLoginForm}>
          <div className={styles.adminCredentials}>
            <div className={styles.adminIdInput}>
              <div className={styles.adminId}>Admin Id</div>
              <div className={styles.adminIdField}>
                <div className={styles.adminIdFieldChild} />
                <input
                  className={styles.adminId1}
                  placeholder="Admin Id"
                  type="text"
                  name="adminId"
                  value={loginCredentials.adminId}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <PasswordInput
            password={loginCredentials.password}
            passwordPlaceholder="Password"
            handleChange={handleChange}
          />
        </div>
        <div className={styles.submitButtonContainer}>
          <button className={styles.submitButton} type="submit">
            <div className={styles.submitButtonChild} />
            <div className={styles.logIn}>LOG IN</div>
          </button>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Content;
