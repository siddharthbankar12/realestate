import { FunctionComponent } from "react";
import MemberBlocks from "./MemberBlocks";
import styles from "./AboutContent.module.css";

export type AboutContentType = {
  className?: string;
};

const AboutContent: FunctionComponent<AboutContentType> = ({
  className = "",
}) => {
  return (
    <section className={[styles.aboutContent, className].join(" ")}>
      <div className={styles.aboutIntro}>
        <div className={styles.aboutUsParent}>
          <h2 className={styles.aboutUs}>About Us</h2>
          <p className={styles.welcomeToOurContainer}>
            <span className={styles.welcomeToOurContainer1}>
              <span className={styles.welcomeToOur}>
                Welcome to our real-estate website, your trusted partner in
                real-estate market. We connect buyers,sellers and renters with
                vast network of properties to find their perfect match.Our
                platform is designed to make property transactions
                seamless,transparent and efficient.
              </span>
              <span
                className={styles.withAUserFriendly}
              >{`With a user-friendly interface and a commitment to excellent service , we try to simplify your real-estate journey. `}</span>
            </span>
          </p>
        </div>
        <div className={styles.visionMissionContentParent}>
          <div className={styles.visionMissionContent}>
            <div className={styles.visionHeader}>
              <b className={styles.ourVision}>Our Vision</b>
              <p
                className={styles.ourVisionIs}
              >{`Our vision is to be the leading platform,recognized for innovation,trust and customer satisfaction.We envision a world where finding and securing the perfect property is effortless, thanks to cutting-edge technology and unparalleled service     `}</p>
            </div>
            <div className={styles.visionHeader1}>
              <b className={styles.ourMission}>Our Mission</b>
              <div className={styles.ourMissionIsToRevolutionizWrapper}>
                <p
                  className={styles.ourMissionIs}
                >{`Our mission is to revolutionize the real-estate experience by providing a comprehensive,reliable and easy-to-use platform.We aim to empower our users with the best tools and resources to make informed decisions,ensuring a smooth and successful property transaction for everyone. `}</p>
              </div>
            </div>
          </div>
          <div className={styles.officesParent}>
            <div className={styles.offices}>
              <h2 className={styles.ourOffices}>Our Offices</h2>
              <div className={styles.officeAddresses}>
                <div className={styles.officeAddressList}>
                  <div className={styles.officeColumns}>
                    <img
                      className={styles.officeIcons}
                      loading="lazy"
                      alt=""
                      src="/384256-1@2x.png"
                    />
                    <div className={styles.addressPhoneContainer}>
                      <p className={styles.address}> Address :</p>
                      <p className={styles.phone}>{` Phone : `}</p>
                      <p className={styles.email}>
                        <span className={styles.email1}> Email :</span>
                        <span className={styles.span}>{` `}</span>
                      </p>
                    </div>
                  </div>
                  <div className={styles.officeColumns1}>
                    <img
                      className={styles.icon}
                      alt=""
                      src="/384256-1@2x.png"
                    />
                    <div className={styles.addressPhoneContainer1}>
                      <p className={styles.address1}> Address :</p>
                      <p className={styles.phone1}>{` Phone : `}</p>
                      <p className={styles.email2}>
                        <span className={styles.email3}> Email :</span>
                        <span className={styles.span1}>{` `}</span>
                      </p>
                    </div>
                  </div>
                  <div className={styles.officeColumns2}>
                    <img
                      className={styles.icon1}
                      alt=""
                      src="/384256-1@2x.png"
                    />
                    <div className={styles.addressPhoneContainer2}>
                      <p className={styles.address2}> Address :</p>
                      <p className={styles.phone2}>{` Phone : `}</p>
                      <p className={styles.email4}>
                        <span className={styles.email5}> Email :</span>
                        <span className={styles.span2}>{` `}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.teamContent}>
              <div className={styles.meetOurTeamWrapper}>
                <h2 className={styles.meetOurTeam}>Meet Our Team</h2>
              </div>
              <div className={styles.teamMembers}>
                <MemberBlocks />
                <MemberBlocks
                  propPadding="0px var(--padding-45xl)"
                  propAlignSelf="stretch"
                />
                <MemberBlocks
                  propPadding="0px var(--padding-52xl) 0px var(--padding-47xl)"
                  propAlignSelf="stretch"
                />
                <MemberBlocks
                  propPadding="0px var(--padding-50xl) 0px var(--padding-49xl)"
                  propAlignSelf="stretch"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
