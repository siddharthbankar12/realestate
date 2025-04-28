import { FunctionComponent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./LoginForm.module.css";

import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export type LoginFormType = {
  className?: string;
};

const LoginForm: FunctionComponent<LoginFormType> = ({ className = "" }) => {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:8000/api/login";
  const [loginCredentials, setLoginCredentials] = useState({
    emailOrPhone: "",
    password: "",
  });

  const onRegisterNowTextClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(baseUrl, loginCredentials);

      const token = response.data.token;

      const decoded = jwtDecode(token);
      console.log(token);

      axios.defaults.headers.common["Authorization"] = `bearer ${token}`;

      localStorage.setItem("authToken", token);

      console.log(response.data);

      toast.success("Login Successful");

      navigate("/user-profile");
      return response.data;
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Login failed");
    }
  };

  return (
    <section className={[styles.loginForm, className].join(" ")}>
      <form className={styles.loginForm1} onSubmit={onSubmit}>
        <div className={styles.loginFormChild} />
        <div className={styles.registration}>
          <div className={styles.logInsignIn}>Log In/Sign In</div>
        </div>
        <div className={styles.registerCallToAction}>
          <div className={styles.phoneNumberMail}>Phone Number/ mail</div>
          <div className={styles.phoneInput}>
            <div className={styles.phoneInputChild} />
            <input
              className={styles.phonemail}
              placeholder="Phone/mail"
              type="text"
              name="emailOrPhone"
              value={loginCredentials.emailOrPhone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={styles.passwordContainerWrapper}>
          <div className={styles.passwordContainer}>
            <div className={styles.password}>Password</div>
            <div className={styles.passwordPlaceholder}>
              <div className={styles.passwordPlaceholderChild} />
              <input
                className={styles.password1}
                placeholder="Password"
                type="password"
                name="password"
                value={loginCredentials.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className={styles.registrationContainerWrapper}>
          <div className={styles.registrationContainer}>
            <div className={styles.registrationCallToAction}>
              <div className={styles.doNotHave}>Do not have an account?</div>
              <div
                className={styles.registerNow}
                onClick={onRegisterNowTextClick}
              >
                <span className={styles.span}>{` `}</span>
                <span className={styles.registerNow1}>Register Now</span>
              </div>
            </div>
            <div className={styles.passwordField}>
              <button className={styles.submitButton} type="submit">
                <div className={styles.submitButtonChild} />
                <div className={styles.logIn}>LOG IN</div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
