import { FunctionComponent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MailPassword from "../components/MailPassword";
import styles from "./FormContainer.module.css";

export type FormContainerType = {
  className?: string;
};

const FormContainer: FunctionComponent<FormContainerType> = ({
  className = "",
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, phoneNumber, email, password, image } =
      formData;

    try {
      await axios.post("http://localhost:8000/api/users", {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        image,
      });
      navigate("/log-in");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const onLoginNowTextClick = useCallback(() => {
    navigate("/log-in");
  }, [navigate]);

  return (
    <div className={[styles.formContainer, className].join(" ")}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContainerChild} />
        <div className={styles.registrationForm}>
          <div className={styles.registerWrapper}>
            <b className={styles.register}>Register</b>
          </div>
          <div className={styles.credentials}>
            <div className={styles.namePhone}>
              <div className={styles.firstName}>
                <div className={styles.firstName1}>First Name*</div>
                <div className={styles.emailPassword}>
                  <div className={styles.confirmFirstNameInput}>
                    <div className={styles.confirmFirstNameInputChild} />
                    <input
                      className={styles.firstName2}
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.phoneNumber}>Phone Number*</div>
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.confirmLastName}>
                  <div className={styles.lastName}>Last Name*</div>
                  <div className={styles.confirmLastNameInput}>
                    <div className={styles.confirmLastNameInputChild} />
                    <input
                      className={styles.lastName1}
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.phoneNumber1}>
              <div className={styles.phoneNumberInput}>
                <div className={styles.phoneNumberInputChild} />
                <input
                  className={styles.phoneNo}
                  placeholder="Phone no."
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <MailPassword
              mail="Mail"
              mailPlaceholder="Mail"
              mailValue={formData.email}
              mailName="email"
              onMailChange={handleChange}
            />
            <MailPassword
              mail="Password*"
              mailPlaceholder="Password"
              mailValue={formData.password}
              mailName="password"
              onMailChange={handleChange}
              propPadding="unset"
              propBorderRadius="unset"
              propPadding1="var(--padding-8xs) var(--padding-2xs) var(--padding-4xs)"
              propBorderRadius1="unset"
            />
          </div>
        </div>
        <div className={styles.submission}>
          <div className={styles.account}>
            <div className={styles.login}>
              <div
                className={styles.alreadyHaveAn}
              >{`Already have an account? `}</div>
              <u className={styles.loginNow} onClick={onLoginNowTextClick}>
                Login Now
              </u>
            </div>
            <div className={styles.submit}>
              <button className={styles.submitButton} type="submit">
                <div className={styles.submitButtonChild} />
                <div className={styles.register1}>REGISTER</div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormContainer;
