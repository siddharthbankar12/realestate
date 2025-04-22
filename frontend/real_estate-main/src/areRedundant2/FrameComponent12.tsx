import { FunctionComponent } from "react";
import styles from "./FrameComponent12.module.css";

export type FrameComponent1Type = {
  className?: string;
};

const FrameComponent1: FunctionComponent<FrameComponent1Type> = ({
  className = "",
}) => {
  return (
    <section className={[styles.propertyDetailsPageInner, className].join(" ")}>
      <div className={styles.contactFormParent}>
        <b className={styles.contactForm}>Contact Form</b>
        <div className={styles.galleryTitleAndImages}>
          <div className={styles.mapAndAddress}>
            <div className={styles.contactFormGroup}>
              <textarea
                className={styles.contactForm1}
                placeholder="Write your message ..."
                rows={9}
                cols={28}
              />
              <div className={styles.amenityRowOne}>
                <div className={styles.basketballLabelContainerParent}>
                  <div className={styles.basketballLabelContainer}>
                    <div className={styles.email}>Email</div>
                  </div>
                  <div className={styles.phone}>Phone</div>
                </div>
              </div>
            </div>
            <div className={styles.addressContainer}>
              <div className={styles.emailParent}>
                <div className={styles.brokergmailcom}>broker@gmail.com</div>
                <div className={styles.brokerEmailLabel}>+33 1234 5678</div>
              </div>
            </div>
          </div>
          <div className={styles.contactFormContainerParent}>
            <div className={styles.contactFormContainer}>
              <div className={styles.phoneNumber}>
                <div className={styles.phoneNumberChild} />
                <div className={styles.phoneNumber1}>Phone Number</div>
              </div>
              <div className={styles.email1}>
                <div className={styles.emailChild} />
                <div className={styles.emailAddress}>Email Address</div>
              </div>
            </div>
            <div className={styles.emailField}>
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
