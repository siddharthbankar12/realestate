import { FunctionComponent } from "react";
import styles from "./FrameComponent12.module.css";

export type FrameComponent1Type = {
  className?: string;
};

const FrameComponent1: FunctionComponent<FrameComponent1Type> = ({
  className = "",
}) => {
  return (
    <section className={[styles.contactWrapper, className].join(" ")}>
      <div className={styles.contact}>
        <b className={styles.contactForm}>Contact Form</b>
        <div className={styles.contactInputsParent}>
          <div className={styles.contactInputs}>
            <div className={styles.messageInput}>
              <textarea
                className={styles.contactForm1}
                placeholder="Write your message ..."
                rows={9}
                cols={28}
              />
              <div className={styles.contactFormFields}>
                <div className={styles.emailField}>
                  <div className={styles.emailLabel}>
                    <div className={styles.email}>Email</div>
                  </div>
                  <div className={styles.phone}>Phone</div>
                </div>
              </div>
            </div>
            <div className={styles.brokerInfo}>
              <div className={styles.brokerDetails}>
                <div className={styles.brokergmailcom}>broker@gmail.com</div>
                <div className={styles.brokerEmailLabel}>+33 1234 5678</div>
              </div>
            </div>
          </div>
          <div className={styles.contactInfo}>
            <div className={styles.contactLabels}>
              <div className={styles.phoneNumber}>
                <div className={styles.phoneNumberChild} />
                <div className={styles.phoneNumber1}>Phone Number</div>
              </div>
              <div className={styles.email1}>
                <div className={styles.emailChild} />
                <div className={styles.emailAddress}>Email Address</div>
              </div>
            </div>
            <div className={styles.submitButton}>
              <button className={styles.submitBtn}>
                <div className={styles.submitBtnChild} />
                <div className={styles.submit}>Submit</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent1;
